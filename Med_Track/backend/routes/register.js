import express from "express";
import  {register , getUsers, deleteUser ,updateUser }  from "../controllers/register.js"; 
const router = express.Router();

router.get("/", getUsers);

router.post("/", register);

router.delete("/:email", deleteUser);

router.put("/:email", updateUser);

export default router;