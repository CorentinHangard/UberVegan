const swaggerAutogen = require('swagger-autogen')()

const outputFile = "./doc/swagger_output.json";
const endpointsFiles = ['./routes/stats.js'];

swaggerAutogen(outputFile, endpointsFiles)