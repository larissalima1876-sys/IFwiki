import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

interface CriarSetor {
  descricao: string;
  nome: string;
  fk_id_usuario: number;
}

export class SetorService {
  async criar({ descricao, nome, fk_id_usuario }: CriarSetor) {
    if (!descricao || !nome || !fk_id_usuario) {
      throw new AppError("Todos os campos sao obrigatorios.", 400);
    }

    const usuario = await prisma.user.findUnique({
      where: { id: fk_id_usuario },
    });

    if (!usuario) {
      throw new AppError("Usuario nao encontrado.", 404);
    }

    return await prisma.setor.create({
      data: {
        descricao,
        nome,
        usuario: {
          connect: { id: fk_id_usuario },
        },
      },
    });
  }

  async listar() {
    return await prisma.setor.findMany({
      include: {
        usuario: true,
        eventos: true,
      },
    });
  }

  async atualizar(
    id: number,
    { descricao, nome, fk_id_usuario }: CriarSetor
  ) {
    const setor = await prisma.setor.findUnique({
      where: { id },
    });

    if (!setor) {
      throw new AppError("Setor nao encontrado.", 404);
    }

    if (!descricao || !nome || !fk_id_usuario) {
      throw new AppError("Todos os campos sao obrigatorios.", 400);
    }

    const usuario = await prisma.user.findUnique({
      where: { id: fk_id_usuario },
    });

    if (!usuario) {
      throw new AppError("Usuario nao encontrado.", 404);
    }

    return await prisma.setor.update({
      where: { id },
      data: {
        descricao,
        nome,
        usuario: {
          connect: { id: fk_id_usuario },
        },
      },
    });
  }

  async excluir(id: number) {
    const setor = await prisma.setor.findUnique({
      where: { id },
      include: {
        eventos: true,
      },
    });

    if (!setor) {
      throw new AppError("Setor nao encontrado.", 404);
    }

    if (setor.eventos.length > 0) {
      throw new AppError(
        "Nao e possivel excluir um setor vinculado a eventos.",
        400
      );
    }

    return await prisma.setor.delete({
      where: { id },
    });
  }
}
