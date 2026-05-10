# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Building an Android APK with EAS (internal testing)

1. Install EAS CLI and login:

```bash
npm install -g eas-cli
eas login
```

2. Add your Hugging Face key as an EAS secret (do not commit this key):

```bash
eas secret:create --name HUGGING_FACE_API_KEY --value <your_key_here>
```

3. Start a preview build (produces an APK). The project already contains `eas.json` with a `preview` profile:

```bash
eas build -p android --profile preview
```

4. When the build completes, EAS will print an artifact URL. Copy and send that URL to your tester. They can open it on their Android device to download and install the APK.

Notes:
- We added `.easignore` to exclude `.env` and other local files from the build context.
- The app reads `HUGGING_FACE_API_KEY` from environment; do not hardcode secrets in source files.
- If you want me to start the build from this machine, confirm and I will install `eas-cli`, ask you to authenticate, then kick off the build and return the artifact URL.
