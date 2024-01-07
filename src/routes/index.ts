
import Router, { Application } from "express";
import { autorRouter } from "./autores";
import { editoraRouter } from "./editoras";
import { livroRouter } from "./livros";


export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/autores', autorRouter);
    apiRouter.use('/editoras', editoraRouter);
    apiRouter.use('/livros', livroRouter);

    app.use('/api/v1', apiRouter);
}