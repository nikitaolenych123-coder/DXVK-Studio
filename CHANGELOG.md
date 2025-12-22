# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-23

### Added
- **Game Library**
  - Steam library auto-scanning
  - GOG Galaxy integration
  - Epic Games Store integration
  - Manual game addition with smart name parsing
  - PE header analysis (32/64-bit detection)
  - Steam metadata fetching for cover art

- **DXVK Management**
  - Support for Official, GPL Async, and NVAPI forks
  - Dynamic version dropdown from GitHub/GitLab APIs
  - One-click installation with backup
  - Uninstallation with original file restore
  - `dxvk.conf` configuration editor
  - Manifest tracking for installed versions

- **Engine Manager**
  - Pre-download DXVK versions
  - Cache management with size tracking
  - Clear all cache functionality
  - Grouped display by fork
  - Download progress indicators

- **Anti-Cheat Detection**
  - Automatic scanning for anti-cheat software
  - Risk level assessment (high/medium/low)
  - User override option with confirmation

- **Settings & Logs**
  - Default fork preference
  - Data management (clear library, open cache folder)
  - Activity logging with export
  - Log level filtering

- **UI/UX**
  - macOS 26 Tahoe-inspired design system
  - Glassmorphism and dark mode
  - Context menus on game cards
  - Real-time notifications

### Technical
- Electron 33 + React 18 + TypeScript
- TailwindCSS for styling
- Vitest for testing
- Windows-first development focus
