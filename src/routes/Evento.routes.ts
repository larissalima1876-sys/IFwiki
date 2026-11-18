import { Router } from "express";
import { EventoController } from "../controllers/EventoController";

const eventoRoutes = Router();
const eventoController = new EventoController();

eventoRoutes.post("/", (req, res, next) =>
  eventoController.criar(req, res, next)
);

eventoRoutes.get("/", (req, res, next) =>
  eventoController.listar(req, res, next)
);

eventoRoutes.put("/:id", (req, res, next) =>
  eventoController.atualizar(req, res, next)
);

eventoRoutes.delete("/:id", (req, res, next) =>
  eventoController.excluir(req, res, next)
);

export default eventoRoutes;
