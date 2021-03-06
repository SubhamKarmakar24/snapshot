# Snapshot
### A cross-platform social media app\* for the users to upload their snaps, follow other people of their interests, comment on others snaps and like them for the rest of the world to see.
\*(currently configured for Android. iOS configuration requires XCode configuration. The code requires no changes in iOS).

<br />

Initial Beta Release v0.0.1 can be found [here](https://github.com/SubhamKarmakar24/snapshot/releases/tag/v0.0.1-beta).

##

## Stacks/Libraries used :

- `React Native - v0.66.4`
- `React Navigation - v6.0.6`
- `React Native Vector Icons - v9.0.0`
- `Redux - v4.1.2`
- `React Redux - v7.2.6`
- `Firebase by Google - v14.2.2`
  - `Firebase Analytics`
  - `Firebase Auth`
  - `Firestore Database`
  - `Cloud Storage`
  - `Cloud Functions`
- `Node - v16.0.0`

<br />

## Immediate To - Dos :

- [ ] [Fresh new UI](https://github.com/SubhamKarmakar24/snapshot/issues/12) #12
- [ ] [Firebase App-Check module import giving 'no such module' error](https://github.com/SubhamKarmakar24/snapshot/issues/17) #17
- [ ] [Image Compression required before upload](https://github.com/SubhamKarmakar24/snapshot/issues/6) #6
- [ ] [Comments don't update when a comment is posted by user](https://github.com/SubhamKarmakar24/snapshot/issues/9) #9
- [ ] [Size of image and aspect ratio in different devices](https://github.com/SubhamKarmakar24/snapshot/issues/13) #13
- [ ] [Facebook and Google to make account in Snapshot](https://github.com/SubhamKarmakar24/snapshot/issues/14) #14
- [ ] [Onboarding screen for different account creation methods](https://github.com/SubhamKarmakar24/snapshot/issues/15) #15

<br />

## Setting up the development environment :

- Fork this repository.
- Clone the forked repository into your local drive.
- Navigate to the directory `snapshot/frontend`.
- While inside the `frontend` directory, open a terminal (ensure path points to `frontend` directory) and run `npm install` or `npm i`.
- Head over to **[Firebase Console](https://console.firebase.google.com)** and login to your account.
- After you have logged in to Firebase, in the Firebase Console, **add a project**.
- You will be asked to give a name to your app, then hit **Continue**.
- Enable **Google Analytics** and hit **Continue** again.
- Now in the Console, **add an Android App**.
- Enter your projects details. The "Android package name" must match the local projects package name which can be found inside of the manifest tag within the `/android/app/src/main/AndroidManifest.xml` file within the project.
- The **Debug Signing Certificate** is optional to use Firebase with the app, but is required for Dynamic Links, Invites and Phone Authentication. To generate a certificate run `cd android && ./gradlew signingReport`. This generates two variant keys. Copy both 'SHA1' and 'SHA-256' keys that belong to the `debugAndroidTest` variant key option. Then, those keys can be added to the 'SHA certificate fingerprints' on the app in Firebase console.
- Download the `google-services.json` file and place it inside of the project at the following location: `/android/app/google-services.json`.
<!-- - Create a file named **`Firebase-Config.js`** inside the `frontend` directory. -->
<!-- - After the app has been added, go to the **Project Settings** by clicking the gear icon on the top left part of the Firebase Console(beside **Project Overview**). -->
<!-- - Scroll down a bit to see **Your Apps** section where you can see the Web App that you had created. -->
<!-- - You will find a ***SDK setup and configuration*** section there. Choose **Config** in the list of options and copy the code that has been generated. -->
<!-- - Paste the copied items inside the **`Firebase-Config.js`** file that you had created inside the `frontend` directory. Add `export` before `const firebaseConfig = { // Config // }`. -->
<!-- > It should look like this -->
<!-- export const firebaseConfig =
{
    apiKey: "XXX",
    authDomain: "XXX",
    projectId: "XXX",
    storageBucket: "XXX",
    messagingSenderId: "XXX",
    appId: "XXX",
    measurementId: "XXX"
}; -->

- Go to the **[Firebase Console](https://console.firebase.google.com)** once again and select **Authentication** in the left pane. Go to the **Sign-in method** tab and enable **Email/Password** and hit Save.
- Select **Firestore Database** from the left pane. Select **Create Database** and choose start in `test mode`(Ensure that during the development process, the database always remains in test mode, since it is configured to block database access after 30 days). Choose a location that is nearest to you in the list of locations.
- Select **Storage** in the left pane and see if it is showing you the storage bucket or not. If not, then setup the storage bucket.

<br />

## Running the app in Web, Android or iOS :
- Open a terminal inside the `frontend` folder.
- Run `npm run android`.
- If an Android device is connected with USB Debugging enabled, the app will start in the physical device else it will run in the emulator.
- For setting up **React Native** or an emulator, follow this [guide](https://reactnative.dev/docs/environment-setup).
<!-- - A console will open in the Web Browser. -->
<!-- - Select the environment you want to open the app in. -->
<!-- - To run the app in a physical device(***Android, iOS***), download the **Expo Go** app from ***[Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_IN&gl=US) or [App Store](https://apps.apple.com/us/app/expo-go/id982107779)***. For **Android**, scan the QR code from the **Expo Go** app. For **iOS**, open the Camera app and point to the QR code, and tap the **Open in Expo Go** notification that appears. -->

##

I have also created the **Firebase Cloud Functions** that is required for updating the **Likes count** in the app. The code is present in the `backend` folder, which can be run using `npm install` followed by `firebase deploy` in the terminal opened in the `backend` directory. But for the functions to deploy, you need a **Blaze plan** of Firebase. Although it won't charge you unless you exceed the quota, it still needs a billing account to provide you the Cloud services for free.

<br />
<br />

**Read the CONTRIBUTING.md and CODE_OF_CONDUCT.md before contributing to this project.**

<br />

## License :

**MIT License**

***Copyright (c) 2022 Subham Karmakar***

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.**

<br />

<br />

<br />


A huge thanks to **Simcoder's** Youtube channel which helped me in building the bare bones of this app, upon which the future versions and extra features would be implemented.
