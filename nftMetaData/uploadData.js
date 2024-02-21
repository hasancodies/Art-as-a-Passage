const fs = require('fs');
const path = require('path');
const folderPath = './metadata'; // Path to the folder where you want to save the files
// Create the folder if it doesn't exist
if (!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath, { recursive: true });
}
for (let index = 1; index <= 100; index++) {
    const fileName = `${index}.json`;
    const fileContent = {
        name: `E-Book ${index}`,
        image: `https://ipfs.io/ipfs/QmfVhsL7id3kuGRb7zMpDb7HkscrchjQtDNbgKGBKwAV8r/${index}.png`
    };
    fs.writeFile(path.join(folderPath, fileName), JSON.stringify(fileContent, null, 2), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`${fileName} was created successfully`);
    });
}