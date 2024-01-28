import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import {
  MODEL_GEMINI_PRO,
  PROMPT_ANNOTATE,
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
  chatHistory: ChatHistoryItem[];

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

  async optimizeCode(code: String): Promise<string> {
    const prompt = `${PROMPT_OPTIMIZE} code: ${code}`;
    const result = await this.model.generateContent(prompt);

    const response = result.response;
    const text = response.text();

    return text;
  }

  async transpileCode(code: String, to: String): Promise<string> {
    const prompt = `${PROMPT_TRANSPILE} code: ${code} transpile to: ${to}`;
    const result = await this.model.generateContent(prompt);

    const response = result.response;
    const text = response.text();

    return text;
  }

  async annotateCode(code: String): Promise<string> {
    const prompt = `${PROMPT_ANNOTATE} code: ${code}`;
    const result = await this.model.generateContent(prompt);

    const response = result.response;
    const text = response.text();

    return text;
  }

  async explainCode(code: String): Promise<string> {
    const prompt = `${PROMPT_EXPLAIN} code: ${code}`;
    const result = await this.model.generateContent(prompt);

    const response = result.response;
    const text = response.text();

    return text;
  }
}

export default Gemini;
