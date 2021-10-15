import * as sst from "@serverless-stack/resources"

export default class ApiStack extends sst.Stack {
  // Public ref to the API
  api;

  constructor (scope, id, props) {
    super(scope, id, props)

    const { navigationsTable, guidegroupsTable } = props;

    // Create the API
    this.api = new sst.ApiGatewayV1Api(this, "Api", {
      // navigations
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
    });

    // Allow the API to access the table
    this.api.attachPermissions([navigationsTable, guidegroupsTable])

    // Show the API endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.url
    });
  }
}
