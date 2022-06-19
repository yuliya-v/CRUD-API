import request from "supertest";
import server from "../server";

describe('Scenario3', () => {
  const newRecords = [
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
    }
  ];

  let createdRecordId = '';

  it('Should create new records', async () => {

    const promises = newRecords.map(el => {
      return request(server)
        .post('/api/users')
        .send(el)
        .set('Accept', 'application/json');
    });

    const responses = await Promise.all(promises);
    expect(responses.every(el => el.status === 201)).toBe(true);
    expect(responses.length).toEqual(3);
    createdRecordId = responses[0].body.id;
  });

  it('Should delete no record', (done) => {
    request(server)
    .delete('/api/users/123')
    .set('Accept', 'application/json')
    .then(response => {
      expect(response.status).toEqual(400);
      expect(response.body.message).toEqual('User ID is invalid');
      done();
    })
    .catch(err => done(err));
  });

  it('Should return all records', (done) => {
    request(server)
    .get('/api/users')
    .set('Accept', 'application/json')
    .then(response => {
      expect(response.status).toEqual(200);
      expect(response.body.length).toEqual(3);
      done();
    })
    .catch(err => done(err));
  });

  it('Should delete no record', (done) => {
    request(server)
    .delete('/api/users/99bd42f9-e1b9-40f3-af8f-87d6aea40f85')
    .set('Accept', 'application/json')
    .then(response => {
      expect(response.status).toEqual(404);
      expect(response.body.message).toEqual('User doesn\'t exist');
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

  it('Should return all records', (done) => {
    request(server)
    .get('/api/users')
    .set('Accept', 'application/json')
    .then(response => {
      expect(response.status).toEqual(200);
      expect(response.body.length).toEqual(2);
      done();
    })
    .catch(err => done(err));
  });
});
