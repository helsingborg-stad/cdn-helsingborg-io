import * as sst from "@serverless-stack/resources"

export default class ApiStack extends sst.Stack {
  // Public ref to the API
  api;

  constructor (scope, id, props) {
    super(scope, id, props)

    const { navigationsTable, guidegroupsTable, languagesTable } = props;

    // Create the API
    this.api = new sst.ApiGatewayV1Api(this, "Api", {
      defaultFunctionProps: {
        environment: {
          NAVIGATIONS_TABLE_NAME: navigationsTable.tableName,
          GUIDEGROUPS_TABLE_NAME: guidegroupsTable.tableName,
          LANGUAGES_TABLE_NAME: languagesTable.tableName,
        },
      },
      routes: {
        // Navigations
        "GET /navigations": {
          function: {
            srcPath: "src/navigations/",
            handler: "getNavigations.main",
            environment: { tableName: navigationsTable.tableName },
          },
        },
        "POST /navigations": {
          function: {
            srcPath: "src/navigations/",
            handler: "createNavigation.main",
            environment: { tableName: navigationsTable.tableName },
          },
        },
        // Guidegroups
        "GET /guidegroups": {
          function: {
            srcPath: "src/guidegroups/",
            handler: "getGuidegroupList.main",
            environment: { tableName: guidegroupsTable.tableName },
          },
        },
        "POST /guidegroups": {
          function: {
            srcPath: "src/guidegroups/",
            handler: "createGuidegroup.main",
            environment: { tableName: guidegroupsTable.tableName },
          },
        },
        // Languages
        "POST /languages": {
          function: {
            srcPath: "src/languages",
            handler: "createLanguages.main",
            environment: { tableName: languagesTable.tableName },
          }
        }
      }
    });

    // Allow the API to access the table
    this.api.attachPermissions([navigationsTable, guidegroupsTable, languagesTable])

    // Show the API endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.url
    });
  }
}
