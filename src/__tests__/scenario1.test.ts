import supertest from "supertest";
import server from "../index";

describe('Scenario 1', () => {

  test('Should return no records', () => {
    supertest(server)
    .get('/api/users')
    .set('Accept', 'application/json')
    .then(response => {
      expect(response.headers["Content-Type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual([]);
    });
  });

  let createdRecordId = '';

  test('Should create record', () => {
    supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'Tom',
        age: 5,
        hobbies: ['read']
      })
      .then(response => {
        expect(response.headers["Content-Type"]).toMatch(/json/);
        expect(response.status).toEqual(201);
        createdRecordId = response.body.id;
      });
  });

  test('Should get record', () => {
    supertest(server)
    .get(`/api/users/${createdRecordId}`)
    .set('Accept', 'application/json')
    .then(response => {
      expect(response.headers["Content-Type"]).toMatch(/json/);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        username: 'Tom',
        age: 5,
        hobbies: ['read'],
        id: `${createdRecordId}`
      });
    });
  });

  test('Should update record', () => {
    supertest(server)
      .put(`/api/users/${createdRecordId}`)
      .set('Accept', 'application/json')
      .send({
        username: 'Tom',
        age: 6,
        hobbies: ['read', 'sing']
      })
      .then(response => {
        expect(response.headers["Content-Type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
          username: 'Tom',
          age: 6,
          hobbies: ['read', 'sing'],
          id: `${createdRecordId}`
        });
      });
  });

  test('Should delete record', () => {
    supertest(server)
    .delete(`/api/users/${createdRecordId}`)
    .set('Accept', 'application/json')
    .then(response => {
      expect(response.status).toEqual(204);
    });
  });

  test('Should find no record', () => {
    supertest(server)
    .get(`/api/users/${createdRecordId}`)
    .set('Accept', 'application/json')
    .then(response => {
      expect(response.headers["Content-Type"]).toMatch(/json/);
      expect(response.status).toEqual(404);
      expect(response.body.message).toEqual('User doesn\'t exist');
    });
  });

});