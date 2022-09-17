export interface DataBaseWrapper {
  find(query: object): Promise<any[]>;
  insertOne(doc: any): Promise<any>;
}
