const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const dotenv = require("dotenv");
const { exec } = require("child_process");

dotenv.config();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "public/preload.js"),
    },
  });

  const url =
    process.env.ELECTRON_ENV === "development"
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`;

  win.loadURL(url);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("schedule-shutdown", (event, timeInMinutes) => {
  const timeInMilliseconds = timeInMinutes * 60 * 1000;

  let shutdownCommand;
  let checkShutdownCommand;
  let platformMessage;
  switch (process.platform) {
    case "win32":
      shutdownCommand = `shutdown /s /t ${timeInMinutes * 60}`;
      checkShutdownCommand = `shutdown /a`; // Abort the shutdown to check if it was scheduled
      platformMessage = "Windows";
      break;
    case "darwin":
      shutdownCommand = `sudo shutdown -h +${timeInMinutes}`;
      checkShutdownCommand = `sudo shutdown -k now`; // Cancel the shutdown to check if it was scheduled
      platformMessage = "macOS";
      break;
    case "linux":
      shutdownCommand = `sudo shutdown -h +${timeInMinutes}`;
      checkShutdownCommand = `shutdown --show`;
      platformMessage = "Linux";
      break;
    default:
      console.error("Unsupported platform");
      return;
  }

  console.log(`Scheduling shutdown in ${timeInMinutes} minute(s) on ${platformMessage}`);

  exec(shutdownCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error scheduling shutdown: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Scheduling shutdown stderr: ${stderr}`);
      return;
    }

    // Check if the shutdown command was scheduled
    exec(checkShutdownCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error checking shutdown status: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Checking shutdown status stderr: ${stderr}`);
        return;
      }

      if (stdout) {
        console.log(`Shutdown scheduled successfully on ${platformMessage}`);
      } else {
        console.log(`Shutdown not scheduled on ${platformMessage}`);
      }
    });
  });
});
