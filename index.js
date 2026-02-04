  
require('dotenv').config();

console.log('проверка');
console.log('Имя:', process.env.NAME);
console.log('Фамилия:', process.env.SURNAME);
console.log('Группа:', process.env.GROUP);
console.log('Номер по списку:', process.env.INDEX);
console.log('Режим:', process.env.MODE);
