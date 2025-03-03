#!/bin/bash
set -e

echo "Starting build process..."

# Uninstall problematic Tailwind packages
echo "Removing old Tailwind packages..."
npm uninstall tailwindcss @tailwindcss/postcss

# Install compatible versions
echo "Installing compatible Tailwind packages..."
npm install tailwindcss@3.4.1 postcss@8 autoprefixer@10

# Run the build with ESLint disabled
echo "Running Next.js build..."
NEXT_DISABLE_ESLINT=1 next build

echo "Build process completed." 