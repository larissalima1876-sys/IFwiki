import { Router } from "express";
import { PaginaCursoController } from "../controllers/PaginaCursoController";

const paginaCursoRoutes = Router();

const paginaCursoController = new PaginaCursoController();

paginaCursoRoutes.post("/", (req, res, next) =>
  paginaCursoController.criar(req, res, next)
);

paginaCursoRoutes.get("/", (req, res, next) =>
  paginaCursoController.listar(req, res, next)
);

paginaCursoRoutes.put("/:id", (req, res, next) =>
  paginaCursoController.atualizar(req, res, next)
);

paginaCursoRoutes.delete("/:id", (req, res, next) =>
  paginaCursoController.excluir(req, res, next)
);

export default paginaCursoRoutes;