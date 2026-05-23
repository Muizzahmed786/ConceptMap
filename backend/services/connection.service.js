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

export const getConnectionById = async (connectionId) => {
    const connection = await Connection.findById(connectionId);
    return connection;
}

export const updateConnectionService = async (connectionId, updatedData) => {
    const updatedConnection = await Connection.findByIdAndUpdate(connectionId, updatedData, {new: true, runValidators: true});
    return updatedConnection;
}

export const deleteConnectionService = async (connectionId) => {
    const connection = await Connection.findByIdAndDelete(connectionId);
    return connection;
}   