import mongoose from 'mongoose';
import serverConfig from '../configs/server';

let db = mongoose.createConnection(serverConfig.mongo.userActivity.url);

var DIUserActivitySchema = new mongoose.Schema({
        session_id: String,
        activity_ts: Date,
        schema_version: {type: Number, default: serverConfig.mongo.userActivity.schemaVersion},
        url: String,
        method: String,
        status_code: Number,
        username: String,
        device_profile: Object,
        client_ipaddress: String,
        host_name: String,
        host_address: String,
        response_time: Number,
        response_size: Number
    }, {
        safe: {
            w: 0
        }
    }
);

let DIUserActivity = db.model('diuseractivity', DIUserActivitySchema);

export default DIUserActivity;
