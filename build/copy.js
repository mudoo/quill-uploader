const fs = require('fs')
fs.mkdirSync('es', { recursive: true })
fs.copyFileSync('src/upload.scss', 'es/upload.scss')
