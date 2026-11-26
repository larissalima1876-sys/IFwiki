import { Router } from "express";
import { ArquivoController } from "../controllers/ArquivoController";

const arquivoRoutes = Router();
const arquivoController = new ArquivoController();

arquivoRoutes.post("/", (req, res, next) =>
    arquivoController.criar(req, res, next)
);

arquivoRoutes.get("/", (req, res, next) =>
    arquivoController.listar(req, res, next)
);

arquivoRoutes.get("/:id", (req, res, next) =>
    arquivoController.buscarPorId(req, res, next)
);

arquivoRoutes.put("/:id", (req, res, next) =>
    arquivoController.atualizar(req, res, next)
);

arquivoRoutes.delete("/:id", (req, res, next) =>
    arquivoController.excluir(req, res, next)
);

export default arquivoRoutes;