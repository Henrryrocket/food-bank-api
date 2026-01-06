export const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;

  // Validación: Que el nombre sea un texto y no esté vacío
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res
      .status(400)
      .json({ error: "El nombre es obligatorio y debe ser texto." });
  }

  // Validación: Que la cantidad sea un número y no sea negativa
  if (quantity === undefined || typeof quantity !== "number" || quantity < 0) {
    return res
      .status(400)
      .json({ error: "La cantidad debe ser un número mayor o igual a 0." });
  }

  // Si todo está bien, llamamos a next() para que pase al controlador
  next();
};
