const {
  app,
  BrowserWindow,
  Tray,
  nativeImage,
  screen,
  ipcMain,
} = require('electron');
let Store;
try {
  Store = require('electron-store');
  if (Store && Store.default) Store = Store.default;
} catch (e) {
  console.error('Erro ao carregar electron-store:', e);
  process.exit(1);
}
const store = new Store();
const path = require('path');

let tray = null;
let win = null;

// Auto-launch
const AutoLaunch = require('auto-launch');
const taskTrayAutoLauncher = new AutoLaunch({
  name: 'TaskTray',
  path: process.execPath,
});
taskTrayAutoLauncher.isEnabled().then((isEnabled) => {
  if (!isEnabled) taskTrayAutoLauncher.enable();
});

function createWindow() {
  const path = require('path');
  const display = screen.getPrimaryDisplay();
  const { x, y, width, height } = display.workArea;

  win = new BrowserWindow({
    width: 350,
    height: height - 200,
    show: false,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    skipTaskbar: true,
  });
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173/');
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

// IPC handlers para tarefas
ipcMain.handle('get-tasks', async () => {
  return store.get('tasks', []);
});
ipcMain.handle('set-tasks', async (event, tasks) => {
  store.set('tasks', tasks);
  return true;
});

app.whenReady().then(() => {
  createWindow();

  // Usar apenas icon.jpg como ícone do tray
  let trayIconPath = path.join(__dirname, 'public', 'icon.jpg');
  let trayIcon;
  if (require('fs').existsSync(trayIconPath)) {
    trayIcon = nativeImage.createFromPath(trayIconPath).resize({ width: 16, height: 16 });
  } else {
    trayIcon = nativeImage.createEmpty();
  }
  try {
    tray = new Tray(trayIcon);
    tray.setToolTip('Task Tray');
  } catch (e) {
    console.error('Erro ao criar o tray:', e);
  }

  tray.on('click', () => {
    if (win.isVisible()) {
      win.hide();
    } else {
      const primaryDisplay = screen.getPrimaryDisplay();
      const { x, y, width } = primaryDisplay.workArea;
      const winBounds = win.getBounds();
      const margin = 10;
      const winX = x + width - winBounds.width - margin;
      const winY = y + margin;
      win.setPosition(winX, winY, false);
      win.show();
      win.focus();
    }
  });
});

app.on('window-all-closed', () => {
  // Do not quit app when all windows are closed (for tray)
});

app.on('before-quit', () => {
  if (win) win.destroy();
});
