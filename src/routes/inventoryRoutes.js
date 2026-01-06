import express from "express";
import {
  getItems,
  addItem,
  getItemById,
  deleteItem,
} from "../controllers/inventoryController.js";
import { validateProduct } from "../middleware/validateInventory.js";

const router = express.Router();

router.get("/inventory", getItems);
router.get("/inventory/:id", getItemById);
router.post("/inventory", validateProduct, addItem);
router.delete("/inventory/:id", deleteItem);

export default router;
