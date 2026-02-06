import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true},
    phone : {type : Number , required : true},
    jobTitle : {type : String , required : true},
    status : {
        type : String,
        enum: ['Pending', 'Reviewed', 'Hired'],
        default : 'Pending'
    
    },
    resumeUrl : {type : String }

})

export default mongoose.model('Candidate' , candidateSchema)