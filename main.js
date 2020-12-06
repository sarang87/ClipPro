const {
  app,
  ipcMain,
  BrowserWindow,
  globalShortcut,
  clipboard,
} = require("electron");
// /const clipboard = electron.clipboard;

process.env.NODE_ENV = "development";

let mainWindow;

const isDev = process.env.NODE_ENV != "production" ? true : false;
const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 550,
    height: 600,
    icon: "./assets/icons/logo.jpg",
    resizable: isDev ? false : true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  //mainWindow.loadURL('https://www.instagram.com')
  //mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.loadFile("./app/index.html");
};

app.on("ready", () => {
  createMainWindow();
  globalShortcut.register("CmdOrCtrl+R", () => {
    mainWindow.reload();
  });

  globalShortcut.register("CmdOrCtrl+W", () => {
    mainWindow.close();
  });



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

console.log("Hello world!");
