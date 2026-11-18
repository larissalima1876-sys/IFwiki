import { Request, Response, NextFunction } from "express";
import { SetorService } from "../services/SetorService";

const setorService = new SetorService();

export class SetorController {
  async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const { descricao, nome, fk_id_usuario } = req.body;

      const setor = await setorService.criar({
        descricao,
        nome,
        fk_id_usuario,
      });

      return res.status(201).json(setor);
    } catch (error) {
      next(error);
    }
  }

  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const setores = await setorService.listar();
      return res.status(200).json(setores);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { descricao, nome, fk_id_usuario } = req.body;

      const setor = await setorService.atualizar(id, {
        descricao,
        nome,
        fk_id_usuario,
      });

      return res.status(200).json(setor);
    } catch (error) {
      next(error);
    }
  }

  async excluir(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      await setorService.excluir(id);

      return res.status(200).json({
        mensagem: "Setor excluido com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  }
}
