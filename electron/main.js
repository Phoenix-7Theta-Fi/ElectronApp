const { app, BrowserWindow, globalShortcut, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let quickAddWindow;
let tray;

// Create a basic tray icon as a data URL
const createTrayIcon = () => {
  // Simple 16x16 black square icon
  const iconData = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABSdEVYdENvcHlyaWdodABDQzAgUHVibGljIERvbWFpbiBEZWRpY2F0aW9uIGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL3B1YmxpY2RvbWFpbi96ZXJvLzEuMC/g6U44AAAAPUlEQVQ4jWNgGAWDCjAyMDD8x6H+PwMDA4YYTgMYGBgY/iNhZDFkNlYDcEmSBKBqSHIBVsOI9QJJXhgFNAYA8xoK8Rv/U+YAAAAASUVORK5CYII=`;
  return nativeImage.createFromDataURL(iconData);
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true
    },
    autoHideMenuBar: true,
    frame: true,
  });

  mainWindow.removeMenu();

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Modify the close event
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
      return false;
    }
    return true;
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createQuickAddWindow() {
  try {
    if (quickAddWindow) {
      quickAddWindow.focus();
      return;
    }

    quickAddWindow = new BrowserWindow({
      width: 600,
      height: 100,
      frame: false,
      alwaysOnTop: true,
      skipTaskbar: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
      }
    });

    const startUrl = isDev
      ? 'http://localhost:3000/quick-add'
      : `file://${path.join(__dirname, '../dist/quick-add.html')}`;

    quickAddWindow.loadURL(startUrl);
    
    quickAddWindow.on('blur', () => {
      quickAddWindow.close();
      quickAddWindow = null;
    });

    quickAddWindow.on('closed', () => {
      quickAddWindow = null;
    });
  } catch (error) {
    console.error('Error creating quick add window:', error);
  }
}

function createTray() {
  try {
    const icon = createTrayIcon();
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
      { 
        label: 'Show App', 
        click: () => {
          if (mainWindow) {
            mainWindow.show();
          } else {
            createWindow();
          }
        }
      },
      { 
        label: 'Quick Add Task',
        click: () => createQuickAddWindow()
      },
      { type: 'separator' },
      { 
        label: 'Quit', 
        click: () => {
          app.isQuitting = true;
          app.quit();
        }
      }
    ]);

    tray.setToolTip('TSK');
    tray.setContextMenu(contextMenu);

    // Add double-click handler for the tray icon
    tray.on('double-click', () => {
      if (mainWindow) {
        mainWindow.show();
      } else {
        createWindow();
      }
    });
  } catch (error) {
    console.error('Failed to create tray:', error);
  }
}

// Make sure to properly register shortcuts
function registerShortcuts() {
  try {
    const registered = globalShortcut.register('CommandOrControl+1', () => {
      createQuickAddWindow();
    });

    if (!registered) {
      console.error('Failed to register shortcut');
    }
  } catch (error) {
    console.error('Error registering shortcuts:', error);
  }
}

// Handle IPC messages
const { ipcMain } = require('electron');
ipcMain.on('closeQuickAdd', () => {
  if (quickAddWindow) {
    quickAddWindow.close();
    quickAddWindow = null;
  }
});

app.whenReady().then(() => {
  try {
    createWindow();
    createTray();
    registerShortcuts();
  } catch (error) {
    console.error('Error during app initialization:', error);
  }
}).catch(error => {
  console.error('Failed to initialize app:', error);
});

// Prevent app from closing when all windows are closed
app.on('window-all-closed', (event) => {
  event.preventDefault(); // Prevent the app from quitting
  if (mainWindow) {
    mainWindow = null;
  }
});

app.on('before-quit', () => {
  app.isQuitting = true;
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  if (tray) {
    tray.destroy();
  }
});







