import { Router } from "express";
import { PaginaCursoController } from "../controllers/PaginaCursoController";

const paginaCursoRoutes = Router();

const paginaCursoController = new PaginaCursoController();

paginaCursoRoutes.post("/", (req, res, next) =>
  paginaCursoController.criar(req, res, next)
);

export default paginaCursoRoutes;