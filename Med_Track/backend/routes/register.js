import express from "express";
import  {register , getUsers}  from "../controllers/register.js"; 
const router = express.Router();

router.get("/", getUsers);

router.post("/", register);

export default router;