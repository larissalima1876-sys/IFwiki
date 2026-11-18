import { Router } from "express";
import { LugarController } from "../controllers/LugarController";

const lugarRoutes = Router();
const lugarController = new LugarController();

lugarRoutes.post("/", (req, res, next) =>
  lugarController.criar(req, res, next)
);

lugarRoutes.get("/", (req, res, next) =>
  lugarController.listar(req, res, next)
);

lugarRoutes.put("/:id", (req, res, next) =>
  lugarController.atualizar(req, res, next)
);

lugarRoutes.delete("/:id", (req, res, next) =>
  lugarController.excluir(req, res, next)
);

export default lugarRoutes;
