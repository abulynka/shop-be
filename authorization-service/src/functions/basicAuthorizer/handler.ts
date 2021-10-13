import 'source-map-support/register';
import {APIGatewayRequestAuthorizerHandler} from "aws-lambda";
import {APIGatewayRequestAuthorizerEvent} from "aws-lambda/trigger/api-gateway-authorizer";

const basicAuthorizer: APIGatewayRequestAuthorizerHandler = async (event: APIGatewayRequestAuthorizerEvent) => {
  if (!event.headers['Authorization']) {
    throw new Error('Unauthorized: ' + JSON.stringify(event));
  }

  const token = event.headers['Authorization'];
  console.log('authorizationToken: ', token);

  const credentials = token.split(' ')[1];

  const [login, password] = Buffer.from(credentials, 'base64')
      .toString('utf-8')
      .split(':');

  let effect = 'Deny';
  if (process.env.hasOwnProperty(login) !== false && process.env[login] === password) {
    effect = 'Allow';
  }

  const generatedPolicy = generatePolicy(credentials, effect, event.methodArn);
  console.log(generatedPolicy);

  return generatedPolicy;
}

const generatePolicy = function(principalId: string, effect: string, resource: string) {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};

export const main = basicAuthorizer;
