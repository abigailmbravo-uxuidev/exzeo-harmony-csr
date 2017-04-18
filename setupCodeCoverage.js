const fs = require('fs');

fs.createReadStream('createJestConfig.js').pipe(fs.createWriteStream('./node_modules/react-scripts/utils/createJestConfig.js'));
