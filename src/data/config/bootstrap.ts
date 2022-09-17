import { config } from "dotenv";
import path from "path";

switch (process.env.NODE_ENV) {
  case "development":
    config({ path: path.join(__dirname, "../../../.env.dev") });
    break;
  case "test":
    config({ path: path.join(__dirname, "../../../.env.test") });
    break;
  default:
    config({ path: path.join(__dirname, "../../../.env") });
    break;
}
