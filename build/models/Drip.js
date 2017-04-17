import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Drip', new Schema({
    name: String,
    droppers: [String]
}));