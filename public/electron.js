const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const dotenv = require("dotenv");
const { exec } = require("child_process");

dotenv.config();

console.log('Preload path:', path.join(__dirname, 'preload.js'));

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '..', 'public', 'preload.js'),
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
      event.sender.send("shutdown-schedule-error", error.message);
      return;
    }
    if (stderr) {
      event.sender.send("shutdown-schedule-stderr", stderr);
      return;
    }
  
    if (stdout) {
      // Check if the shutdown command was scheduled
      exec(checkShutdownCommand, (error, stdout, stderr) => {
        if (error) {
          event.sender.send("shutdown-schedule-error", error.message);
          return;
        }
        if (stderr) {
          event.sender.send("shutdown-schedule-stderr", stderr);
          return;
        }
  
        if (stdout) {
          event.sender.send("shutdown-schedule-success", `Shutdown scheduled successfully on ${platformMessage}`);
        } else {
          event.sender.send("shutdown-schedule-error", `Shutdown not scheduled on ${platformMessage}`);
        }
      });
    } else {
      event.sender.send("shutdown-schedule-success", `Shutdown scheduled successfully on ${platformMessage}`);
    }
  });
  
});


//cancel shutdown functionality
ipcMain.on("cancel-shutdown", () => {
  let cancelShutdownCommand;

  switch (process.platform) {
    case "win32":
      cancelShutdownCommand = "shutdown /a";
      break;
    case "darwin":
      cancelShutdownCommand = "sudo killall shutdown";
      break;
    case "linux":
      cancelShutdownCommand = "sudo shutdown -c";
      break;
    default:
      console.error("Unsupported platform");
      return;
  }

  console.log("Cancelling scheduled shutdown");

  exec(cancelShutdownCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error cancelling shutdown: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Cancelling shutdown stderr: ${stderr}`);
      return;
    }

    console.log("Shutdown cancelled successfully");
  });
});
