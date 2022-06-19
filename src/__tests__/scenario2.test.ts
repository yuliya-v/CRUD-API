import request from "supertest";
import server from "../server";

describe('Scenario 2', () => {

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

  it('Should create multiple records', async () => {
    const newRecords = [
      {
        username: 'Tom',
        age: 5,
        hobbies: ['read']
      },
      {
        username: 'Tom',
        age: 5,
        hobbies: ['read']
      },
      {
        username: 'Jerry',
        age: 4,
        hobbies: ['read', 'sing']
      },
      {
        username: 'Alex',
        age: 10,
        hobbies: []
      },
      {
        username: 'Anna',
        age: 10,
        hobbies: ['swim']
      }
    ];

    const promises = newRecords.map(el => {
      return request(server)
        .post('/api/users')
        .send(el)
        .set('Accept', 'application/json');
    });

    const responses = await Promise.all(promises);
    expect(responses.every(el => el.status === 201)).toBe(true);
    createdRecordId = responses[0].body.id;
  
  });

  it('Should create no record', (done) => {
    request(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({
        username: 'Anna',
        age: 20
      })
      .then(response => {
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Body does not contain required fields: username (string), age(number), hobbies(array of strings or empty array)");
        done();
      })
      .catch(err => done(err));
  });

  it('Should update no record', (done) => {
    request(server)
      .put(`/api/users/${createdRecordId}`)
      .set('Accept', 'application/json')
      .send({
        user: 'Anna',
      })
      .then(response => {
        expect(response.status).toEqual(400);
        expect(response.body.message).toEqual("Body does not contain required fields: username (string), age(number), hobbies(array of strings or empty array)");
        done();
      })
      .catch(err => done(err));
  });

  test('Should return all records', (done) => {
    request(server)
      .get('/api/users')
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(5);
        done();
    })
    .catch(err => done(err));
  });

});