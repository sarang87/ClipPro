const {
  app,
  ipcMain,
  BrowserWindow,
  globalShortcut
} = require("electron");

const isDev = process.env.NODE_ENV != "production" ? true : false;
process.env.NODE_ENV = "development";
let mainWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 550,
    height: 600,
    icon: "./assets/icons/logo.png",
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      enableRemoteModule: true
    },
    frame: false
  });
  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadFile("./app/index.html");
};

app.on("ready", () => {
  createMainWindow();
  mainWindow.on("close", () => (mainWindow = null));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});


