export type WowRegion = "us" | "eu" | "kr" | "tw";

export interface RaiderIOProfile {
  name: string;
  race: string;
  class: string;
  active_spec_name: string;
  active_spec_role: string;
  gender: string;
  faction: string;
  thumbnail_url: string;
  region: string;
  realm: string;
  profile_url: string;
  achievement_points?: number;
  honorable_kills: number;
  gear: {
    item_level_equipped: number;
    item_level_total: number;
  };
  mythic_plus_scores_by_season: {
    season: string;
    scores: {
      all: number;
      dps: number;
      healer: number;
      tank: number;
    };
  }[];
  mythic_plus_best_runs?: {
    dungeon: string;
    short_name: string;
    mythic_level: number;
    num_keystone_upgrades: number;
    score: number;
  }[];
  mythic_plus_recent_runs?: {
    dungeon: string;
    short_name: string;
    mythic_level: number;
    num_keystone_upgrades: number;
    score: number;
  }[];
  raid_progression: {
    [raidSlug: string]: {
      summary: string;
      total_bosses: number;
      normal_bosses_killed: number;
      heroic_bosses_killed: number;
      mythic_bosses_killed: number;
    };
  };
}

export interface WCLRanking {
  encounterName: string;
  percentile: number;
  spec: string;
  amount: number;
  rank: number;
  outOf: number;
}

export interface RoastResponse {
  success: boolean;
  data?: {
    character: {
      name: string;
      realm: string;
      region: string;
      class: string;
      spec: string;
      race: string;
      faction: string;
      ilvl: number;
      thumbnailUrl: string;
      profileUrl: string;
      achievementPoints?: number;
      honorableKills: number;
    };
    mythicPlus: {
      score: number;
      bestRuns: { dungeon: string; level: number; upgrades: number }[];
      recentRuns: { dungeon: string; level: number; upgrades: number }[];
    };
    raidProgression: {
      raidName: string;
      summary: string;
      normalKilled: number;
      heroicKilled: number;
      mythicKilled: number;
      totalBosses: number;
    }[];
    wclRankings: WCLRanking[] | null;
    roast: string;
    roastTitle: string;
  };
  error?: string;
}
