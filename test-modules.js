
const { sortStrings } = require('./modules/sort.js');
const strings = ['hello world', 'hello', 'world hello', 'test'];
console.log('До сортировки:', strings);
console.log('После сортировки:', sortStrings(strings));


const { fetchData } = require('./modules/fetcher.js');
async function testFetch() {
    const result = await fetchData('https://jsonplaceholder.typicode.com/users');
    console.log('Загрузка завершена:', !result.isLoading);
    console.log('Данные:', result.data ? `Получено ${result.data.length} пользователей` : 'Нет данных');
    console.log('Ошибка:', result.error);
}
testFetch();


const fsModule = require('./modules/fs-module.js');
fsModule.createDir('test-module-folder');
fsModule.writeFile('test-module-folder/test.txt', 'Module test');