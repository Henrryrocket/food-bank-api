let inventory = [
  { id: 1, name: "Arroz", quantity: 50, unit: "kg" },
  { id: 2, name: "Leche", quantity: 20, unit: "litros" },
  { id: 3, name: "Harina de Trigo", quantity: 50, unit: "Kg" },
];

export const getItems = (req, res) => {
  res.status(200).json(inventory);
};
export const getItemById = (req, res) => {
  const item = inventory.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Producto no encontrado" });
  res.json(item);
};
export const addItem = (req, res) => {
  const { name, quantity, unit } = req.body;
  if (!name || !quantity) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }
  const newItem = { id: inventory.length + 1, name, quantity, unit };
  inventory.push(newItem);
  res.status(201).json(newItem);
};

export const deleteItem = (req, res) => {
  inventory = inventory.filter((i) => i.id !== parseInt(req.params.id));
  res.status(204).send(); // 204 significa "No Content", éxito pero sin respuesta visual
};
