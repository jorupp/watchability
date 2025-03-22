import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
                        return (
                            <TableRow key={event.id}>
                                <TableCell><Link href={`/${sport}/${league}/${date}/${event.id}`}>{event.shortName}</Link></TableCell>
                                <TableCell>{t1.homeAway}: {t1.curatedRank.current} {t1.team.displayName}</TableCell>
                                <TableCell>{t2.homeAway}: {t2.curatedRank.current} {t2.team.displayName}</TableCell>
                                <TableCell>{event.analysis.score.toFixed(2)}</TableCell>
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
            <pre>{JSON.stringify(events, null, 2)}</pre>
        </div>
    );
}

export default CalendarPage