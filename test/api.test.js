const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe('API Testing', () => {
  
  it('should return all items', (done) => {
    request(app)
      .get('/api/items')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(1);
        done();
      });
  });

  it('should create a new item', (done) => {
    const newItem = { name: 'Item 3' };

    request(app)
      .post('/api/items')
      .send(newItem)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name', 'Item 3');
        done();
      });
  });

  it('should update an existing item', (done) => {
    const updatedItem = { name: 'Updated Item' };
    
    request(app)
      .put('/api/items/1')  // Assuming the item with id 1 exists
      .send(updatedItem)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id', 1);
        expect(res.body).to.have.property('name', 'Updated Item');
        done();
      });
  });

  it('should return 404 for updating a non-existent item', (done) => {
    const updatedItem = { name: 'Non-existent Item' };
    
    request(app)
      .put('/api/items/999')  // Assuming item with id 999 doesn't exist
      .send(updatedItem)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Item not found');
        done();
      });
  });

  it('should delete an existing item', (done) => {
    request(app)
      .delete('/api/items/1')  // Assuming the item with id 1 exists
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Item deleted successfully');
        done();
      });
  });

  it('should return 404 for deleting a non-existent item', (done) => {
    request(app)
      .delete('/api/items/999')  // Assuming item with id 999 doesn't exist
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Item not found');
        done();
      });
  });
});