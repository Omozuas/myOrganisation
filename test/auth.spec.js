jest.setTimeout(30000);
const request = require('supertest');
const app = require('../server');
const sequelize = require('../src/config/sequelizeDb');
const{ User }= require('../src/model/user.model');
const JWT = require('jsonwebtoken');
const jwtToken = require('../src/service/jwtToken');
const bcrypt=require('bcrypt');
let server;
beforeAll(async () => {
  
    server = app.listen(process.env.TEST_PORT, () => {
      console.log(`Test server is running on ${process.env.TEST_PORT}`);
    });
   
    await sequelize.sync({ force: true });
    const response = await request(app)
    .post('/api/auth/signup')
    .send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '1234567890',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("userId");
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body.message).toBe('SigUp successful');
    
  });
  
 
  
  describe('User Authentication and Organisation Management', () => {
    let token;
    let userId;
    let orgId;
  
    beforeEach(async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john.doe@example.com',
          password: 'password123',
        });
     expect(response.statusCode).toBe(200); 
   
      token = response.body.accessToken;
      expect(token).toBeDefined();
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      userId = decoded.id; // Extract the userId from the decoded token
    });

    it('should generate a token that expires in 1 day', () => {
        const token = jwtToken.generateToken('userId123');
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        
        expect(decoded).toHaveProperty('id', 'userId123');
        expect(decoded.exp - decoded.iat).toBe(86400); // 1 day in seconds
      });
  
    it('should register a new user and create a default organisation', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          password: 'password123',
          phone: '0987654321'
        });
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
    });
  
    it('should log the user in successfully', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john.doe@example.com',
          password: 'password123'
        });
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('email', 'john.doe@example.com');
      expect(response.body).toHaveProperty('accessToken');
    });
  
    it('should fail if required fields are missing during signup', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          firstName: 'MissingLastName'
        });
  
      expect(response.statusCode).toBe(422);
      expect(response.body).toHaveProperty('message');
    });
  
    it('should fail if there is a duplicate email during signup', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          phone: '1234567890'
        });
  
      expect(response.statusCode).toBe(422);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Email already exists');
    });
  
    it('should get user organisations', async () => {
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('Organisations');
      expect(response.body.message).toBe('user retrived');
    });
  
    it('should create a new organisation', async () => {
      const response = await request(app)
        .post('/api/organisation')
        .send({
          name: 'New Organisation',
          description: 'Description of new organisation'
        })
        .set('Authorization', `Bearer ${token}`);
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('name', 'New Organisation');
      expect(response.body.data).toHaveProperty('organization_id');
      orgId = response.body.data.organization_id;
      expect(response.body.message).toBe('Organisation created successfully');
    });
  
    it('should add a user to an organisation', async () => {
      const response2 = await request(app)
    .post('/api/auth/signup')
    .send({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: 'password123',
        phone: '0987654321',
    });
  
      const response = await request(app)
        .post(`/api/organisation/${orgId}/users`)
        .set('Authorization', `Bearer ${token}`)
        .send({ userId: response2.body.data.userId });
       
       
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("organisation");
      expect(response.body.message).toBe('User added to organisation successfully');
    });
  
    it('should fail if organisation is not found', async () => {
      const response = await request(app)
        .get('/api/organisation/99')
        .set('Authorization', `Bearer ${token}`);
      
      expect(response.statusCode).toBe(422);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('organisation not found');
    });


  it('should not allow users to see organisations they don’t have access to', async () => {
    const newUser = await User.create({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smi@example.com',
      password: await bcrypt.hash('password123', 10),
      phone: '0987654321',
    });

    const newToken = JWT.sign({ id: newUser.userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const response = await request(app)
      .get('/api/organisation')
      .set('Authorization', `Bearer ${newToken}`);
    expect(response.statusCode).toBe(422); 
    expect(response.body.message).toBe('Error');
  
  });
  afterAll(async () => {
    await sequelize.close();
   server.close();
  });
  });