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