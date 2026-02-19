import { RaiderIOProfile } from "./types";

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getBlizzardToken(): Promise<string | null> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const clientId = process.env.BLIZZARD_CLIENT_ID;
  const clientSecret = process.env.BLIZZARD_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  try {
    const res = await fetch("https://us.battle.net/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });
    if (!res.ok) return null;
    const data = await res.json();
    cachedToken = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in - 60) * 1000,
    };
    return data.access_token;
  } catch {
    return null;
  }
}

export async function fetchBlizzardCharacter(
  region: string,
  realmSlug: string,
  name: string
): Promise<RaiderIOProfile | null> {
  const token = await getBlizzardToken();
  if (!token) return null;

  const r = region.toLowerCase();
  const realm = realmSlug.toLowerCase();
  const char = name.toLowerCase();
  const namespace = `profile-${r}`;
  const base = `https://${r}.api.blizzard.com/profile/wow/character/${realm}/${char}`;
  const auth = { Authorization: `Bearer ${token}` };

  try {
    // Fetch profile + media in parallel
    const [profileRes, mediaRes] = await Promise.all([
      fetch(`${base}?namespace=${namespace}&locale=en_US`, { headers: auth }),
      fetch(`${base}/character-media?namespace=${namespace}&locale=en_US`, { headers: auth }),
    ]);

    if (!profileRes.ok) return null;
    const profile = await profileRes.json();
    if (!profile?.name) return null;

    // Extract avatar URL from media (non-blocking failure)
    let thumbnailUrl = "";
    if (mediaRes.ok) {
      const media = await mediaRes.json();
      thumbnailUrl =
        (media?.assets as { key: string; value: string }[] | undefined)?.find(
          (a) => a.key === "avatar"
        )?.value ?? "";
    }

    const faction = (profile.faction?.type ?? "").toLowerCase() as "horde" | "alliance";
    const gender = (profile.gender?.type ?? "MALE").toLowerCase();

    return {
      name: profile.name,
      race: profile.race?.name ?? "",
      class: profile.character_class?.name ?? "",
      active_spec_name: profile.active_spec?.name ?? "",
      active_spec_role: "",
      gender,
      faction,
      thumbnail_url: thumbnailUrl,
      region: r,
      realm: profile.realm?.name ?? realmSlug,
      profile_url: `https://worldofwarcraft.blizzard.com/en-us/character/${r}/${realm}/${char}`,
      achievement_points: profile.achievement_points ?? 0,
      honorable_kills: profile.honorable_kills ?? 0,
      gear: {
        item_level_equipped: profile.equipped_item_level ?? 0,
        item_level_total: profile.average_item_level ?? 0,
      },
      // Inactive character — no M+ or raid data
      mythic_plus_scores_by_season: [{ season: "current", scores: { all: 0, dps: 0, healer: 0, tank: 0 } }],
      mythic_plus_best_runs: [],
      mythic_plus_recent_runs: [],
      raid_progression: {},
    };
  } catch {
    return null;
  }
}
