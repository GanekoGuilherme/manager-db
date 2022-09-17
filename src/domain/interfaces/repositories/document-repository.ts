import { Document } from "../../entities/document";

export interface DocumentRepository {
  createDocument(document: Document): Promise<boolean>;
  getDocuments(): Promise<Document[]>;
  getDocumentsWithFilter(filter: any): Promise<Document[]>;
}
