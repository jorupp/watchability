'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { Chart } from "../app/[sport]/[league]/chart";
import { ChartColumn } from "lucide-react";
import { useState, useEffect } from "react";
import { FavoriteButton } from "@/components/favoriteButton";
import { getFavoriteKey, getFavorites } from "@/lib/favorites";

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

interface Analysis {
  score: number;
  winProbHistogram: number[];
}

interface Game {
  page?: {
    content?: {
      gamepackage?: {
        mtchpPrdctr?: {
          teams: Array<{ percentage: number }>;
        };
      };
    };
  };
}

interface AugmentedEvent {
  id: string;
  date: string;
  shortName: string;
  competitions: Competition[];
  analysis?: Analysis | null;
  game?: Game;
}

export function CalendarTable({ sport, league, augmentedEvents, showDate }: { 
  sport: string, 
  league: string, 
  augmentedEvents: AugmentedEvent[], 
  showDate?: boolean 
}) {
    const [sortedEvents, setSortedEvents] = useState(augmentedEvents);

    useEffect(() => {
        // Sort events with favorites first
        const favorites = getFavorites();
        const sorted = [...augmentedEvents].sort((a, b) => {
            const aKey = getFavoriteKey({ sport, league, eventId: a.id });
            const bKey = getFavoriteKey({ sport, league, eventId: b.id });
            const aFav = favorites.has(aKey);
            const bFav = favorites.has(bKey);
            
            // Favorites first
            if (aFav && !bFav) return -1;
            if (!aFav && bFav) return 1;
            
            // Otherwise maintain original order (by date)
            return a.date.localeCompare(b.date);
        });
        setSortedEvents(sorted);
    }, [augmentedEvents, sport, league]);

    const handleFavoriteToggle = () => {
        // Re-sort when a favorite is toggled
        const favorites = getFavorites();
        const sorted = [...sortedEvents].sort((a, b) => {
            const aKey = getFavoriteKey({ sport, league, eventId: a.id });
            const bKey = getFavoriteKey({ sport, league, eventId: b.id });
            const aFav = favorites.has(aKey);
            const bFav = favorites.has(bKey);
            
            // Favorites first
            if (aFav && !bFav) return -1;
            if (!aFav && bFav) return 1;
            
            // Otherwise maintain original order (by date)
            return a.date.localeCompare(b.date);
        });
        setSortedEvents(sorted);
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
                                        sport={sport} 
                                        league={league} 
                                        eventId={event.id}
                                        onToggle={handleFavoriteToggle}
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
                                    {event.analysis ? (
                                        <Tooltip>
                                            <TooltipTrigger>
                                                {/* cap at 100 to avoid giving away whether there are multiple factors at play and, how extreme any comeback is, or how late it will be */}
                                                {Math.min(100, event.analysis.score).toFixed(2)}
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <pre>{JSON.stringify(event.analysis, null, 2)}</pre>
                                            </TooltipContent>
                                        </Tooltip>
                                    ) : event.game ? (
                                        <>PG: {(Math.min(...(event.game.page?.content?.gamepackage?.mtchpPrdctr?.teams.map((i: { percentage: number }) => i.percentage) || []))*2).toFixed(0)}</>
                                    ) : null}
                                </TableCell>
                                <TableCell>
                                    {event.analysis ? (
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
                                            <Chart winProbHistogram={event.analysis.winProbHistogram} />
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
