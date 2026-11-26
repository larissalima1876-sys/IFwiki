import { prisma } from "../lib/prisma";
import { AppError } from "../utils/appError";

interface CriarArquivo {
    tamanho: number;
    tipo: string;
    nome: string;
    url: string;
    fk_id_usuario: number;
}

export class ArquivoService {
    async criar({
        tamanho,
        tipo,
        nome,
        url,
        fk_id_usuario,
    }: CriarArquivo) {
        if (!tamanho || !tipo || !nome || !url || !fk_id_usuario) {
            throw new AppError("Todos os campos sao obrigatorios.", 400);
        }

        const usuario = await prisma.user.findUnique({
            where: { id: fk_id_usuario },
        });

        if (!usuario) {
            throw new AppError("Usuario nao encontrado.", 404);
        }

        return await prisma.arquivo.create({
            data: {
                tamanho,
                tipo,
                nome,
                url,
                usuario: {
                    connect: { id: fk_id_usuario },
                },
            },
        });
    }

    async listar() {
        return await prisma.arquivo.findMany({
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
        const arquivo = await prisma.arquivo.findUnique({
            where: { id },
        });

        if (!arquivo) {
            throw new AppError("Arquivo nao encontrado.", 404);
        }

        return arquivo;
    }

    async atualizar(
        id: number,
        dados: Partial<CriarArquivo>
    ) {
        await this.buscarPorId(id);

        return await prisma.arquivo.update({
            where: { id },
            data: dados,
        });
    }

    async excluir(id: number) {
        await this.buscarPorId(id);

        return await prisma.arquivo.delete({
            where: { id },
        });
    }
}