import { Document } from "../../../domain/entities/document";
import { DataBaseWrapper } from "../../interfaces/data-sources/database-wrapper";
import { DocumentDataSource } from "../../interfaces/data-sources/document-data-source";
import parserRegex from "regex-parser";

export class MongoDBDocumentDataSource implements DocumentDataSource {
  private database: DataBaseWrapper;

  constructor(database: DataBaseWrapper) {
    this.database = database;
  }

  async create(document: Document): Promise<boolean> {
    const result = await this.database.insertOne(document);

    return result !== null;
  }

  async getAll(): Promise<Document[]> {
    const result = await this.database.find({});

    return result.map((item) => {
      const obj: any = undefined || {};

      Object.keys(item).forEach((key) => {
        if (key === "_id") {
          obj._id = item._id.toString();
        }
        obj[key] = item[key];
      });

      return obj;
    });
  }

  async getWithFilter(filterRaw: any): Promise<Document[]> {
    const filterTreated = filterRaw.query.replace(/{/, "").replace(/}/, "");
    const queries = filterTreated.split(",");
    const filter: any = undefined || {};

    for (const query of queries) {
      // separando query entre chave e valor (:)
      const obj = query.split(":");

      // tratando a chave para remover os espaços em branco
      const key = obj[0].replace(/ /g, "");

      // tratando o valor para utilizar somente o que está dentro do regex (/)
      const value = obj[1].split("/")[1];

      // adicionando a query no filtro
      filter[key.replace(/"/g, "")] = parserRegex(value);
    }

    const result = await this.database.find(filter);

    return result.map((item) => {
      const obj: any = undefined || {};

      Object.keys(item).forEach((key) => {
        if (key === "_id") {
          obj._id = item._id.toString();
        }
        obj[key] = item[key];
      });

      return obj;
    });
  }
}
