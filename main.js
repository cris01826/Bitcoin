const { app, BrowserWindow } = require("electron");

let appWin;

app.on("ready", createWindow);

app.on("window-all-closed", () => app.quit());

function createWindow() {
  appWin = new BrowserWindow({
    width: 440,
    height: 700,
    title: "Bitcoin",
    resizable: false,
    x:-50,
    webPreferences: {
      preload: `${app.getAppPath()}/preload.js`,
    },
  });

  appWin.loadURL(`file://${__dirname}/dist/index.html`);

  appWin.setMenu(null);

  appWin.on("closed", () => {
    appWin = null;
  });
}
