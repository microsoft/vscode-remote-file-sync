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
    } catch (error) {
        outputChannel.appendLine("Getting error on trying to sync.");
        outputChannel.appendLine(JSON.stringify(error));
    }
}

const appendFile = async (filePath1: Uri, filePath2: Uri) => {
    try {
        const fileContent1 = await workspace.fs.readFile(filePath1);
        const fileContent2 = await workspace.fs.readFile(filePath2);
    
        // To be updated: Adding fileContent of file1 before file2 for now
        let finalFileContent: Uint8Array = new Uint8Array([ ...fileContent1, ...fileContent2 ]);
        
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