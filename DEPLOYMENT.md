# 🚀 Devicely NPM Distribution Repository

This repository contains **ONLY** the distribution files for NPM publishing. Source code is protected in the private repository.

## 📁 Repository Structure

```
devicely-npm/
├── README.md           # Installation and usage guide
├── LICENSE             # Proprietary license
├── package.json        # NPM package configuration
└── dist/               # Compiled and obfuscated distribution files
    ├── bin/            # CLI executables
    ├── lib/            # Core libraries (obfuscated)
    ├── scripts/        # Post-install scripts
    └── config/         # Configuration files
```

## 🔐 Security Features

- ✅ Source code is NOT included
- ✅ All JavaScript files are obfuscated
- ✅ Shell scripts are compiled to binary
- ✅ Only distribution-ready files included
- ✅ Proprietary license to protect IP

## 📦 Publishing to NPM

### One-Time Setup

1. **Create GitHub Repository:**
   ```bash
   # Repository is already initialized locally at:
   # /Users/SureshKumar.M/Documents/CopilotSpace/devicely-npm
   
   # Create a new repository on GitHub named: devicely-npm
   # URL: https://github.com/sureshkumarm8/devicely-npm
   ```

2. **Connect to GitHub:**
   ```bash
   cd /Users/SureshKumar.M/Documents/CopilotSpace/devicely-npm
   git remote add origin https://github.com/sureshkumarm8/devicely-npm.git
   git branch -M main
   git push -u origin main
   ```

3. **Login to NPM:**
   ```bash
   npm login
   # Enter your NPM credentials
   ```

### Publishing New Version

1. **Update version in package.json:**
   ```bash
   cd /Users/SureshKumar.M/Documents/CopilotSpace/devicely-npm
   npm version patch  # or minor, or major
   ```

2. **Sync latest dist folder from main repo:**
   ```bash
   # From main Devicely repository, build the dist
   cd /Users/SureshKumar.M/Documents/CopilotSpace/Devicely
   ./sync-to-npm-package-final.sh
   
   # Copy to npm distribution repo
   cd /Users/SureshKumar.M/Documents/CopilotSpace/devicely-npm
   rm -rf dist
   cp -r ../Devicely/npm-package/dist .
   ```

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Update to version X.X.X"
   git push
   ```

4. **Publish to NPM:**
   ```bash
   npm publish --access public
   ```

## 🎯 Quick Publish Script

Create this script for easy updates:

```bash
#!/bin/bash
# publish-npm.sh

echo "🔄 Syncing latest dist..."
cd /Users/SureshKumar.M/Documents/CopilotSpace/Devicely
./sync-to-npm-package-final.sh

echo "📦 Copying to NPM repo..."
cd /Users/SureshKumar.M/Documents/CopilotSpace/devicely-npm
rm -rf dist
cp -r ../Devicely/npm-package/dist .

echo "🏷️  Updating version..."
npm version patch

echo "📤 Publishing to NPM..."
git add .
git commit -m "Release version $(node -p "require('./package.json').version")"
git push
npm publish --access public

echo "✅ Published successfully!"
```

## 📊 What Gets Published

When users install via `npm install -g devicely`, they receive:

- ✅ Obfuscated JavaScript libraries
- ✅ Compiled shell scripts (binary format)
- ✅ Frontend web interface (minified)
- ✅ Configuration templates
- ✅ Installation guide (README.md)
- ❌ **NO source code**
- ❌ **NO development files**
- ❌ **NO internal documentation**

## 🔍 Verify Before Publishing

```bash
# Check what will be included in package
npm pack --dry-run

# Or create actual tarball
npm pack

# Inspect tarball contents
tar -tzf devicely-*.tgz
```

## 📝 Version History

- **2.0.6** - Initial NPM distribution setup with code protection
- **2.0.5** - Multi-AI provider support (7 providers)
- **2.0.0** - Major release with voice commands and recording

## 🔗 Links

- **NPM Package:** https://www.npmjs.com/package/devicely
- **Homepage:** https://devicely-ai.vercel.app
- **Support:** devicelyai@gmail.com
- **Issues:** https://github.com/sureshkumarm8/devicely-npm/issues

## ⚠️ Important Notes

1. **Never commit source code** to this repository
2. **Always use obfuscated dist files** from the main repo
3. **Keep private repo separate** for development
4. **Test package locally** before publishing:
   ```bash
   npm pack
   npm install -g devicely-*.tgz
   devicely start
   ```

## 🤝 Contributing

This is a **distribution-only repository**. For development:
1. Make changes in the private source repository
2. Build and obfuscate the code
3. Sync dist folder to this repo
4. Publish update

---

**Built with ❤️ by Suresh Kumar M**
