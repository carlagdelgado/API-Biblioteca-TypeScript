import { Request, Response } from 'express';
import { badRequest, internalServerError, notFound, ok, validateNumber } from '../services/util';
import { Editora, editoraModel } from '../models/editoras';

const insertEditora = (req: Request, res: Response) => {

    {
        const editora = req.body;
        if (!editora)
            return badRequest(res, "Editora inválido");

        if (!editora.Nome_Editora)
            return badRequest(res, "Informe o nome do autor");
    }

    const editora = req.body as Editora;
    editoraModel.insertEditora(editora)
        .then(() => {
            res.status(201).json({
                mensagem: 'Criado com sucesso'
            })
        })
        .catch(err => internalServerError(res, err));
}

const updateEditora =async (req: Request, res: Response) => {
    
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, "id inválido")

        const editora = req.body;
        if (!editora)
            return badRequest(res, "Editora inválido");

        if (!editora.Nome_Editora)
            return badRequest(res, "Informe o nome da editora");
        
        const editoraSaved = await editoraModel.getEditora(id);   
        if(!editoraSaved)  
            return notFound(res); 
    }

    const editora = {...req.body, ID_Editora: id} as Editora;
    return editoraModel.updateEditora(editora)
        .then(editora => {
            res.json(editora)
        })
        .catch(err => internalServerError(res, err));

}

const listEditoras = (req: Request, res: Response) => {
    return editoraModel.listEditoras()
        .then(editoras => {
            res.json(editoras)
        })
        .catch(err => internalServerError(res, err));
}

const getEditora = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
        return badRequest(res, "id inválido")
    }
       
    return editoraModel.getEditora(id)
        .then((editora) => {
            if(editora)
                res.json(editora)
            else
                return notFound(res);
        })
        .catch((err: Error) => internalServerError(res, err));
}

const deleteEditoras = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
        return badRequest(res, "id inválido")
        
        const editoraSaved = await editoraModel.getEditora(id);   
        if(!editoraSaved)  
            return notFound(res);
    }
       
    return editoraModel.deleteEditora(id)
        .then(() => ok(res))
        .catch((err: Error) => internalServerError(res, err));
}

export const editoraController = {
    insertEditora,
    listEditoras,
    getEditora,
    deleteEditoras,
    updateEditora
}
