#!/bin/bash
set -e

echo "Creating portfolio-refactor.zip..."

# Remove old zip if exists
rm -f portfolio-refactor.zip

# Create zip excluding legacy, node_modules, and development files
zip -r portfolio-refactor.zip . \
  -x "legacy/*" \
  -x "node_modules/*" \
  -x ".git/*" \
  -x "*.zip" \
  -x "package-lock.json" \
  -x "scripts/*" \
  -x ".github/*"

# Calculate and display file size and hash
if [ -f portfolio-refactor.zip ]; then
  echo "✓ portfolio-refactor.zip created successfully"
  echo ""
  echo "File size: $(ls -lh portfolio-refactor.zip | awk '{print $5}')"
  echo "SHA256: $(sha256sum portfolio-refactor.zip | awk '{print $1}')"
  echo ""
  echo "Update README.md with these values."
else
  echo "✗ Failed to create zip file"
  exit 1
fi
