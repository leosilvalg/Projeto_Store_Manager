const sinon = require('sinon');
const { expect } = require('chai');
const connect = require('../../../models/connection');

const serviceProduct = require('../../../services/product_service');
const modelProduct = require('../../../models/product_model');

describe('Faz a busca de um produto pelo id', () => {

  before(async () => {
    const execute = [[]];

    sinon.stub(connect, 'execute').resolves(execute);
  });

  after(async () => {
    connect.execute.restore();
  });

  describe('quando não existe um produto com o id informado', async () => {
    it('retorna um null', async () => {
      const response = await serviceProduct.getById();
      expect(response).to.be.equal(null);
    });
  });

  describe('quando existe um produto com o id informado', async () => {

    before(() => {
      sinon.stub(modelProduct, 'getById')
        .resolves(
          {
            id: 1,
            name: 'Produto teste'
          }
        );
    });

    after(() => {
      modelProduct.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await serviceProduct.getById(1);
      expect(response).to.be.an('object');
    });

    it('o objeto possui "id" e "name"', async () => {
      const response = await serviceProduct.getById(1);
      expect(response).to.include.all.keys('id', 'name');
    });

    it('o objeto não está vazio', async () => {
      const response = await serviceProduct.getById(1);
      expect(response).to.be.not.empty;
    });
  });
});