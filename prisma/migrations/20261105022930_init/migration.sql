-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('ADMIN', 'LEITOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tipo" "TipoUsuario" NOT NULL DEFAULT 'LEITOR';

-- CreateTable
CREATE TABLE "Arquivo" (
    "id" SERIAL NOT NULL,
    "tamanho" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fk_id_usuario" INTEGER NOT NULL,

    CONSTRAINT "Arquivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lugar" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "fk_id_usuario" INTEGER NOT NULL,

    CONSTRAINT "Lugar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recomendacao" (
    "id" SERIAL NOT NULL,
    "avaliacao" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "fk_id_usuario" INTEGER NOT NULL,
    "fk_id_lugar" INTEGER NOT NULL,

    CONSTRAINT "Recomendacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "fk_id_usuario" INTEGER NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setor" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "fk_id_usuario" INTEGER NOT NULL,

    CONSTRAINT "Setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventoSetor" (
    "fk_id_evento" INTEGER NOT NULL,
    "fk_id_setor" INTEGER NOT NULL,

    CONSTRAINT "EventoSetor_pkey" PRIMARY KEY ("fk_id_evento","fk_id_setor")
);

-- CreateTable
CREATE TABLE "Noticia" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "data_publicacao" TIMESTAMP(3) NOT NULL,
    "imagem" TEXT NOT NULL,
    "fk_id_usuario" INTEGER NOT NULL,

    CONSTRAINT "Noticia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Historia" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "fk_id_usuario" INTEGER NOT NULL,

    CONSTRAINT "Historia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaginaCurso" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "fk_id_categoria" INTEGER NOT NULL,

    CONSTRAINT "PaginaCurso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "duracao" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "modalidade" TEXT NOT NULL,
    "fk_id_pagina" INTEGER NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Arquivo" ADD CONSTRAINT "Arquivo_fk_id_usuario_fkey" FOREIGN KEY ("fk_id_usuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lugar" ADD CONSTRAINT "Lugar_fk_id_usuario_fkey" FOREIGN KEY ("fk_id_usuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recomendacao" ADD CONSTRAINT "Recomendacao_fk_id_usuario_fkey" FOREIGN KEY ("fk_id_usuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recomendacao" ADD CONSTRAINT "Recomendacao_fk_id_lugar_fkey" FOREIGN KEY ("fk_id_lugar") REFERENCES "Lugar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_fk_id_usuario_fkey" FOREIGN KEY ("fk_id_usuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setor" ADD CONSTRAINT "Setor_fk_id_usuario_fkey" FOREIGN KEY ("fk_id_usuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoSetor" ADD CONSTRAINT "EventoSetor_fk_id_evento_fkey" FOREIGN KEY ("fk_id_evento") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoSetor" ADD CONSTRAINT "EventoSetor_fk_id_setor_fkey" FOREIGN KEY ("fk_id_setor") REFERENCES "Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noticia" ADD CONSTRAINT "Noticia_fk_id_usuario_fkey" FOREIGN KEY ("fk_id_usuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historia" ADD CONSTRAINT "Historia_fk_id_usuario_fkey" FOREIGN KEY ("fk_id_usuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaginaCurso" ADD CONSTRAINT "PaginaCurso_fk_id_categoria_fkey" FOREIGN KEY ("fk_id_categoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_fk_id_pagina_fkey" FOREIGN KEY ("fk_id_pagina") REFERENCES "PaginaCurso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
