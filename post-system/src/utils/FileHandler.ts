import {readFile, writeFile} from 'fs/promises';

export const readData = async <T>(filePath: string): Promise<T[]> => {
    const content = await readFile(filePath, 'utf-8');
    return content? JSON.parse(content) as T[]: [];
}

export const writeData = async <T>(filePath: string, content: T[]): Promise<void> => {
    await writeFile(filePath, JSON.stringify(content), 'utf-8');
}