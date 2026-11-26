import { prisma } from "../lib/prisma";
import { AppError } from "../utils/appError";

interface CriarLugar {
  nome: string;
  observacao: string;
  tipo: string;
  localizacao: string;
  imagem: string;
  fk_id_usuario: number;
}

export class LugarService {
  async criar({
    nome,
    observacao,
    tipo,
    localizacao,
    imagem,
    fk_id_usuario,
  }: CriarLugar) {
    if (
      !nome ||
      !observacao ||
      !tipo ||
      !localizacao ||
      !imagem ||
      !fk_id_usuario
    ) {
      throw new AppError("Todos os campos sao obrigatorios.", 400);
    }

    const usuario = await prisma.user.findUnique({
      where: { id: fk_id_usuario },
    });

    if (!usuario) {
      throw new AppError("Usuario nao encontrado.", 404);
    }

    return await prisma.lugar.create({
      data: {
        nome,
        observacao,
        tipo,
        localizacao,
        imagem,
        usuario: {
          connect: { id: fk_id_usuario },
        },
      },
    });
  }

  async listar() {
    return await prisma.lugar.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            name: true,
            email: true,
            tipo: true,
          },
        },
      },
    });
  }

  async atualizar(
    id: number,
    {
      nome,
      observacao,
      tipo,
      localizacao,
      imagem,
      fk_id_usuario,
    }: CriarLugar
  ) {
    const lugar = await prisma.lugar.findUnique({
      where: { id },
    });

    if (!lugar) {
      throw new AppError("Lugar nao encontrado.", 404);
    }

    if (
      !nome ||
      !observacao ||
      !tipo ||
      !localizacao ||
      !imagem ||
      !fk_id_usuario
    ) {
      throw new AppError("Todos os campos sao obrigatorios.", 400);
    }

    const usuario = await prisma.user.findUnique({
      where: { id: fk_id_usuario },
    });

    if (!usuario) {
      throw new AppError("Usuario nao encontrado.", 404);
    }

    return await prisma.lugar.update({
      where: { id },
      data: {
        nome,
        observacao,
        tipo,
        localizacao,
        imagem,
        usuario: {
          connect: { id: fk_id_usuario },
        },
      },
    });
  }

  async excluir(id: number) {
    const lugar = await prisma.lugar.findUnique({
      where: { id },
      include: {
        recomendacoes: true,
      },
    });

    if (!lugar) {
      throw new AppError("Lugar nao encontrado.", 404);
    }

    if (lugar.recomendacoes.length > 0) {
      throw new AppError(
        "Nao e possivel excluir um lugar que possui recomendacoes vinculadas.",
        400
      );
    }

    return await prisma.lugar.delete({
      where: { id },
    });
  }
}