import JsonToTS from 'json-to-ts';
import { writeFile } from 'fs/promises';

const files = {
    'src/types/scoreboard.d.ts': 'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard',
}

{
    const file = 'src/types/game.d.ts';
    const response = await fetch('https://www.espn.com/mens-college-basketball/game/_/gameId/401745911');
    const html = await response.text();
    // scape the content out of the script tag in the page
    const match = html.match(/<script>window\['__CONFIG__'\]=.*;window\['__espnfitt__'\]=(.*?);<\/script>/);
    if (!match) {
        throw new Error('Could not find __CONFIG__');
    }

    const data = JSON.parse(match[1]);
    const typeInterface = JsonToTS(data);
    await writeFile(file, typeInterface.map(i => `export ${i}`).join('\n'));
    console.log(`Wrote ${file}`);
}

for (const [file, url] of Object.entries(files)) {
    const response = await fetch(url);
    const json = await response.json();
    const typeInterface = JsonToTS(json);
    await writeFile(file, typeInterface.map(i => `export ${i}`).join('\n'));
    console.log(`Wrote ${file}`);
}
