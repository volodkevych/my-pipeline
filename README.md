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
1. Change `account` and `region` settings in `my-pipeline.ts` to point to your account
2. Bootstrap the account (or accounts): https://docs.aws.amazon.com/cdk/v2/guide/cdk-pipeline.html#cdk-pipeline-bootstrap
3. Define `my-pipeline-github-token` token in GitHub → Settings → Developer settings → Personal access tokens with access to Commits and Webhooks
