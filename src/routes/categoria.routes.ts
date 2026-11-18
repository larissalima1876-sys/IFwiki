import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriaController";

const categoriaRoutes = Router();

const categoriaController = new CategoriaController();

categoriaRoutes.post("/", (req, res, next) =>
  categoriaController.criar(req, res, next)
);

categoriaRoutes.get("/", (req, res, next) =>
  categoriaController.listar(req, res, next)
);

categoriaRoutes.put("/:id", (req, res, next) =>
  categoriaController.atualizar(req, res, next)
);

categoriaRoutes.delete("/:id", (req, res, next) =>
  categoriaController.excluir(req, res, next)
);

export default categoriaRoutes;