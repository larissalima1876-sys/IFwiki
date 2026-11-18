import { Request, Response, NextFunction } from "express";
import { CursoService } from "../services/CursoService";

const cursoService = new CursoService();

export class CursoController {
  async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        nome,
        descricao,
        duracao,
        turno,
        modalidade,
        fk_id_pagina,
      } = req.body;

      const curso = await cursoService.criar({
        nome,
        descricao,
        duracao,
        turno,
        modalidade,
        fk_id_pagina,
      });

      return res.status(201).json(curso);
    } catch (error) {
      next(error);
    }
  }

  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const cursos = await cursoService.listar();

      return res.status(200).json(cursos);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const {
        nome,
        descricao,
        duracao,
        turno,
        modalidade,
        fk_id_pagina,
      } = req.body;

      const curso = await cursoService.atualizar(id, {
        nome,
        descricao,
        duracao,
        turno,
        modalidade,
        fk_id_pagina,
      });

      return res.status(200).json(curso);
    } catch (error) {
      next(error);
    }
  }

  async excluir(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      await cursoService.excluir(id);

      return res.status(200).json({
        mensagem: "Curso excluido com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  }
}