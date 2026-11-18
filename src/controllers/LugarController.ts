import { Request, Response, NextFunction } from "express";
import { LugarService } from "../services/LugarService";

const lugarService = new LugarService();

export class LugarController {
  async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        nome,
        observacao,
        tipo,
        localizacao,
        imagem,
        fk_id_usuario,
      } = req.body;

      const lugar = await lugarService.criar({
        nome,
        observacao,
        tipo,
        localizacao,
        imagem,
        fk_id_usuario,
      });

      return res.status(201).json(lugar);
    } catch (error) {
      next(error);
    }
  }

  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const lugares = await lugarService.listar();
      return res.status(200).json(lugares);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const {
        nome,
        observacao,
        tipo,
        localizacao,
        imagem,
        fk_id_usuario,
      } = req.body;

      const lugar = await lugarService.atualizar(id, {
        nome,
        observacao,
        tipo,
        localizacao,
        imagem,
        fk_id_usuario,
      });

      return res.status(200).json(lugar);
    } catch (error) {
      next(error);
    }
  }

  async excluir(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      await lugarService.excluir(id);

      return res.status(200).json({
        mensagem: "Lugar excluido com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  }
}