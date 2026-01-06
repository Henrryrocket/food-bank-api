import express from "express";
const router = express.Router();
import {
  getItems,
  addItem,
  getItemById,
  deleteItem,
} from "../controllers/inventoryController.js";

router.get("/inventory", getItems);
router.get("/inventory/:id", getItemById);
router.post("/inventory", addItem);
router.delete("/inventory/:id", deleteItem);

export default router;
