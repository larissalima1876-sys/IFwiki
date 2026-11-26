import { prisma } from "../lib/prisma";
import { AppError } from "../utils/appError";

interface CriarEventoSetor {
  fk_id_evento: number;
  fk_id_setor: number;
}

export class EventoSetorService {
  async criar({ fk_id_evento, fk_id_setor }: CriarEventoSetor) {
    if (!fk_id_evento || !fk_id_setor) {
      throw new AppError("Os IDs do evento e do setor sao obrigatorios.", 400);
    }

    const evento = await prisma.evento.findUnique({
      where: { id: fk_id_evento },
    });

    if (!evento) {
      throw new AppError("Evento nao encontrado.", 404);
    }

    const setor = await prisma.setor.findUnique({
      where: { id: fk_id_setor },
    });

    if (!setor) {
      throw new AppError("Setor nao encontrado.", 404);
    }

    return await prisma.eventoSetor.create({
      data: {
        evento: { connect: { id: fk_id_evento } },
        setor: { connect: { id: fk_id_setor } },
      },
    });
  }

  async listar() {
    return await prisma.eventoSetor.findMany({
      include: {
        evento: true,
        setor: true,
      },
    });
  }

  async excluir(fk_id_evento: number, fk_id_setor: number) {
    const relacionamento = await prisma.eventoSetor.findUnique({
      where: {
        fk_id_evento_fk_id_setor: {
          fk_id_evento,
          fk_id_setor,
        },
      },
    });

    if (!relacionamento) {
      throw new AppError("Relacionamento nao encontrado.", 404);
    }

    return await prisma.eventoSetor.delete({
      where: {
        fk_id_evento_fk_id_setor: {
          fk_id_evento,
          fk_id_setor,
        },
      },
    });
  }
}