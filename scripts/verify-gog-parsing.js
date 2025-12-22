const assert = require('assert');

// Mock Data
const MOCK_REG_LIST = `
HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\GOG.com\\Games\\100
HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\GOG.com\\Games\\200
`;

const MOCK_GAME_100 = `
    path    REG_SZ    C:\\Games\\Witcher 3
    exe     REG_SZ    bin\\x64\\witcher3.exe
    gameName REG_SZ   The Witcher 3: Wild Hunt
`;

const MOCK_GAME_200 = `
    path    REG_SZ    C:\\Games\\Cyberpunk 2077
    exe     REG_SZ    bin\\x64\\Cyberpunk2077.exe
    displayName REG_SZ Cyberpunk 2077
`;

// Logic to test (Copied/Adapted from gog-scanner.ts)
async function parseMockData() {
  const games = [];
  const lines = MOCK_REG_LIST.split('\n').filter(line => line.trim().length > 0);
  const gameKeys = lines.filter(line => line.includes('GOG.com\\Games\\'));

  console.log(`Found ${gameKeys.length} keys`);

  for (const key of gameKeys) {
    const gameId = key.split('\\').pop().trim();

    // Mock "exec" result based on gameId
    let details = '';
    if (gameId === '100') details = MOCK_GAME_100;
    if (gameId === '200') details = MOCK_GAME_200;

    const pathMatch = details.match(/\s+path\s+REG_SZ\s+(.+)/i);
    const exeMatch = details.match(/\s+exe\s+REG_SZ\s+(.+)/i);
    const nameMatch = details.match(/\s+gameName\s+REG_SZ\s+(.+)/i) || details.match(/\s+displayName\s+REG_SZ\s+(.+)/i);

    if (pathMatch && exeMatch) {
      const installDir = pathMatch[1].trim();
      const exePath = `${installDir}\\${exeMatch[1].trim()}`; // Mock join
      const name = nameMatch ? nameMatch[1].trim() : `GOG Game ${gameId}`;

      // Mock existsSync = true
      games.push({
        id: `gog-${gameId}`,
        name,
        path: installDir,
        executable: exePath,
        platform: 'gog'
      });
    }
  }
  return games;
}

// Run Test
parseMockData().then(games => {
  console.log('Parsed Games:', games);

  assert.strictEqual(games.length, 2, 'Should find 2 games');
  assert.strictEqual(games[0].name, 'The Witcher 3: Wild Hunt');
  assert.strictEqual(games[0].executable, 'C:\\Games\\Witcher 3\\bin\\x64\\witcher3.exe');
  assert.strictEqual(games[1].name, 'Cyberpunk 2077');

  console.log('✅ GOG Verification Passed');
}).catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
