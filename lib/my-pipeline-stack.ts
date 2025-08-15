import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep, ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './my-pipeline-app-stage';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('volodkevych/my-pipeline', 'main', {
          authentication: cdk.SecretValue.secretsManager('my-pipeline-github-token')
        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });

    const appStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: "681702200272", region: "eu-west-1" }
    }));

    appStage.addPost(new ManualApprovalStep('approval'));
  }
}