import { prisma } from "../lib/prisma";
import { AppError } from "../utils/appError";

interface CriarHistoria {
    titulo: string;
    conteudo: string;
    data_atualizacao: Date;
    fk_id_usuario: number;
}

export class HistoriaService {
    async criar({
        titulo,
        conteudo,
        data_atualizacao,
        fk_id_usuario,
    }: CriarHistoria) {
        if (!titulo || !conteudo || !data_atualizacao || !fk_id_usuario) {
            throw new AppError("Todos os campos sao obrigatorios.", 400);
        }

        const usuario = await prisma.user.findUnique({
            where: { id: fk_id_usuario },
        });

        if (!usuario) {
            throw new AppError("Usuario nao encontrado.", 404);
        }

        return await prisma.historia.create({
            data: {
                titulo,
                conteudo,
                data_atualizacao,
                usuario: {
                    connect: { id: fk_id_usuario },
                },
            },
        });
    }

    async listar() {
        return await prisma.historia.findMany({
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

    async buscarPorId(id: number) {
        const historia = await prisma.historia.findUnique({
            where: { id },
        });

        if (!historia) {
            throw new AppError("Historia nao encontrada.", 404);
        }

        return historia;
    }

    async atualizar(
        id: number,
        dados: Partial<CriarHistoria>
    ) {
        await this.buscarPorId(id);

        return await prisma.historia.update({
            where: { id },
            data: dados,
        });
    }

    async excluir(id: number) {
        await this.buscarPorId(id);

        return await prisma.historia.delete({
            where: { id },
        });
    }
}