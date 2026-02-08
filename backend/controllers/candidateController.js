import Candidate from "../models/Candidate.js";

export const createCandidate = async (req, res) => {
    try {
        const { name, email, phone, jobTitle } = req.body

        if (!name || !email || !phone || !jobTitle) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ error: 'Invalid phone number (must be 10 digits)' });
        }

        const candidate = new Candidate({
            name,
            email,
            phone,
            jobTitle,
            resume: req.file ? {
                data: req.file.buffer,
                contentType: req.file.mimetype
            } : null
        })

        await candidate.save()
        res.status(201).json(candidate)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getAllCandidate = async (req, res) => {
    try {
        const candidates = await Candidate.find().select('-resume.data');
        res.status(200).json(candidates)
    } catch (error) {
        res.status(400).json({ error: error.message });

    }
}

export const udpateCandidate = async (req, res) => {
    try {
        const { status } = req.body
        const { id } = req.params

        const validStatuses = ['Pending', 'Reviewed', 'Hired'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const candidate = await Candidate.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        )


        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.status(200).json(candidate)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const deleteCandidate = async (req, res) => {
    try {
        const { id } = req.params
        const candidate = await Candidate.findByIdAndDelete(id)
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const getCandidateResume = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);

        if (!candidate || !candidate.resume || !candidate.resume.data) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        res.set('Content-Type', candidate.resume.contentType);
        res.send(candidate.resume.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};