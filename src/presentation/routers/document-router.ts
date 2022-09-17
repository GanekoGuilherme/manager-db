import express from "express";
import { Request, Response } from "express";
import { CreateDocumentUseCase } from "../../domain/interfaces/use-cases/document/create-document";
import { GetAllDocumentsUseCase } from "../../domain/interfaces/use-cases/document/get-all-documents";
import { GetWithFilterDocumentsUseCase } from "../../domain/interfaces/use-cases/document/get-with-filter-documents";

export default function DocumentsRouter(
  getAllDocumentsUseCase: GetAllDocumentsUseCase,
  createDocumentUseCase: CreateDocumentUseCase,
  getWithFilterDocumentsUseCase: GetWithFilterDocumentsUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const documents = await getAllDocumentsUseCase.execute();
      res.send(documents);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Erro ao carregar documentos." });
    }
  });

  router.get("/filter", async (req: Request, res: Response) => {
    try {
      const documents = await getWithFilterDocumentsUseCase.execute(req.query);
      res.send(documents);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Erro ao carregar documentos." });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      await createDocumentUseCase.execute(req.body);
      res.statusCode = 201;
      res.json({ message: "Cadastrado." });
    } catch (err) {
      res.status(500).send({ message: "Erro ao cadastrar documento." });
    }
  });

  return router;
}
