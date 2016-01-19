import mongoose from 'mongoose';
import serverConfig from '../configs/server';

let VersionsSchema = new mongoose.Schema({
    _id: String,
    version: Number,
    updated_by_username: String
})

let Versions = mongoose.model('Versions', VersionsSchema, 'Versions');
export default Versions;