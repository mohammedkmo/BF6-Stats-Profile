export interface UserAvatar {
  small: string;
  medium: string;
  large: string;
}

export interface ImageAsset {
  type: string;
  name: string;
  description: string | null;
  alternateText: string;
  ar1X1: string;
  ar2X1: string;
  ar2X3: string;
  ar3X1: string;
  ar3X4: string;
  ar4X3: string;
  ar9X16: string;
  ar16X9: string;
}

export interface GameMode {
  id: string;
  name: string;
  description: string;
  image: ImageAsset;
  icon: ImageAsset;
}

export interface PlayerRole {
  id: string;
  name: string;
  description: string;
  image: ImageAsset;
  icon: ImageAsset;
}

export interface StatIcon {
  type: string;
  name: string;
  description: string | null;
  alternateText: string;
  ar1X1: string;
  ar2X1: string;
  ar2X3: string;
  ar3X1: string;
  ar3X4: string;
  ar4X3: string;
  ar9X16: string;
  ar16X9: string;
}

export interface Stat {
  id: string;
  name: string;
  icon: StatIcon | null;
  value: string;
  percentile_rank?: number | null;
}

export interface BasicStatsGroup {
  stats: Stat[];
  highlightedStats: Stat[];
}

export interface GameplayItem {
  id: string;
  name: string;
  image: ImageAsset;
}

export interface FeaturedStat {
  id: string;
  name: string;
  icon: StatIcon | null;
  value: string;
  gameplayItem: GameplayItem;
  isFeatured: boolean;
}

export interface ExtendedStat {
  id: string;
  name: string;
  icon: StatIcon | null;
  value: string;
}

export interface PlayerStatsSummary {
  playerTag: string;
  playerDisplayName: string;
  userAvatar: UserAvatar;
  gameMode: GameMode;
  playerRole: PlayerRole;
  shoutoutStat: any | null;
  basicStats: BasicStatsGroup[];
  gameModeStats: any[];
  extendedStats: ExtendedStat[];
  featuredStats: FeaturedStat[];
  achievementStats: (any | null)[];
  playerRoleStats: any[];
}

export interface PlayerStatsResponse {
  playerStatsSummary: PlayerStatsSummary;
}
