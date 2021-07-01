const swaggerAutogen = require('swagger-autogen')()

const outputFile = "./doc/swagger_output.json";
const endpointsFiles = ['./routes/users.js'];

swaggerAutogen(outputFile, endpointsFiles)