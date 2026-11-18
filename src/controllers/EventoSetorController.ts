import { Request, Response, NextFunction } from "express";
import { EventoSetorService } from "../services/EventoSetorService";

const eventoSetorService = new EventoSetorService();

export class EventoSetorController {
  async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const { fk_id_evento, fk_id_setor } = req.body;

      const relacionamento = await eventoSetorService.criar({
        fk_id_evento,
        fk_id_setor,
      });

      return res.status(201).json(relacionamento);
    } catch (error) {
      next(error);
    }
  }

  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const relacionamentos = await eventoSetorService.listar();

      return res.status(200).json(relacionamentos);
    } catch (error) {
      next(error);
    }
  }

  async excluir(req: Request, res: Response, next: NextFunction) {
    try {
      const fk_id_evento = Number(req.params.fk_id_evento);
      const fk_id_setor = Number(req.params.fk_id_setor);

      await eventoSetorService.excluir(fk_id_evento, fk_id_setor);

      return res.status(200).json({
        mensagem: "Relacionamento excluido com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  }
}