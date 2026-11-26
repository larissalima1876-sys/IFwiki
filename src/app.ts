import express, { Request, Response } from "express";

import paginaCursoRoutes from "./routes/PaginaCurso.routes";
import categoriaRoutes from "./routes/categoria.routes";
import cursoRoutes from "./routes/Curso.routes";
import noticiaRoutes from "./routes/Noticia.routes";
import lugarRoutes from "./routes/Lugar.routes";
import recomendacaoRoutes from "./routes/Recomendacao.routes";
import eventoRoutes from "./routes/Evento.routes";
import setorRoutes from "./routes/Setor.routes";
import eventoSetorRoutes from "./routes/EventoSetor.routes";
import arquivoRoutes from "./routes/Arquivo.routes";
import historiaRoutes from "./routes/Historia.routes";

import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use("/paginas-cursos", paginaCursoRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/cursos", cursoRoutes);
app.use("/noticias", noticiaRoutes);
app.use("/lugares", lugarRoutes);
app.use("/recomendacoes", recomendacaoRoutes);
app.use("/eventos", eventoRoutes);
app.use("/setores", setorRoutes);
app.use("/eventos-setores", eventoSetorRoutes);
app.use("/arquivos", arquivoRoutes);
app.use("/historias", historiaRoutes);

app.use(errorHandler);

export default app;