const User = require('../model/user');
const Resource = require('../model/resource');
const Role = require('../model/role');

async function generateRootAdmin() {
  // const admin = await User.findOne({username:'root'}).exec();
  // console.log(admin);
  // create root resources
  const backends = [
    {
      title: 'Get all backend services',
      locationPath: '/api/root/backend',
      httpVerb: 'GET',
      api: true,
      description: 'Return all backend services',
      activated: true
    },
    {
      title: 'Add new back-end service',
      locationPath: '/api/root/backend',
      httpVerb: 'PUT',
      api: true,
      description: 'Return a new back-end service',
      activated: true
    },
    {
      title: 'Update back-end service',
      locationPath: '/api/root/backend',
      httpVerb: 'POST',
      api: true,
      description: 'Return a updated service',
      activated: true
    },
    {
      title: 'Get all activated backend services',
      locationPath: '/api/root/backend/activated',
      httpVerb: 'GET',
      api: true,
      description: 'Return all activated backend services',
      activated: true
    },
    {
      title: 'Get all front-end services',
      locationPath: '/api/root/frontend',
      httpVerb: 'GET',
      api: true,
      description: 'Return all front-end services',
      activated: true
    },
    {
      title: 'Add new front-end service',
      locationPath: '/api/root/frontend',
      httpVerb: 'PUT',
      api: true,
      description: 'Return a new front-end service',
      activated: true
    },
    {
      title: 'Update front-end service',
      locationPath: '/api/root/frontend',
      httpVerb: 'POST',
      api: true,
      description: 'Return a updated service',
      activated: true
    },
    {
      title: 'Get all activated frontend services',
      locationPath: '/api/root/frontend/activated',
      httpVerb: 'GET',
      api: true,
      description: 'Return all activated frontend services',
      activated: true
    },
    {
      title: 'Get all roles',
      locationPath: '/api/root/role',
      httpVerb: 'GET',
      api: true,
      description: 'Return all roles',
      activated: true
    },
    {
      title: 'Add new role',
      locationPath: '/api/root/role',
      httpVerb: 'PUT',
      api: true,
      description: 'Return a new role',
      activated: true
    },
    {
      title: 'Update role',
      locationPath: '/api/root/role',
      httpVerb: 'POST',
      api: true,
      description: 'Return a updated role',
      activated: true
    },
    {
      title: 'Get all activated role',
      locationPath: '/api/root/role/activated',
      httpVerb: 'GET',
      api: true,
      description: 'Return all activated roles',
      activated: true
    },
    {
      title: 'Activate a role',
      locationPath: '/api/root/role/activate',
      httpVerb: 'POST',
      api: true,
      description: 'Return activated role',
      activated: true
    },
    {
      title: 'Get all users',
      locationPath: '/api/root/user',
      httpVerb: 'GET',
      api: true,
      description: 'Return all user',
      activated: true
    },
    {
      title: 'Add new user',
      locationPath: '/api/root/user',
      httpVerb: 'PUT',
      api: true,
      description: 'Return a new user',
      activated: true
    },
    {
      title: 'Activate user',
      locationPath: '/api/root/user/activate',
      httpVerb: 'POST',
      api: true,
      description: 'Return an activated user',
      activated: true
    },
    {
      title: 'Assign role',
      locationPath: '/api/root/user/assignrole',
      httpVerb: 'POST',
      api: true,
      description: 'Return an updated user',
      activated: true
    }
  ];

  Promise.all(
    backends.map(async (backend) => {
      const b = new Resource(backend);
      const r = await b.save();
      return r._id;
    })
  )
    .then(async (backendIds) => {
      const rootRole = new Role({
        title: 'root',
        activated: true,
        description: 'Root Admin',
        backends: backendIds
      });
      return rootRole.save();
    })
    .then(async (role) => {
      const rootUser = new User({
        username: 'root',
        password: 'root123',
        fullname: 'Root Admin',
        roles: [role._id],
        activated: true
      });
      const user = await rootUser.save();
      console.log(user);
    });

  // eslint-disable-next-line no-plusplus
  //   for (let i = 0; i < backends.length; i++) {
  //     const backend = new Resource(backends[i]);
  //     const r = await backend.save();
  //     backendIds.push(r._id);
  //   }

  // create root admin role
  //   let rootRole = new Role({
  //     title: 'root',
  //     activated: true,
  //     description: 'Root Admin',
  //     backends: backendIds
  //   });
  //   let role = await rootRole.save();

  // create root admin
  //   let rootUser = new User({
  //     username: 'root',
  //     password: 'root123',
  //     fullname: 'Root Admin',
  //     roles: [role._id],
  //     activated: true
  //   });

  //  let user = await rootUser.save();
  //  console.log(user);
}

module.exports = generateRootAdmin;
