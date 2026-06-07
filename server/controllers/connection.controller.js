import Connection from '../models/Connection.js';

import { createConnection, getConnectionById, updateConnectionService, deleteConnectionService } from '../services/connection.service.js';
import { getConceptsByIds } from '../services/concept.service.js';
import Concept from '../models/Concept.js';

//@desc     create a new connection between two concepts
//@route    POST /api/connections
//@access   Public
export const createNewConnection = async (req, res) => {
    const {source, target, relationType} = req.body;
    if(!relationType){
        return res.status(400).json({message : `Relation type is required`});
    }
    if(source === target){
        return res.status(400).json({message : `Source and target cannot be the same`});
    }

    try{
        const concepts = await getConceptsByIds([source, target]);
        if(concepts.length != 2){
            return res.status(404).json({message : `One or more concepts not found`});
        }

        const sourceDoc = concepts.find(c => c._id.toString() === source);
        const targetDoc = concepts.find(c => c._id.toString() === target);
        const connection = await createConnection({relationType, source: sourceDoc._id, target: targetDoc._id});
        return res.status(201).json(connection);
    } catch(err){
        if(err.name === "CastError"){
            return res.status(400).json({message: `Invalid concept ID format`});
        }
        return res.status(500).json({message : `Error creating connection : ${err}`});
    }
}

//@desc     Get connection by Id
//@route    GET /api/connections/:connectionId
//@access   Public
export const getConnection = async (req, res) => {
    const {connectionId} = req.params;
    try{
        const connection = await getConnectionById(connectionId);
        if(!connection){
            return res.status(404).json({message: `Connection with id ${connectionId} not found`});
        }
        return res.status(200).json(connection);
    } catch(err){
        if(err.name === "CastError"){
            return res.status(400).json({message: `Invalid connection ID format`});
        }
        return res.status(500).json({message: `Error fetching connection : ${err}`});
    }
}

//@desc     Update a connection
//@route    PATCH /api/connections/:connectionId
//@access   Public
export const updateConnectionById = async (req, res) => {
    const {connectionId} = req.params;
    const {source, target, relationType} = req.body;

    try{
        const existingConnection = await Connection.findById(connectionId);
        if(!existingConnection){
            return res.status(404).json({message : `Connection not found`});
        }
        const effectiveSource = source || existingConnection.source.toString();
        const effectiveTarget = target || existingConnection.target.toString();

        if(effectiveSource === effectiveTarget){
            return res.status(400).json({message : `The effective source and target cannot be the same`});
        }

        if(source || target){
            const idsToCheck = [];
            if(source) idsToCheck.push(source);
            if(target) idsToCheck.push(target);
            const concepts = await getConceptsByIds(idsToCheck);
            if(concepts.length !== idsToCheck.length){
                return res.status(404).json({message : `One or more concepts not found`});
            }
        }

        const updatedData= {};
        if(relationType !== undefined) updatedData.relationType = relationType;
        if(source !== undefined) updatedData.source = source;
        if(target !== undefined) updatedData.target = target;

        const updatedConnection = await updateConnectionService(connectionId, updatedData);
        return res.status(200).json(updatedConnection);
    } catch(err){
        if(err.name === "CastError"){
            return res.status(400).json({message : `Incorrect Connection ID format`})
        }
        return res.status(500).json({message : `Error occured while updated the connection : ${err}`});
    }
}

//@desc     Delete a connection
//@route    DELETE /api/connections/:connectionId
//@access   Public
export const deleteConnection = async (req, res) => {
    const {connectionId} = req.params;
    try{
        const connection = await deleteConnectionService(connectionId);
        if(!connection){
            return res.status(404).json({message : `Conection wiht id ${connectionId} not found`});
        }
        return res.status(204).send();
    } catch(err){
        if(err.name === "CastError"){
            return res.status(400).json({message : `Incorrect Connection ID format`});
        }
        return res.status(500).json({message : `Error while delting connection : ${err}`});
    }
}