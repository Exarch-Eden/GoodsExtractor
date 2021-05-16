const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

let mainWindow;

const bWindowOptions = {
  width: 800,
  height: 600,
};

const createWindow = () => {
  mainWindow = new BrowserWindow(bWindowOptions);

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
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
