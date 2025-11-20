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

export function CalendarTable({ sport, league, augmentedEvents, showDate }: { 
  sport: string, 
  league: string, 
  augmentedEvents: AugmentedEvent[], 
  showDate?: boolean 
}) {
    const [favoriteState, setFavoriteState] = useState(0); // Used to trigger re-sorting

    // Use useMemo to compute sorted events with favorite status
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const sortedEvents: SortedEvent[] = useMemo(() => {
        const favorites = getFavorites();
        
        // Map events to include favorite status
        const eventsWithFavorites = augmentedEvents.map(event => ({
            ...event,
            isFavorite: favorites.has(getFavoriteKey({ sport, league, eventId: event.id }))
        }));
        
        // Sort with favorites first
        return eventsWithFavorites.sort((a, b) => {
            // Favorites first
            if (a.isFavorite && !b.isFavorite) return -1;
            if (!a.isFavorite && b.isFavorite) return 1;
            
            // Otherwise maintain original order (by date)
            return a.date.localeCompare(b.date);
        });
    }, [augmentedEvents, sport, league, favoriteState]);

    const handleFavoriteToggle = (eventId: string) => {
        toggleFavorite({ sport, league, eventId });
        // Increment state to trigger re-sorting
        setFavoriteState(prev => prev + 1);
    };

    return (
        <TooltipProvider>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead>Start Time</TableHead>
                        <TableHead>Network</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>R</TableHead>
                        <TableHead>Home</TableHead>
                        <TableHead>Away</TableHead>
                        <TableHead>Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedEvents.map((event) => {
                        const t1 = event.competitions[0].competitors[1];
                        const t2 = event.competitions[0].competitors[0];
                        const date = new Date(event.date);
                        return (
                            <TableRow key={event.id}>
                                <TableCell>
                                    <FavoriteButton 
                                        isFavorite={event.isFavorite}
                                        onToggle={() => handleFavoriteToggle(event.id)}
                                    />
                                </TableCell>
                                <TableCell>{showDate && date.toLocaleDateString()} {date.toLocaleTimeString()}</TableCell>
                                <TableCell>{event.competitions[0]?.broadcast}</TableCell>
                                <TableCell><Link href={`/${sport}/${league}/${event.id}`} className="text-blue-500 hover:underline">{event.shortName}</Link></TableCell>
                                <TableCell>
                                    {t1.curatedRank.current < 99 && t2.curatedRank.current < 99 ? (
                                        <span className="font-bold">{t1.curatedRank.current + t2.curatedRank.current}</span>
                                    ) : null}
                                </TableCell>
                                <TableCell>{t1.homeAway}: {t1.curatedRank.current < 99 ? <b>{t1.curatedRank.current}</b> : null} {t1.team.displayName}</TableCell>
                                <TableCell>{t2.homeAway}: {t2.curatedRank.current < 99 ? <b>{t2.curatedRank.current}</b> : null} {t2.team.displayName}</TableCell>
                                <TableCell className="text-right">
                                    {event.analysisScore ? (
                                        <Tooltip>
                                            <TooltipTrigger>
                                                {/* cap at 100 to avoid giving away whether there are multiple factors at play and, how extreme any comeback is, or how late it will be */}
                                                {Math.min(100, event.analysisScore).toFixed(2)}
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <pre>{JSON.stringify(event.analysisRaw, null, 2)}</pre>
                                            </TooltipContent>
                                        </Tooltip>
                                    ) : event.gamePredictor ? (
                                        <>PG: {(Math.min(...(event.gamePredictor.map((i: { percentage: number }) => i.percentage) || []))*2).toFixed(0)}</>
                                    ) : null}
                                </TableCell>
                                <TableCell>
                                    {event.analysisScore && event.analysisHistogram ? (
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <ChartColumn className="h-4 mt-1" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Win Probability Histogram:</p>
                                            <div className="flex align-items-center justify-between text-xs">
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
        </TooltipProvider>
    );
}
