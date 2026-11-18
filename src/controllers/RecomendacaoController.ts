import { Request, Response, NextFunction } from "express";
import { RecomendacaoService } from "../services/RecomendacaoService";

const recomendacaoService = new RecomendacaoService();

export class RecomendacaoController {
  async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        avaliacao,
        titulo,
        descricao,
        observacao,
        fk_id_usuario,
        fk_id_lugar,
      } = req.body;

      const recomendacao = await recomendacaoService.criar({
        avaliacao,
        titulo,
        descricao,
        observacao,
        fk_id_usuario,
        fk_id_lugar,
      });

      return res.status(201).json(recomendacao);
    } catch (error) {
      next(error);
    }
  }

  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const recomendacoes = await recomendacaoService.listar();
      return res.status(200).json(recomendacoes);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const {
        avaliacao,
        titulo,
        descricao,
        observacao,
        fk_id_usuario,
        fk_id_lugar,
      } = req.body;

      const recomendacao = await recomendacaoService.atualizar(id, {
        avaliacao,
        titulo,
        descricao,
        observacao,
        fk_id_usuario,
        fk_id_lugar,
      });

      return res.status(200).json(recomendacao);
    } catch (error) {
      next(error);
    }
  }

  async excluir(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      await recomendacaoService.excluir(id);

      return res.status(200).json({
        mensagem: "Recomendacao excluida com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  }
}
