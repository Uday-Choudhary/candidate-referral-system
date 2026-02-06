import Candidate from "../models/Candidate";

export const createCandidate = async (req , res) => {
    try {
        const {name , email , phone , jobTitle} = req.body

        const candidate = new Candidate({
            name , email , phone , jobTitle,
            resumeUrl: req.file ? req.file.path : null // Save file path if upload exists [cite: 35]
        })

        await candidate.save()
        res.status(201).json(candidate)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getAllCandidate = async (req , res) => {
    try {
        const candidates = await Candidate.find()
        res.status(200).json(candidates)
    } catch (error) {
        res.status(400).json({ error: error.message });

    }
}

export const udpateCandidate = async (req , res) => {
    try {
        const { status } = req.body
        const {id} = req.params.id
        const candidate = Candidate.findByIdAndUpdate(
            id ,
            {status},
            {new : true}
         )


        if(!candidate){
            return res.status(404).json({ error: 'Candidate not found' });
        }
         res.status(200).json(candidate)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}