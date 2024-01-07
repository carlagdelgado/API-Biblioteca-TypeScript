import { dbQuery, dbQueryFirst } from "../services/db";

export type Livro = {
    ID_Livro: number;
    Nome_Livro: string;
    ISBN: number;
    Data_Pub: number;
    Preco_Livro: number;
    ID_Autor: number;
    ID_editora: number;
}

const insertLivro = async (livro: Livro) => {
    await dbQuery(`INSERT INTO tbl_Livro (Nome_Livro, ISBN, Data_Pub, Preco_Livro, ID_Autor, ID_editora) VALUES('${livro.Nome_Livro}', '${livro.ISBN}', '${livro.Data_Pub}', ${livro.Preco_Livro}, ${livro.ID_Autor}, ${livro.ID_editora})`)
    //let retorno = await dbQuery("SELECT seq FROM sqlite_sequence WHERE name = 'product'");
    //return getProducts(retorno[0].Id);
}

const updateLivro = async (livro: Livro) => {
    await dbQuery(`UPDATE tbl_Livro SET Nome_Livro = '${livro.Nome_Livro}', ISBN = '${livro.ISBN}', Data_Pub = '${livro.Data_Pub}', Preco_Livro = '${livro.Preco_Livro}', ID_Autor = '${livro.ID_Autor}', ID_editora = '${livro.ID_editora}' WHERE ID_Livro = ${livro.ID_Livro}`);
    return getLivros(livro.ID_Livro);
}

const listLivros = async () => {
    const retorno = await dbQuery("SELECT * FROM tbl_Livro");
    return retorno as Livro[];
}

const getLivros = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM tbl_Livro WHERE ID_Livro = '${id}'`);
    return retorno as Livro;
}

const deleteLivros = async (id: number) => {
    await dbQuery(`DELETE FROM tbl_Livro WHERE ID_Livro = '${id}'`);
    
}

export const livroModel = {
    insertLivro,
    listLivros,
    getLivros,
    deleteLivros,
    updateLivro
}