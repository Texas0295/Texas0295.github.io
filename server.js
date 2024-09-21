const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const articlesDir = path.join(".", '/pages/articles');

// 靜態資源伺服
app.use(express.static("."));

// 取得 articles 資料夾下的所有 HTML 檔案名稱
app.get('/api/get_articles', (req, res) => {
    fs.readdir(articlesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: '無法讀取 articles 資料夾' });
        }
        const htmlFiles = files.filter(file => file.endsWith('.html'));
        res.json(htmlFiles);
    });
});

// 啟動伺服器
app.listen(3000, () => {
    console.log('伺服器啟動於 http://localhost:3000');
});
