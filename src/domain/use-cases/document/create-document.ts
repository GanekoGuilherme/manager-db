import { Document } from "../../entities/document";
import { DocumentRepository } from "../../interfaces/repositories/document-repository";
import { CreateDocumentUseCase } from "../../interfaces/use-cases/document/create-document";

export class CreateDocument implements CreateDocumentUseCase {
  documentRepository: DocumentRepository;

  constructor(documentRepository: DocumentRepository) {
    this.documentRepository = documentRepository;
  }

  async execute(document: Document): Promise<boolean> {
    const result = await this.documentRepository.createDocument(document);

    return result;
  }
}
