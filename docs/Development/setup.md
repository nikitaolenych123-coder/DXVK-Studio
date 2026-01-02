# Development Setup

## Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Windows**: 10 or 11
- **GPU**: Vulkan-capable graphics card

---

## Quick Start

```bash
# Clone repository
git clone <repo-url>
cd dxvk-studio

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## Available Commands

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start Vite dev server with Electron    |
| `npm run build`   | Production build with electron-builder |
| `npm run preview` | Preview production build               |
| `npm run lint`    | Run ESLint                             |

---

## Windows Build (GitHub Actions)

DXVK Studio is Windows-first; the Windows installer/portable builds are produced on GitHub Actions using `windows-latest`.

1. Open the repo on GitHub → **Actions** tab
2. Select **Windows Build**
3. Click **Run workflow**
4. Open the completed run → download the artifact **dxvk-studio-windows-<sha>**

The artifact contains the Windows `.exe` outputs from the `release/` folder.

---

## Project Structure

```
dxvk-studio/
├── electron/              # Electron main process
│   ├── main.ts           # App lifecycle, IPC handlers
│   ├── preload.ts        # Context bridge
│   └── services/         # Core services
│       ├── steam-scanner.ts
│       ├── pe-analyzer.ts
│       ├── engine-manager.ts
│       └── deployer.ts
├── src/                   # React renderer
│   ├── App.tsx           # Main component
│   ├── shared/types.ts   # Shared types
│   └── index.css         # TailwindCSS
├── docs/                  # Documentation
│   ├── Features/
│   ├── ADR/
│   ├── Testing/
│   └── templates/
└── AGENTS.md             # AI agent rules
```

---

## Development Workflow

1. **Before coding**: Check `AGENTS.md` and relevant docs
2. **Create feature doc** in `docs/Features/` if new feature
3. **Implement** with tests
4. **Run build**: `npm run build`
5. **Update docs** if behaviour changed

---

## Environment Variables

| Variable              | Purpose                             | Default |
| --------------------- | ----------------------------------- | ------- |
| `VITE_DEV_SERVER_URL` | Vite dev server (set automatically) | -       |

---

## Debugging

### Main Process

- DevTools opens automatically in dev mode
- Console logs appear in terminal

### Renderer Process

- Use Chrome DevTools (Ctrl+Shift+I)
- React DevTools available if installed

---

## Common Issues

### Steam not detected

- Ensure Steam is installed in a standard location
- Check `C:\Program Files (x86)\Steam`

### Build fails

- Delete `node_modules` and `npm install`
- Clear `dist-electron` folder
