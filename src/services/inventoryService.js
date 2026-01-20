import { InventoryModel } from '../models/inventoryModel.js';

export const getAll = async () => {
  return await InventoryModel.find().lean();
};

export const getById = async (id) => {
  return await InventoryModel.findById(id).lean();
};

export const createItem = async (item) => {
  return await InventoryModel.create(item);
};

export const deleteItem = async (id) => {
  const doc = await InventoryModel.findByIdAndDelete(id);
  return !!doc;
};
