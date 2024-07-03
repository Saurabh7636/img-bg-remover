// Importing necessary modules
const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const path = require('path');

// Function to remove background from an image
async function removeImageBackground(imgSource) {
    try {
        // Removing background
        const blob = await removeBackground(imgSource);

        // Converting Blob to buffer
        const buffer = Buffer.from(await blob.arrayBuffer());

        // Generating data URL
        const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;
        
        // Returning the data URL
        return dataURL;
    } catch (error) {
        // Handling errors
        throw new Error('Error removing background: ' + error);
    }
}

// Function to recursively process images in a directory
async function processImages(inputDir, outputDir) {
    try {
        // Read contents of the directory
        const entries = await fs.promises.readdir(inputDir, { withFileTypes: true });

        // Iterate through directory contents
        for (const entry of entries) {
            const inputPath = path.join(inputDir, entry.name);
            const outputPath = path.join(outputDir, entry.name);

            if (entry.isDirectory()) {
                // Recursively process subdirectory
                await fs.promises.mkdir(outputPath, { recursive: true });
                await processImages(inputPath, outputPath);
            } else if (entry.isFile() && /\.(jpg|jpeg|png)$/i.test(entry.name)) {
                // Process image file
                const resultDataURL = await removeImageBackground(inputPath);
                const outputFilePath = path.join(outputDir, entry.name.replace(/\.\w+$/, '.png'));

                // Write processed image to output directory
                fs.writeFileSync(outputFilePath, resultDataURL.split(';base64,').pop(), { encoding: 'base64' });
                console.log(`Processed: ${inputPath} -> ${outputFilePath}`);
            } else {
                // Skip non-image files
                console.log(`Skipping: ${inputPath} (unsupported format)`);
            }
        }
    } catch (error) {
        console.error('Error processing images:', error);
    }
}

// Example usage: Specify input and output directories
const inputDir = 'input';
const outputDir = 'output';

// Ensure output directory exists
fs.mkdirSync(outputDir, { recursive: true });

// Call function to process images recursively
processImages(inputDir, outputDir)
    .then(() => console.log('Image processing completed.'))
    .catch((error) => console.error('Image processing failed:', error));
