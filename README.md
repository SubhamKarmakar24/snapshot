App Name: Snapshot
- An app for the users to upload their snaps, follow other people of their interests, comment on others snaps and like them for the rest of the world to see.
This app doesn't serve you ads and neither tracks your info(Ofcourse, it's open source for the same). No personal data in any form would be shared with any other individual or organization and users can have their privacy and peace of mind while uploading their most cherished snaps.  

/* This app doesn't have a production build yet, and its first version would be released upon finishing the To-Dos */

Immediate To - Dos:

Set up the development environment:
1. Clone this repository into your local drive.
2. Navigate to the directory snapshot -> frontend.
3. While inside the 'frontend' directory, open a terminal with the path inside the 'frontend' directory and run npm install.
4. Also create a file named 'Firebase-Config.js' inside the 'frontend' directory.
5. Head over to 'https://console.firebase.google.com' and login to your account.
6. After you have logged in to Firebase, in the Firebase Console, add a project.
7. It will ask you to give a name to your app and hit Continue.
8. Enable Google Analytics and hit Continue again.
9. Now in the Console, add a Web App and give it a name and hit Continue.
10. After the app has been added, go to the Project Settings by clicking the Gear icon on the top left part of the Firebase Console(beside Project Overview text).
11. Scroll down a bit to see 'Your Apps' section where you can see the Web App that you had created.
12. You will find a SDK setup and configuration section there. Choose the 'Config' in the list of options and copy the code that has been generated.
13. Paste the copied items inside the 'Firebase-Config.js' file that you had created inside the 'frontend' directory. Add 'export' before the const firebaseConfig = { // Config //}
14. Go to the Firebase console once again and select Authentication in the left pane. Go to the Sign-in method tab and enable Email/Password and hit save.
15. Select Firestore Database from the left pane. Select Create Database and choose start in test mode(Ensure that during the development process, the database always remains in test mode, since it is configured to block database access after 30 days). Choose a location that is nearest to you in the list of locations.
16. Select Storage in the left pane and see if it is showing you the storage bucket or not. If not, then setup the storage bucket.

To run the app in Web, Android or iOS:
1. Open a terminal inside the 'frontend' folder.
2. Run expo start
3. A console will open in the Web Browser.
4. Select the environment you want to open the app in.
5. To run the app in a physical device(Android, iOS), download the Expo Go app from Play Store or App Store. For Android, scan the QR code from the Expo Go app. For iOS, open the camera app and point to the QR code, and tap the Open in Expo Go notification that appears.


I have also created the Firebase Cloud Functions that is required for updating the Likes count in the app. The code is present in the backend folder, which can be run using npm install followed by firebase deploy in the terminal opened in the backend directory. But for the functions to deploy, you need a Blaze plan of Firebase. Although it won't charge you unless you exceed the quota, it still needs a billing account to provide you the Cloud services for free.

A huge thanks to Simcoder's Youtube channel which helped me in building the bare bones of this app, upon which the future versions and extra features would be implemented, and hopefully be released to the public if the app meets the necessary performance and features that users may actually like.