import { Document } from "../../entities/document";
import { DocumentRepository } from "../../interfaces/repositories/document-repository";
import { GetAllDocumentsUseCase } from "../../interfaces/use-cases/document/get-all-documents";

export class GetAllDocuments implements GetAllDocumentsUseCase {
  documentRepository: DocumentRepository;

  constructor(documentRepository: DocumentRepository) {
    this.documentRepository = documentRepository;
  }

  async execute(): Promise<Document[]> {
    const result = await this.documentRepository.getDocuments();

    return result;
  }
}
