const request = require('supertest');
const app = require("../src/app");
const User = require('../user/User');
const sequelize = require('../config/database')

beforeAll(() => {
    return sequelize.sync();
})

beforeEach(() => {
    return User.destroy({truncate: true})
})

describe('User Registration', () => {

    const postRequestMock = () => {
        return request(app).post('/api/v1/users').send({
            username: "user2",
            email:"user2@gmail.com",
            password: "1234556778"
        })
    }

    it('return 200 when signup request is valid', async () => {
        const response = await postRequestMock();
        expect(response.status).toBe(200);
    })

    it('return success message when sign up request is valid.', async () => {
        const response = await postRequestMock();
        expect(response.body.message).toBe('user created');
    })

    it('saves the user to database ', async () => {
        await postRequestMock();
        const userList = await User.findAll();
        expect(userList.length).toBe(1)
    })

    it('saves the username and email to the database ', async () => {
        await postRequestMock();
        const userList = await User.findAll();
        const savedUser = userList[0];
        expect(savedUser.username).toBe("user2")
        expect(savedUser.email).toBe("user2@gmail.com")
    })

})