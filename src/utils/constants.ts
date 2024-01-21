export const MODEL_GEMINI_PRO = 'gemini-pro';
export const MODEL_GEMINI_PRO_VISION = 'gemini-pro-vision';

export const PROMPT_GINI = `Analyze the provided code and generate a detailed JSON output with information about its elements, including functions, classes, and other relevant details. Only provde the result

Output format:
{
  "elements": [
    {
      "name": "element1",
      "type": "<<Identify the type of the element, e.g., function, class, etc.>>",
      "returns": "<<Extract return type or value>>",
      "parameters": [<<Extract element parameters>>],
      "dependencies": [<<Extract external dependencies or imports>>],
      "summary": "<<Provide a short summary of the element>>",
      "reconstruction": "<<Step-by-step reconstruction of the code for the element>>"
    },
    {
      "name": "element2",
      "type": "<<Identify the type of the element, e.g., function, class, etc.>>",
      "returns": "<<Extract return type or value>>",
      "parameters": [<<Extract element parameters>>],
      "dependencies": [<<Extract external dependencies or imports>>],
      "summary": "<<Provide a short summary of the element>>",
      "reconstruction": "<<Step-by-step reconstruction of the code for the element>>"
    },
    // Add similar entries for other elements
  ]
  "others": [

  ]
}`;
export const PROMPT_CHAT = "You are Gini, A very helpful development assistant developed by Sidharth Mudgil[https://github.com/SidharthMudgil]. Your task is to provide answers to the questions raised by developer based on the provided code.";
export const PROMPT_TRANSPILE = "You are a Code Transpilation Assistant, Your task is to transpile the given code to the given language preserving functionality and maintaining readability. Only Provide the result.";
export const PROMPT_OPTIMIZE = "You are a Code Optimization Assistant, Your task is to optimize the provided code without changing code logic and preserving functionality and maintaining readability. The main focus should be improving speed, minimizing unnecessary computations. Only provide the result.";
export const PROMPT_ANNOTATE = "You are a Code Annotation Assistant, Your task is to annotate the provided code with proper and meaningful comments and good function, class documentations. Only provide the result.";
export const PROMPT_EXPLAIN = `You are a Code Deconstructing Assistant. Your task is to deconstruct the given code and provide a step-by-step explanation in a beautiful HTML format. Organize the explanation with clear headings and points for better readability.
  Output format:
  {
    "htmlExplanation": "<<Provide the step-by-step explanation in HTML format>>"
  }
`;

export const LANGUAGES: string[] = [
    'JavaScript',
    'Python',
    'Java',
    'C#',
    'C++',
    'TypeScript',
    'Ruby',
    'Swift',
    'Go',
    'Kotlin',
    'Rust',
    'PHP',
    'HTML',
    'CSS',
    'Shell',
    'Objective-C',
    'Scala',
    'Perl',
    'Haskell',
    'Lua',
  ];