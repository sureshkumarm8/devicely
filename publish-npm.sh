#!/bin/bash

set -e

echo "🚀 Devicely NPM Publisher"
echo "=========================="
echo ""

# Ask for version bump type
echo "Select version bump type:"
echo "1) patch (2.0.6 -> 2.0.7)"
echo "2) minor (2.0.6 -> 2.1.0)"
echo "3) major (2.0.6 -> 3.0.0)"
read -p "Enter choice (1-3): " choice

case $choice in
  1) VERSION_TYPE="patch" ;;
  2) VERSION_TYPE="minor" ;;
  3) VERSION_TYPE="major" ;;
  *) echo "❌ Invalid choice"; exit 1 ;;
esac

echo ""
echo "🔄 Step 1: Syncing latest dist from main repo..."
cd /Users/SureshKumar.M/Documents/CopilotSpace/Devicely
if [ -f "./sync-to-npm-package-final.sh" ]; then
  ./sync-to-npm-package-final.sh
else
  echo "⚠️  Sync script not found, skipping..."
fi

echo ""
echo "📦 Step 2: Copying to NPM distribution repo..."
cd /Users/SureshKumar.M/Documents/CopilotSpace/devicely-npm
rm -rf dist
cp -r ../Devicely/npm-package/dist .

echo ""
echo "🏷️  Step 3: Updating version ($VERSION_TYPE)..."
npm version $VERSION_TYPE --no-git-tag-version
NEW_VERSION=$(node -p "require('./package.json').version")

echo ""
echo "💾 Step 4: Committing changes..."
git add .
git commit -m "Release version $NEW_VERSION"

echo ""
echo "🔍 Step 5: Verifying package contents..."
npm pack --dry-run | head -20

echo ""
read -p "📤 Ready to publish v$NEW_VERSION to NPM. Continue? (y/n): " confirm

if [ "$confirm" = "y" ]; then
  echo ""
  echo "🌐 Pushing to GitHub..."
  git push
  
  echo ""
  echo "📦 Publishing to NPM..."
  npm publish --access public
  
  echo ""
  echo "✅ Successfully published devicely v$NEW_VERSION!"
  echo "📊 Check: https://www.npmjs.com/package/devicely"
  echo "🔗 GitHub: https://github.com/sureshkumarm8/devicely-npm"
else
  echo "❌ Publish cancelled"
  git reset --soft HEAD~1
  exit 1
fi
