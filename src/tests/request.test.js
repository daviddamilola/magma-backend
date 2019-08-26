import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const { expect } = chai;

let userToken, userToken3;

describe('/POST Requests route', () => {
  before(done => {
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'tosin@mail.com',
        password: 'Password1',
      })
      .end((err, res) => {
        userToken = res.body.data.token;
        done(err);
      });
  });

  it('should return an error if user is not authenticated', done => {
    chai
      .request(app)
      .post('/api/v1/requests')
      .set('authorization', '')
      .send({
        origin: 'Lagos  ',
        destination: '  London  ',
        type: 'one-way',
        departureDate: '2019-10-11',
        reason: '   dgfgfg      hfhfhf       kfkfkf   ',
        accommodation: '   bbbv   '
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .eql('You are not logged in');
        done(err);
      });
  });

  it('should return an error if token cannot be authenticated', done => {
    chai
      .request(app)
      .post('/api/v1/requests')
      .set('authorization', 'urgjrigriirkjwUHJFRFFJrgfr')
      .send({
        origin: 'Lagos  ',
        destination: '  London  ',
        type: 'one-way',
        departureDate: '2019-10-11',
        returnDate: '2019/11/10',
        reason: '   dgfgfg      hfhfhf        kfkfkf   ',
        accommodation: '   bbbv   '
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .eql('Authentication failed');
        done(err);
      });
  });

  it('should return an error if request details are invalid', done => {
    chai
      .request(app)
      .post('/api/v1/requests')
      .set('authorization', `Bearer ${userToken}`)
      .send({
        origin: '',
        destination: '  London  ',
        type: 'one-wy',
        departureDate: '2019/160/11',
        returnDate: '2029/22/33',
        reason: '   dgfgfg      hfhfhf        kfkfkf   ',
        accommodation: '   bbbv   '
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });

  it('should return an error if one-way trip has return date', done => {
    chai
      .request(app)
      .post('/api/v1/requests')
      .set('authorization', `Bearer ${userToken}`)
      .send({
        origin: 'Lagos',
        destination: '  London  ',
        type: 'one-way',
        departureDate: '2019-10-11',
        returnDate: '2019-11-11',
        reason: '   dgfgfg      hfhfhf        kfkfkf   ',
        accommodation: '   bbbv   '
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('message')
          .eql('you cannot have returnDate for a one-way trip');
        done(err);
      });
  });

  it('should return an error if departure date has gone already', done => {
    chai
      .request(app)
      .post('/api/v1/requests')
      .set('authorization', `Bearer ${userToken}`)
      .send({
        origin: 'Lagos',
        destination: '  London  ',
        type: 'one-way',
        departureDate: '2019-08-11',
        reason: '   dgfgfg      hfhfhf        kfkfkf   ',
        accommodation: '   bbbv   '
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('message')
          .eql('you cannot go back in time');
        done(err);
      });
  });

  it('should book a trip if details are valid', done => {
    chai
      .request(app)
      .post('/api/v1/requests')
      .set('authorization', `Bearer ${userToken}`)
      .send({
        origin: 'Lagos  ',
        destination: '  London  ',
        type: 'return',
        departureDate: '2019-10-11',
        returnDate: '2019-11-11',
        reason: '   dgfgfg      hfhfhf        kfkfkf   ',
        accommodation: '   bbbv   '
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('origin');
        expect(res.body.data).to.have.property('returnDate');
        expect(res.body).to.have.property('message')
          .eql('travel request booked successfully');
        done(err);
      });
  });

  it('should return an error if a requester already has a trip booked for that period', done => {
    chai
      .request(app)
      .post('/api/v1/requests')
      .set('authorization', `Bearer ${userToken}`)
      .send({
        origin: 'Lagos  ',
        destination: '  London  ',
        type: 'return',
        departureDate: '2019-10-11',
        returnDate: '2019-11-11',
        reason: '   dgfgfg      hfhfhf        kfkfkf   ',
        accommodation: '   bbbv   '
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('message')
          .eql('you already have a trip booked around this period, '
            + 'you may choose to cancel and make a multi-city request');
        done(err);
      });
  });

  it('should cancel request successfully', done => {
    chai
      .request(app)
      .delete('/api/v1/requests/1')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(201);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.property('message')
          .eql('Request has been deleted successfully');
        done();
      });
  });

  it('should return an error if the request Id is not a number', done => {
    chai
      .request(app)
      .delete('/api/v1/requests/n')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.property('message');
        done();
      });
  });

  it('should return an error if the requester is not the owner of the request', done => {
    chai
      .request(app)
      .delete('/api/v1/requests/3')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(403);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.property('message');
        done();
      });
  });

  it('should return an error if request is not found', done => {
    chai
      .request(app)
      .delete('/api/v1/requests/78')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.equal(404);
        expect(res.status).to.be.a('number');
        expect(body).to.be.an('object');
        expect(body).to.have.property('message')
          .eql('Request does not exist');
        done();
      });
  });
});
describe('/GET Requests route', () => {
  before(done => {
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'notmadiba@gmail.com',
        password: 'Tosin1234',
      })
      .end((err, res) => {
        userToken3 = res.body.data.token;
        done(err);
      });
  });
  it('should return an error if a user hasno travel requests yet', done => {
    chai
      .request(app)
      .get('/api/v1/requests')
      .set('authorization', `Bearer ${userToken3}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('message')
          .eql('You are yet to book a make a trip request');
        done(err);
      });
  });
  it('should return success if a user has travel requests', done => {
    chai
      .request(app)
      .get('/api/v1/requests')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('success');
        expect(res.body).to.have.property('message')
          .eql('Trip requests retrieved successfully');
        done(err);
      });
  });
});

describe('/PATCH Requests route', () => {
  it('should return error if request does not exist', done => {
    chai
      .request(app)
      .patch('/api/v1/requests/100')
      .set('authorization', `Bearer ${userToken}`)
      .send({
        origin: 'Ogun',
        destination: 'London',
        type: 'return',
        departureDate: '2020-10-12',
        returnDate: '2021-10-12',
        reason: 'Moving to a new office location',
        accommodation: 'Buckingham Palace'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .eql('Request does not exist');
        done(err);
      });
  });

  it('should return error if details are invalid', done => {
    chai
      .request(app)
      .patch('/api/v1/requests/1')
      .set('authorization', `Bearer ${userToken}`)
      .send({
        origin: '',
        destination: 'London',
        type: 'return',
        departureDate: '2020-10-12',
        returnDate: '2021-10-12',
        reason: 'Moving to a new office location',
        accommodation: 'Buckingham Palace'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });

  it('should edit & update if details are valid', done => {
    chai
      .request(app)
      .patch('/api/v1/requests/2')
      .set('authorization', `Bearer ${userToken}`)
      .send({
        origin: 'Ogun  ',
        destination: '  London  ',
        type: 'one-way',
        departureDate: '2019-10-11',
        reason: '   dgfgfg      hfhfhf       kfkfkf   ',
        accommodation: '   bbbv   '
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .eql('travel request updated successfully');
        done(err);
      });
  });
});
