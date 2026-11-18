import { Request, Response, NextFunction } from "express";
import { CategoriaService } from "../services/CategoriaService";

const categoriaService = new CategoriaService();

export class CategoriaController {
  async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const { nome, descricao } = req.body;

      const categoria = await categoriaService.criar({
        nome,
        descricao,
      });

      return res.status(201).json(categoria);
    } catch (error) {
      next(error);
    }
  }

  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const categorias = await categoriaService.listar();

      return res.status(200).json(categorias);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { nome, descricao } = req.body;

      const categoria = await categoriaService.atualizar(id, {
        nome,
        descricao,
      });

      return res.status(200).json(categoria);
    } catch (error) {
      next(error);
    }
  }

  async excluir(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      await categoriaService.excluir(id);

      return res.status(200).json({
        mensagem: "Categoria excluída com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  }
}