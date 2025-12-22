# Testing Strategy

## Test Levels

| Level | Purpose | Location | Framework |
|-------|---------|----------|-----------|
| Unit | Pure functions, algorithms | `electron/services/__tests__/` | Vitest |
| Integration | Components with real services | `tests/integration/` | Vitest + Electron (planned) |
| E2E | Full user flows | `tests/e2e/` | Playwright (planned) |

---

## Current Test Coverage

> ✅ **Note**: Automated testing infrastructure is configured using Vitest.

### Manual Verification Checklist

#### Steam Library Scanning
- [x] Detects Steam installation (Automated)
- [x] Parses libraryfolders.vdf correctly (Automated)
- [x] Finds games in multiple library folders (Automated)
- [x] Returns correct game paths (Automated)

#### PE Analysis
- [x] Correctly identifies 32-bit executables (Automated)
- [x] Correctly identifies 64-bit executables (Automated)
- [x] Handles invalid PE files gracefully (Automated)
- [x] Filters out non-game executables (Automated)

#### DXVK Engine Management
- [x] Fetches releases from GitHub API (Automated)
- [x] Downloads tar.gz archives (Automated)
- [x] Extracts to correct cache directory (Automated)
- [x] Reports download progress (Automated)

#### Deployment
- [x] Backs up original DLLs (Automated)
- [x] Copies correct architecture DLLs (Automated)
- [x] Creates manifest file (Automated)
- [x] Uninstall restores originals (Automated)
- [x] Uninstall removes manifest (Automated)

---

## Test Commands

```bash
# Run all tests (when configured)
npm run test

# Run specific test file
npm run test -- path/to/test

# Run with coverage
npm run test -- --coverage
```

---

## Test Environment

### Requirements
- Node.js 18+
- Windows 10/11
- Steam installed (for integration tests)

### Setup
```bash
npm install
npm run dev  # Start dev server for manual testing
```

---

## Coverage Goals

| Area | Target | Current |
|------|--------|---------|
| Services | 80% | ~85% (47 tests) |
| IPC Handlers | 70% | 0% |
| React Components | 60% | 0% |

---

## Test Data

### Sample Games
Tests should use games that are:
- Free (for CI accessibility)
- Small download size
- Both 32-bit and 64-bit versions available

### Mock Data Location
`tests/fixtures/` (when created)
