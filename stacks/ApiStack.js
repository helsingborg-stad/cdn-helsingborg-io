import * as sst from '@serverless-stack/resources';

export default class ApiStack extends sst.Stack {
  // Public ref to the API
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { navigationsTable, guidegroupsTable, languagesTable, guidesTable } = props;

    // Create the API
    this.api = new sst.ApiGatewayV1Api(this, 'Api', {
      defaultFunctionProps: {
        environment: {
          NAVIGATIONS_TABLE_NAME: navigationsTable.tableName,
          GUIDEGROUPS_TABLE_NAME: guidegroupsTable.tableName,
          GUIDES_TABLE_NAME: guidesTable.tableName,
          LANGUAGES_TABLE_NAME: languagesTable.tableName,
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
        },
        // Guidegroups
        'GET /guidegroups': {
          function: {
            srcPath: 'src/guidegroups/',
            handler: 'getGuidegroups.main',
            environment: { tableName: guidegroupsTable.tableName },
          },
        },
        'POST /guidegroups': {
          function: {
            srcPath: 'src/guidegroups/',
            handler: 'createGuidegroup.main',
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
      },
    });

    // Allow the API to access the table
    this.api.attachPermissions([navigationsTable, guidegroupsTable, languagesTable, guidesTable]);

    // Show the API endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}
