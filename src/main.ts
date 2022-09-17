import "./data/config/bootstrap";

import { MongoClient } from "mongodb";
import { MongoDBDocumentDataSource } from "./data/data-sources/mongodb/mongodb-document-data-source";
import { DataBaseWrapper } from "./data/interfaces/data-sources/database-wrapper";
import { DocumentRepositoryImpl } from "./domain/repositories/document-repository";
import { CreateDocument } from "./domain/use-cases/document/create-document";
import { GetAllDocuments } from "./domain/use-cases/document/get-all-documents";
import DocumentsRouter from "./presentation/routers/document-router";
import server from "./server";
import { COLLECTION, DATABASE, MONGO_URL, PORT } from "./data/config/constants";
import ensureAuthorization from "./presentation/middlewares/ensureAuthorization";
import { GetWithFilterDocuments } from "./domain/use-cases/document/get-with-filter-documents";

(async () => {
  const client: MongoClient = new MongoClient(MONGO_URL);
  await client.connect();
  const db = client.db(DATABASE);

  const documentDatabase: DataBaseWrapper = {
    find: (query) => db.collection(COLLECTION).find(query).toArray(),
    insertOne: (doc) => db.collection(COLLECTION).insertOne(doc),
  };

  const documentMiddleware = DocumentsRouter(
    new GetAllDocuments(
      new DocumentRepositoryImpl(
        new MongoDBDocumentDataSource(documentDatabase)
      )
    ),
    new CreateDocument(
      new DocumentRepositoryImpl(
        new MongoDBDocumentDataSource(documentDatabase)
      )
    ),
    new GetWithFilterDocuments(
      new DocumentRepositoryImpl(
        new MongoDBDocumentDataSource(documentDatabase)
      )
    )
  );

  server.use("/document", ensureAuthorization, documentMiddleware);
  server.listen(PORT, () => console.log("Server is running!!!"));
})();
