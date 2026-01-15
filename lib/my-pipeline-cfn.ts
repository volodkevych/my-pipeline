import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3assets from 'aws-cdk-lib/aws-s3-assets';
import * as path from 'path';

export class CfnbadStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Apply required tags
    cdk.Tags.of(this).add('Project', 'Cfnbad');
    cdk.Tags.of(this).add('TestType', 'cfnbad');
    cdk.Tags.of(this).add('Environment', 'Test');
    cdk.Tags.of(this).add('AutoCleanup', 'true');

    // Create an asset from the template file
    const templatePath = path.resolve(__dirname, '../contents/cfnbad/template.yaml');
    const templateAsset = new s3assets.Asset(this, 'TemplateAsset', {
      path: templatePath,
    });

    // Deploy the template as a nested stack using the asset
    const nestedStack = new cdk.CfnStack(this, 'CfnbadNestedStack', {
      templateUrl: templateAsset.httpUrl,
      parameters: {
        Environment: 'dev',
        BucketPrefix: 'cfn-bad-app',
      },
    });

    // Ensure the asset is uploaded before the nested stack is created
    nestedStack.node.addDependency(templateAsset);

    // Outputs
    new cdk.CfnOutput(this, 'TemplateUrl', {
      value: templateAsset.httpUrl,
      description: 'URL of the CloudFormation template',
    });

    new cdk.CfnOutput(this, 'NestedStackId', {
      value: nestedStack.ref,
      description: 'ID of the nested stack',
    });
  }
}
