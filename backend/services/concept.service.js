import Concept from "../models/Concept.js";

export const createConcept = async (conceptData) => {
    const concept = new Concept(conceptData);
    try{
        const savedConcept = await concept.save();
        return savedConcept;
    } catch(err){
        console.error("Error creating concept:", err);
        throw err
    }
}

export const getConceptById = async (conceptId) => {
    const concept = await Concept.findById(conceptId);
    return concept;
}

export const conceptUpdate = async (conceptId, updateData) => {
    const concept = await Concept.findByIdAndUpdate(conceptId, updateData, {new: true, runValidators: true});
    return concept;
}

export const conceptDelete = async (conceptId) => {
    const concept = await Concept.findByIdAndDelete(conceptId);
    return concept;
}

export const getConceptsByIds = async (Ids) => {
    const concepts = await Concept.find({_id: {$in: Ids}});
    return concepts;
}