import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v2/');
import {expect} from 'chai';
import { faker } from '@faker-js/faker';

const TOKEN = 'c00377321ff01fc5c67198d192fe717f065acf09065c878e8a89896b2fda3776'

describe('User Posts', () => {
    
    
    it('POSTS /posts',async () => {
        let postId; // create a postId to reuse in other tests 
        const data = {
                field: "User",
                message: faker.lorem.paragraphs(1),
                user_id: 838476,
                title : "Argumentum ubi tolero est bis accipio voluptas temporibus decretum tempore temptatio titulus.",
                body : "Ventosus ultio degero. Tum canonicus dens. Spoliatio credo surgo. Virtus suffoco tamquam."
        }

       const res = await request 
        .post('posts')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        
        expect(res.body.user_id).to.equal(838476)
        postId = res.body.id // assign postId to the ID of the user that is created in this test
        console.log(postId)
    });
});