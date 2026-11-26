import { Request, Response, NextFunction } from "express";
import { HistoriaService } from "../services/HistoriaService";

const historiaService = new HistoriaService();

export class HistoriaController {
  async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const historia = await historiaService.criar(req.body);
      return res.status(201).json(historia);
    } catch (error) {
      next(error);
    }
  }

  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const historias = await historiaService.listar();
      return res.status(200).json(historias);
    } catch (error) {
      next(error);
    }
  }

  async buscarPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const historia = await historiaService.buscarPorId(id);
      return res.status(200).json(historia);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const historia = await historiaService.atualizar(id, req.body);
      return res.status(200).json(historia);
    } catch (error) {
      next(error);
    }
  }

  async excluir(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await historiaService.excluir(id);

      return res.status(200).json({
        mensagem: "Historia excluida com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  }
}