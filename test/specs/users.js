import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v2/');
import {expect} from 'chai';
import { faker } from '@faker-js/faker';

const TOKEN = 'c00377321ff01fc5c67198d192fe717f065acf09065c878e8a89896b2fda3776'

describe('Users API', () => {
    it('GET/Users',async () => {
        await request
       .get(`users?access-token=${TOKEN}`)
       .then(function (res) {
        // console.log(res.body)
        expect(res.body).to.not.be.empty;
       })          
   
    });

    it('GET /users/<id>', async () => {
        await request
        .get(`users/838001?access-token=${TOKEN}`)
        .then((res) => {
            console.log(res.body)
            expect(res.body.id).to.be.equal(838001);
        })
    });

    it('Get /users with some query parameters in URL',async () => {
        await request
        .get(`users?access-token=${TOKEN}&gender=female&page=5&status=active`)
        .then(function(res) {
            console.log(res.body)
            expect(res.body).to.not.be.empty;
            res.body.forEach(element => {
                expect(element.gender).to.equal('female');
                expect(element.status).to.equal('active');
            });
        })
    });

    it('POST some data to create a new user',async () => {
        const data = {
            email: faker.internet.email(), // create a data to POST to the server random email: `test-${Math.floor(Math.random()) * 9999}@mail.com`
            name: 'Test Name',
            gender: 'male',
            status: 'active'
        };

        await request.post('users')
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(data)
        .then(function(res) {
            console.log(res.body)
            // expect(res.body.email).to.equal(data.email)
            // expect(res.body.status).to.equal(data.status)
            
            expect(res.body).to.deep.include(data) // chai assertion for making deep equality comparison 
        })
    });

    it.only('PUT update some data in users api', async () => {
        const data = {
           name: faker.name.firstName() 
        }
        await request
        .put('users/839416')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then(function(res) {
            console.log(res.body)
            expect(res.body).to.deep.include(data)
        })
    });
        
});