import * as vscode from 'vscode';
import getGeminiApiKey from './utils/getConfig';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "gini" is now active!');

	let disposable = vscode.commands.registerCommand('gini.run', () => {
		getGeminiApiKey();
		// vscode.window.showInformationMessage('Hello World from Sidharth!');
		// vscode.window.showErrorMessage("wronf");
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}