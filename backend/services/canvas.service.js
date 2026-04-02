import Canvas from '../models/Canvas.js';

export const getAllCanvases = async () => {
    try{
        const canvases = await Canvas.find();
        return canvases;
    } catch(err){
        console.error(`Error fetching canvases : ${err}`);
        return null;
    }
}

export const getCanvasById = async (id) => {
    try{
        const canvas = await Canvas.findById(id);
        if(!canvas) return false;
        return canvas;
    } catch(err){
        console.error(`Error fetching canvas with id ${id} : ${err}`);
        throw err;
    }
}

export const createCanvas = async (canvasData) => {
    try{
        const newCanvas = new Canvas(canvasData);
        const savedCanvas = await newCanvas.save();
        return savedCanvas;
    } catch(err){
        console.error(`Error creating canvas : ${err}`);
        throw err;
    }
}

export const updatedCanvas = async (id, canvasData) => {
    try{
        const modifiedCanvas = await Canvas.findByIdAndUpdate(id, canvasData, {new: true, runValidators: true});
        return modifiedCanvas;
    } catch(err){
        console.log(`Error updating canvas with id ${id} : ${err}`);
        throw err;
    }
}

export const deleteCanvas = async (id) => {
    try{
        const deletedCanvas = await Canvas.findByIdAndDelete(id);
        if(!deletedCanvas) return false;
        return true;
    } catch(err){
        console.error(`Error deleting canvas with id ${id} : ${err}`);
        throw err;
    }
}