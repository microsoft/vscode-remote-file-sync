import { workspace, Uri, window } from 'vscode';
import * as path from "path";

const outputChannel = window.createOutputChannel("vsfc");

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

const syncFileOn = async (path1_filePath: Uri, path2_filePath: Uri): Promise <void> => {
    try {
        const path1_FileData = await workspace.fs.readFile(path1_filePath);
        await workspace.fs.writeFile(path2_filePath, path1_FileData);
    } catch (error) {
        outputChannel.appendLine("Getting error on trying to sync.");
        outputChannel.appendLine(JSON.stringify(error));
    }
}
export {
    createFileOnLocal,
    syncFileOn
}