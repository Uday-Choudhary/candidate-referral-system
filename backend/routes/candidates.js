import express from 'express'
import { createCandidate , udpateCandidate , getAllCandidate } from '../controllers/candidateController'
import multer from 'multer';


const router = express.Router()

router.post("/")
router.get("/" , getAllCandidate)
router.put("/:id/status" , udpateCandidate)

export default router