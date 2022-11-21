const {
  app,
  ipcMain,
  BrowserWindow,
  globalShortcut,
  BrowserView
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
      webviewTag: true
    },
    frame: false
  });
  mainWindow.setMenuBarVisibility(false)
  mainWindow.loadFile("./app/index.html");

  // BrowserView to implement tabs for scratchpad functionality
  // TODO : make this view button toggle and change position
  const view = new BrowserView()
  mainWindow.setBrowserView(view)
  view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
  view.webContents.loadURL('https://electronjs.org')
};

app.on("ready", () => {
  createMainWindow();
  globalShortcut.register("CmdOrCtrl+R", () => {
    mainWindow.reload();
  });

  // globalShortcut.register("CmdOrCtrl+W", () => {
  //   mainWindow.close();
  // });
  // globalShortcut.register("CmdOrCtrl+N", () => {
  //   mainWindow.show();
  // });
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


