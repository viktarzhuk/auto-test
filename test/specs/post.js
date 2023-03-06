import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v2/');
import {expect} from 'chai';
import { faker } from '@faker-js/faker';

const TOKEN = 'c00377321ff01fc5c67198d192fe717f065acf09065c878e8a89896b2fda3776'

describe('User Posts', () => {
    
    
    it('POSTS /posts',async () => {
        const data = {
                field: "User",
                message: "ZAL",
                user_id: 838476,
                title : "Argumentum ubi tolero est bis accipio voluptas temporibus decretum tempore temptatio titulus.",
                body : "Ventosus ultio degero. Tum canonicus dens. Spoliatio credo surgo. Virtus suffoco tamquam."
        }

        await request 
        .post('posts')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then(function(res) {
            console.log(res.body)
            expect(res.body.user_id).to.equal(838476)
        })
    });
});