# Changelog

All notable changes to Devicely will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.4.4] - 2026-10-29

### Fixed
- **No crash without libimobiledevice**: `devicely start` and `devicely list` no longer die with `spawn idevice_id ENOENT` on Android-only Macs and Linux
- **AI keys in the `.env` template**: it now uses the names Devicely reads (`GEMINI_API_KEY`, `CLAUDE_API_KEY`), commented out; an empty line in `.env` no longer wipes a key exported in your shell
- **Running the CLI from a git checkout** no longer moves or deletes the repo's `.env`; old `.env` files are never deleted, only locked to your user
- **First Android connect no longer freezes Devicely**: installing the automation server runs in the background with a 60-second limit, and "Install via USB" being off is named with the fix
- **Port already in use**: a clear message, and "Devicely is already running" (with the link) when it is
- **Hosted UI on Chrome**: the Private Network Access preflight now gets the header Chrome needs
- **Setup checklist**: no more false passes for macOS's `xcodebuild`/`python3` placeholders, and no "Install developer tools" pop-ups on Macs without them
- **iPhones on iOS 15 and 16** can run WebDriverAgent; a missing `iproxy` is reported at once with the install command
- **`xcrun xctrace` can no longer hang device refresh**
- **"Continue anyway" without adb** points back to installing adb instead of waiting forever
- **AI without a key** says so at once, instead of after reading the screen
- **MCP token**: a data folder you can't write (e.g. after `sudo npm i -g`) is reported with the `chown` fix
- **QR mobile connect** uses the port Devicely actually started on and explains when it needs `--host 0.0.0.0`

### Changed
- **New landing page** at devicely-ai.vercel.app; the Command Center is at `/app` (existing users and `devicely start` go straight to it)
- **`devicely list` is read-only** and says what each status means (ready, connected, needs setup)
- **First `devicely start`** prints the getting-started steps (npm hides install-script output)
- **Opens Chrome, Edge or Firefox** when Safari is the default browser and one is installed
- The UI shows a recovery screen instead of a blank page after an error, and Settings show the server's error message
- `devicely` checks for Node.js 20.9+ up front and prints how to upgrade
- multer 2.x (the install no longer warns about vulnerabilities)

## [2.4.1] - 2026-10-17

### Fixed
- **Replaying flows that name apps**: flows saved from an AI plan or over MCP (`launch settings`) failed to launch on replay; app names now resolve to app IDs, and a launch only passes once the app is in the foreground
- **Honest replay results**: a run with failed steps is reported as finished with failures (log and progress card), not as complete or passed
- **Replay dialog** listed no devices ("No devices are connected") while offering to replay on all of them
- **Your data now lives in `~/.devicely`**: installed copies wrote flows, logs and the `.env` with AI keys into the global `node_modules` folder, readable by other users. They are moved on first start, and the `.env` is locked to your user (0600)

## [2.4.0] - 2026-10-17

### Breaking
- **Node.js 20.9 or later is required** (was 18), for the patched `sharp` image library
- **MCP: `devicely_run_natural_language` is removed.** An MCP client is itself an AI, so it now plans the steps with `devicely_snapshot`, the action tools and `devicely_run_commands`. The server sends those instructions to every client when it connects. Natural language stays in the Devicely UI.
- **Cohere and Mistral are no longer AI providers.** Remaining: OpenAI, Gemini, Claude, Copilot, Groq and local Ollama.

### Added
- **Grounded AI commands**: the AI reads the target device's screen before planning, so it taps elements that are really there. Plans can be previewed before they run, stop at the first failed step, and wait for each element to appear instead of using fixed delays.
- **Flows**: Recordings are now called Flows across the app
- **Redesigned UI**: Command Center, device panels, Apps, Locators, Flows, Screenshot and Settings, plus a compact command bar, swipe controls for all targeted devices, an immersive full-screen mode and touch feedback on the commander only
- **AI provider check**: Test connection in Settings sends a real request and reports what failed
- **Test export**: Maestro, Appium (Python and Java) and WebdriverIO from a saved flow
- **iOS tunnel support** for newer iOS versions, and a guide to setting up WebDriverAgent
- **Backend offline screen** and clearer connection diagnostics in the UI

### Changed
- AI conversion runs at temperature 0, uses only the provider you chose (no silent fallback), and handles reasoning models (Gemini 3.x, Groq gpt-oss and Qwen) without cutting their answers short
- Updated model lists: Gemini 3.8 / 3.7 Flash, Groq gpt-oss-120b / 20b and Qwen 3.8
- `.env` values now take precedence over variables already set in the shell
- The MCP server reports the real Devicely version

### Fixed
- iOS lock and unlock on iOS 26.6 and later
- Restart only marks a device as restarting once the restart command has succeeded
- "Launch X then search for Y" and similar sentences are no longer split into broken commands
- Locators from iOS devices now appear in the Locators panel
- The published backend no longer carries an MIT licence file; the whole package is UNLICENSED, All Rights Reserved

### Security
- Fixed all known vulnerabilities in runtime dependencies (`npm audit`: 0), including `proxy-addr`, `axios`, `ws` and `path-to-regexp`
- The pre-publish check now also rejects open-source licences in nested `package.json` files

## [2.3.5] - 2026-10-10

### Security
- npm publishes without obfuscation and encryption are blocked, and source maps are no longer shipped

## [2.3.4] - 2026-10-01

### Added
- **MCP server and REST API**: 30 tools, the `smoke_test` / `reproduce_bug` / `write_test` prompts, and `devicely://` resources over stdio and Streamable HTTP (`/mcp`), plus a Bearer-token REST API at `/api/v1`
- **MCP safety policy**: destructive tools off by default, per-device allow list, per-tool disable, redaction, and an audit log
- **`devicely mcp` CLI**: `doctor`, `token [--rotate]` and `install <client>` for Claude Code, Claude Desktop, Cursor, VS Code, Windsurf and Gemini
- **Virtual devices**: Android emulators and iOS simulators from the UI, the CLI (`devicely emulators`, `start --launch`) and MCP
- **Recordings revamp**: locator-based steps, 10 s auto-wait with coordinate fallback, list and grid views, a details drawer and a step editor
- **Device health monitoring** with automatic reconnect (`DEVICELY_AUTO_RECONNECT=0` to disable)
- **iOS MJPEG mirroring** through WebDriverAgent, with a dedicated WDA port per device
- **Passcode support**: set a PIN on Android over ADB; guided manual steps on iOS

### Fixed
- Mirroring stops and the target list updates when a device disconnects
- Custom WDA ports now take effect on iOS simulators

## [2.3.0] - 2026-09-07

### Added
- **🎯 QR-Based Device Enrollment** (NEW): Scan QR code to instantly enroll iOS and Android devices
  - Automatic IP address detection and configuration
  - Works seamlessly with both USB and wireless connections
  - WebDriverAgent auto-detection for iOS devices
  - Automatic ADB setup for Android with privacy controls
- **📡 Enhanced Wireless Connectivity**
  - Improved WDA API for all devices
  - Element caching for faster command execution  
  - Better session management and retry logic
  - Wireless connection stability improvements
- **🤖 Updated AI Provider Support**
  - Latest OpenAI models: GPT-4o (August 2024)
  - Latest Google Gemini: 1.5 Pro/Flash with 2M context windows
  - Latest Claude: 3.5 Sonnet (October 2024) with computer use capabilities
  - Latest Groq: Llama 3.3 70B with ultra-fast LPU inference
  - Latest Cohere: Command R+ with 128K context
  - Latest Mistral: Mistral Large 2
  - Latest GitHub: Copilot integration
- **📚 API-Only AI Mode**: No local models required - optimized for speed and reliability

### Changed
- Reorganized repository structure for better maintainability
- Moved shell scripts to `scripts/old/` directory for archival
- Consolidated documentation into `docs/` folder
- Updated license to MIT
- Improved build and deployment guides
- Enhanced error messages for wireless device connections

### Fixed
- Commander Mode WDA API compatibility with all iOS versions
- Device configuration file handling with QR enrollment
- Wireless connectivity edge cases
- AI provider model version accuracy

### Removed
- Obsolete package protection files
- Deprecated protection guides
- Old debug scripts

### Deprecated
- Local mobile agent apps support (moved to v2.4.0 roadmap)
- Manual IP configuration (use QR enrollment instead)

---

## [1.0.8] - 2026-02-07

### Fixed
- **Android Emulator Support**: Fixed environment variable passing to scripts
- Android commands now work correctly on emulators and physical devices
- Scripts now properly inherit TMPDIR and other environment variables

### Changed
- Further reduced verbose logging
- Better error messages when Android commands fail
- Cleaner production output

## [1.0.7] - 2026-02-07

### Changed
- **Ultra-Quiet Mode**: Removed ALL verbose logging from production
- Device connection logs now hidden (debug mode only)
- Script execution logs hidden (debug mode only)
- WebSocket messages hidden (debug mode only)
- Only shows final command results: success/failure summary
- **Professional, production-ready output**

### Output
**Production Mode (default):**
```
ExecuteCommand summary: 2 succeeded, 0 failed
✅ [iPhone17] Command completed successfully
✅ [Pixel Tablet] Command completed successfully
```

**Debug Mode** (set `DEBUG=true` in .env for troubleshooting)

## [1.0.6] - 2026-02-07

### Changed
- **Production Mode**: Significantly reduced console logging
- Script output no longer shown in terminal (only success/failure)
- Cleaner, professional terminal output for production use
- Debug mode available by setting `DEBUG=true` in .env

### Note
This is the production-ready build with minimal logging. For verbose logs:
```bash
# Add to .env
DEBUG=true
```

## [1.0.5] - 2026-02-07

### Security ⚠️
- **CRITICAL**: Removed sensitive device data from package
- Removed real device UDIDs from all configuration files
- Removed API keys from distribution
- Removed screenshots containing device information
- Sanitized IP addresses to example values (192.168.1.x)
- Updated all example UDIDs to generic values

### Changed
- All device examples now use sanitized, non-real data
- Configuration templates use placeholder values
- v1.0.1 - v1.0.4 deprecated due to sensitive data exposure

### Note
If you installed v1.0.1-v1.0.4, please upgrade immediately:
```bash
npm install -g devicely@latest
```

## [1.0.4] - 2026-02-07

### Changed
- Reduced verbose logging output significantly
- Added DEBUG mode (set `DEBUG=true` in .env for verbose logs)
- Cleaner console output - only shows success/error messages
- Improved user experience with minimal, actionable feedback

### Added
- Smart logging system with debug/info/error levels
- Only critical messages shown by default

## [1.0.3] - 2026-02-07

### Fixed
- Fixed shell script path resolution in npm package installation
- Scripts now correctly resolve to compiled binaries without .sh extension
- Android and iOS device commands now work properly after global installation

## [1.0.2] - 2026-02-07

### Changed
- Removed unnecessary console log message on version command
- Cleaner CLI output for better user experience

## [1.0.1] - 2026-02-07

### Added
- Initial npm package release
- AI-powered mobile automation for iOS and Android
- Support for 7 AI providers (OpenAI, Google Gemini, Anthropic Claude, GitHub Copilot, Groq, Cohere, Mistral AI)
- Voice control with real-time transcription
- Smart UI inspector for element discovery
- Recording and replay functionality
- Multi-device parallel execution
- Cross-platform support (macOS, Linux)
- WebSocket-based live feedback
- Secure API key management
- Natural language command processing
- Device detection and connection management

### Features
- **CLI Commands:**
  - `devicely start` - Launch the web interface
  - `devicely doctor` - System diagnostics
  - `devicely connect` - Device connection wizard
  - `devicely --version` - Show version
  - `devicely --help` - Display help

- **AI Integration:**
  - Multiple AI provider support with fallback
  - Model selection per provider
  - Smart error handling and retry logic
  - Context-aware command processing

- **Device Management:**
  - USB and wireless device connections
  - iOS (14+) and Android (5+) support
  - WebDriverAgent automation for iOS
  - UIAutomator2 automation for Android
  - Multi-device orchestration

- **Web Interface:**
  - Modern, responsive UI
  - Real-time device status
  - Live command execution feedback
  - Voice input with silence detection
  - Recording editor
  - AI provider configuration

### Security
- Code obfuscation for JavaScript files
- Shell scripts compiled to binaries
- Secure credential storage
- No sensitive data in distribution

## [1.0.0] - 2026-02-07

### Added
- Initial development release (not published)
- Core architecture and features developed
- Testing and validation completed
