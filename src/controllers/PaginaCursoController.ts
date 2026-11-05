import { Request, Response, NextFunction } from "express";
import { PaginaCursoService } from "../services/PaginaCursoService";

const paginaCursoService = new PaginaCursoService();

export class PaginaCursoController {
  async criar(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { titulo, conteudo, fk_id_categoria } = req.body;

      const pagina = await paginaCursoService.criar({
        titulo,
        conteudo,
        fk_id_categoria: Number(fk_id_categoria),
      });

      return res.status(201).json(pagina);
    } catch (error) {
      next(error);
    }
  }
}