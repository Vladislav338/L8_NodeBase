// test-modules.js

console.log('1. Тест модуля сортировки:');
const { sortStrings } = require('./modules/sort.js');
const testStrings = ['hello world', '  hello', 'world   hello', 'test', '  abc'];
console.log('До:', testStrings);
console.log('После:', sortStrings(testStrings));
console.log('\n');

console.log('2. Тест ФС модуля:');
const fsModule = require('./modules/fs-module.js');
fsModule.createDir('test-modules-folder');
fsModule.writeFile('test-modules-folder/test.txt', 'Тест модуля ФС');
const readResult = fsModule.readFile('test-modules-folder/test.txt');
console.log('Прочитано:', readResult.content || readResult.error);
console.log('\n');

console.log('3. Тест модуля загрузки данных:');
const { fetchData } = require('./modules/fetcher.js');

async function testFetcher() {
    console.log('Загружаю данные...');
    const result = await fetchData('https://jsonplaceholder.typicode.com/users');
    
    console.log('Загрузка завершена:', !result.isLoading);
    console.log('Ошибка:', result.error ? result.error.message : 'Нет');
    
    if (result.data) {
        console.log('Получено пользователей:', result.data.length);
        console.log('Первый пользователь:', result.data[0]?.name);
    }
    
    fsModule.removeDir('test-modules-folder');
    console.log('Тестовая папка удалена');
}

testFetcher().catch(console.error);