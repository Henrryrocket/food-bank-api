export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Loguea el error en el servidor
  res.status(500).json({
    message: 'Ocurrió un error interno en el servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
};
