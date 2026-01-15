import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { MyLambdaStack } from './my-pipeline-lambda-stack';
import { CfnbadStack } from './my-pipeline-cfn';

export class MyPipelineAppStage extends cdk.Stage {

    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);

      new MyLambdaStack(this, 'LambdaStack');
      new CfnbadStack(this, 'CfnbadStack');
    }
}