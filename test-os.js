// test-os.js
require('dotenv').config();
const osModule = require('./os/index.js');

console.log('тест модуля ос\n');

console.log('1. Проверка памяти:');
osModule.checkMemory();
console.log('\n');

console.log('2. Защищённая информация:');
osModule.protectedOSInfo();