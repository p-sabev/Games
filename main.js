"use strict";
const electron = require('electron');
const url = require('url');
const path = require('path');
 
const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow,
    ticTacWindow,
    simonWindow,
    snakeWindow,
    flappyBirdWindow,
    twoZeroFourWindow;

app.on('ready', () => {
    //create new window
    mainWindow = new BrowserWindow({});
    //load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    
    //Quit app when closed
    mainWindow.on('closed', () => {
        app.quit();
    });
    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);

});

// Handle creating window for a different games
function createWindow(window, width, height, html, title){
    // Creates new window
    window = new BrowserWindow({
        width: width,
        height: height,
        title: title
    });

    // Load html into window
    window.loadURL(url.format({
        pathname: path.join(__dirname, html),
        protocol: 'file:',
        slashes: true
    }));
    
    // Garbage collection handle
    window.on('close', () => {
        window = null;
    });

    if(process.env.NODE_ENV == 'production'){
        window.setMenu(null);
    }
}

// Catch opening a new window with game
ipcMain.on('window:open', (e, window) => {
    if(window === "Tic-Tac"){
        createWindow(ticTacWindow, 350, 400, 'ticTacWindow.html', 'Play Tic-Tac-Toe');
    }else if(window === "Simon"){
        createWindow(simonWindow, 500, 500, 'simonWindow.html', 'Play Simon game');
    }else if(window === "Snake"){
        createWindow(snakeWindow, 490, 500, 'snakeWindow.html', 'Play Snake game');
    }else if(window === "Flappy"){
        createWindow(flappyBirdWindow, 450, 575, 'flappyBirdWindow.html', 'Play Flappy Bird');
    }else if(window === "2048"){
        createWindow(twoZeroFourWindow, 500, 600, 'twoZeroFourWindow.html', 'Play 2048 game');
    }
});

// Create menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu: [
            {
                label: 'Tic-Tac-Toe',
                accelerator: '1',
                click(){
                    createWindow(ticTacWindow, 350, 400, 'ticTacWindow.html', 'Play Tic-Tac-Toe');
                }
            },
            {
                label: 'Simon',
                accelerator: '2',
                click(){
                    createWindow(simonWindow, 500, 500, 'simonWindow.html', 'Play Simon game');
                }
            },
            {
                label: 'Snake',
                accelerator: '3',
                click(){
                    createWindow(snakeWindow, 490, 500, 'snakeWindow.html', 'Play Snake game');
                }
            },
            {
                label: 'Flappy Bird',
                accelerator: '4',
                click(){
                    createWindow(flappyBirdWindow, 450, 575, 'flappyBirdWindow.html', 'Play Flappy Bird');
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            },
            {
                label: '2048',
                accelerator: '5',
                click(){
                    createWindow(twoZeroFourWindow, 500, 600, 'twoZeroFourWindow.html', 'Play 2048 game');
                }
            }
        ]
    }
];

// If on mac, add empty object at the beginning of the menu
(process.platform == 'darwin') && mainMenuTemplate.shift({});
// Add developer tools if its not in production mode
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}