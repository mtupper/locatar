import fs from 'fs';
import path from 'path';

export async function loadDocuments(directoryPath: string): Promise<{ id: string; content: string }[]> {
  const files = await fs.promises.readdir(directoryPath);
  const documents = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directoryPath, file);
      const content = await fs.promises.readFile(filePath, 'utf8');
      return { id: file, content };
    })
  );
  return documents;
}
