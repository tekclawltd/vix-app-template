import * as cdk from 'aws-cdk-lib';
import { VixStack } from './VixStack';

const app = new cdk.App();
new VixStack(app, 'VixStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'eu-west-2',
  },
});
