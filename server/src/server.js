// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
  });
const path = require('path');

fastify.register(require('@fastify/multipart'),{ attachFieldsToBody: false })
fastify.register(require('@fastify/formbody'))

const { registerCors } = require('./Configs/Cors/CorsConfig');
const { connectToMongo } = require('./Configs/database/connectMongo');
const swagger = require('./Configs/Documentation/Swagger');
const { commonAllRoutes } = require('./Routes/MergedEndPoints/Common/CommonAllRoutes');

const { userAllRoutes } = require('./Routes/MergedEndPoints/User/UserAllRoutes');

require("dotenv").config({path: path.resolve(__dirname+'/.env')})

fastify.register(require("@fastify/swagger"), swagger.options);

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, '../uploads'),
  prefix: '/uploads/',
})

registerCors(fastify);
// fastify.decorateRequest('fastify', fastify);
connectToMongo();

//common Routes
commonAllRoutes(fastify)

//Users Routes
userAllRoutes(fastify)

  // Run the server!
  const startServer = async () => {
    try {
      await fastify.listen(2022,"0.0.0.0")
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }

  startServer();
