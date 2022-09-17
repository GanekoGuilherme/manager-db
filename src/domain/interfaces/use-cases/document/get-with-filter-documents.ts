import { Document } from "../../../entities/document";

export interface GetWithFilterDocumentsUseCase {
  execute(filter: any): Promise<Document[]>;
}
