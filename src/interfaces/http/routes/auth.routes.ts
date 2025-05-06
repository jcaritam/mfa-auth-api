import { Router } from "express";
import { loginUser, registerUser, setupMfa, verifyMfaCode } from "../controllers/auth.controller";

const router = Router();

router.post('/login',loginUser);
router.post('/register',registerUser);
router.post('/verify-mfa', verifyMfaCode);

router.post('/mfa/setup', setupMfa);


export default router;