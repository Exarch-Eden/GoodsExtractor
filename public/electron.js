const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

let mainWindow;

const bWindowOptions = {
  width: 1280,
  height: 1024,
};

const createWindow = () => {
  mainWindow = new BrowserWindow(bWindowOptions);

  mainWindow.loadURL(`file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("closed", () => (mainWindow = null));
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
