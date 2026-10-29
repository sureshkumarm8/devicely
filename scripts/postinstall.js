/**
 * Devicely - Post Install Script
 * Runs after npm install to setup environment
 */

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('');
console.log(chalk.cyan.bold('🎉 Devicely installed successfully!'));
console.log(chalk.gray('   One Command, All Devices. AI Powered Mobile Automation'));
console.log(chalk.gray('━'.repeat(50)));
console.log('');

// Create the Devicely data directory (same default as lib/dataPaths.js)
const configDir = process.env.DEVICELY_DATA_DIR || path.join(os.homedir(), '.devicely');
try {
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
    console.log(chalk.green('✅ Created config directory'));
    console.log(chalk.gray(`   ${configDir}`));
  }
} catch (error) {
  // Silent fail - directory might already exist
}

// Copy default configs if they don't exist
const defaultConfigs = [
  { name: 'devices.conf', content: `# Device Configuration
# Format: device_name,udid,ip_address
# Example:
# iPhone15Pro,00008110-000A1B2C3D4E5F60,192.168.1.100

` },
  { name: 'apps_presets.conf', content: `# App Presets Configuration
# iOS Apps
Safari,com.apple.mobilesafari
Settings,com.apple.Preferences
Messages,com.apple.MobileSMS
Camera,com.apple.camera
Photos,com.apple.mobileslideshow
Notes,com.apple.mobilenotes
Maps,com.apple.Maps
AppStore,com.apple.AppStore

# Android Apps
Chrome,com.android.chrome
Settings,com.android.settings
Camera,com.android.camera2
Gallery,com.google.android.apps.photos
Messages,com.google.android.apps.messaging
` }
];

defaultConfigs.forEach(config => {
  const configPath = path.join(configDir, config.name);
  if (!fs.existsSync(configPath)) {
    try {
      fs.writeFileSync(configPath, config.content);
      console.log(chalk.green(`✅ Created ${config.name}`));
    } catch (error) {
      // Silent fail
    }
  }
});

// Create .env template
const envPath = path.join(configDir, '.env');
if (!fs.existsSync(envPath)) {
  const envContent = `# Devicely Configuration
# Easiest: add a key in the app under Settings -> AI Provider.
# Or uncomment one line below and restart Devicely. Keys you already export
# in your shell keep working; a value here takes priority over the shell.

# OPENAI_API_KEY=
# GEMINI_API_KEY=
# CLAUDE_API_KEY=
# GROQ_API_KEY=
# GITHUB_TOKEN=

# Default AI provider: openai, gemini, claude, groq, copilot or ollama
# AI_PROVIDER=gemini
`;
  try {
    fs.writeFileSync(envPath, envContent, { mode: 0o600 });
    console.log(chalk.green('✅ Created .env template'));
  } catch (error) {
    // Silent fail
  }
}

console.log('');
console.log(chalk.cyan.bold('🚀 Getting Started:'));
console.log('');
console.log(chalk.white('  1. ') + chalk.yellow.bold('devicely doctor') + chalk.gray('   check your setup; prints a fix for anything missing'));
console.log(chalk.white('  2. ') + chalk.yellow.bold('devicely start') + chalk.gray('    opens the Command Center in your browser'));
console.log(chalk.white('  3. Follow ') + chalk.cyan('"Add your first device"') + chalk.white(' in the browser'));
console.log('');
console.log(chalk.white('  AI agents: ') + chalk.yellow('devicely mcp install <client>') + chalk.gray('  (claude-code, cursor, vscode, ...)'));
console.log(chalk.gray('  Setup diagnostics are opt-in and off until you say yes: devicely telemetry status'));
console.log('');
console.log(chalk.gray('━'.repeat(50)));
console.log(chalk.gray('📖 Docs: https://github.com/sureshkumarm8/Devicely'));
console.log('');
