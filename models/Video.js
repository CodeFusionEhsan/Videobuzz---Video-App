import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
    video: {type: String},
    title: {type: String},
    description: {type: String},
    uploaded_by: {type: String},
    category: {type: String},
    uploaded_at: {type: Date, default: Date.now()},
    likes: []
})

uploadSchema.index({title: 'text', description: 'text', category: 'text'});

const uploadModel = mongoose.models.videos || mongoose.model("videos", uploadSchema);
uploadModel.createIndexes()

export default uploadModel