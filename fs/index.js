const fs = require('fs');
const path = require('path'); 

function writeFileSync(filePath, content) {
    try {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Файл ${filePath} успешно записан`);
    } catch (error) {
        console.error(`Ошибка записи в файл ${filePath}:`, error.message);
    }
}

function readFileSync(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        console.log(`Содержимое ${filePath}:`, content);
        return content;
    } catch (error) {
        console.error(`Ошибка чтения файла ${filePath}:`, error.message);
        return null;
    }
}

function updateFileSync(filePath, newContent) {
    try {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Файл ${filePath} полностью обновлён`);
    } catch (error) {
        console.error(`Ошибка обновления файла ${filePath}:`, error.message);
    }
}

function clearFileSync(filePath) {
    try {
        fs.writeFileSync(filePath, '', 'utf8');
        console.log(`Файл ${filePath} очищен`);
    } catch (error) {
        console.error(`Ошибка очистки файла ${filePath}:`, error.message);
    }
}

function cleanFileSync(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        // Удаляем все цифры
        content = content.replace(/\d/g, '');
        // Переводим в нижний регистр
        content = content.toLowerCase();
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Файл ${filePath} очищен от шума`);
    } catch (error) {
        console.error(`Ошибка очистки шума в файле ${filePath}:`, error.message);
    }
}

function copyFileSync(sourcePath, destPath) {
    try {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Файл скопирован из ${sourcePath} в ${destPath}`);
    } catch (error) {
        console.error(`Ошибка копирования файла:`, error.message);
    }
}

function createDirSync(dirPath) {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Папка ${dirPath} создана`);
        } else {
            console.log(`Папка ${dirPath} уже существует`);
        }
    } catch (error) {
        console.error(`Ошибка создания папки ${dirPath}:`, error.message);
    }
}

function removeDirSync(dirPath) {
    try {
        if (fs.existsSync(dirPath)) {
            fs.rmdirSync(dirPath, { recursive: true });
            console.log(`Папка ${dirPath} удалена`);
        } else {
            console.log(`Папка ${dirPath} не существует`);
        }
    } catch (error) {
        console.error(`Ошибка удаления папки ${dirPath}:`, error.message);
    }
}

function getAllFilesSync(startPath = '.') {
    const ignoredDirs = ['node_modules', '.git', '.vscode'];
    const files = [];
    
    function scanDirectory(currentPath) {
        const items = fs.readdirSync(currentPath);
        
        for (const item of items) {
            const fullPath = path.join(currentPath, item);
            const stat = fs.statSync(fullPath);
            
            // Пропускаем игнорируемые папки
            if (stat.isDirectory()) {
                if (!ignoredDirs.includes(item)) {
                    scanDirectory(fullPath);
                }
            } else {
                files.push(fullPath);
            }
        }
    }
    
    try {
        scanDirectory(startPath);
        console.log('Найдены файлы:', files);
        return files;
    } catch (error) {
        console.error('Ошибка поиска файлов:', error.message);
        return [];
    }
}

function cleanProjectSync() {
    const files = getAllFilesSync();
    const ignoredFiles = ['.gitignore', 'package.json', 'package-lock.json'];
    
    for (const file of files) {
        const fileName = path.basename(file);
        if (!ignoredFiles.includes(fileName)) {
            try {
                fs.unlinkSync(file);
                console.log(`Удалён файл: ${file}`);
            } catch (error) {
                console.error(`Ошибка удаления ${file}:`, error.message);
            }
        }
    }
    
    // Удаляем пустые папки (кроме node_modules и .git)
    const ignoredDirs = ['node_modules', '.git'];
    const dirs = fs.readdirSync('.');
    
    for (const dir of dirs) {
        if (fs.statSync(dir).isDirectory() && !ignoredDirs.includes(dir)) {
            try {
                fs.rmdirSync(dir, { recursive: true });
                console.log(`Удалена папка: ${dir}`);
            } catch (error) {
                // Игнорируем ошибки если папка не пуста
            }
        }
    }
}

module.exports = {
    writeFileSync,
    readFileSync,
    updateFileSync,
    clearFileSync,
    cleanFileSync,
    copyFileSync,
    createDirSync,
    removeDirSync,
    getAllFilesSync,
    cleanProjectSync
};