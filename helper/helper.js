import { faker } from '@faker-js/faker';
import supertest from 'supertest';
// import {expect} from 'chai';
const TOKEN = 'c00377321ff01fc5c67198d192fe717f065acf09065c878e8a89896b2fda3776'
const request = supertest('https://gorest.co.in/public/v2/');


export const createRandomUser = async () => {
    const userData = {
        email: faker.internet.email(),
        name: 'My test user',
        gender: 'Male',
        status: 'Inactive'
    };
    
    const res = await request 
    .post('users')
    .set('Authorization', `Bearer ${TOKEN}`)
    .send(userData)
     return  res.body.id;
     
};