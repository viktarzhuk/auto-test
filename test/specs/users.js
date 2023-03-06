import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v2/');
import {expect} from 'chai';

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

    it.only('GET /users/<id>', async () => {
        await request
        .get(`users/838001?access-token=${TOKEN}`)
        .then((res) => {
            console.log(res.body)
            expect(res.body).to.not.be.empty;
        })
    });
        
});