// modules/fetcher.js
const https = require('https');

function fetchData(url) {
    return new Promise((resolve) => {
        const result = {
            data: null,
            isLoading: true,
            error: null
        };
        
        const req = https.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                result.isLoading = false;
                try {
                    result.data = JSON.parse(data);
                } catch (error) {
                    result.error = error;
                }
                resolve(result);
            });
        });
        
        req.on('error', (error) => {
            result.isLoading = false;
            result.error = error;
            resolve(result);
        });
        
        req.setTimeout(10000, () => {
            result.isLoading = false;
            result.error = new Error('Timeout');
            req.destroy();
            resolve(result);
        });
    });
}

module.exports = { fetchData };