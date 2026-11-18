import express, { Request, Response } from "express";

import paginaCursoRoutes from "./routes/PaginaCurso.routes";
import categoriaRoutes from "./routes/categoria.routes";
import cursoRoutes from "./routes/Curso.routes";
import noticiaRoutes from "./routes/Noticia.routes";
import lugarRoutes from "./routes/Lugar.routes";
import recomendacaoRoutes from "./routes/Recomendacao.routes";
import eventoRoutes from "./routes/Evento.routes";
import setorRoutes from "./routes/Setor.routes";

import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.get("/task", (request: Request, response: Response) => {
  return response.status(200).json({
    tasks: [{ id: 1, name: "fazer trabalho", done: false }],
  });
});

app.use("/paginas-cursos", paginaCursoRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/cursos", cursoRoutes);
app.use("/noticias", noticiaRoutes);
app.use("/lugares", lugarRoutes);
app.use("/recomendacoes", recomendacaoRoutes);
app.use("/eventos", eventoRoutes);
app.use("/setores", setorRoutes);

app.use(errorHandler);

export default app;
