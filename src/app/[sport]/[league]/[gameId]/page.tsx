import { Debug } from "@/components/ui/debug";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { analyzeGame } from "@/services/analysis";
import { getGame, getGameUrl } from "@/services/espn";
import Link from "next/link";
import { ExternalLink, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GamePage = async ({ params }: {params: Promise<{ sport?: string, league: string, gameId: string }>}) => {
    const { sport, league, gameId } = await params;
    const game = await getGame(league, gameId);
    const plays = game.page.content.gamepackage.plys;
    const analysis = analyzeGame(game, gameId);
    const teams = game?.page?.content?.gamepackage?.mtchpPrdctr?.teams;
    const sportPath = sport ?? '';

    return (
        <div className="space-y-4">
            <div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                    {sportPath && <>
                        <Link href="/" className="hover:text-primary transition-colors">Sports</Link>
                        <ChevronRight className="h-3 w-3" />
                        <Link href={`/${sportPath}`} className="hover:text-primary transition-colors capitalize">{sportPath}</Link>
                        <ChevronRight className="h-3 w-3" />
                    </>}
                    <Link href={`/${sportPath}/${league}`} className="hover:text-primary transition-colors uppercase">{league}</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-foreground">Game {gameId}</span>
                </div>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold tracking-tight">Game Details</h1>
                    <Link href={getGameUrl(league, gameId)} className="inline-flex items-center gap-1 text-sm text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        ESPN <ExternalLink className="h-3 w-3" />
                    </Link>
                </div>
            </div>

            {teams && (
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Game Predictor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            {teams.map(({ percentage, team }: { percentage: number, team: { displayName?: string } }, i: number) => (
                                <div key={i} className="text-sm">
                                    <span className="text-muted-foreground">{team?.displayName ?? `Team ${i+1}`}: </span>
                                    <span className="font-semibold">{(percentage * 100).toFixed(1)}%</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {plays && plays.length > 0 && (
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Play-by-Play</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="rounded-b-xl overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-border/50 bg-muted/30 hover:bg-muted/30">
                                        <TableHead className="text-xs text-muted-foreground">Period</TableHead>
                                        <TableHead className="text-xs text-muted-foreground">Away</TableHead>
                                        <TableHead className="text-xs text-muted-foreground">Home</TableHead>
                                        <TableHead className="text-xs text-muted-foreground">Play</TableHead>
                                        <TableHead className="text-xs text-muted-foreground">Win Prob</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {plays?.map((play: { id: string, prd: number, clck: string, awyScr: number, hmScr: number, txt: string, team: string, wnPrb: number }) => {
                                        return (
                                            <TableRow key={play.id} className="border-border/30 text-xs">
                                                <TableCell className="py-1 font-mono text-muted-foreground">P{play.prd} {play.clck}</TableCell>
                                                <TableCell className="py-1 font-semibold">{play.awyScr}</TableCell>
                                                <TableCell className="py-1 font-semibold">{play.hmScr}</TableCell>
                                                <TableCell className="py-1">{play.txt}</TableCell>
                                                <TableCell className="py-1 font-mono text-muted-foreground">{play.team} {play.wnPrb}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <Debug data={analysis || 'no analysis available - check the game page'} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Raw Game Data</CardTitle>
                </CardHeader>
                <CardContent>
                    <Debug data={game || 'no game available - check the game page'} />
                </CardContent>
            </Card>
        </div>
    );
}

export default GamePage