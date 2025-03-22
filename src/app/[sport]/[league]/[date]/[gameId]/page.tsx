import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { analyzeGame } from "@/services/analysis";
import { getGame, getScoreboard } from "@/services/espn";

const GamePage = async ({ params }: {params: Promise<{ league: string, gameId: string }>}) => {
    const { league, gameId } = await params;
    const game = await getGame(league, gameId);
    const plays = game.page.content.gamepackage.plys;
    const analysis = analyzeGame(game);
    return (
        <>
            <pre>{JSON.stringify(analysis, null, 2)}</pre>
            <Table>
                <TableBody>
                    {plays.map((play) => {
                        return (
                            <TableRow key={play.id}>
                                <TableCell>P{play.prd} {play.clck}</TableCell>
                                <TableCell>{play.awyScr}</TableCell>
                                <TableCell>{play.hmScr}</TableCell>
                                <TableCell>{play.txt}</TableCell>
                                <TableCell>{play.team} {play.wnPrb}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {/* <pre>{JSON.stringify(plays, null, 2)}</pre> */}
        </>
    );
}

export default GamePage