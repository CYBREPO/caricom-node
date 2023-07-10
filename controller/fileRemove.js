import fs from 'fs';

const removeFiles = async (filePaths) => {

    try {
        filePaths.forEach(filePath => {
            const pathToFile = "public/" + filePath;
            fs.unlinkSync(pathToFile);
        });
        console.log("Successfully deleted the file.");

    } catch (err) {
        console.log("err",err.message);
    }
}

export default removeFiles