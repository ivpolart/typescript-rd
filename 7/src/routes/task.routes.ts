import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
  console.log(req.body);
  const created = req.body;
  res.status(201).json(created)
})