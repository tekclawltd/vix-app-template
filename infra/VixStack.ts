import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import * as path from 'path';

export class VixStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function
    const appLambda = new lambda.Function(this, 'AppHandler', {
      runtime: lambda.Runtime.NODEJS_20_X, // Upgraded from 16.x
      code: lambda.Code.fromAsset(path.join(__dirname, '../dist')),
      handler: 'server.eventHandler', // server.js exports eventHandler
      memorySize: 256, // Matching serverless.yml
      timeout: cdk.Duration.seconds(30),
      environment: {
        NODE_ENV: 'production',
      },
    });

    // Define the API Gateway
    const api = new apigateway.LambdaRestApi(this, 'VixApi', {
      handler: appLambda,
      proxy: true, // Proxy all requests to Lambda
      binaryMediaTypes: ['*/*'], // Matching serverless.yml
      deployOptions: {
        stageName: 'dev',
      },
    });

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'The URL of the API Gateway',
    });
  }
}
