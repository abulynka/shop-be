import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import getProductsList from '@functions/getProductsList';
import getProductById from '@functions/getProductById';
import createProduct from '@functions/createProduct';
import catalogBatchProcess from '@functions/catalogBatchProcess';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-dotenv-plugin',
  ],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: process.env['PG_HOST_ENV'],
      PG_PORT: process.env['PG_PORT'],
      PG_DATABASE: process.env['PG_DATABASE'],
      PG_USERNAME: process.env['PG_USERNAME'],
      PG_PASSWORD: process.env['PG_PASSWORD'],
      SQS_URL: { Ref: 'catalogItemsQueue' },
      SNS_ARN: { Ref: 'createProductTopic' },
    },
    lambdaHashingVersion: '20201221',
    stage: 'dev',
    region: 'eu-west-1',
    httpApi: {
      cors: true
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: {
          'Fn::GetAtt': ['catalogItemsQueue', 'Arn'],
        },
      },
      {
        Effect: 'Allow',
        Action: 'sns:*',
        Resource: {
          'Ref': 'createProductTopic'
        },
      }
    ],
  },
  resources: {
    Resources: {
      catalogItemsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'catalogItemsQueue',
        },
      },
      createProductTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'createProductTopic'
        }
      },
      createProductTopicSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'abulynka@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'createProductTopic'
          }
        }
      },
      createProductTopicSubscriptionAdditional: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'alexbulynka@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'createProductTopic'
          },
          FilterPolicy: {
            'additional': ['data']
          }
        }
      },
    },
    Outputs: {
      catalogItemsQueue: {
        Value: {
          Ref: 'catalogItemsQueue',
        },
        Export: {
          Name: 'catalogItemsQueue',
        },
      },
      catalogItemsQueueArn: {
        Value: {
          'Fn::GetAtt': ['catalogItemsQueue', 'Arn'],
        },
        Export: {
          Name: 'catalogItemsQueueArn',
        },
      },
    },
  },

  functions: { hello, getProductsList, getProductById, createProduct, catalogBatchProcess },
};

module.exports = serverlessConfiguration;
