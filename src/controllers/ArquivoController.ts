import { Request, Response, NextFunction } from "express";
import { ArquivoService } from "../services/ArquivoService";

const arquivoService = new ArquivoService();

export class ArquivoController {
  async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const arquivo = await arquivoService.criar(req.body);
      return res.status(201).json(arquivo);
    } catch (error) {
      next(error);
    }
  }

  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const arquivos = await arquivoService.listar();
      return res.status(200).json(arquivos);
    } catch (error) {
      next(error);
    }
  }

  async buscarPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const arquivo = await arquivoService.buscarPorId(id);
      return res.status(200).json(arquivo);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const arquivo = await arquivoService.atualizar(id, req.body);
      return res.status(200).json(arquivo);
    } catch (error) {
      next(error);
    }
  }

  async excluir(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await arquivoService.excluir(id);

      return res.status(200).json({
        mensagem: "Arquivo excluido com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  }
}