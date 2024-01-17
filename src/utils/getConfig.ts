import * as vscode from 'vscode';

async function getGeminiApiKey(): Promise<string> {
  const config = vscode.workspace.getConfiguration('gini');

  let apiKey: string | undefined = config.get('geminiApiKey');

  if (!apiKey) {
    apiKey = await vscode.window.showInputBox({
      prompt: 'Enter your Gemini API key',
      placeHolder: 'API key',
    });

    if (apiKey !== undefined) {
      await config.update('geminiApiKey', apiKey, vscode.ConfigurationTarget.Global);
    } else {
      vscode.window.showErrorMessage("Gini: Gemini API Key is required.");
    }
  }

  return apiKey || '';
}

export default getGeminiApiKey;
