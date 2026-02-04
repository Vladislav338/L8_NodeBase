// test-fs.js
const fsModule = require('./fs/index.js');

console.log('тест файловой системы\n');

console.log('1. Создание папки:');
fsModule.createDirSync('test-fs-folder');

console.log('\n2. Запись файла:');
fsModule.writeFileSync('test-fs-folder/test.txt', 'Hello 123 WORLD! ABC Test 456');

console.log('\n3. Чтение файла:');
const content = fsModule.readFileSync('test-fs-folder/test.txt');

console.log('\n4. Очистка от шума:');
fsModule.cleanFileSync('test-fs-folder/test.txt');

console.log('\n5. Чтение после очистки:');
fsModule.readFileSync('test-fs-folder/test.txt');

console.log('\n6. Копирование файла:');
fsModule.copyFileSync('test-fs-folder/test.txt', 'test-fs-folder/copy.txt');

console.log('\n7. Создание JSON файла:');
fsModule.writeFileSync('test-fs-folder/data.json', JSON.stringify({ name: 'Test', value: 123 }, null, 2));

console.log('\n8. Все файлы в проекте:');
const allFiles = fsModule.getAllFilesSync();
console.log('Найдено файлов:', allFiles.length);

console.log('\n9. Удаление тестовой папки:');
fsModule.removeDirSync('test-fs-folder');

