import express from 'express'
import { createCandidate, udpateCandidate, getAllCandidate, deleteCandidate, getCandidateResume } from '../controllers/candidateController.js'
import multer from 'multer';
import path from 'path'

const router = express.Router()

const storage = multer.memoryStorage();


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });

router.post("/", upload.single('resume'), createCandidate)
router.get("/", getAllCandidate)
router.get("/:id/resume", getCandidateResume);
router.put("/:id/status", udpateCandidate)
router.delete("/:id", deleteCandidate)

export default router