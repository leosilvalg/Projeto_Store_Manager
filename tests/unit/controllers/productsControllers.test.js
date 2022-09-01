const sinon = require('sinon');
const { expect } = require('chai');

const serviceProduct = require('../../../services/product_service');
const controllerProduct = require('../../../controllers/product_controller');

describe('Chamado o controller da função getById', () => {

  describe('quando não a produtos no Banco', async () => {
    const req = {};
    const res = {};

    before(() => {
      req.params = { id: 1 };

      res.status = sinon.stub()
        .returns(res);
      res.send = sinon.stub()
        .returns();
      
      sinon.stub(serviceProduct, 'getById')
        .resolves(null);
    });

    after(() => {
      serviceProduct.getById.restore();
    });

    it('chamado o status 404', async () => {
      await controllerProduct.getById(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
    });

    it('chamada a mensagem "Product not found"', async () => {
      await controllerProduct.getById(req, res);

      expect(res.message.calledWith('Product not found')).to.be.equal(true);
    });
  });

  describe('quando a produtos no Banco', async () => {
    const req = {};
    const res = {};

    before(() => {
      req.params = { id: 1 };

      res.status = sinon.stub()
        .returns(res);
      res.send = sinon.stub()
        .returns();
      
      sinon.stub(serviceProduct, 'getById')
        .resolves({
          id: 1,
          name: 'Produto teste',
        });
    });

    after(() => {
      serviceProduct.getById.restore();
    });

    it('chamado o status 200', async () => {
      await controllerProduct.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado um json com o objeto', async () => {
      await controllerProduct.getById(req, res);

      expect(res.send.calledWith(sinon.match.object).to.be.equal(true));
    });
  });
})