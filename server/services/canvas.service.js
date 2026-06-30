import Canvas from '../models/Canvas.js';

export const getAllCanvases = async (ownerId) => {
    try{
        const canvases = await Canvas.find({owner: ownerId});
        return canvases;
    } catch(err){
        console.error(`Error fetching canvases : ${err}`);
        return null;
    }
}

export const getCanvasById = async (id, ownerId) => {
    try{
        const canvas = await Canvas.findById(id);
        if(!canvas) return false;
        if(canvas.owner.toString() === ownerId) return canvas;
        return false;
    } catch(err){
        console.error(`Error fetching canvas with id ${id} : ${err}`);
        throw err;
    }
}

export const createCanvas = async (canvasData, ownerId) => {
    try{
        const newCanvas = new Canvas(canvasData);
        newCanvas.owner = ownerId;
        const savedCanvas = await newCanvas.save();
        return savedCanvas;
    } catch(err){
        console.error(`Error creating canvas : ${err}`);
        throw err;
    }
}

export const updatedCanvas = async (id, canvasData, ownerId) => {
    try{
        const modifiedCanvas = await Canvas.findOneAndUpdate({_id: id, owner: ownerId}, canvasData, {new: true, runValidators: true});
        return modifiedCanvas;
    } catch(err){
        console.log(`Error updating canvas with id ${id} : ${err}`);
        throw err;
    }
}

export const deleteCanvas = async (id, ownerId) => {
    try{
        const deletedCanvas = await Canvas.findOneAndDelete({_id: id, owner: ownerId});
        if(!deletedCanvas) return false;
        return true;
    } catch(err){
        console.error(`Error deleting canvas with id ${id} : ${err}`);
        throw err;
    }
}