import { Document } from "../../../domain/entities/document";

export interface DocumentDataSource {
  create(document: Document): Promise<boolean>;
  getAll(): Promise<Document[]>;
  getWithFilter(filter: any): Promise<Document[]>;
}
