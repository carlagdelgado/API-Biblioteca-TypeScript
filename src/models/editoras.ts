import { dbQuery, dbQueryFirst } from "../services/db";

export type Editora = {
    ID_Editora: number;
    Nome_Editora: string;
}

const insertEditora = async (editora: Editora) => {
    await dbQuery(`INSERT INTO tbl_Editoras (Nome_Editora) VALUES('${editora.Nome_Editora}')`)
    //let retorno = await dbQuery("SELECT seq FROM sqlite_sequence WHERE name = 'product'");
    //return getProducts(retorno[0].Id);
}

const updateEditora = async (editora: Editora) => {
    await dbQuery(`UPDATE tbl_Editoras SET Nome_Editora = '${editora.Nome_Editora}' WHERE ID_Editora = '${editora.ID_Editora}'`)
    return getEditora(editora.ID_Editora);
}

const listEditoras = async () => {
    const retorno = await dbQuery("SELECT * FROM tbl_Editoras");
    return retorno as Editora[];
}

const getEditora = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM tbl_Editoras WHERE ID_Editora = '${id}'`);
    return retorno as Editora;
}

const deleteEditora = async (id: number) => {
    await dbQuery(`DELETE FROM tbl_Editoras WHERE ID_Editora = '${id}'`);
    
}

export const editoraModel = {
    insertEditora,
    listEditoras,
    getEditora,
    deleteEditora,
    updateEditora
}