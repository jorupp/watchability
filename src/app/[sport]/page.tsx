import { getLeagues } from "@/services/espn";
import Link from "next/link";

const SportPage = async ({ params }: {params: Promise<{ sport: string }>}) => {
    const { sport } = await params;
    const leagues = await getLeagues(sport);
    return (
        <div>
            <h1>Leagues</h1>
            <ul>
                {leagues.map((league) => (
                    <li key={league}>
                        <Link href={`/${sport}/${league}`} className="text-blue-500 hover:underline">{league}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SportPage