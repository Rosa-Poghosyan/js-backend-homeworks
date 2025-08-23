import {generateRandomFiles, getArgument, organizeFiles} from "./organize.js";
const create = getArgument('create');
const organize = getArgument('organize');

if (create) {
    await generateRandomFiles();
}

if (organize) {
   await organizeFiles('test')
}
