"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rag_1 = require("./rag");
const vectordb_1 = require("./vectordb");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Load documents into the vector database
        const documents = yield (0, utils_1.loadDocuments)('data/documents');
        const vectorDB = new vectordb_1.OpenSearchVectorDB();
        yield vectorDB.storeDocumentEmbeddings(documents);
        // Initialize the RAG model
        const ragModel = new rag_1.RAGModel(vectorDB);
        // API endpoint for the chatbot
        app.post('/api/chatbot', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userInput } = req.body;
            const response = yield ragModel.generateResponse(userInput);
            res.json({ response });
        }));
        app.use(express_1.default.static('frontend'));
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    });
}
main();
