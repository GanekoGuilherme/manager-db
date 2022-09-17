import { Document } from "../../../entities/document";

export interface GetAllDocumentsUseCase {
  execute(): Promise<Document[]>;
}
