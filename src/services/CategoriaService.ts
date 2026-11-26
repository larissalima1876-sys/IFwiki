import { prisma } from "../lib/prisma";
import { AppError } from "../utils/appError";

interface CriarCategoria {
  nome: string;
  descricao: string;
}

export class CategoriaService {
  async criar({ nome, descricao }: CriarCategoria) {
    if (!nome || !descricao) {
      throw new AppError("Nome e descrição são obrigatórios.", 400);
    }

    const categoria = await prisma.categoria.create({
      data: {
        nome,
        descricao,
      },
    });

    return categoria;
  }

  async listar() {
    return await prisma.categoria.findMany();
  }

  async atualizar(id: number, { nome, descricao }: CriarCategoria) {
    const categoriaExiste = await prisma.categoria.findUnique({
      where: { id },
    });

    if (!categoriaExiste) {
      throw new AppError("Categoria não encontrada.", 404);
    }

    if (!nome || !descricao) {
      throw new AppError("Nome e descrição são obrigatórios.", 400);
    }

    return await prisma.categoria.update({
      where: { id },
      data: {
        nome,
        descricao,
      },
    });
  }

  async excluir(id: number) {
    const categoria = await prisma.categoria.findUnique({
      where: { id },
      include: {
        paginas: true,
      },
    });

    if (!categoria) {
      throw new AppError("Categoria não encontrada.", 404);
    }

    if (categoria.paginas.length > 0) {
      throw new AppError(
        "Não é possível excluir uma categoria que possui páginas vinculadas.",
        400
      );
    }

    return await prisma.categoria.delete({
      where: { id },
    });
  }
}