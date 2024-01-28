import * as vscode from "vscode";
import Commands from "../utils/commands";
import { continueChat, getGemini } from "../extension";

export class GiniSidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = Commands.Run;

  _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext<unknown>,
    token: vscode.CancellationToken
  ): void | Thenable<void> {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };
    webviewView.webview.html = this.getHtmlContent(webviewView.webview);
   
    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "onAsk": {
          vscode.window.showInformationMessage("Gini: Generating Answer");
          continueChat(data.value);
          break;
        }

        case "onInfo": {
          vscode.window.showInformationMessage(data.value);
          break;
        }

        case "onError": {
          vscode.window.showErrorMessage(data.value);
          break;
        }
      }
    });
  }

  private getHtmlContent(webview: vscode.Webview): string {
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "webview", "reset.css")
    );

    const stylesheetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "webview", "main.css")
    );

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "webview", "main.js")
    );

    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="https://unpkg.com/modern-css-reset/dist/reset.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Muli:wght@300;400;700&display=swap" rel="stylesheet">

				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${stylesheetUri}" rel="stylesheet">
        <script nonce="${nonce}">
          const tsvscode = acquireVsCodeApi();
        </script>
			</head>

			<body>
      <body>
        <div class="outer-container">
          <div class="chat-container">
          </div>
          <div class="input-container">
              <div class="input" style="width: 100%;">
                  <input type="text" id="messageInput" placeholder="Ask a question...">
              </div>
              <div class="send-button"> <button onclick="sendMessage()">Ask</button></div>
          </div>
        </div>
        <script nonce="${nonce}" src="${scriptUri}" ></script>
      </body>
			</html>`;
  }
}

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
