import { Router } from "express";
import { HistoriaController } from "../controllers/HistoriaController";

const historiaRoutes = Router();
const historiaController = new HistoriaController();

historiaRoutes.post("/", (req, res, next) =>
  historiaController.criar(req, res, next)
);

historiaRoutes.get("/", (req, res, next) =>
  historiaController.listar(req, res, next)
);

historiaRoutes.get("/:id", (req, res, next) =>
  historiaController.buscarPorId(req, res, next)
);

historiaRoutes.put("/:id", (req, res, next) =>
  historiaController.atualizar(req, res, next)
);

historiaRoutes.delete("/:id", (req, res, next) =>
  historiaController.excluir(req, res, next)
);

export default historiaRoutes;