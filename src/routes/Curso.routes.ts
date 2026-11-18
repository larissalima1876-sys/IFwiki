import { Router } from "express";
import { CursoController } from "../controllers/CursoController";

const cursoRoutes = Router();

const cursoController = new CursoController();

cursoRoutes.post("/", (req, res, next) =>
  cursoController.criar(req, res, next)
);

cursoRoutes.get("/", (req, res, next) =>
  cursoController.listar(req, res, next)
);

cursoRoutes.put("/:id", (req, res, next) =>
  cursoController.atualizar(req, res, next)
);

cursoRoutes.delete("/:id", (req, res, next) =>
  cursoController.excluir(req, res, next)
);

export default cursoRoutes;