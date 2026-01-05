const fs = require('fs')
fs.mkdirSync('dist', { recursive: true })
fs.copyFileSync('src/upload.scss', 'dist/upload.scss')
