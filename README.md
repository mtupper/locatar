# My Local Gen AI LLM Chatbot

This is a local Gen AI LLM Chatbot built using TypeScript and Node.js. It uses an OpenSearch vector database to store document embeddings and a RAG (Retrieval-Augmented Generation) model to provide contextual responses to user queries.

## Prerequisites

- Node.js (version 14 or higher)
- TypeScript (version 4.9 or higher)
- OpenSearch (version 2.3 or higher)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/mtupper/locatar.git
   ```
2. Install the dependencies:
   ```
   cd locatar
   npm install
   ```
3. Start the OpenSearch server on `localhost:9200` with the default admin credentials.
4. Build the project:
   ```
   npm run build
   ```
5. Run the chatbot:
   ```
   npm start
   ```

## Usage

The chatbot will automatically load the documents from the `data/documents` directory and store their embeddings in the OpenSearch vector database. You can then interact with the chatbot by providing user input, and it will generate a response based on the retrieved context.

## Customization

- Add or update the documents in the `data/documents` directory to change the content that the chatbot can access.
- Modify the `RAGModel` class to fine-tune the language model or the response generation logic.
- Adjust the OpenSearch configuration in the `vectordb.ts` file if needed.

## Contributing

If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.
