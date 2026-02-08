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

// Create config directory in .devicely
const configDir = path.join(os.homedir(), '.devicely');
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
# iPhone15Pro,00008110-001C24361E41801C,192.168.1.100

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
# Add your AI Provider API keys here

# OpenAI Configuration
OPENAI_API_KEY=

# Google Gemini Configuration  
GOOGLE_API_KEY=

# Anthropic Claude Configuration
ANTHROPIC_API_KEY=

# Default AI Provider (openai, gemini, or anthropic)
AI_PROVIDER=gemini
`;
  try {
    fs.writeFileSync(envPath, envContent);
    console.log(chalk.green('✅ Created .env template'));
  } catch (error) {
    // Silent fail
  }
}

console.log('');
console.log(chalk.cyan.bold('🚀 Getting Started:'));
console.log('');
console.log(chalk.white('  1. Connect your iOS or Android device'));
console.log(chalk.white('  2. Run: ') + chalk.yellow.bold('devicely start'));
console.log(chalk.white('  3. Browser opens at: ') + chalk.cyan('https://devicely-ai.vercel.app'));
console.log(chalk.white('  4. Control your devices with AI!'));
console.log('');
console.log(chalk.cyan('📖 More commands:'));
console.log(chalk.gray('   devicely list    ') + chalk.white('- List connected devices'));
console.log(chalk.gray('   devicely --help  ') + chalk.white('- Show all commands'));
console.log('');
console.log(chalk.gray('━'.repeat(50)));
console.log(chalk.gray('📖 Documentation: https://github.com/sureshkumarm8/Devicely'));
console.log(chalk.gray('🌐 Frontend: https://devicely-ai.vercel.app'));
console.log('');
