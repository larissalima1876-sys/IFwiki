import { Router } from "express";
import { SetorController } from "../controllers/SetorController";

const setorRoutes = Router();
const setorController = new SetorController();

setorRoutes.post("/", (req, res, next) =>
  setorController.criar(req, res, next)
);

setorRoutes.get("/", (req, res, next) =>
  setorController.listar(req, res, next)
);

setorRoutes.put("/:id", (req, res, next) =>
  setorController.atualizar(req, res, next)
);

setorRoutes.delete("/:id", (req, res, next) =>
  setorController.excluir(req, res, next)
);

export default setorRoutes;
