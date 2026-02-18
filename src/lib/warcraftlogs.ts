import { WCLRanking } from "./types";

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getWCLAccessToken(): Promise<string | null> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const clientId = process.env.WCL_CLIENT_ID;
  const clientSecret = process.env.WCL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return null;
  }

  try {
    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    });

    const res = await fetch("https://www.warcraftlogs.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!res.ok) return null;

    const data = await res.json();
    cachedToken = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in - 60) * 1000,
    };
    return data.access_token;
  } catch (error) {
    console.error("[WCL] Token error:", error);
    return null;
  }
}

// Sanitize strings for GraphQL to prevent injection
function sanitizeGQLString(str: string): string {
  return str.replace(/[\\"]/g, "").replace(/[^\w\s'-àâäéèêëïîôùûüÿçæœ]/gi, "").trim();
}

export async function fetchWCLRankings(
  characterName: string,
  serverSlug: string,
  region: string
): Promise<WCLRanking[] | null> {
  const token = await getWCLAccessToken();
  if (!token) return null;

  const safeName = sanitizeGQLString(characterName);
  const safeServer = sanitizeGQLString(serverSlug);
  const safeRegion = sanitizeGQLString(region).substring(0, 2);

  if (!safeName || !safeServer || !safeRegion) return null;

  try {
    const query = `
      query($name: String!, $server: String!, $region: String!) {
        characterData {
          character(name: $name, serverSlug: $server, serverRegion: $region) {
            zoneRankings
          }
        }
      }
    `;

    const res = await fetch("https://www.warcraftlogs.com/api/v2/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { name: safeName, server: safeServer, region: safeRegion },
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();

    if (data.errors) {
      console.error("[WCL] GraphQL errors:", data.errors);
      return null;
    }

    const zoneRankings = data.data?.characterData?.character?.zoneRankings;
    if (!zoneRankings?.rankings) return [];

    return zoneRankings.rankings.map((r: any) => ({
      encounterName: r.encounter?.name ?? "Unknown",
      percentile: r.rankPercent ?? 0,
      spec: r.spec ?? "",
      amount: r.amount ?? 0,
      rank: r.rank ?? 0,
      outOf: r.outOf ?? 0,
    }));
  } catch (error) {
    console.error("[WCL] Rankings error:", error);
    return null;
  }
}
