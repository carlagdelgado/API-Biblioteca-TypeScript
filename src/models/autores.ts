import { dbQuery, dbQueryFirst } from "../services/db";

export type Autor = {
    ID_Autores: number;
    Nome_Autor: string;
    SobreNome_Autor: string;
}

const insertAutor = async (autor: Autor) => {
    await dbQuery(`INSERT INTO tbl_Autores (Nome_Autor, SobreNome_Autor) VALUES('${autor.Nome_Autor}', '${autor.SobreNome_Autor}')`)
    //let retorno = await dbQuery("SELECT seq FROM sqlite_sequence WHERE name = 'product'");
    //return getProducts(retorno[0].Id);
}

const updateAutor = async (autor: Autor) => {
    await dbQuery(`UPDATE tbl_Autores SET Nome_Autor = '${autor.Nome_Autor}', SobreNome_Autor = '${autor.SobreNome_Autor}' WHERE ID_Autores = '${autor.ID_Autores}'`)
    return getAutor(autor.ID_Autores);
}

const listAutores = async () => {
    const retorno = await dbQuery("SELECT * FROM tbl_Autores");
    return retorno as Autor[];
}

const getAutor = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM tbl_Autores WHERE ID_Autores = '${id}'`);
    return retorno as Autor;
}

const deleteAutores = async (id: number) => {
    await dbQuery(`DELETE FROM tbl_Autores WHERE ID_Autores = '${id}'`);
    
}

export const autorModel = {
    insertAutor,
    listAutores,
    getAutor,
    deleteAutores,
    updateAutor
}