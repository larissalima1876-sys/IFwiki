import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

interface CriarRecomendacao {
  avaliacao: number;
  titulo: string;
  descricao: string;
  observacao: string;
  fk_id_usuario: number;
  fk_id_lugar: number;
}

export class RecomendacaoService {
  async criar({
    avaliacao,
    titulo,
    descricao,
    observacao,
    fk_id_usuario,
    fk_id_lugar,
  }: CriarRecomendacao) {
    if (
      avaliacao === undefined ||
      !titulo ||
      !descricao ||
      !observacao ||
      !fk_id_usuario ||
      !fk_id_lugar
    ) {
      throw new AppError("Todos os campos sao obrigatorios.", 400);
    }

    if (!Number.isInteger(avaliacao) || avaliacao < 1 || avaliacao > 5) {
      throw new AppError("A avaliacao deve ser um numero de 1 a 5.", 400);
    }

    const usuario = await prisma.user.findUnique({
      where: { id: fk_id_usuario },
    });

    if (!usuario) {
      throw new AppError("Usuario nao encontrado.", 404);
    }

    const lugar = await prisma.lugar.findUnique({
      where: { id: fk_id_lugar },
    });

    if (!lugar) {
      throw new AppError("Lugar nao encontrado.", 404);
    }

    return await prisma.recomendacao.create({
      data: {
        avaliacao,
        titulo,
        descricao,
        observacao,
        usuario: {
          connect: { id: fk_id_usuario },
        },
        lugar: {
          connect: { id: fk_id_lugar },
        },
      },
    });
  }

  async listar() {
    return await prisma.recomendacao.findMany({
      include: {
        usuario: true,
        lugar: true,
      },
    });
  }

  async atualizar(
    id: number,
    {
      avaliacao,
      titulo,
      descricao,
      observacao,
      fk_id_usuario,
      fk_id_lugar,
    }: CriarRecomendacao
  ) {
    const recomendacao = await prisma.recomendacao.findUnique({
      where: { id },
    });

    if (!recomendacao) {
      throw new AppError("Recomendacao nao encontrada.", 404);
    }

    if (
      avaliacao === undefined ||
      !titulo ||
      !descricao ||
      !observacao ||
      !fk_id_usuario ||
      !fk_id_lugar
    ) {
      throw new AppError("Todos os campos sao obrigatorios.", 400);
    }

    if (!Number.isInteger(avaliacao) || avaliacao < 1 || avaliacao > 5) {
      throw new AppError("A avaliacao deve ser um numero de 1 a 5.", 400);
    }

    const usuario = await prisma.user.findUnique({
      where: { id: fk_id_usuario },
    });

    if (!usuario) {
      throw new AppError("Usuario nao encontrado.", 404);
    }

    const lugar = await prisma.lugar.findUnique({
      where: { id: fk_id_lugar },
    });

    if (!lugar) {
      throw new AppError("Lugar nao encontrado.", 404);
    }

    return await prisma.recomendacao.update({
      where: { id },
      data: {
        avaliacao,
        titulo,
        descricao,
        observacao,
        usuario: {
          connect: { id: fk_id_usuario },
        },
        lugar: {
          connect: { id: fk_id_lugar },
        },
      },
    });
  }

  async excluir(id: number) {
    const recomendacao = await prisma.recomendacao.findUnique({
      where: { id },
    });

    if (!recomendacao) {
      throw new AppError("Recomendacao nao encontrada.", 404);
    }

    return await prisma.recomendacao.delete({
      where: { id },
    });
  }
}
