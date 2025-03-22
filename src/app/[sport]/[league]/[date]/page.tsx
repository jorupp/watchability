import { Table, TableCell, TableRow } from "@/components/ui/table";
import { getScoreboard } from "@/services/espn";

const CalendarPage = async ({ params }: {params: Promise<{ sport: string, league: string, date: string }>}) => {
    const { sport, league, date } = await params;
    const scoreboard = await getScoreboard(sport, league, date);
    const events = scoreboard.events;
    return (
        <div>
            <h1>Calendar for {date}</h1>
            <Table>
                {events.map((event) => {
                    const t1 = event.competitions[0].competitors[1];
                    const t2 = event.competitions[0].competitors[0];
                    return (
                    <TableRow key={event.id}>
                        <TableCell>{event.shortName}</TableCell>
                        <TableCell>{t1.homeAway}: {t1.curatedRank.current} {t1.team.displayName}</TableCell>
                        <TableCell>{t2.homeAway}: {t2.curatedRank.current} {t2.team.displayName}</TableCell>
                    </TableRow>
                );
                    })}
            </Table>
            <pre>{JSON.stringify(events, null, 2)}</pre>
        </div>
    );
}

export default CalendarPage