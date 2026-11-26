
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/appError";

interface CriarCurso {
  nome: string;
  descricao: string;
  duracao: string;
  turno: string;
  modalidade: string;
  fk_id_pagina: number;
}

export class CursoService {
  async criar({
    nome,
    descricao,
    duracao,
    turno,
    modalidade,
    fk_id_pagina,
  }: CriarCurso) {
    if (!nome || !descricao || !duracao || !turno || !modalidade || !fk_id_pagina) {
      throw new AppError("Todos os campos sao obrigatorios.", 400);
    }

    const pagina = await prisma.paginaCurso.findUnique({
      where: { id: fk_id_pagina },
    });

    if (!pagina) {
      throw new AppError("Pagina de curso nao encontrada.", 404);
    }

    return await prisma.curso.create({
      data: {
        nome,
        descricao,
        duracao,
        turno,
        modalidade,
        pagina: {
          connect: { id: fk_id_pagina },
        },
      },
    });
  }

  async listar() {
    return await prisma.curso.findMany({
      include: {
        pagina: true,
      },
    });
  }

  async atualizar(
    id: number,
    {
      nome,
      descricao,
      duracao,
      turno,
      modalidade,
      fk_id_pagina,
    }: CriarCurso
  ) {
    const curso = await prisma.curso.findUnique({
      where: { id },
    });

    if (!curso) {
      throw new AppError("Curso nao encontrado.", 404);
    }

    if (!nome || !descricao || !duracao || !turno || !modalidade || !fk_id_pagina) {
      throw new AppError("Todos os campos sao obrigatorios.", 400);
    }

    const pagina = await prisma.paginaCurso.findUnique({
      where: { id: fk_id_pagina },
    });

    if (!pagina) {
      throw new AppError("Pagina de curso nao encontrada.", 404);
    }

    return await prisma.curso.update({
      where: { id },
      data: {
        nome,
        descricao,
        duracao,
        turno,
        modalidade,
        pagina: {
          connect: { id: fk_id_pagina },
        },
      },
    });
  }

  async excluir(id: number) {
    const curso = await prisma.curso.findUnique({
      where: { id },
    });

    if (!curso) {
      throw new AppError("Curso nao encontrado.", 404);
    }

    return await prisma.curso.delete({
      where: { id },
    });
  }
}

