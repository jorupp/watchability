import { getSports } from "@/services/espn";
import Link from "next/link";

const RootPage = async () => {
    const sports = await getSports();
    return (
        <div>
            <h1>Sports</h1>
            <ul>
                {sports.map((sport) => (
                    <li key={sport}>
                        <Link href={`/${sport}`} className="text-blue-500 hover:underline">{sport}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RootPage