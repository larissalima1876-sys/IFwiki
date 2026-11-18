import { Request, Response, NextFunction } from "express";
import { EventoService } from "../services/EventoService";

const eventoService = new EventoService();

export class EventoController {
  async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        titulo,
        descricao,
        local,
        data_inicio,
        data_fim,
        fk_id_usuario,
      } = req.body;

      const evento = await eventoService.criar({
        titulo,
        descricao,
        local,
        data_inicio,
        data_fim,
        fk_id_usuario,
      });

      return res.status(201).json(evento);
    } catch (error) {
      next(error);
    }
  }

  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const eventos = await eventoService.listar();
      return res.status(200).json(eventos);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const {
        titulo,
        descricao,
        local,
        data_inicio,
        data_fim,
        fk_id_usuario,
      } = req.body;

      const evento = await eventoService.atualizar(id, {
        titulo,
        descricao,
        local,
        data_inicio,
        data_fim,
        fk_id_usuario,
      });

      return res.status(200).json(evento);
    } catch (error) {
      next(error);
    }
  }

  async excluir(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      await eventoService.excluir(id);

      return res.status(200).json({
        mensagem: "Evento excluido com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  }
}
