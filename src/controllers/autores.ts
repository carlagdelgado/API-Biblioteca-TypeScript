import { Request, Response } from 'express';
import { badRequest, internalServerError, notFound, ok, validateNumber } from '../services/util';
import { Autor, autorModel } from '../models/autores';

const insertAutor = (req: Request, res: Response) => {

    {
        const autor = req.body;
        if (!autor)
            return badRequest(res, "Autor inválido");

        if (!autor.Nome_Autor)
            return badRequest(res, "Informe o nome do autor");

        if (!autor.SobreNome_Autor)
            return badRequest(res, "Informe o sobrenome do autor");
    }

    const autor = req.body as Autor;
    autorModel.insertAutor(autor)
        .then(() => {
            res.status(201).json({
                mensagem: 'Criado com sucesso'
            })
        })
        .catch(err => internalServerError(res, err));
}

const updateAutor =async (req: Request, res: Response) => {
    
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, "id inválido")

        const autor = req.body;
        if (!autor)
            return badRequest(res, "Autor inválido");

        if (!autor.Nome_Autor)
            return badRequest(res, "Informe o nome do autor");

        if (!autor.SobreNome_Autor)
            return badRequest(res, "Informe o sobrenome do autor");
        
        const autorSaved = await autorModel.getAutor(id);   
        if(!autorSaved)  
            return notFound(res); 
    }

    const autor = {...req.body, ID_Autores: id} as Autor;
    return autorModel.updateAutor(autor)
        .then(autor => {
            res.json(autor)
        })
        .catch(err => internalServerError(res, err));

}

const listAutores = (req: Request, res: Response) => {
    return autorModel.listAutores()
        .then(autores => {
            res.json(autores)
        })
        .catch(err => internalServerError(res, err));
}

const getAutor = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
        return badRequest(res, "id inválido")
    }
       
    return autorModel.getAutor(id)
        .then((autor) => {
            if(autor)
                res.json(autor)
            else
                return notFound(res);
        })
        .catch((err: Error) => internalServerError(res, err));
}

const deleteAutores = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
        return badRequest(res, "id inválido")
        
        const autorSaved = await autorModel.getAutor(id);   
        if(!autorSaved)  
            return notFound(res);
    }
       
    return autorModel.deleteAutores(id)
        .then(() => ok(res))
        .catch((err: Error) => internalServerError(res, err));
}

export const autorController = {
    insertAutor,
    listAutores,
    getAutor,
    deleteAutores,
    updateAutor
}
