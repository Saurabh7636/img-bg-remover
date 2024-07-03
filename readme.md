# Background Removal Tool

This tool utilizes the `@imgly/background-removal-node` package to remove backgrounds from images in a specified directory recursively.

## Installation

1. Clone the repository:

    ```bash
      git clone https://github.com/Saurabh7636/img-bg-remover.git
      cd img-bg-remover
    ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. **Setup Input Directory:**
   - Place images to process in the `input` directory.
   - Maintain any desired subdirectory structure within `input`.

2. **Configure Input and Output Paths:**
   - Open `index.js` and set `inputDir` and `outputDir` to your desired directories:

     ```javascript
     const inputDir = '/path/to/your/input/directory';
     const outputDir = '/path/to/your/output/directory';
     ```

3. **Run the Script:**
   - Execute the script to process images:

     ```bash
     node index.js
     ```

4. **View Processed Images:**
   - Processed images with transparent backgrounds will be saved in the `output` directory.

## Configuration

- **Customization**: Adjust `index.js` to modify image processing settings or output format (e.g., JPEG, PNG).


## Input File Structure

The tool recursively processes images in the `input` directory. It expects the following structure:

```
input/
├── image1.jpg
├── image2.png
└── folder/
    ├── subfolder/
    │   └── image3.jpg
    └── image4.jpeg
```

- **`input/`**: Root directory containing images.
- **Subdirectories**: Any nested subdirectories containing additional images.
- **Supported Formats**: Images in `.jpg`, `.jpeg`, or `.png` formats are supported for background removal.


## Dependencies

- **[@imgly/background-removal-node](https://www.npmjs.com/package/@imgly/background-removal-node)**: Background removal functionality.