import { workspace, Uri, } from 'vscode';
import * as path from "path";


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

export {
    createFileOnLocal
}