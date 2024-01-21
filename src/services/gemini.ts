import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import {
  MODEL_GEMINI_PRO,
  PROMPT_ANNOTATE,
  PROMPT_CHAT,
  PROMPT_EXPLAIN,
  PROMPT_GINI,
  PROMPT_OPTIMIZE,
  PROMPT_TRANSPILE,
} from "../utils/constants";

interface ChatHistoryItem {
  role: "user" | "model";
  parts: string;
}

class Gemini {
  private model: GenerativeModel;
  private genAI: GoogleGenerativeAI;
  private chatHistory: ChatHistoryItem[];

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: MODEL_GEMINI_PRO });
    this.chatHistory = [];
  }

  async continueChat(message: string): Promise<string> {
    const chat = this.model.startChat({
      history: this.chatHistory,
      generationConfig: {
        maxOutputTokens: 200,
      },
    });

    const result = await chat.sendMessage(message);

    const response = result.response;
    const text = response.text();

    this.chatHistory.push({ role: "user", parts: message });
    this.chatHistory.push({ role: "model", parts: text });

    return text;
  }

  async runAssistant(code: String): Promise<string> {
    const prompt = PROMPT_GINI;
    const result = await this.model.generateContent(prompt);
    
    const response = result.response;
    const text = response.text();
    
    const chatPrompt = PROMPT_CHAT;
    this.chatHistory.push({ role: "user", parts: chatPrompt });

    return text;
  }

  async optimizeCode(code: String): Promise<string> {
    const prompt = PROMPT_OPTIMIZE;
    const result = await this.model.generateContent(prompt);

    const response = result.response;
    const text = response.text();

    return text;
  }

  async transpileCode(code: String): Promise<string> {
    const prompt = PROMPT_TRANSPILE;
    const result = await this.model.generateContent(prompt);

    const response = result.response;
    const text = response.text();

    return text;
  }

  async annotateCode(code: String): Promise<string> {
    const prompt = PROMPT_ANNOTATE;
    const result = await this.model.generateContent(prompt);

    const response = result.response;
    const text = response.text();

    return text;
  }

  async explainCode(code: String): Promise<string> {
    const prompt = PROMPT_EXPLAIN;
    const result = await this.model.generateContent(prompt);

    const response = result.response;
    const text = response.text();

    return text;
  }
}

export default Gemini;
