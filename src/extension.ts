// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { workspace, Uri, window } from 'vscode';
import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { createFileOnLocal } from './common';

const outputChannel = window.createOutputChannel("VSCode Remote Sync");

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
		const codeSpaceBashHistoryPath = Uri.file(os.homedir());
		const codeSpaceBashHistoryFilePath = Uri.joinPath(codeSpaceBashHistoryPath, ".bash_history");
		const localBashHistoryFilePath = path.join("C:", "vscode_remote_sync_dir", ".bash_history");

		await createFileOnLocal(localBashHistoryFilePath);

		try {
			const codeSpaceBashHistoryData = await workspace.fs.readFile(codeSpaceBashHistoryFilePath);
			outputChannel.appendLine(JSON.stringify(codeSpaceBashHistoryData.toString()));
			await workspace.fs.writeFile(Uri.file(localBashHistoryFilePath).with({ scheme: "vscode-local" }), codeSpaceBashHistoryData);
			
		} catch (error) {
			outputChannel.appendLine("error-1");
			outputChannel.appendLine(JSON.stringify(error));
		}

		try {
			const codeSpaceBashHistoryData = await workspace.fs.readFile(codeSpaceBashHistoryFilePath);
			outputChannel.appendLine(JSON.stringify(codeSpaceBashHistoryData));
			await workspace.fs.writeFile(Uri.file(localBashHistoryFilePath), Buffer.from("Hello world"));
			
		} catch (error) {
			outputChannel.appendLine("error-2");
			outputChannel.appendLine(JSON.stringify(error));
		}

		try {
			outputChannel.appendLine("Reading the file");
			const codeSpaceBashHistoryData = await workspace.fs.readFile(codeSpaceBashHistoryFilePath);
			outputChannel.appendLine(JSON.stringify(codeSpaceBashHistoryData));
			outputChannel.appendLine("Deleting the file");
			await workspace.fs.delete(Uri.file(localBashHistoryFilePath), { recursive: false, useTrash: false });
			//await workspace.fs.writeFile(Uri.file(localBashHistoryFilePath), Buffer.from("Hello world"));
			
		} catch (error) {
			outputChannel.appendLine("error-3");
			outputChannel.appendLine(JSON.stringify(error));
		}

		vscode.window.showInformationMessage('Hello World from vscode-remote-file-sync!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
