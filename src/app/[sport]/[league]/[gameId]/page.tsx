import { Debug } from "@/components/ui/debug";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { analyzeGame } from "@/services/analysis";
import { getGame, getGameUrl } from "@/services/espn";
import Link from "next/link";

const GamePage = async ({ params }: {params: Promise<{ league: string, gameId: string }>}) => {
    const { league, gameId } = await params;
    const game = await getGame(league, gameId);
    const plays = game.page.content.gamepackage.plys;
    const analysis = analyzeGame(game, gameId);
    return (
        <>
            <Link href={getGameUrl(league, gameId)} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                ESPN game link
            </Link>
            <pre>
                {JSON.stringify(game?.page?.content?.gamepackage?.mtchpPrdctr?.teams.map(({ percentage, team}) => ({ percentage, team})))}
            </pre>
            <Debug data={analysis || 'no analysis available - check the game page'} />
            <Debug data={game || 'no game available - check the game page'} />
            <Table>
                <TableBody>
                    {plays?.map((play) => {
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