# Devicely plugin for Claude Code

Gives Claude Code hands on your real iPhones, iPads and Androids, and on simulators and emulators. Claude reads the screen, taps, types, swipes, launches apps and checks the result, on one device or on a whole fleet at once.

## Install

```
/plugin marketplace add sureshkumarm8/Devicely
/plugin install devicely@devicely
```

The plugin registers the Devicely MCP server (`npx -y devicely mcp`) and adds the `devicely` skill, which teaches Claude how to work with real devices: observe, act and verify every step, handle iOS and Android differences, drive several devices at once, and turn a session into a Maestro, Appium or WebdriverIO test. The server comes from the [`devicely` npm package](https://www.npmjs.com/package/devicely) and starts the local Devicely server automatically.

## Requirements

- macOS or Linux, Node.js 20.9+
- Android: `adb` on your `PATH`
- iPhone and iPad: a Mac with Xcode ([iOS setup](https://github.com/sureshkumarm8/Devicely#ios-setup))

Run `npx devicely doctor` to check your setup.

## Try

- "Open Maps on every device, search Eiffel Tower and verify the result."
- "Find the Login button on the iPhone and tell me its best locator."
- "Export my smoke-login Flow as an Appium test."

Everything runs on your machine, against your devices: [privacy and security](https://github.com/sureshkumarm8/Devicely/blob/main/docs/SECURITY_AND_PRIVACY.md).
