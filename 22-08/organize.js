import fsp from "fs/promises";
import path from "path";
import { constants } from "fs";

/**
 * Retrieves a command-line argument from process.argv.
 *
 * @param {string} arg - The argument name to look for (e.g. "create").
 * @returns {string|null} The argument string if found, otherwise `null`.
 */
export const getArgument = (arg) => {
    const index =  process.argv.indexOf(arg);
    return index !== -1 ?  process.argv[index] : null;
}

/**
 * Lists files in a directory if it exists.
 *
 * @async
 * @function listFiles
 * @param {string} path - The path to the directory.
 * @returns {Promise<string[]>} A promise that resolves with an array of file names,
 * or an empty array if the directory does not exist.
 */
async function listFiles(path) {
    return await dirExists(path) === true ?  await fsp.readdir(path) : [];
}

/**
 * Checks whether a directory or file exists at the given path.
 *
 * @async
 * @function dirExists
 * @param {string} path - The path to the directory or file to check.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the path exists, `false` otherwise.
 */
async function dirExists(path) {
    try {
        await fsp.access(path, constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

/**
 * Generates a random file with random content in the specified directory.
 * If the directory does not exist, it will be created.
 *
 * @async
 * @function generateRandomFile
 * @param {string} [dir='test'] - The directory where the file should be created.
 * @returns {Promise<void>} A promise that resolves when the file has been created.
 */
export const generateRandomFile = async (dir = 'test') => {
    const randomName = () => Math.random().toString(36).substring(2, 15);
    const extensions = [".txt", ".md", ".json", ".js", ".html", ".pdf"];
    const ext = extensions[Math.floor(Math.random() * extensions.length)];
    const filename = randomName() + ext;
    if (await dirExists(dir) === false) {
        await fsp.mkdir(dir);
    }
    const filepath = path.join(dir, filename);
    const content = `Random content for ${filename}`;
    await fsp.writeFile(filepath, content);
}

/**
 * Generates multiple random files in the specified directory.
 * Utilizes `generateRandomFile` for each file.
 *
 * @async
 * @function generateRandomFiles
 * @param {number} [count=150] - The number of random files to create.
 * @param {string} [dir='test'] - The directory where the files should be created.
 * @returns {Promise<void>} A promise that resolves when all files have been created.
 */
export const generateRandomFiles = async (count = 150, dir = 'test') => {
    for (let i = 0; i < count; ++i) {
        await generateRandomFile(dir);
    }
}


/**
 * Organizes files from a source directory into subdirectories in the destination directory
 * based on their file extensions. Creates subdirectories as needed.
 *
 * @async
 * @function organizeFiles
 * @param {string} [sourceDir='test'] - The directory containing files to organize.
 * @param {string} [destinationDir='result'] - The directory where files should be moved and organized.
 * @returns {Promise<void>} A promise that resolves when all files have been organized.
 */
export const organizeFiles = async (sourceDir = 'test', destinationDir = 'result') => {
    const files = await listFiles(sourceDir);
    if(files.length > 0) {
        for (const file of files) {
            const ext = path.extname(file).substring(1);
            if(ext) {
                const extDir = path.join(destinationDir, ext);
                if(await dirExists(extDir) === false) {
                    await fsp.mkdir(extDir, { recursive: true });
                }
                const oldPath = path.join(sourceDir, file);
                const newPath = path.join(extDir, file);
                await fsp.rename(oldPath, newPath);
            }
        }
    } else {
        console.log(`No files found in directory: ${sourceDir}`);
    }
}