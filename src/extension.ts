// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Uri } from 'vscode';
import * as path from "path";
import * as os from "os";
import { createFileOnLocal, syncFileOn } from './common';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-remote-file-sync" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-remote-file-sync.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const codeSpaceBashHistoryPath = os.homedir();
		const codeSpaceBashHistoryFilePath = path.join(codeSpaceBashHistoryPath, ".bash_history");
		const localBashHistoryFilePath = path.join("C:", "vscode_remote_sync_dir", ".bash_history");

		await createFileOnLocal(localBashHistoryFilePath);
		await syncFileOn(Uri.file(localBashHistoryFilePath).with({scheme: "vscode-local"}), Uri.file(codeSpaceBashHistoryFilePath));

		vscode.window.showInformationMessage('Hello World from vscode-remote-file-sync!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
