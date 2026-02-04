// os/index.js
const os = require('os');

function getOSInfo() {
    console.log('инфа ос');
    console.log('Платформа:', os.platform());
    console.log('Архитектура:', os.arch());
    console.log('Версия ОС:', os.version());
    console.log('Имя хоста:', os.hostname());
    console.log('Свободная память:', (os.freemem() / 1024 / 1024 / 1024).toFixed(2), 'GB');
    console.log('Всего памяти:', (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), 'GB');
    console.log('Главная директория:', os.homedir());
    
    const networks = os.networkInterfaces();
    console.log('Сетевые интерфейсы:');
    Object.keys(networks).forEach(interfaceName => {
        networks[interfaceName].forEach(iface => {
            if (iface.family === 'IPv4' && !iface.internal) {
                console.log(`  ${interfaceName}: ${iface.address}`);
            }
        });
    });
}

function checkMemory() {
    const freeMemoryGB = os.freemem() / 1024 / 1024 / 1024;
    const isMoreThan4GB = freeMemoryGB > 4;
    console.log(`Свободная память: ${freeMemoryGB.toFixed(2)} GB`);
    console.log(`Больше 4GB: ${isMoreThan4GB ? 'ДА' : 'НЕТ'}`);
    return isMoreThan4GB;
}

function protectedOSInfo() {
    const mode = process.env.MODE || 'user';
    
    if (mode === 'admin') {
        console.log('Режим администратора: доступ разрешён');
        getOSInfo();
    } else {
        console.log('Режим пользователя: доступ запрещён');
        console.log('Только общая информация:');
        console.log('Платформа:', os.platform());
        console.log('Архитектура:', os.arch());
    }
}

module.exports = {
    getOSInfo,
    checkMemory,
    protectedOSInfo
};