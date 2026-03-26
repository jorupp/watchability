'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { Chart } from "../app/[sport]/[league]/chart";
import { ChartColumn } from "lucide-react";
import { useState, useMemo } from "react";
import { FavoriteButton } from "@/components/favoriteButton";
import { getFavoriteKey, getFavorites, toggleFavorite } from "@/lib/favorites";

import { AnalysisResult } from "@/services/analysis";

interface Competitor {
  homeAway: string;
  curatedRank: {
    current: number;
  };
  team: {
    displayName: string;
  };
}

interface Competition {
  competitors: Competitor[];
  broadcast?: string;
}

interface AugmentedEvent {
  id: string;
  date: string;
  shortName: string;
  competitions: Competition[];
  gamePredictor?: Array<{ percentage: number }>;
  analysisScore?: number;
  analysisHistogram?: number[];
  analysisRaw?: AnalysisResult | null;
}

interface SortedEvent extends AugmentedEvent {
  isFavorite: boolean;
}

// Score thresholds for color-coding watchability scores
const SCORE_HIGH_THRESHOLD = 70;
const SCORE_MEDIUM_THRESHOLD = 40;
const SCORE_MAX = 100;

/**
 * Computes the "Game Predictor" score from team win percentages.
 * ESPN's game predictor gives each team a win probability; a close game (both near 50%)
 * yields a higher score. We take the minimum percentage × 2 so a perfectly even game → 100.
 */
function computeGamePredictorScore(predictor: Array<{ percentage: number }>): number {
  return Math.min(...predictor.map((i) => i.percentage)) * 2;
}

function ScoreDisplay({ event }: { event: AugmentedEvent }) {
  if (event.analysisScore) {
    const capped = Math.min(SCORE_MAX, event.analysisScore);
    // Color-code by score: green > high threshold, yellow > medium threshold, muted otherwise
    const colorClass = capped >= SCORE_HIGH_THRESHOLD
      ? 'text-green-400 font-semibold'
      : capped >= SCORE_MEDIUM_THRESHOLD
        ? 'text-yellow-400'
        : 'text-muted-foreground';
    return (
      <Tooltip>
        <TooltipTrigger>
          <span className={colorClass}>{capped.toFixed(1)}</span>
        </TooltipTrigger>
        <TooltipContent>
          <pre>{JSON.stringify(event.analysisRaw, null, 2)}</pre>
        </TooltipContent>
      </Tooltip>
    );
  }
  if (event.gamePredictor) {
    const pg = computeGamePredictorScore(event.gamePredictor).toFixed(0);
    return <span className="text-muted-foreground text-xs">PG:{pg}</span>;
  }
  return null;
}

export function CalendarTable({ sport, league, augmentedEvents, showDate }: { 
  sport: string, 
  league: string, 
  augmentedEvents: AugmentedEvent[], 
  showDate?: boolean 
}) {
    const [favoritesSet, setFavoritesSet] = useState(() => getFavorites());

    const sortedEvents: SortedEvent[] = useMemo(() => {
        const eventsWithFavorites = augmentedEvents.map(event => ({
            ...event,
            isFavorite: favoritesSet.has(getFavoriteKey({ sport, league, eventId: event.id }))
        }));
        
        // Sort with favorites first
        return eventsWithFavorites.sort((a, b) => {
            if (a.isFavorite && !b.isFavorite) return -1;
            if (!a.isFavorite && b.isFavorite) return 1;
            return a.date.localeCompare(b.date);
        });
    }, [augmentedEvents, sport, league, favoritesSet]);

    const handleFavoriteToggle = (eventId: string) => {
        toggleFavorite({ sport, league, eventId });
        setFavoritesSet(getFavorites());
    };

    return (
        <TooltipProvider>
            <div className="rounded-lg border border-border/50 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border/50 bg-muted/30 hover:bg-muted/30">
                            <TableHead className="w-8 px-2"></TableHead>
                            {showDate && <TableHead className="text-xs text-muted-foreground">Date/Time</TableHead>}
                            {!showDate && <TableHead className="text-xs text-muted-foreground">Time</TableHead>}
                            <TableHead className="text-xs text-muted-foreground">Network</TableHead>
                            <TableHead className="text-xs text-muted-foreground">Matchup</TableHead>
                            <TableHead className="text-xs text-muted-foreground text-center">Rnk</TableHead>
                            <TableHead className="text-xs text-muted-foreground">Home</TableHead>
                            <TableHead className="text-xs text-muted-foreground">Away</TableHead>
                            <TableHead className="text-xs text-muted-foreground text-right">Score</TableHead>
                            <TableHead className="text-xs text-muted-foreground w-8"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedEvents.map((event) => {
                            const t1 = event.competitions[0].competitors[1];
                            const t2 = event.competitions[0].competitors[0];
                            const date = new Date(event.date);
                            return (
                                <TableRow key={event.id} className={`border-border/30 ${event.isFavorite ? 'bg-primary/5' : ''}`}>
                                    <TableCell className="px-2 py-1.5">
                                        <FavoriteButton 
                                            isFavorite={event.isFavorite}
                                            onToggle={() => handleFavoriteToggle(event.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="py-1.5 text-xs text-muted-foreground whitespace-nowrap">
                                        {showDate && <span className="font-medium text-foreground">{date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} </span>}
                                        {date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                                    </TableCell>
                                    <TableCell className="py-1.5 text-xs text-muted-foreground">{event.competitions[0]?.broadcast}</TableCell>
                                    <TableCell className="py-1.5">
                                        <Link href={`/${sport}/${league}/${event.id}`} className="text-primary hover:underline font-medium text-sm">
                                            {event.shortName}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="py-1.5 text-center">
                                        {t1.curatedRank.current < 99 && t2.curatedRank.current < 99 ? (
                                            <span className="text-xs font-bold text-yellow-400">{t1.curatedRank.current + t2.curatedRank.current}</span>
                                        ) : null}
                                    </TableCell>
                                    <TableCell className="py-1.5 text-xs">
                                        <span className="text-muted-foreground">{t1.homeAway}: </span>
                                        {t1.curatedRank.current < 99 ? <span className="font-bold text-yellow-400 mr-1">#{t1.curatedRank.current}</span> : null}
                                        <span>{t1.team.displayName}</span>
                                    </TableCell>
                                    <TableCell className="py-1.5 text-xs">
                                        <span className="text-muted-foreground">{t2.homeAway}: </span>
                                        {t2.curatedRank.current < 99 ? <span className="font-bold text-yellow-400 mr-1">#{t2.curatedRank.current}</span> : null}
                                        <span>{t2.team.displayName}</span>
                                    </TableCell>
                                    <TableCell className="py-1.5 text-right">
                                        <ScoreDisplay event={event} />
                                    </TableCell>
                                    <TableCell className="py-1.5 px-2">
                                        {event.analysisScore && event.analysisHistogram ? (
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <ChartColumn className="h-4 mt-0.5 text-muted-foreground hover:text-primary transition-colors" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="text-xs mb-1">Win Probability Histogram:</p>
                                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                                    <p>50%</p>
                                                    <p>0%</p>
                                                </div>
                                                <Chart winProbHistogram={event.analysisHistogram} />
                                            </TooltipContent>
                                        </Tooltip>
                                    ) : null}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </TooltipProvider>
    );
}
