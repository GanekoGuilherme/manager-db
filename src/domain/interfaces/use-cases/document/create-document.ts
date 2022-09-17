import { Document } from "../../../entities/document";

export interface CreateDocumentUseCase {
  execute(document: Document): Promise<boolean>;
}
