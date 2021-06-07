# Features to implement

- Search functionality
- Card layout of search results with cover thumbnail for each manga (very similar to Home page)
  - Layout will show various information such as title and a preview of some tags related to the manga
- Filter search results by tags or id
- Bookmark/Favourite manga or artist
  - Will most likely be local or cache-based
- Download all images/pages of a specific manga
- Preview of first few images/pages when navigating to a manga
- Dark mode

Trello board: https://trello.com/b/RFmf9DeZ/goods-extractor

# External features to implement

- Node server hosted in Heroku to catch GET requests made by client app

# Production build and setup instructions

<b><span style="color: red;">Warning</span>: Your node modules must be up to date. Do this by executing command: `npm install`</b>

1. Open command terminal in root directory
2. Execute command:
   <br>
   `npm run build`
   <br>
   This may take a few minutes
3. Navigate to the <b>dist</b> folder generated by the previous command
4. Inside <b>dist</b> folder, run the executable, <b>GoodsExtractor Setup 0.1.0.exe</b>
   <br>
   <br>
   At this point, the Electron desktop application should be running.

This concludes the production build and setup instructions.

# Other commands
Custom node commands with several different functionalities to facilitate development.
## React-related commands
- `npm run react-start`
  - Starts up a local server for the React app on port 3000
- `npm run react-build`
  - Generates a production build for the React app which can be found in the <b>build</b> folder
## Electron-related commands
- `npm run electron-start`
  - Starts up the electron app for easy access during development (depends on the command `npm run react-build` for changes to be seen live)
- `npm run electron-build`
  - Generates a production build for the Electron desktop app which can be found in the <b>dist</b> folder
- `npm run electron-dev`
  - Executes both `npm run react-build` and `npm run electron-start` to start up the electron app for development with just one command
## General commands
- `npm run build`
  - Makes use of the commands `npm run react-build` and `npm run electron-build` to generate an up-to-date build folder for the React component and the Electron desktop app for it
- `npm run start`
  - Similar to `npm run react-start` but also concurrently runs the electron app
  - <span style="color: red;"><b>Warning</b></span>: This command is bugged and does not execute the electron app for development as intended. Do not use.
