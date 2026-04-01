import { getAllCanvases } from "../services/canvas.service.js";

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