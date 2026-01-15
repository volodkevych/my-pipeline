import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep, ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './my-pipeline-app-stage';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      crossAccountKeys: true,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('volodkevych/my-pipeline', 'main', {
          authentication: cdk.SecretValue.secretsManager('my-pipeline-github-token')
        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });

    const appStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: "673895029887", region: "eu-central-1" }
    }));
    const appStageCrossRegion = pipeline.addStage(new MyPipelineAppStage(this, "test-cross-region", {
      env: { account: "673895029887", region: "us-east-1" }
    }));
    const appStageCrossAccount = pipeline.addStage(new MyPipelineAppStage(this, "test-cross-account", {
      env: { account: "681702200272", region: "us-west-2" }
    }));

    appStage.addPre(new ManualApprovalStep('approval'));
  }
}