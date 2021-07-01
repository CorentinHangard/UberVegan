const swaggerAutogen = require('swagger-autogen')()

const outputFile = "./doc/swagger_output.json";
const endpointsFiles = ['./routes/commands.js'];

swaggerAutogen(outputFile, endpointsFiles)