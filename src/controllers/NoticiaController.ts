
import { Request, Response, NextFunction } from "express";
import { NoticiaService } from "../services/NoticiaService";

const noticiaService = new NoticiaService();

export class NoticiaController {
  async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        titulo,
        conteudo,
        data_publicacao,
        imagem,
        fk_id_usuario,
      } = req.body;

      const noticia = await noticiaService.criar({
        titulo,
        conteudo,
        data_publicacao,
        imagem,
        fk_id_usuario,
      });

      return res.status(201).json(noticia);
    } catch (error) {
      next(error);
    }
  }

  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const noticias = await noticiaService.listar();

      return res.status(200).json(noticias);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const {
        titulo,
        conteudo,
        data_publicacao,
        imagem,
        fk_id_usuario,
      } = req.body;

      const noticia = await noticiaService.atualizar(id, {
        titulo,
        conteudo,
        data_publicacao,
        imagem,
        fk_id_usuario,
      });

      return res.status(200).json(noticia);
    } catch (error) {
      next(error);
    }
  }

  async excluir(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      await noticiaService.excluir(id);

      return res.status(200).json({
        mensagem: "Noticia excluida com sucesso.",
      });
    } catch (error) {
      next(error);
    }
  }
}
