import express, { Express, Request, Response } from 'express';
import { RAGModel } from './rag';
import { OpenSearchVectorDB } from './vectordb';
import { loadDocuments } from './utils';

const app: Express = express();
app.use(express.json());

async function main() {
  // Load documents into the vector database
  const documents = await loadDocuments('data/documents');
  const vectorDB = new OpenSearchVectorDB();
  await vectorDB.storeDocumentEmbeddings(documents);

  // Initialize the RAG model
  const ragModel = new RAGModel(vectorDB);

  // API endpoint for the chatbot
  app.post('/api/chatbot', async (req: Request, res: Response) => {
    const { userInput } = req.body;
    const response = await ragModel.generateResponse(userInput);
    res.json({ response });
  });

  app.use(express.static('frontend'));

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

main();
