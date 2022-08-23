const connection = require('./connection');

const getAll = async () => {
  const [salesData] = await connection.execute(
    `SELECT sp.sale_id, sp.product_id, sp.quantity, sal.date
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS sal 
    ON sal.id = sp.sale_id
    ORDER BY sale_id, product_id`,
  );

  if (salesData.length === 0) return null;

  const salesAll = salesData.map((s) => ({
    saleId: s.sale_id,
    date: s.date,
    productId: s.product_id,
    quantity: s.quantity,
  }));

  return salesAll;
};

const getById = async (id) => {
  const [salesData] = await connection.execute(
    `SELECT sp.sale_id, sp.product_id, sp.quantity, sal.date
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS sal 
    ON sal.id = sp.sale_id
    WHERE sale_id = ?`, [id],
  );

  if (salesData.length === 0) return null;

  const salesId = salesData.map((sale) => ({
    saleId: sale.saleId,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));

  return salesId;
};

module.exports = {
  getAll,
  getById,
};