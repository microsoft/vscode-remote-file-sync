// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Uri } from 'vscode';
import * as path from "path";
import * as os from "os";
import { createFile, outputChannel, syncFileOn } from './common';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	outputChannel.appendLine("vscode-remote-file-sync is now active!");

	const codeSpaceBashHistoryPath = os.homedir();
	const codeSpaceBashHistoryFilePath = Uri.file(path.join(codeSpaceBashHistoryPath, ".bash_history"));
	const localBashHistoryFilePath = Uri.file(path.join("C:", "vscode_remote_sync_dir", ".bash_history")).with({scheme: "vscode-local"});

	await createFile(codeSpaceBashHistoryFilePath); // In case .bash_history doesn't exist on codespace
	await createFile(localBashHistoryFilePath);

	setInterval(async () => {
		await syncFileOn(localBashHistoryFilePath, codeSpaceBashHistoryFilePath);
	}, 60000);
}

// This method is called when your extension is deactivated
export function deactivate() {}
