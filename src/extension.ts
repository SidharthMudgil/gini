import * as vscode from "vscode";
import getGeminiApiKey from "./utils/getConfig";
import Commands from "./utils/commands";
import Gemini from "./services/gemini";
import {
  copyToClipboard,
  getActiveDocumentText,
  replaceWithClipboard,
} from "./utils/helpers";
import { LANGUAGES, PROMPT_GINI } from "./utils/constants";
import { GiniSidebarProvider } from "./sidebar/SidebarProvider";

let gemini: Gemini | null = null;
let sidebarProvider: GiniSidebarProvider;

export function activate(context: vscode.ExtensionContext) {
  let optimize = vscode.commands.registerCommand(
    Commands.Optimize,
    async () => {
      generateShowResult(Commands.Optimize);
    }
  );

  let transpile = vscode.commands.registerCommand(
    Commands.Transpile,
    async () => {
      generateShowResult(Commands.Transpile);
    }
  );

  let annotate = vscode.commands.registerCommand(
    Commands.Annotate,
    async () => {
      generateShowResult(Commands.Annotate);
    }
  );

  let deconstruct = vscode.commands.registerCommand(
    Commands.Deconstruct,
    async () => {
      generateShowResult(Commands.Deconstruct);
    }
  );

  let copy = vscode.commands.registerCommand(Commands.Copy, async () => {
    copyToClipboard();
  });

  let replace = vscode.commands.registerCommand(Commands.Replace, async () => {
    replaceWithClipboard();
  });

  sidebarProvider = new GiniSidebarProvider(context.extensionUri);

  let webViewProvider = vscode.window.registerWebviewViewProvider(
    GiniSidebarProvider.viewType,
    sidebarProvider
  );

  context.subscriptions.push(
    webViewProvider,
    optimize,
    transpile,
    annotate,
    deconstruct,
    copy,
    replace
  );
}

export async function continueChat(message: string) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    console.log("here");
    vscode.window.showErrorMessage("Gini: No active code editor found.");
    return;
  }
  gemini = gemini || new Gemini(await getGeminiApiKey());

  if (gemini.chatHistory.length === 0) {
    message = `${PROMPT_GINI} code: ${getActiveDocumentText()} \n my first question is: ${message}`;
  }

  const result = await gemini.continueChat(message);
  sidebarProvider?._view?.webview.postMessage({
    type: "gini-result",
    value: result,
  });
}

export async function getGemini(): Promise<Gemini> {
  return gemini || new Gemini(await getGeminiApiKey());
}

export async function generateShowResult(command: Commands) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage("Gini: No active code editor found.");
    return;
  }

  gemini = gemini || new Gemini(await getGeminiApiKey());
  let languageId = editor.document.languageId;

  let result = "";
  vscode.window.showInformationMessage("Gini: Generating results...");
  switch (command) {
    case Commands.Optimize: {
      result = await gemini.optimizeCode(getActiveDocumentText());
      break;
    }
    case Commands.Transpile: {
      const language = await vscode.window.showQuickPick(LANGUAGES);

      if (!language) {
        vscode.window.showErrorMessage("Gini: No target language selected.");
        return;
      }

      result = await gemini.transpileCode(getActiveDocumentText(), language);
      break;
    }
    case Commands.Annotate: {
      result = await gemini.annotateCode(getActiveDocumentText());
      break;
    }
    case Commands.Deconstruct: {
      result = await gemini.explainCode(getActiveDocumentText());
      languageId = "plaintext";
      break;
    }
    default:
      throw new Error(`Unknown command: ${command}`);
  }

  result = result
    .replace(/^```[\w]+|```$/g, "")
    .trim()
    .replace(/^\n+|\n+$/g, "");

  vscode.workspace
    .openTextDocument({
      content: result,
      language: languageId || "plaintext",
    })
    .then((doc) => {
      vscode.window.showTextDocument(doc, {
        viewColumn: vscode.ViewColumn.Beside,
        preserveFocus: true,
      });
    });
}

export function deactivate() {}
