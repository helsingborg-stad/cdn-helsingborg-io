import * as sst from '@serverless-stack/resources';
import { ApiKey, UsagePlan } from '@aws-cdk/aws-apigateway';
import { Duration } from '@aws-cdk/core';

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
      restApi: {
        deployOptions: {
          cachingEnabled: true,
          cacheClusterEnabled: true,
          cacheClusterSize: '0.5',
          cacheTtl: Duration.seconds(300),
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
          integrationOptions: {
            cacheKeyParameters: [
              'method.request.querystring.userGroupId',
              'method.request.querystring.lang',
            ],
            requestParameters: {
              'integration.request.querystring.userGroupId':
                'method.request.querystring.userGroupId',
              'integration.request.querystring.lang': 'method.request.querystring.lang',
            },
          },
          methodOptions: {
            requestParameters: {
              'method.request.querystring.userGroupId': false,
              'method.request.querystring.lang': false,
            },
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
          methodOptions: { apiKeyRequired: true },
        },
        // Guidegroups
        'GET /guidegroups': {
          function: {
            srcPath: 'src/guidegroups/',
            handler: 'getGuideGroups.main',
            environment: { tableName: guidegroupsTable.tableName },
          },
          integrationOptions: {
            cacheKeyParameters: [
              'method.request.querystring.include',
              'method.request.querystring.lang',
            ],
            requestParameters: {
              'integration.request.querystring.include': 'method.request.querystring.include',
              'integration.request.querystring.lang': 'method.request.querystring.lang',
            },
          },
          methodOptions: {
            requestParameters: {
              'method.request.querystring.include': false,
              'method.request.querystring.lang': false,
            },
          },
        },
        'POST /guidegroups': {
          function: {
            srcPath: 'src/guidegroups/',
            handler: 'createGuideGroup.main',
            environment: { tableName: guidegroupsTable.tableName },
          },
          methodOptions: { apiKeyRequired: true },
        },
        'DELETE /guidegroups/{id}': {
          function: {
            srcPath: 'src/guidegroups/',
            handler: 'deleteGuideGroup.main',
            environment: { tableName: guidegroupsTable.tableName },
          },
          methodOptions: { apiKeyRequired: true },
        },
        'PUT /guidegroups/{id}': {
          function: {
            srcPath: 'src/guidegroups/',
            handler: 'updateGuideGroup.main',
            environment: { tableName: guidegroupsTable.tableName },
          },
          methodOptions: { apiKeyRequired: true },
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
          methodOptions: { apiKeyRequired: true },
        },
        'DELETE /languages/{id}': {
          function: {
            srcPath: 'src/languages/',
            handler: 'deleteLanguage.main',
            environment: { tableName: languagesTable.tableName },
          },
          methodOptions: { apiKeyRequired: true },
        },
        // Guides
        'GET /guides': {
          function: {
            srcPath: 'src/guides',
            handler: 'getGuides.main',
            environment: { tableName: guidesTable.tableName },
          },
          integrationOptions: {
            cacheKeyParameters: [
              'method.request.querystring.include',
              'method.request.querystring.guideGroupId',
            ],
            requestParameters: {
              'integration.request.querystring.include': 'method.request.querystring.include',
              'integration.request.querystring.guideGroupId':
                'method.request.querystring.guideGroupId',
            },
          },
          methodOptions: {
            requestParameters: {
              'method.request.querystring.include': false,
              'method.request.querystring.guideGroupId': false,
            },
          },
        },
        'POST /guides': {
          function: {
            srcPath: 'src/guides',
            handler: 'createGuides.main',
            environment: { tableName: guidesTable.tableName },
          },
          methodOptions: { apiKeyRequired: true },
        },
        'DELETE /guides/{id}': {
          function: {
            srcPath: 'src/guides/',
            handler: 'deleteGuide.main',
            environment: { tableName: guidesTable.tableName },
          },
          methodOptions: { apiKeyRequired: true },
        },
        // Interactive guides
        'GET /interactive_guides': {
          function: {
            srcPath: 'src/interactiveGuides',
            handler: 'getInteractiveGuides.main',
            environment: { tableName: interactiveGuidesTable.tableName },
          },
          integrationOptions: {
            cacheKeyParameters: ['method.request.querystring.include'],
            requestParameters: {
              'integration.request.querystring.include': 'method.request.querystring.include',
            },
          },
          methodOptions: {
            requestParameters: {
              'method.request.querystring.include': false,
            },
          },
        },
        'POST /interactive_guides': {
          function: {
            srcPath: 'src/interactiveGuides/',
            handler: 'createInteractiveGuides.main',
            environment: { tableName: interactiveGuidesTable.tableName },
          },
          methodOptions: { apiKeyRequired: true },
        },
        'DELETE /interactive_guides/{id}': {
          function: {
            srcPath: 'src/interactiveGuides/',
            handler: 'deleteInteractiveGuides.main',
            environment: { tableName: interactiveGuidesTable.tableName },
          },
          methodOptions: { apiKeyRequired: true },
        },
      },
    });

    const apiKey = new ApiKey(this, 'CdnHelsingborgApiKey', {
      apiKeyName: 'cdn-helsingborg-io-apikey',
      description: 'API key used CDN Helsingborg',
      enabled: true,
    });

    const usagePlan = new UsagePlan(this, 'cdn-helsingborg-io-usage-plan', {
      name: 'conservative',
      throttle: {
        rateLimit: 20,
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
