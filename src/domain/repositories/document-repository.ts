import { DocumentDataSource } from "../../data/interfaces/data-sources/document-data-source";
import { Document } from "../entities/document";
import { DocumentRepository } from "../interfaces/repositories/document-repository";

export class DocumentRepositoryImpl implements DocumentRepository {
  documentDataSource: DocumentDataSource;

  constructor(documentDataSource: DocumentDataSource) {
    this.documentDataSource = documentDataSource;
  }

  async createDocument(document: Document): Promise<boolean> {
    const result = await this.documentDataSource.create(document);

    return result;
  }

  async getDocuments(): Promise<Document[]> {
    const result = await this.documentDataSource.getAll();

    return result;
  }

  async getDocumentsWithFilter(filter: any): Promise<Document[]> {
    const result = await this.documentDataSource.getWithFilter(filter);

    return result;
  }
}
