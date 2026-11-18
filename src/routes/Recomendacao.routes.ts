import { Router } from "express";
import { RecomendacaoController } from "../controllers/RecomendacaoController";

const recomendacaoRoutes = Router();
const recomendacaoController = new RecomendacaoController();

recomendacaoRoutes.post("/", (req, res, next) =>
  recomendacaoController.criar(req, res, next)
);

recomendacaoRoutes.get("/", (req, res, next) =>
  recomendacaoController.listar(req, res, next)
);

recomendacaoRoutes.put("/:id", (req, res, next) =>
  recomendacaoController.atualizar(req, res, next)
);

recomendacaoRoutes.delete("/:id", (req, res, next) =>
  recomendacaoController.excluir(req, res, next)
);

export default recomendacaoRoutes;
