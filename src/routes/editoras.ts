import { Router } from 'express';
import { editoraController } from '../controllers/editoras';

const editoraRouter = Router();
editoraRouter.post('/', editoraController.insertEditora);
editoraRouter.get('/', editoraController.listEditoras);
editoraRouter.get('/:id', editoraController.getEditora);
editoraRouter.delete('/:id', editoraController.deleteEditoras);
editoraRouter.put('/:id', editoraController.updateEditora);


export {
    editoraRouter
} 