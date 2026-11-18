import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

interface CriarPaginaCurso {
  titulo: string;
  conteudo: string;
  fk_id_categoria: number;
}

export class PaginaCursoService {
  async criar({ titulo, conteudo, fk_id_categoria }: CriarPaginaCurso) {
    if (!titulo || !conteudo || !fk_id_categoria) {
      throw new AppError("Título, conteúdo e categoria são obrigatórios.", 400);
    }

    const categoria = await prisma.categoria.findUnique({
      where: {
        id: fk_id_categoria,
      },
    });

    if (!categoria) {
      throw new AppError("Categoria não encontrada.", 404);
    }

    return await prisma.paginaCurso.create({
      data: {
        titulo,
        conteudo,
        data_atualizacao: new Date(),
        categoria: {
          connect: {
            id: fk_id_categoria,
          },
        },
      },
    });
  }

  async listar() {
    return await prisma.paginaCurso.findMany({
      include: {
        categoria: true,
      },
    });
  }

  async atualizar(id: number, { titulo, conteudo, fk_id_categoria }: CriarPaginaCurso) {
    if (!titulo || !conteudo || !fk_id_categoria) {
      throw new AppError("Título, conteúdo e categoria são obrigatórios.", 400);
    }

    const pagina = await prisma.paginaCurso.findUnique({
      where: {
        id,
      },
    });

    if (!pagina) {
      throw new AppError("Página não encontrada.", 404);
    }

    const categoria = await prisma.categoria.findUnique({
      where: {
        id: fk_id_categoria,
      },
    });

    if (!categoria) {
      throw new AppError("Categoria não encontrada.", 404);
    }

    return await prisma.paginaCurso.update({
      where: {
        id,
      },
      data: {
        titulo,
        conteudo,
        data_atualizacao: new Date(),
        categoria: {
          connect: {
            id: fk_id_categoria,
          },
        },
      },
    });
  }

  async excluir(id: number) {
    const pagina = await prisma.paginaCurso.findUnique({
      where: {
        id,
      },
      include: {
        cursos: true,
      },
    });

    if (!pagina) {
      throw new AppError("Página não encontrada.", 404);
    }

    if (pagina.cursos.length > 0) {
      throw new AppError(
        "Não é possível excluir uma página que possui cursos vinculados.",
        400
      );
    }

    return await prisma.paginaCurso.delete({
      where: {
        id,
      },
    });
  }
}