import Connection from '../models/Connection.js';

export const createConnection = async (connectionData) => {
    const connection = new Connection(connectionData);
    try{
        const savedConnection = await connection.save();
        return savedConnection;
    } catch(err){
        console.error(`Error creating connection : ${err}`);
        throw err;
    }
}