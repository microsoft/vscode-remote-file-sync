import { workspace, Uri, window } from 'vscode';
import * as path from "path";

const outputChannel = window.createOutputChannel("vsfc");
/*
const createFileOnLocal = async (localPath: string): Promise<void> => {
    const localFilePath = Uri.file(localPath).with({ scheme: "vscode-local" });
    const localFileDirectory = Uri.file(path.dirname(localPath)).with({ scheme: "vscode-local" });

    try {
        await workspace.fs.stat(localFilePath);
    } catch (error) {
        await workspace.fs.createDirectory(localFileDirectory);
        await workspace.fs.writeFile(localFilePath, Buffer.from(''));
    }
}
*/

const createFile = async (filePath: Uri): Promise<void> => {
    const fileDirectory = Uri.file(path.dirname(filePath.path)).with({scheme: filePath.scheme});

    try {
        await workspace.fs.stat(filePath);
    } catch (error) {
        outputChannel.appendLine("error on creating file: " +  JSON.stringify(error));
        await workspace.fs.createDirectory(fileDirectory);
        await workspace.fs.writeFile(filePath, Buffer.from(''));
    }
}
/*
const syncFileOn = async (path1_filePath: Uri, path2_filePath: Uri): Promise <void> => {
    try {
        const path1_FileData = await workspace.fs.readFile(path1_filePath);
        await workspace.fs.writeFile(path2_filePath, path1_FileData);
    } catch (error) {
        outputChannel.appendLine("Getting error on trying to sync.");
        outputChannel.appendLine(JSON.stringify(error));
    }
}
*/
const writeFile = async (path1_filePath: Uri, path2_filePath: Uri): Promise <void> => {
    try {
        const path1_FileData = await workspace.fs.readFile(path1_filePath);
        await workspace.fs.writeFile(path2_filePath, path1_FileData);
    } catch (error) {
        outputChannel.appendLine("Getting error on trying to sync.");
        outputChannel.appendLine(JSON.stringify(error));
    }
}

const syncFileOn = async (path1_filePath: Uri, path2_filePath: Uri): Promise <void> => {
    try {
        const path1_FileData = await workspace.fs.stat(path1_filePath);
        const path12_FileData = await workspace.fs.stat(path2_filePath);
        
        if (path1_FileData.size > path12_FileData.size) {
            await appendFile(path1_filePath, path2_filePath);
        } else {
            await appendFile(path1_filePath, path2_filePath);
        }
        outputChannel.appendLine("File syncing is completed.");
    } catch (error) {
        outputChannel.appendLine("Getting error on trying to sync.");
        outputChannel.appendLine(JSON.stringify(error));
    }
}

const appendFile = async (filePath1: Uri, filePath2: Uri) => {
    try {
        const fileContent1 = await workspace.fs.readFile(filePath1);
        const fileContent2 = await workspace.fs.readFile(filePath2);

        // Convert Uint8Array to string, split into lines, and filter out empty lines
        const lines1 = new TextDecoder().decode(fileContent1).split('\n').filter(line => line.trim() !== '');
        const lines2 = new TextDecoder().decode(fileContent2).split('\n').filter(line => line.trim() !== '');

        // Merge arrays and remove duplicates
        const mergedLines = Array.from(new Set([...lines1, ...lines2]));

        // Convert back to Uint8Array and add a newline character at the end
        const finalFileContent = new TextEncoder().encode(mergedLines.join('\n') + '\n');

        // Update both files
        await workspace.fs.writeFile(filePath1, finalFileContent);
        await workspace.fs.writeFile(filePath2, finalFileContent);
    } catch (error) {
        outputChannel.appendLine(`Error while appending data`);
        outputChannel.appendLine(JSON.stringify(error));
    }
}

export {
    createFile,
    syncFileOn,
    outputChannel
}