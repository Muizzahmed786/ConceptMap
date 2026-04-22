import Connection from '../models/Connection.js';

import { createConnection } from '../services/connection.service.js';
import { getConceptsByIds } from '../services/concept.service.js';

//@desc     create a new connection between two concepts
//@route    /api/connections
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
        const connection = await createConnection({relationType, source: concepts[0]._id, target: concepts[1]._id});
        return res.status(201).json(connection);
    } catch(err){
        return res.status(500).json({message : `Error creating connection : ${err}`});
    }
}