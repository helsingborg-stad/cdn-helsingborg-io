import * as sst from '@serverless-stack/resources';

export default class StorageStack extends sst.Stack {
  navigationsTable;
  guidegroupsTable;
  languagesTable;
  guidesTable;

  constructor(scope, id, props) {
    super(scope, id, props);

    this.navigationsTable = new sst.Table(this, 'Navigations', {
      fields: {
        id: sst.TableFieldType.NUMBER,
      },
      primaryIndex: { partitionKey: 'id' },
    });

    this.guidegroupsTable = new sst.Table(this, 'Guidegroups', {
      fields: {
        id: sst.TableFieldType.NUMBER,
        groupId: sst.TableFieldType.NUMBER,
      },
      primaryIndex: { partitionKey: 'groupId', sortKey: 'id' },
    });

    this.languagesTable = new sst.Table(this, 'Languages', {
      fields: {
        term_id: sst.TableFieldType.NUMBER,
      },
      primaryIndex: { partitionKey: 'term_id' },
    });

    this.guidesTable = new sst.Table(this, 'Guides', {
      fields: {
        id: sst.TableFieldType.NUMBER,
      },
      primaryIndex: { partitionKey: 'id' },
    });
  }
}
