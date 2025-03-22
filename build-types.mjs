import JsonToTS from 'json-to-ts';
import { writeFile } from 'fs/promises';

const files = {
    'src/types/scoreboard.d.ts': 'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard',
}

for (const [file, url] of Object.entries(files)) {
    const response = await fetch(url);
    const json = await response.json();
    const typeInterface = JsonToTS(json);
    await writeFile(file, typeInterface.map(i => `export ${i}`).join('\n'));
    console.log(`Wrote ${file}`);
}