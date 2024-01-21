import * as vscode from "vscode";

export function getActiveDocumentText(
  codeSelection: boolean = false
): string {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage("Gini: No active text editor found.");
    return '';
  }

  const selection = editor.selection;

  if (codeSelection && !selection.isEmpty) {
    return editor.document.getText(selection);
  } else {
    return editor.document.getText();
  }
}

export function copyToClipboard(codeSelection: boolean = false): void {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage("Gini: No active code editor found.");
    return;
  }

  const selection = editor.selection;

  if (codeSelection && !selection.isEmpty) {
    // If codeSelection is true and there's a selection, copy the selected text
    const selectedText = editor.document.getText(selection);
    vscode.env.clipboard.writeText(selectedText).then(
      () => {
        vscode.window.showInformationMessage(
          "Gini: Copied selection to clipboard!"
        );
      },
      (error) => {
        vscode.window.showErrorMessage(
          `Gini: Error copying selection to clipboard: ${error}`
        );
      }
    );
  } else {
    // If codeSelection is false or there's no selection, copy the entire content
    const entireText = editor.document.getText();
    vscode.env.clipboard.writeText(entireText).then(
      () => {
        vscode.window.showInformationMessage(
          "Gini: Copied entire code to clipboard!"
        );
      },
      (error) => {
        vscode.window.showErrorMessage(
          `Gini: Error copying entire code to clipboard: ${error}`
        );
      }
    );
  }
}

export function replaceWithClipboard(codeSelection: boolean = false): void {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage("Gini: No active code editor found.");
    return;
  }

  const selection = editor.selection;

  vscode.env.clipboard.readText().then(
    (clipboardContent) => {
      if (!clipboardContent) {
        vscode.window.showWarningMessage("Gini: Clipboard is empty.");
        return;
      }

      editor
        .edit((editBuilder) => {
          if (codeSelection && !selection.isEmpty) {
            editBuilder.replace(selection, clipboardContent);
          } else {
            const entireTextRange = new vscode.Range(
              new vscode.Position(0, 0),
              editor.document.lineAt(editor.document.lineCount - 1).range.end
            );
            editBuilder.replace(entireTextRange, clipboardContent);
          }
        })
        .then(
          () => {
            vscode.window.showInformationMessage(
              "Gini: Code replaced with clipboard content!"
            );
          },
          (error) => {
            vscode.window.showErrorMessage(
              `Gini: Error replacing code: ${error}`
            );
          }
        );
    },
    (error) => {
      vscode.window.showErrorMessage(
        `Gini: Error reading clipboard content: ${error}`
      );
    }
  );
}
