import * as vscode from "vscode";
import Commands from "../utils/commands";

export class GiniSidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = Commands.Run;

  private _view?: vscode.WebviewView;

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
  }

  private getHtmlContent(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "src", "sidebar", "main.js")
    );
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "src", "sidebar", "reset.css")
    );
    const styleSideBar = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "src", "sidebar", "sidebar.css")
    );
    const stylesheetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "src", "sidebar", "main.css")
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
				<link href="${styleSideBar}" rel="stylesheet">
        <link href="${stylesheetUri}" rel="stylesheet">
				
			</head>

			<body>
			<section class="wrapper">
      <div class="container">
            <div class="content">
                <h2 class="subtitle">Subscribe today</h2>
                <input type="text" class="mail" placeholder="Your email address" name="mail" required>
                
                <button class="add-color-button">Subscribe</button>
                
                <p class="text">We won’t send you spam.</p>
                <p class="text">Unsubscribe at any time.</p>
                
            </div>
      </div>
			</section>
			<script nonce="${nonce}" src="${scriptUri}"></script>
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
