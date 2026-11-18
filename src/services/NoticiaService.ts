import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

interface CriarNoticia {
  titulo: string;
  conteudo: string;
  data_publicacao: string;
  imagem: string;
  fk_id_usuario: number;
}

export class NoticiaService {
  async criar({
    titulo,
    conteudo,
    data_publicacao,
    imagem,
    fk_id_usuario,
  }: CriarNoticia) {
    if (!titulo || !conteudo || !data_publicacao || !imagem || !fk_id_usuario) {
      throw new AppError("Todos os campos sao obrigatorios.", 400);
    }

    const data = new Date(data_publicacao);

    if (isNaN(data.getTime())) {
      throw new AppError("Data de publicacao invalida.", 400);
    }

    const usuario = await prisma.user.findUnique({
      where: { id: fk_id_usuario },
    });

    if (!usuario) {
      throw new AppError("Usuario nao encontrado.", 404);
    }

    return await prisma.noticia.create({
      data: {
        titulo,
        conteudo,
        data_publicacao: data,
        imagem,
        usuario: {
          connect: { id: fk_id_usuario },
        },
      },
    });
  }

  async listar() {
    return await prisma.noticia.findMany();
  }

  async atualizar(
    id: number,
    {
      titulo,
      conteudo,
      data_publicacao,
      imagem,
      fk_id_usuario,
    }: CriarNoticia
  ) {
    const noticia = await prisma.noticia.findUnique({
      where: { id },
    });

    if (!noticia) {
      throw new AppError("Noticia nao encontrada.", 404);
    }

    if (!titulo || !conteudo || !data_publicacao || !imagem || !fk_id_usuario) {
      throw new AppError("Todos os campos sao obrigatorios.", 400);
    }

    const data = new Date(data_publicacao);

    if (isNaN(data.getTime())) {
      throw new AppError("Data de publicacao invalida.", 400);
    }

    const usuario = await prisma.user.findUnique({
      where: { id: fk_id_usuario },
    });

    if (!usuario) {
      throw new AppError("Usuario nao encontrado.", 404);
    }

    return await prisma.noticia.update({
      where: { id },
      data: {
        titulo,
        conteudo,
        data_publicacao: data,
        imagem,
        usuario: {
          connect: { id: fk_id_usuario },
        },
      },
    });
  }

  async excluir(id: number) {
    const noticia = await prisma.noticia.findUnique({
      where: { id },
    });

    if (!noticia) {
      throw new AppError("Noticia nao encontrada.", 404);
    }

    return await prisma.noticia.delete({
      where: { id },
    });
  }
}
