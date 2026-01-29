"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "./stat-card";
import { FeaturedStatCard } from "./featured-stat-card";
import { ShotAccuracyCard } from "./shot-accuracy-card";
import { GameModeCard } from "./game-mode-card";
import { PlayerRoleCard } from "./player-role-card";
import { ShoutoutStatCard } from "./shoutout-stat-card";
import { Footer } from "./footer";
import { useTranslation } from "@/lib/use-translation";
import type { PlayerStatsSummary } from "@/types/player-stats";
import Image from "next/image";

interface PlayerProfileProps {
  stats: PlayerStatsSummary;
  coverImageUrl?: string;
}

export function PlayerProfile({ stats, coverImageUrl }: PlayerProfileProps) {
  const t = useTranslation();

  // Defensive check
  if (!stats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="text-center">
          <p className="text-zinc-400">Invalid player data</p>
        </div>
      </div>
    );
  }

  const {
    playerDisplayName,
    userAvatar,
    gameMode,
    playerRole,
    basicStats,
    featuredStats,
    extendedStats,
    shoutoutStat,
  } = stats;

  // Get all basic stats groups
  const overviewStats = basicStats[0]?.stats || [];
  const combatStats = basicStats[1]?.stats || [];
  const additionalStatsGroups = basicStats.slice(2) || [];
  const highlightedStat = basicStats[1]?.highlightedStats?.[0];

  // Extract shot accuracy if it exists
  const shotAccuracyStat =
    combatStats.find((stat) => stat.id === "shot_accuracy") ||
    highlightedStat?.id === "shot_accuracy"
      ? highlightedStat
      : null;
  const combatStatsWithoutAccuracy = combatStats.filter(
    (stat) => stat.id !== "shot_accuracy",
  );

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Cover Image Section */}
      {coverImageUrl && (
        <div className="relative h-64 w-full overflow-hidden sm:h-80">
          <Image
            src={coverImageUrl}
            alt={`${playerDisplayName} stats cover`}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
        </div>
      )}

      {/* Header Section */}
      <div className="relative -mt-25 md:mt-0">
        <div
          className={`container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${coverImageUrl ? "pt-8 pb-8" : "py-8"}`}
        >
          {/* Changed flex from sm:flex-row to always flex-col on mobile, flex-row only on sm+, with avatar centered via justify-center */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center gap-4 ${coverImageUrl ? "sm:-mt-20" : ""} items-center sm:items-center`}
          >
            <Avatar
              className={`relative z-10 rounded-3xl h-16 w-16 border-2 border-zinc-700/50 ring-2 ring-zinc-700/20 sm:h-20 sm:w-20`}
              // Center avatar on mobile
              style={{ marginLeft: 0, marginRight: 0 }}
            >
              <AvatarImage src={userAvatar.large} alt={playerDisplayName} />
              <AvatarFallback className="bg-zinc-800 text-lg font-bold text-red-500">
                {playerDisplayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div
              className={`text-center md:text-start ${coverImageUrl ? "sm:mt-2" : ""} w-full sm:w-auto`}
            >
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {playerDisplayName}
              </h1>
              <p className="text-sm font-medium text-zinc-400">
                @{stats.playerTag}
              </p>

              <div
                className={`mt-4 flex flex-wrap items-center gap-2 justify-center sm:justify-start`}
              >
                <Badge
                  variant="outline"
                  className="border-red-500/30 bg-red-500/10 px-2.5 py-0.5 text-xs font-semibold text-red-400"
                >
                  {gameMode.name}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-zinc-700 bg-zinc-800/50 px-2.5 py-0.5 text-xs font-semibold text-zinc-300"
                >
                  {playerRole.name}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Game Mode & Role Description */}
        <div className="mb-12 grid gap-4 md:grid-cols-2">
          <GameModeCard gameMode={gameMode} />
          <PlayerRoleCard playerRole={playerRole} />
        </div>

        {/* Shoutout Stat */}
        {shoutoutStat && (
          <div className="mb-12">
            <ShoutoutStatCard stat={shoutoutStat} />
          </div>
        )}

        {/* Featured Stats */}
        {featuredStats && featuredStats.length > 0 && (
          <div className="mb-12">
            <h2
              className={`mb-6 text-2xl font-semibold tracking-tight text-white`}
            >
              {t("section.featured")}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {featuredStats.map((stat, index) => (
                <div
                  key={stat.id}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <FeaturedStatCard stat={stat} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Overview Stats */}
        {overviewStats.length > 0 && (
          <div className="mb-12">
            <h2
              className={`mb-6 text-2xl font-semibold tracking-tight text-white`}
            >
              {t("section.overview")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {overviewStats.map((stat, index) => (
                <div
                  key={stat.id}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <StatCard stat={stat} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Combat Stats */}
        {(combatStats.length > 0 || shotAccuracyStat) && (
          <div className="mb-12">
            <h2
              className={`mb-6 text-2xl font-semibold tracking-tight text-white`}
            >
              {t("section.combat")}
            </h2>

            {/* Shot Accuracy - Prominent Display */}
            {shotAccuracyStat && (
              <div className="mb-6 animate-in fade-in slide-in-from-bottom-4">
                <ShotAccuracyCard stat={shotAccuracyStat} />
              </div>
            )}

            {/* Other Combat Stats */}
            {combatStatsWithoutAccuracy.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {combatStatsWithoutAccuracy.map((stat, index) => (
                  <div
                    key={stat.id}
                    className="animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <StatCard stat={stat} />
                  </div>
                ))}
              </div>
            )}

            {/* Other highlighted stat if not shot accuracy */}
            {highlightedStat && highlightedStat.id !== "shot_accuracy" && (
              <div
                className="mt-6 animate-in fade-in slide-in-from-bottom-4"
                style={{
                  animationDelay: `${combatStatsWithoutAccuracy.length * 50}ms`,
                }}
              >
                <StatCard stat={highlightedStat} highlighted />
              </div>
            )}
          </div>
        )}

        {/* Extended Stats */}
        {extendedStats && extendedStats.length > 0 && (
          <div className="mb-12">
            {extendedStats.map((stat, index) => (
              <div
                key={stat.id}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="p-4 min-h-52 flex flex-col items-center justify-center">
                  <h1 className="text-2xl font-semibold tracking-tight text-white">
                    {stat.name}
                  </h1>
                  <p className="text-6xl mt-2 font-bold text-red-500 font-mono">
                    {stat.value}
                  </p>

                  <Image
                    src={"/player.png"}
                    alt="Player"
                    width={1000}
                    height={1000}
                    className="w-2xl h-full object-cover -mb-16"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cover Image Section */}
        {coverImageUrl && (
          <div className="mb-12 rounded-2xl overflow-hidden">
            <Image
              src={coverImageUrl}
              alt={`${playerDisplayName} stats cover`}
              width={1000}
              height={1000}
              className="object-cover w-full"
              priority
              unoptimized
            />
          </div>
        )}

        {/* Additional Stats Groups */}
        {additionalStatsGroups.length > 0 &&
          additionalStatsGroups.map(
            (group, groupIndex) =>
              group.stats &&
              group.stats.length > 0 && (
                <div key={groupIndex} className="mb-12">
                  <h2
                    className={`mb-6 text-2xl font-semibold tracking-tight text-white`}
                  >
                    {t("section.additionalMetrics")}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.stats.map((stat, index) => (
                      <div
                        key={stat.id}
                        className="animate-in fade-in slide-in-from-bottom-4"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <StatCard stat={stat} />
                      </div>
                    ))}
                  </div>
                </div>
              ),
          )}
      </div>

      <Footer />
    </div>
  );
}
