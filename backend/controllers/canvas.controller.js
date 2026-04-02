import { getAllCanvases, getCanvasById, createCanvas, updatedCanvas, deleteCanvas } from "../services/canvas.service.js";

// @desc    Fetch all canvases
// @route   GET /api/canvases
// @access  Public
export const fetchAllCanvases = async (req, res) => {
    const canvases = await getAllCanvases();
    if(!canvases){
        return res.status(500).json({message : 'Something went wrong, could not fetch details'});
    }
    if(canvases.length === 0){
        return res.status(200).json({message : "No canvases found"});
    }
    return res.status(200).json(canvases);
}

// @desc    Fetch canvas by id
// @route   GET /api/canvases/:id
// @access  Public
export const fetchCanvasById = async (req, res) => {
    const { id } = req.params;
    try{
        const canvas = await getCanvasById(id);
        if(canvas === false){
            return res.status(404).json({message : `Canvas with id ${id} not found`});
        }
        return res.status(200).json(canvas);
    } catch(err){
        if(err.name === 'CastError'){
            return res.status(400).json({message : `Invalid canvas id ${id}`});
        }
        return res.status(500).json({message : `something went wrong, could not fetch details for canvas with id ${id}`});
    }
}

// @desc    Create a new canvas
// @route   POST /api/canvases
// @access  Public
export const createNewCanvas = async (req, res) => {
    const {title} = req.body;
    if(!title){
        return res.status(400).json({message : `Canvas title is required`});
    }
    if(title.trim().length === 0){
        return res.status(400).json({message : `Canvas title cannot be empty`});
    }
    try{
        const newCanvas = await createCanvas({title: title.trim(), concepts: []});
        return res.status(201).json(newCanvas);
    } catch(err){
        return res.status(500).json({message : `Something went wrong`});
    }
}


// @desc    Update a canvas
// @route   PATCH /api/canvases/:id
// @access  Public
export const updateCanvas = async (req, res) => {
    const { id } = req.params;
    const { title, concepts } = req.body;

    if(!title){
        return res.status(400).json({message : `Canvas title is required`});
    }
    if(title.trim().length === 0){
        return res.status(400).json({message : `Canvas title cannot be empty`});
    }

    try{
        const canvas = await updatedCanvas(id, {title, concepts});
        if(!canvas){
            return res.status(404).json({message : `Canvas with id ${id} not found`});
        }
        return res.status(200).json(canvas);
    } catch(err){
        if(err.name === 'CastError'){
            return res.status(400).json({message : `Invalid canvas id ${id}`});
        }
        return res.status(500).json({message : `Something went wrong, could not update canvas with id ${id} : ${err}`});
    }
}

// @desc    Delete a canvas
// @route   DELETE /api/canvases/:id
// @access  Public
export const deleteCanvasById = async (req, res) => {
    const { id } = req.params;
    try{
        const deleted = await deleteCanvas(id);
        if(deleted === false){
            return res.status(404).json({message : `Canvas with id ${id} not found`});
        }
        return res.status(204).send();
    } catch(err){
        if(err.name === 'CastError'){
            return res.status(400).json({message : `Invalid canvas id ${id}`});
        }
        return res.status(500).json({message : `Something went wrong, could not delete canvas with id ${id} : ${err}`});
    }
}