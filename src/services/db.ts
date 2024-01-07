import sql from 'mssql'

const DB_HOST = process.env.DB_HOST ?? 'localhost';
const DB_PORT = process.env.DB_PORT ?? 1433;
const DB_DATABASE = process.env.DB_DATABASE ?? 'database';
const DB_USERNAME = process.env.DB_USERNAME ?? 'root';
const DB_PASSWORD = process.env.DB_PASSWORD ?? '';

const sqlConfig = {
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    server: DB_HOST,
    //port: DB_PORT,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }

export const openConnection = async () => {
    await sql.connect(sqlConfig)
}

export const dbQuery = async (query: string) => {
    await openConnection();
    return new Promise<unknown[]>((resolve, reject) => {
        sql.query(query, (error, rows) =>{
            if (error)
                reject(error);
            resolve(<any>rows?.recordset)
        });
    });
}

export const dbQueryFirst = async (query: string) => {
    return (await dbQuery(query))[0];
}