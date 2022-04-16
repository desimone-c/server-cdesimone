import tuitsModel from '../models/tuits-model.js';
export const findAllTuits = () => tuitsModel.find();
export const createTuit = async (tuit) => {
    var newTuit = new tuitsModel(tuit);
    var savedTuit = {};
    await newTuit.save().then(tuit => {
        savedTuit = tuit;
        console.log(tuit._id);
    });
    console.log(savedTuit._id);
    return savedTuit;
}
export const deleteTuit = (tid) => tuitsModel.deleteOne({_id: tid});
export const updateTuit = (tid, tuit) => tuitsModel.updateOne({_id: tid}, {$set: tuit})
