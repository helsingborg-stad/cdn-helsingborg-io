import * as sst from "@serverless-stack/resources"

export default class StorageStack extends sst.Stack {
  // Public reference to the table
  table;

  constructor (scope, id, props) {
    super(scope, id, props)

    // Create the DynamoDB table
    this.table = new sst.Table(this, "Navigations", {
      fields: {
        id: sst.TableFieldType.NUMBER,
        description: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "id"},
    });
  }
}
