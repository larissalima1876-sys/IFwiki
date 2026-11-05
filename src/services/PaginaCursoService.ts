import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

interface CriarPaginaCurso {
  titulo: string;
  conteudo: string;
  fk_id_categoria: number;
}

export class PaginaCursoService {
  async criar({ titulo, conteudo, fk_id_categoria }: CriarPaginaCurso) {
    if (!titulo || !conteudo) {
      throw new AppError("Título e conteúdo são obrigatórios.", 400);
    }

    const categoria = await prisma.categoria.findUnique({
      where: {
        id: fk_id_categoria,
      },
    });

    if (!categoria) {
      throw new AppError("Categoria não encontrada.", 404);
    }

    const pagina = await prisma.paginaCurso.create({
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

    return pagina;
  }
}