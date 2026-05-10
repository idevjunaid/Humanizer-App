# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   # Humanizer (Expo)

   A small mobile app (Expo + React Native + Tamagui) that provides AI-powered text humanizing and summarization tools.

   ## Highlights

   - Modern UI with Tamagui
   - Hugging Face inference integration (optional)
   - File-based routing (Expo Router)
   - Configured for EAS builds (internal APK preview)

   ## Quick start

   1. Install dependencies
   ```

# Humanizer (Expo)

Humanizer is a small mobile app that helps make text sound more natural and produces concise summaries. It combines modern UI components with optional AI inference using Hugging Face models. When an API key is not provided the app falls back to offline/mock behavior so testers can run the app without secrets.

## Features

- AI Humanizer: rewrite text to sound more natural and human.
- AI Summarizer: generate short summaries of long text.
- History tracking: saved results appear in the History tab.
- Clean, responsive UI built with Tamagui and Expo Router.

## Screens

- Home (Humanizer & Summarizer shortcuts)
- Humanizer tool screen (input, run, results)
- Summarizer tool screen (input, run, results)
- History (saved results)
- Settings

## How the AI integration works

- The app can call Hugging Face Inference endpoints when `HUGGING_FACE_API_KEY` is provided to the build/runtime environment.
- If the key is not present the services fall back to local/mock behavior so the app remains functional for testing.
- Secrets are never committed — use EAS secrets or local `.env` during development.

## Tech stack

- Expo (managed workflow)
- React Native + TypeScript
- Tamagui for UI primitives
- @tanstack/react-query for data handling

## Quick start (development)

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npx expo start
```

3. Open the project in Expo Go (scan the QR) or run an emulator.

## Build an Android APK (EAS)

This project is preconfigured with `eas.json` for a `preview` profile that produces an APK suitable for internal testing.

1. Install and login to EAS CLI (you may prefer `npx eas-cli`):

```bash
npm install -g eas-cli
eas login
```

2. (Optional) Add secrets to EAS instead of committing them:

```bash
eas secret:create --name HUGGING_FACE_API_KEY --value <your_key>
```

3. Start a preview build (APK):

```bash
eas build -p android --profile preview
```

4. When finished EAS prints an artifact URL — send it to testers for direct download and install.

Tips:

- `.easignore` is present to prevent local `.env` and node_modules from being uploaded.
- Builds without secrets will use mocked AI behavior.

## Testing options for colleagues

- Expo Go: quickest path — publish/start tunnel and have the tester open the link in Expo Go.
- APK: build via EAS and share the artifact URL. Tester downloads the `.apk` and installs it on Android.
- Emulator: provide APK or run the repo locally and open in Android Studio.

## Security and secrets

- Never commit keys. Use `.env` locally and add it to `.gitignore` (already handled by `.easignore`).
- Use `eas secret:create` for build-time secrets.

## Contributing

1. Fork or branch: `git checkout -b feat/your-change`
2. Make changes and run `npx tsc --noEmit` to verify types.
3. Open a PR with a short description and screenshots.

## License

MIT
