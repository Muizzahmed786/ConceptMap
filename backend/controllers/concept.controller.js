import Canvas from "../models/Canvas.js";
import Concept from '../models/Concept.js';
import { createConcept, getConceptById, conceptUpdate, conceptDelete } from "../services/concept.service.js";

//@desc Create a new concept
//@route POST /api/canvases/:canvasId/concepts
//@access Public
export const createNewConcept = async (req, res) => {
    const { canvasId } = req.params;
    const { title, description, tags, understandingLevel } = req.body;
    if(!title){
        return res.status(400).json({message : `Concept title is required`});
    }

    try{
        const concept = await createConcept({title, description, tags, understandingLevel});
        const updatedCanvas = await Canvas.findByIdAndUpdate(canvasId, {$push: {concepts: concept._id}}, {new: true});
        if(!updatedCanvas){
            await Concept.findByIdAndDelete(concept._id);
            return res.status(404).json({message: `Canvas with id ${canvasId} not found`});
        }
        return res.status(201).json(concept);
    } catch(err){
        return res.status(500).json({message : `Error creating concept : ${err}`});
    }
}

//@desc Get a concept by Id
//@route GET /api/concepts/:conceptId
//@access Public
export const getConcept = async (req, res) => {
    const {conceptId} = req.params;
    try{
        const concept = await getConceptById(conceptId);
        if(!concept){
            return res.status(404).json({message: `Concept with id ${conceptId} not found`});
        }
        return res.status(200).json(concept);
    } catch(err){
        return res.status(500).json({message : `Error fetching concept : ${err}`});
    }
}

//@desc update a concept
//@route PATCH /api/concepts/:conceptId
//@access Public
export const updateConcept = async (req, res) => {
    const {conceptId} = req.params;
    const {title, description, tags, understandingLevel} = req.body;
    try{
        const updatedData = {};
        if(title !== undefined) updatedData.title = title;
        if(description !== undefined) updatedData.description = description;
        if(tags !== undefined) updatedData.tags = tags;
        if(understandingLevel !== undefined) updatedData.understandingLevel = understandingLevel;

        const updatedConcept = await conceptUpdate(conceptId, updatedData);
        if(!updatedConcept){
            return res.status(404).json({message: `Concept with id ${conceptId} not found`});
        }
        return res.status(200).json(updatedConcept); 
    } catch(err){
        return res.status(500).json({message : `Error updating concept : ${err}`});
    }
}

//@desc delete a concept
//@route DELETE /api/concepts/:conceptId
//@access Public
export const deleteConcept = async (req, res) => {
    const {conceptId} = req.params;
    try{
        const concept = await conceptDelete(conceptId);
        if(!concept){
            return res.status(404).json({message : `Concept with id ${conceptId} not found`});
        }
        await Canvas.findOneAndUpdate({concepts: conceptId}, {$pull: {concepts: conceptId}});
        return res.status(204).send();
    } catch(err){
        if(err.name === 'CastError'){
            return res.status(400).json({message : `Invalid canvas id ${conceptId}`});
        }
        return res.status(500).json({message : `Error deleting concept : ${err}`});
    }
}