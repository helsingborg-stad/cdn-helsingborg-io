import * as sst from '@serverless-stack/resources';
import { ApiKey, UsagePlan } from '@aws-cdk/aws-apigateway';

export default class ApiStack extends sst.Stack {
  // Public ref to the API
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const {
      navigationsTable,
      guidegroupsTable,
      languagesTable,
      guidesTable,
      interactiveGuidesTable,
    } = props;

    // Create the API
    this.api = new sst.ApiGatewayV1Api(this, 'Api', {
      defaultFunctionProps: {
        environment: {
          NAVIGATIONS_TABLE_NAME: navigationsTable.tableName,
          GUIDEGROUPS_TABLE_NAME: guidegroupsTable.tableName,
          GUIDES_TABLE_NAME: guidesTable.tableName,
          LANGUAGES_TABLE_NAME: languagesTable.tableName,
          INTERACTIVE_GUIDES_TABLE_NAME: interactiveGuidesTable.tableName,
        },
      },
      routes: {
        // Navigations
        'GET /navigations': {
          function: {
            srcPath: 'src/navigations/',
            handler: 'getNavigations.main',
            environment: { tableName: navigationsTable.tableName },
          },
        },
        'POST /navigations': {
          function: {
            srcPath: 'src/navigations/',
            handler: 'createNavigation.main',
            environment: { tableName: navigationsTable.tableName },
          },
          methodOptions: { apiKeyRequired: true },
        },
        'DELETE /navigations/{city}/{language}/{id}': {
          function: {
            srcPath: 'src/navigations/',
            handler: 'deleteNavigation.main',
            environment: { tableName: navigationsTable.tableName },
          },
        },
        // Guidegroups
        'GET /guidegroups': {
          function: {
            srcPath: 'src/guidegroups/',
            handler: 'getGuideGroups.main',
            environment: { tableName: guidegroupsTable.tableName },
          },
        },
        'POST /guidegroups': {
          function: {
            srcPath: 'src/guidegroups/',
            handler: 'createGuideGroup.main',
            environment: { tableName: guidegroupsTable.tableName },
          },
        },
        'DELETE /guidegroups/{id}': {
          function: {
            srcPath: 'src/guidegroups/',
            handler: 'deleteGuideGroup.main',
            environment: { tableName: guidegroupsTable.tableName },
          },
        },
        'PUT /guidegroups/{id}': {
          function: {
            srcPath: 'src/guidegroups/',
            handler: 'updateGuideGroup.main',
            environment: { tableName: guidegroupsTable.tableName },
          },
        },
        // Languages
        'GET /languages': {
          function: {
            srcPath: 'src/languages',
            handler: 'getLanguages.main',
            environment: { tableName: languagesTable.tableName },
          },
        },
        'POST /languages': {
          function: {
            srcPath: 'src/languages',
            handler: 'createLanguages.main',
            environment: { tableName: languagesTable.tableName },
          },
        },
        'DELETE /languages/{id}': {
          function: {
            srcPath: 'src/languages/',
            handler: 'deleteLanguage.main',
            environment: { tableName: languagesTable.tableName },
          },
        },
        // Guides
        'GET /guides': {
          function: {
            srcPath: 'src/guides',
            handler: 'getGuides.main',
            environment: { tableName: guidesTable.tableName },
          },
        },
        'POST /guides': {
          function: {
            srcPath: 'src/guides',
            handler: 'createGuides.main',
            environment: { tableName: guidesTable.tableName },
          },
        },
        'DELETE /guides/{id}': {
          function: {
            srcPath: 'src/guides/',
            handler: 'deleteGuide.main',
            environment: { tableName: guidesTable.tableName },
          },
        },
        // Interactive guides
        'GET /interactive_guides': {
          function: {
            srcPath: 'src/interactiveGuides',
            handler: 'getInteractiveGuides.main',
            environment: { tableName: interactiveGuidesTable.tableName },
          },
        },
        'POST /interactive_guides': {
          function: {
            srcPath: 'src/interactiveGuides/',
            handler: 'createInteractiveGuides.main',
            environment: { tableName: interactiveGuidesTable.tableName },
          },
        },
        'DELETE /interactive_guides/{id}': {
          function: {
            srcPath: 'src/interactiveGuides/',
            handler: 'deleteInteractiveGuides.main',
            environment: { tableName: interactiveGuidesTable.tableName },
          },
        },
      },
    });

    const apiKey = new ApiKey(this, 'CdnHelsingborgApiKey', {
      apiKeyName: 'my-api-key-example',
      description: 'API key used CDN Helsingborg',
      enabled: true,
    });

    const usagePlan = new UsagePlan(this, 'cdn-usage-plan-test', {
      name: 'Easy',
      throttle: {
        rateLimit: 10,
        burstLimit: 2,
      },
      apiStages: [
        {
          stage: this.api.restApi.deploymentStage,
        },
      ],
    });

    usagePlan.addApiKey(apiKey);

    // Allow the API to access the table
    this.api.attachPermissions([
      navigationsTable,
      guidegroupsTable,
      languagesTable,
      guidesTable,
      interactiveGuidesTable,
    ]);

    // Show the API endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}
