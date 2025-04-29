import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Healthcare Onboarding API',
      version: '1.0.0',
      description: 'API documentation for healthcare onboarding services',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: '/api/v1',
        description: 'API server'
      }
    ],
  },
  apis: ['./routes/*.ts', './controllers/*.ts'] // Path to the API files
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };