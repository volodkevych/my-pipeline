# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## Pre-reqs

In order to run this, you need:
1. Change `account` and `region` settings in `bin/my-pipeline.ts` and `lib/my-pipeline-stack.ts` (pipeline stages) to point to your accounts
2. Bootstrap the pipeline account: `npx cdk bootstrap aws://ACCOUNT/REGION`
3. Bootstrap cross-account/region targets with trust to pipeline account:
   ```bash
   npx cdk bootstrap aws://TARGET_ACCOUNT/TARGET_REGION --trust PIPELINE_ACCOUNT
   ```
4. Create `my-pipeline-github-token` secret in AWS Secrets Manager with your GitHub personal access token (needs repo access)
