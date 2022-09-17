import { Document } from "../../entities/document";
import { DocumentRepository } from "../../interfaces/repositories/document-repository";
import { GetWithFilterDocumentsUseCase } from "../../interfaces/use-cases/document/get-with-filter-documents";

export class GetWithFilterDocuments implements GetWithFilterDocumentsUseCase {
  documentRepository: DocumentRepository;

  constructor(documentRepository: DocumentRepository) {
    this.documentRepository = documentRepository;
  }

  async execute(filter: any): Promise<Document[]> {
    const result = await this.documentRepository.getDocumentsWithFilter(filter);

    return result;
  }
}
