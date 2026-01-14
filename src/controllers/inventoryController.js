import { InventoryModel } from '../models/inventoryModel.js';

export const getItems = async (req, res, next) => {
  try {
    const items = await InventoryModel.findAll();
    res.status(200).json(items);
  } catch (error) {
    next(error); // Pasa el error al middleware de errores
  }
};

export const getItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await InventoryModel.findById(parseInt(id));

    if (!item) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const addItem = async (req, res, next) => {
  try {
    // Asumimos que el middleware de validación ya revisó el body
    const newItem = await InventoryModel.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await InventoryModel.delete(parseInt(id));

    if (!deleted) {
      return res
        .status(404)
        .json({ message: 'No se pudo eliminar: ID no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
