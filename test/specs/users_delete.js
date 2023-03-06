import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v2/');
import {expect} from 'chai';
import { faker } from '@faker-js/faker';

const TOKEN = 'c00377321ff01fc5c67198d192fe717f065acf09065c878e8a89896b2fda3776'

describe('Delete users create -> update -> delete', () => {
    let userID = null;
    it('POST - create a new user', async () => {
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
            userID = res.body.id 
        })
    });

    it('PUT update some data in users api', async () => {
        const data = {
           name: faker.name.firstName() 
        }
        await request
        .put(`users/${userID}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then(function(res) {
            console.log(res.body)
            expect(res.body).to.deep.include(data)
        })
    });

    it.only('DELETE remove the user',async () => {
        await request
        .delete(`users/${userID}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .then(function (res) {
            expect(res.body).to.be.equal(null);
        })
    });
});