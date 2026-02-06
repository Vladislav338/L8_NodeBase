const { sortStrings } = require('./modules/sort.js');
const strings = ['hello world', 'hello', 'world hello', 'test'];
console.log('Before sorting:', strings);
console.log('After sorting:', sortStrings(strings));

const { fetchData } = require('./modules/fetcher.js');
async function testFetch() {
    const result = await fetchData('https://jsonplaceholder.typicode.com/users');
    console.log('Loading finished:', !result.isLoading);
    console.log('Data:', result.data ? `Received ${result.data.length} users` : 'No data');
    console.log('Error:', result.error);
}
testFetch();

const fsModule = require('./modules/fs-module.js');
fsModule.createDir('test-module-folder');
fsModule.writeFile('test-module-folder/test.txt', 'Module test');
