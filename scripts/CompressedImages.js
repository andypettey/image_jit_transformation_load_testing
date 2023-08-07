const http = require('http');
const fs = require('fs');

function downloadFile(url, destinationPath, callback) {
    const file = fs.createWriteStream(destinationPath);

    http.get(url, (response) => {
        // Check if the request was successful
        if (response.statusCode !== 200) {
            return callback(`Failed to download file. HTTP status code: ${response.statusCode}`);
        }

        response.pipe(file);

        // Close the file stream when the download is complete
        file.on('finish', () => {
            file.close(() => {
                callback(null, `File downloaded and saved to ${destinationPath}`);
            });
        });

        // Handle errors during download
        response.on('error', (err) => {
            fs.unlink(destinationPath, () => { }); // Delete the partially downloaded file
            callback(`Error during download: ${err.message}`);
        });
    }).on('error', (err) => {
        callback(`Failed to establish connection to the URL: ${err.message}`);
    });
}

let filesToBeDownloadedWithPaths = new Map()

for (let i = 1; i <= 30; i++) {
    const url = `http://imgproxy_1:8080/insecure/quality:70/plain/local:///${i}.jpg@jpg`;
    const destinationPath = `/imgs/compressed/${i}-compressed.jpg`;
    filesToBeDownloadedWithPaths.set(url, destinationPath);
    const urlResized = `http://imgproxy_1:8080/insecure/size:3240/quality:90/plain/local:///${i}.jpg@jpg`;
    const destinationPathResized = `/imgs/compressed/${i}-resized.jpg`;
    filesToBeDownloadedWithPaths.set(urlResized, destinationPathResized);
    const urlResizedCompressed = `http://imgproxy_1:8080/insecure/size:3240/quality:70/plain/local:///${i}.jpg@jpg`;
    const destinationPathResizedCompressed = `/imgs/compressed/${i}-resized-compressed.jpg`;
    filesToBeDownloadedWithPaths.set(urlResizedCompressed, destinationPathResizedCompressed);


}
for (let [url, destinationPath] of filesToBeDownloadedWithPaths) {
    if (!fs.existsSync(destinationPath)) {
        downloadFile(url, destinationPath, (error, message) => {
            if (error) {
                console.error(error);
            } else {
                console.log(message);
            }
        });
    } else{
        console.log(`File downloaded already: ${destinationPath}`)
    }
}


let outputFilesToBeDownloadedWithPaths = new Map()

for (let i = 1; i <= 30; i++) {
    const urlK6 = `http://imgproxy_1:8080/insecure/rs:fit:1920:1080/plain/local:///compressed/${i}-compressed.jpg@jpg`
    const destinationK6 = `/imgs/output/${i}-compressed.jpg`;
    outputFilesToBeDownloadedWithPaths.set(urlK6, destinationK6);
    const urlK6Resized = `http://imgproxy_1:8080/insecure/rs:fit:1920:1080/plain/local:///compressed/${i}-resized.jpg@jpg`
    const destinationK6Resized = `/imgs/output/${i}-resized.jpg`;
    outputFilesToBeDownloadedWithPaths.set(urlK6Resized, destinationK6Resized);
    const urlK6ResizedCompressed = `http://imgproxy_1:8080/insecure/rs:fit:1920:1080/plain/local:///compressed/${i}-resized-compressed.jpg@jpg`
    const destinationK6ResizedCompressed = `/imgs/output/${i}-resized-compressed.jpg`;
    outputFilesToBeDownloadedWithPaths.set(urlK6ResizedCompressed, destinationK6ResizedCompressed);
}
for (let [url, destinationPath] of outputFilesToBeDownloadedWithPaths) {
    if (!fs.existsSync(destinationPath)) {
        downloadFile(url, destinationPath, (error, message) => {
            if (error) {
                console.error(error);
            } else {
                console.log(message);
            }
        });
    } else{
        console.log(`File downloaded already: ${destinationPath}`)
    }
}