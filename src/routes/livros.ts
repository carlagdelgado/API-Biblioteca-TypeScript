import { Router } from 'express';
import { livroController } from '../controllers/livros';

const livroRouter = Router();
livroRouter.post('/', livroController.insertLivro);
livroRouter.get('/', livroController.listLivros);
livroRouter.get('/:id', livroController.getLivros);
livroRouter.delete('/:id', livroController.deleteLivro);
livroRouter.put('/:id', livroController.updateLivro);


export {
    livroRouter
} 