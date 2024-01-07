import { Router } from 'express';
import { autorController } from '../controllers/autores';

const autorRouter = Router();
autorRouter.post('/', autorController.insertAutor);
autorRouter.get('/', autorController.listAutores);
autorRouter.get('/:id', autorController.getAutor);
autorRouter.delete('/:id', autorController.deleteAutores);
autorRouter.put('/:id', autorController.updateAutor);


export {
    autorRouter
} 