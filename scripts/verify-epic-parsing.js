const assert = require('assert');

// Mock Data
const MOCK_MANIFEST = JSON.stringify({
  "FormatVersion": 0,
  "OptIn": false,
  "DisplayName": "Fortnite",
  "InstallLocation": "C:\\Program Files\\Epic Games\\Fortnite",
  "LaunchExecutable": "FortniteGame\\Binaries\\Win64\\FortniteLauncher.exe",
  "InstallationGuid": "12345"
});

// Logic to test (Adapted)
function parseMockManifest(content) {
  try {
    const manifest = JSON.parse(content);
    const { DisplayName, InstallLocation, LaunchExecutable } = manifest;

    if (DisplayName && InstallLocation && LaunchExecutable) {
      return {
        name: DisplayName,
        path: InstallLocation,
        executable: `${InstallLocation}\\${LaunchExecutable}` // Simple join
      };
    }
  } catch (e) {
    return null;
  }
}

// Run Test
console.log('Testing Epic Parsing...');
const result = parseMockManifest(MOCK_MANIFEST);

assert.ok(result, 'Should parse manifest');
assert.strictEqual(result.name, 'Fortnite');
assert.strictEqual(result.path, 'C:\\Program Files\\Epic Games\\Fortnite');
assert.strictEqual(result.executable, 'C:\\Program Files\\Epic Games\\Fortnite\\FortniteGame\\Binaries\\Win64\\FortniteLauncher.exe');

console.log('✅ Epic Verification Passed');
