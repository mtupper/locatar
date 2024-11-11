import { OpenAI } from 'openai';
import OllamaModel from 'ollama';
import OllamaModelType from 'ollama';
import { VectorDB } from './vectordb';
require('dotenv').config();

const openaiApiKey = process.env.OPENAI_API_KEY;

interface GenerateResponse {
  text: string;
  // Add any other properties that ollama.generate returns
}

export class RAGModel {
  private openai: OpenAI;
  private ollama: typeof OllamaModelType;

  constructor(private vectorDB: VectorDB) {
    // Configure OpenAI
    const openaiConfig = {
      apiKey: openaiApiKey
    };
    this.openai = new OpenAI(openaiConfig);

    // Initialize Ollama
    this.ollama = OllamaModel;
  }

  async generateResponse(userInput: string): Promise<string> {
    // Retrieve relevant context from the vector database
    const contextIds = await this.vectorDB.searchEmbeddings(userInput, 3);
    const context = await this.vectorDB.getDocumentContent(contextIds);

    // Generate a response using the RAG approach
    const response = await this.generateResponseWithContext(userInput, context);
    return response;
  }

  private async generateResponseWithContext(
    userInput: string,
    context: string[]
  ): Promise<string> {
    // Use the OpenAI API to generate embeddings for the user input
    const userInputEmbedding = await this.openai.embeddings.create({
      input: userInput,
      model: 'text-embedding-ada-002'
    });

    // Use the Ollama model to generate a response based on the user input and context
    const prompt = `User input: ${userInput}\nContext: ${context.join('\n')}\nResponse:`;
    const generateRequest = {
      prompt: prompt,
      model: 'llama3.1:latest',
      // Add other necessary fields for the GenerateRequest here
    };
    const rawResponse = await this.ollama.generate(generateRequest);
    console.log(rawResponse); // This will show you the actual structure of the response

    // Now you can see what properties are available and adjust the GenerateResponse type accordingly
    const generateResponse: GenerateResponse = {
      text: rawResponse.response
    };

    // Handle the response correctly
    if (generateResponse.text) {
      return generateResponse.text;
    } else {
      throw new Error('No response generated');
    }
  }
}
