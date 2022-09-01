const sinon = require('sinon');
const { expect } = require('chai');
const connect = require('../../../models/connection');

const product_service = require('../../../services/product_service');
const product_model = require('../../../models/product_model');

describe('Testando o arquivo product_service.js', () => {

  describe('Teste da função getAll', () => {

    const products = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ];

    before(async () => {
      sinon.stub(product_model, 'getAll').resolves(products);
    });

    after(async () => {
      product_model.getAll.restore();
    });

    it('Teste do retorno correto dos produtos', async () => {
      const response = await product_service.getAll();

      expect(response).to.be.an('array');
      expect(response[0]).to.include.all.keys('id', 'name');
      expect(response).to.be.not.empty;
    });
  });

  describe('Teste da função getById', () => {

    const product = { id: 1, name: 'Martelo de Thor' };
  
    before(async () => {
  
      sinon.stub(product_model, 'getById').resolves(product);
    });
  
    after(async () => {
      product_model.getById.restore();
    });
  
    describe('quando existe um produto com o id informado', async () => {
  
      it('e o objeto é retornado com "id" e "name"', async () => {
        const response = await product_service.getById(1);

      expect(response).to.be.an('object');
      expect(response).to.include.all.keys('id', 'name');
      expect(response).to.be.not.empty;
      });
    });
  });

  describe('Teste da função create', async () => {
    const product = { name: 'Martelo do Batman' };

    before(async () => {
  
      sinon.stub(product_model, 'createProduct').resolves(product);
    });

    after(async () => {
      product_model.createProduct.restore();
    });

    describe('quando o produto é cadastrado', async () => {
  
      it('e o objeto é retornado com "id" e "name"', async () => {
        const response = await product_service.create({ name: 'Martelo do Batman' });

      expect(response).to.be.an('object');
      expect(response).to.include.all.keys('name');
      expect(response).to.be.not.empty;
      });
    });
  });

  describe('Teste da função update', async () => {

    before(async () => {
      sinon.stub(product_model, 'getById').resolves(1);
      sinon.stub(product_model, 'updateProduct').resolves({ id:1, name: 'Martelo do Capitão América' });

    });

    after(async () => {
      product_model.updateProduct.restore();
    });

    describe('quando o produto é atualizado', async () => {
  
      it('e o objeto é retornado atualizado', async () => {
        const response = await product_service.update({ id:1, name: 'Martelo do Capitão América' });

      expect(response).to.be.an('object');
      expect(response).to.include.all.keys('id', 'name');
      expect(response).to.be.not.empty;
      });
    });
  });

  describe('Teste da função delete', async () => {

    before(async () => {
      sinon.stub(product_model, 'deleteProduct').resolves(1);
    });

    after(async () => {
      product_model.deleteProduct.restore();
    });

    describe('quando o produto é deletado', async () => {
  
      it('e é retornado o id do produto', async () => {
        const response = await product_service.deleted(1);

      expect(response).to.be.eq(1);
      });
    });
  });
});