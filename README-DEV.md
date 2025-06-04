# Developer Guide

This repo uses [Electron Forge](https://www.electronforge.io/) with Electron 36.

## Running Locally
1. Install dependencies
```bash
npm install
```
2. Start the app
```bash
npm start
```
3. Package the app
```bash
npm run make
```

## Cross Compilation Examples
Use `electron-forge make` with platform and architecture flags.
```bash
# Windows x64
npx electron-forge make --platform=win32 --arch=x64

# Linux x64 (deb and rpm)
npx electron-forge make --platform=linux --arch=x64
```
