import request from 'supertest';
import { app } from '../../app';

it('has route handler listening to /api/tickets for post request ', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});
it('can only be accessed if user signed in ', async () => {
  await request(app).post('/api/tickets').send({}).expect(400);
});
it('return status other than 401 if the user signed in  ', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});
it(' return an error if an invalid title provided  ', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10,
    })

    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: 10,
    })

    .expect(400);
});
it('return an error if an invalid price provided ', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'sss',
      price: -10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
    })
    .expect(400);
});
it('create a tickets with valid parameter inputs  ', async () => {});
