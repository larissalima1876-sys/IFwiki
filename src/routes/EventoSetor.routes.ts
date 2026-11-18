import { Router } from "express";
import { EventoSetorController } from "../controllers/EventoSetorController";

const eventoSetorRoutes = Router();
const eventoSetorController = new EventoSetorController();

eventoSetorRoutes.post("/", (req, res, next) =>
  eventoSetorController.criar(req, res, next)
);

eventoSetorRoutes.get("/", (req, res, next) =>
  eventoSetorController.listar(req, res, next)
);

export default eventoSetorRoutes;
