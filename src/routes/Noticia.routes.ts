import { Router } from "express";
import { NoticiaController } from "../controllers/NoticiaController";

const noticiaRoutes = Router();

const noticiaController = new NoticiaController();

noticiaRoutes.post("/", (req, res, next) =>
  noticiaController.criar(req, res, next)
);

noticiaRoutes.get("/", (req, res, next) =>
  noticiaController.listar(req, res, next)
);

noticiaRoutes.put("/:id", (req, res, next) =>
  noticiaController.atualizar(req, res, next)
);

noticiaRoutes.delete("/:id", (req, res, next) =>
  noticiaController.excluir(req, res, next)
);

export default noticiaRoutes;