const connection = require('./connection');

const getAll = async () => {
  const [productData] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return productData;
};

const getById = async (id) => {
  const [productData] = await connection.execute(
    'SELECT * FROM StoreManager.products where id = ?', [id],
  );

  if (productData === 0) return null;

  return productData[0];
};

module.exports = {
  getAll,
  getById,
};