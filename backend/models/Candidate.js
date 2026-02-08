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
    resume : {
        data : Buffer,
        contentType : String
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

candidateSchema.virtual('resumeUrl').get(function () {
    if (this.resume && (this.resume.data || this.resume.contentType)) {
        return `candidates/${this._id}/resume`;
    }
    return null;
});

export default mongoose.model('Candidate' , candidateSchema)