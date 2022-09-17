export interface Document {
  _id: string;
  [key: string]: string | number | Date | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}
