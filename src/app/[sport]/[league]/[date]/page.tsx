import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { analyzeGame } from "@/services/analysis";
import { getGame, getScoreboard } from "@/services/espn";
import Link from "next/link";

const CalendarPage = async ({ params }: {params: Promise<{ sport: string, league: string, date: string }>}) => {
    const { sport, league, date } = await params;
    const scoreboard = await getScoreboard(sport, league, date);
    const events = scoreboard.events.sort((a, b) => a.date.localeCompare(b.date));
    const augmentedEvents = await Promise.all(events.map(async (event) => {
        const game = await getGame(league, event.id);
        const analysis = analyzeGame(game);
        return {
            ...event,
            analysis,
        };
    }));
    return (
        <TooltipProvider>
        <div>
            <h1>Calendar for {date}</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Home</TableHead>
                        <TableHead>Away</TableHead>
                        <TableHead>Score</TableHead>
                        {/* <TableHead>Analysis</TableHead> */}
                        {/* {Object.keys(augmentedEvents[0].analysis).map((key) => (
                            <TableHead key={key}>{key}</TableHead>
                        ))} */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {augmentedEvents.map((event) => {
                        const t1 = event.competitions[0].competitors[1];
                        const t2 = event.competitions[0].competitors[0];
                        const date = new Date(event.date);
                        return (
                            <TableRow key={event.id}>
                                <TableCell>{date.toLocaleTimeString()}</TableCell>
                                <TableCell><Link href={`/${sport}/${league}/${date}/${event.id}`} className="text-blue-500 hover:underline">{event.shortName}</Link></TableCell>
                                <TableCell>{t1.homeAway}: {t1.curatedRank.current} {t1.team.displayName}</TableCell>
                                <TableCell>{t2.homeAway}: {t2.curatedRank.current} {t2.team.displayName}</TableCell>
                                <TableCell>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            {/* cap at 80 to avoid giving away whether there are multiple factors at play and, how extreme any comeback is, or how late it will be */}
                                            {Math.min(80, event.analysis.score).toFixed(2)}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <pre>{JSON.stringify(event.analysis, null, 2)}</pre>
                                        </TooltipContent>
                                    </Tooltip>
                                </TableCell>
                                {/* <TableCell>{event.analysis.avgChangePerPlay.toFixed(2)}</TableCell> */}
                                {/* <TableCell>{event.analysis.maxLoserWPAfter90Pct.toFixed(0)}</TableCell> */}
                                {/* <TableCell><pre>{JSON.stringify(event.analysis, null, 2)}</pre></TableCell> */}
                                {/* {Object.entries(event.analysis).map(([key, value]) => (
                                    <TableCell key={key}>{
                                        typeof value === 'number'
                                            ? (value as number).toFixed(key === 'avgChangePerPlay' ? 2 : 0)
                                            : Array.isArray(value)
                                                ? value.map(i => (i as number).toFixed(0)).join(', ')
                                                : JSON.stringify(value, null, 2)
                                    }</TableCell>
                                ))} */}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {/* <pre>{JSON.stringify(events, null, 2)}</pre> */}
        </div>
        </TooltipProvider>
    );
}

export default CalendarPage