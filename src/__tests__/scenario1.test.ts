import request from "supertest";
import server from "../server";

describe('Scenario 1', () => {

  it('Should return no records', (done) => {
    request(server)
    .get('/api/users')
    .set('Accept', 'application/json')
    .then(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toEqual([]);
      done();
    })
    .catch(err => done(err));
  });

  let createdRecordId = '';

  it('Should create record', (done) => {
    request(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'Tom',
        age: 5,
        hobbies: ['read']
      })
      .then(response => {
        expect(response.status).toEqual(201);
        createdRecordId = response.body.id;
        done();
      })
      .catch(err => done(err));
  });

  it('Should get record', (done) => {
    request(server)
      .get(`/api/users/${createdRecordId}`)
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject({
          username: 'Tom',
          age: 5,
          hobbies: ['read'],
          id: `${createdRecordId}`
        });
        done();
      })
      .catch(err => done(err));
  });

  it('Should update record', (done) => {
    request(server)
      .put(`/api/users/${createdRecordId}`)
      .set('Accept', 'application/json')
      .send({
        username: 'Tom',
        age: 6,
        hobbies: ['read', 'sing']
      })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject({
          username: 'Tom',
          age: 6,
          hobbies: ['read', 'sing'],
          id: `${createdRecordId}`
        });
        done();
      })
      .catch(err => done(err));
  });

  it('Should delete record', (done) => {
    request(server)
    .delete(`/api/users/${createdRecordId}`)
    .set('Accept', 'application/json')
    .then(response => {
      expect(response.status).toEqual(204);
      done();
    })
    .catch(err => done(err));
  });

  it('Should find no record', (done) => {
    request(server)
    .get(`/api/users/${createdRecordId}`)
    .set('Accept', 'application/json')
    .then(response => {
      expect(response.status).toEqual(404);
      expect(response.body.message).toEqual('User doesn\'t exist');
      done();
    })
    .catch(err => done(err));
  });

});