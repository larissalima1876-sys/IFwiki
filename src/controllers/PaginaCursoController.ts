import { Request, Response, NextFunction } from "express";
import { PaginaCursoService } from "../services/PaginaCursoService";

const paginaCursoService = new PaginaCursoService();

export class PaginaCursoController {
  async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const { titulo, conteudo, fk_id_categoria } = req.body;

      const pagina = await paginaCursoService.criar({
        titulo,
        conteudo,
        fk_id_categoria,
      });

      return res.status(201).json(pagina);
    } catch (error) {
      next(error);
    }
  }

  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const paginas = await paginaCursoService.listar();

      return res.status(200).json(paginas);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { titulo, conteudo, fk_id_categoria } = req.body;

      const pagina = await paginaCursoService.atualizar(id, {
        titulo,
        conteudo,
        fk_id_categoria,
      });

      return res.status(200).json(pagina);
    } catch (error) {
      next(error);
    }
  }

  async excluir(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      await paginaCursoService.excluir(id);

      return res.status(200).json({
        mensagem: "Página excluída com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  }
}