# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ````bash
   # Humanizer (Expo)

   A small mobile app (Expo + React Native + Tamagui) that provides AI-powered text humanizing and summarization tools.

   ## Highlights

   - Modern UI with Tamagui
   - Hugging Face inference integration (optional)
   - File-based routing (Expo Router)
   - Configured for EAS builds (internal APK preview)

   ## Quick start

   1. Install dependencies

   ```bash
   npm install
   ````

   2. Start development server

   ```bash
   npx expo start
   ```

   Open on a device/emulator via the Expo CLI QR code or using Expo Go.

   ## Build an Android APK (for testing)

   This repo includes an `eas.json` preview profile that produces an installable APK for internal testing.
   1. Install EAS CLI and login:

   ```bash
   npm install -g eas-cli
   eas login
   ```

   2. (Optional) Add secrets to EAS so builds can access API keys without embedding them in source code:

   ```bash
   eas secret:create --name HUGGING_FACE_API_KEY --value <your_key_here>
   ```

   3. Start a preview build (APK):

   ```bash
   eas build -p android --profile preview
   ```

   4. After the build completes, EAS will provide an artifact URL. Share that URL with testers — they can open it on an Android device to download and install the APK.

   Notes:
   - `.easignore` is included to exclude local `.env` files and node_modules from the build context.
   - The app reads `HUGGING_FACE_API_KEY` from environment variables; if not provided the app falls back to mock behavior.

   ## Environment
   - Use `.env.example` as a template for local environment variables. Do NOT commit secrets.

   ## Contributing
   1. Create a branch: `git checkout -b feat/your-change`
   2. Make changes and add tests where appropriate.
   3. Open a PR with a short description.

   ## Troubleshooting
   - If you see Tamagui export warnings during bundling, try installing matching Tamagui packages or pinning versions. These are often warnings only.
   - If the Expo dev server prompts for another port, allow it or run with `--port <n>`.

   ## License

   MIT
