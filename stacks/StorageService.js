import * as sst from "@serverless-stack/resources"

export default class StorageStack extends sst.Stack {
  // Public reference to the table
  navigationsTable;
  guidegroupsTable;

  constructor (scope, id, props) {
    super(scope, id, props)

    // Create the DynamoDB table
    this.navigationsTable = new sst.Table(this, "Navigations", {
      fields: {
        id: sst.TableFieldType.NUMBER,
      },
      primaryIndex: { partitionKey: "id"},
    });

    this.guidegroupsTable = new sst.Table(this, "Guidegroups", {
      fields: {
        id: sst.TableFieldType.NUMBER,
      },
      primaryIndex: { partitionKey: "id" },
    });
  }
}
