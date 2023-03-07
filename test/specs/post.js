import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v2/');
import {expect} from 'chai';
import { faker } from '@faker-js/faker';
import { createRandomUser } from '../../helper/helper';

const TOKEN = 'c00377321ff01fc5c67198d192fe717f065acf09065c878e8a89896b2fda3776'

describe('User Posts', () => {
    let postId, userid; // create a postId to reuse in other tests 
    
    before(async () => {
      userid = await createRandomUser();
    });
    
    
    it('POSTS /posts',async () => {
        
        const data = {
                field: "User",
                message: faker.lorem.paragraphs(1),
                user_id: userid,
                title : "Argumentum ubi tolero est bis accipio voluptas temporibus decretum tempore temptatio titulus.",
                body : "Ventosus ultio degero. Tum canonicus dens. Spoliatio credo surgo. Virtus suffoco tamquam."
        }

       const res = await request 
        .post('posts')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        
        expect(res.body.user_id).to.equal(userid)
        postId = res.body.id // assign postId to the ID of the user that is created in this test
        console.log(postId)
    });

    it('GET /posts/id from previous test', async () => {
        await request 
        .get(`posts/${postId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .expect(200)
    });
});


/////////////////////////////NEGATIVE SCENARIOUS FOR APIs/////////////////////////////////

describe.only('Negative tests', () => {
    
    it('401 Authentication failed - request without authentication token',async () => {
        const data = {
            field: "User",
            message: faker.lorem.paragraphs(1),
            user_id: 777777,
            title : "Argumentum ubi tolero est bis accipio voluptas temporibus decretum tempore temptatio titulus.",
            body : "Ventosus ultio degero. Tum canonicus dens. Spoliatio credo surgo. Virtus suffoco tamquam."
    }

   const res = await request 
    .post('posts')
    .send(data);
     expect(res.status).to.equal(401)
     expect(res.text).to.equal('{"message":"Authentication failed"}')
    console.log(res)
    });

    it.only('422 data validation failed - request without proper data in the body', async () => {
        const data = {
            field: "User",
            message: faker.lorem.paragraphs(1),
            user_id: 777777,
            title : "Argumentum ubi tolero est bis accipio voluptas temporibus decretum tempore temptatio titulus.",
        }

   const res = await request 
    .post('posts')
    .set('Authorization', `Bearer ${TOKEN}`)
    .send(data);
     expect(res.status).to.equal(422)
     expect(res.text).to.equal('[{"field":"body","message":"can\'t be blank"}]')
    console.log(res)
    });
});