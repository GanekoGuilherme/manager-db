const MONGO_URL = process.env.MONGO_URL || "";
const DATABASE = process.env.DATABASE || "";
const COLLECTION = process.env.COLLECTION || "";
const PORT = process.env.PORT || 4000;
const AUTH = process.env.AUTH || "";

export { MONGO_URL, DATABASE, COLLECTION, PORT, AUTH };
