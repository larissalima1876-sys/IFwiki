import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";

interface CriarEvento {
  titulo: string;
  descricao: string;
  local: string;
  data_inicio: string;
  data_fim: string;
  fk_id_usuario: number;
}

export class EventoService {
  async criar({
    titulo,
    descricao,
    local,
    data_inicio,
    data_fim,
    fk_id_usuario,
  }: CriarEvento) {
    if (
      !titulo ||
      !descricao ||
      !local ||
      !data_inicio ||
      !data_fim ||
      !fk_id_usuario
    ) {
      throw new AppError("Todos os campos sao obrigatorios.", 400);
    }

    const inicio = new Date(data_inicio);
    const fim = new Date(data_fim);

    if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
      throw new AppError("Datas invalidas.", 400);
    }

    if (fim < inicio) {
      throw new AppError("A data de fim nao pode ser anterior ao inicio.", 400);
    }

    const usuario = await prisma.user.findUnique({
      where: { id: fk_id_usuario },
    });

    if (!usuario) {
      throw new AppError("Usuario nao encontrado.", 404);
    }

    return await prisma.evento.create({
      data: {
        titulo,
        descricao,
        local,
        data_inicio: inicio,
        data_fim: fim,
        usuario: {
          connect: { id: fk_id_usuario },
        },
      },
    });
  }

  async listar() {
    return await prisma.evento.findMany({
      include: {
        usuario: true,
        setores: true,
      },
    });
  }

  async atualizar(
    id: number,
    {
      titulo,
      descricao,
      local,
      data_inicio,
      data_fim,
      fk_id_usuario,
    }: CriarEvento
  ) {
    const evento = await prisma.evento.findUnique({
      where: { id },
    });

    if (!evento) {
      throw new AppError("Evento nao encontrado.", 404);
    }

    if (
      !titulo ||
      !descricao ||
      !local ||
      !data_inicio ||
      !data_fim ||
      !fk_id_usuario
    ) {
      throw new AppError("Todos os campos sao obrigatorios.", 400);
    }

    const inicio = new Date(data_inicio);
    const fim = new Date(data_fim);

    if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
      throw new AppError("Datas invalidas.", 400);
    }

    if (fim < inicio) {
      throw new AppError("A data de fim nao pode ser anterior ao inicio.", 400);
    }

    const usuario = await prisma.user.findUnique({
      where: { id: fk_id_usuario },
    });

    if (!usuario) {
      throw new AppError("Usuario nao encontrado.", 404);
    }

    return await prisma.evento.update({
      where: { id },
      data: {
        titulo,
        descricao,
        local,
        data_inicio: inicio,
        data_fim: fim,
        usuario: {
          connect: { id: fk_id_usuario },
        },
      },
    });
  }

  async excluir(id: number) {
    const evento = await prisma.evento.findUnique({
      where: { id },
      include: {
        setores: true,
      },
    });

    if (!evento) {
      throw new AppError("Evento nao encontrado.", 404);
    }

    if (evento.setores.length > 0) {
      throw new AppError(
        "Nao e possivel excluir um evento que possui setores vinculados.",
        400
      );
    }

    return await prisma.evento.delete({
      where: { id },
    });
  }
}
