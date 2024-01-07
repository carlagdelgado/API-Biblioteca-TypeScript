import { Request, Response } from 'express';
import { badRequest, internalServerError, notFound, ok, validateNumber } from '../services/util';
import { Livro, livroModel } from '../models/livros';

const insertLivro = (req: Request, res: Response) => {

    {
        const livro = req.body;
        if (!livro)
            return badRequest(res, "Livro inválido");

        if (!livro.Nome_Livro)
            return badRequest(res, "Informe o nome do livro");

        if (!validateNumber(livro.ISBN))
            return badRequest(res, "Informe o ISBN");

        if (!validateNumber(livro.Preco_Livro))
            return badRequest(res, "Informe o preço");

        if (!validateNumber(livro.Data_Pub))
            return badRequest(res, "Informe a data");
    }

    const livro = req.body as Livro;
    livroModel.insertLivro(livro)
        .then(() => {
            res.status(201).json({
                mensagem: 'Criado com sucesso'
            })
        })
        .catch(err => internalServerError(res, err));
}

const updateLivro = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if (!validateNumber(id))
            return badRequest(res, "id inválido")

        const livro = req.body;
        if (!livro)
            return badRequest(res, "Livro inválido");

        if (!livro.Nome_Livro)
            return badRequest(res, "Informe o nome do livro");

        if (!validateNumber(livro.ISBN))
            return badRequest(res, "Informe o ISBN");

        if (!validateNumber(livro.Preco_Livro))
            return badRequest(res, "Informe o preço");

        if (!validateNumber(livro.Data_Pub))
            return badRequest(res, "Informe a data");

        if (!validateNumber(livro.ID_Autor))
            return badRequest(res, "Informe o autor");

        if (!validateNumber(livro.ID_editora))
            return badRequest(res, "Informe a editora");

        const livroSaved = await livroModel.getLivros(id);
        if (!livroSaved)
            return notFound(res);
    }

    const livro = {...req.body, ID_Livro: id} as Livro;
     livroModel.updateLivro(livro)
        .then(livro => {
            res.status(200).json(livro)
        })
        .catch(err => internalServerError(res, err));

}

const listLivros = (req: Request, res: Response) => {
    return livroModel.listLivros()
        .then(livros => {
            res.json(livros)
        })
        .catch(err => internalServerError(res, err));
}

const getLivros = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if (!validateNumber(id))
            return badRequest(res, "id inválido")
    }

    return livroModel.getLivros(id)
        .then((livro) => {
            if (livro)
                res.json(livro)
            else
                return notFound(res);
        })
        .catch((err: Error) => internalServerError(res, err));
}

const deleteLivro = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if (!validateNumber(id))
            return badRequest(res, "id inválido")

        const livroSaved = await livroModel.getLivros(id);
        if (!livroSaved)
            return notFound(res);
    }

    return livroModel.deleteLivros(id)
        .then(() => ok(res))
        .catch((err: Error) => internalServerError(res, err));
}

export const livroController = {
    insertLivro,
    listLivros,
    getLivros,
    deleteLivro,
    updateLivro
}

