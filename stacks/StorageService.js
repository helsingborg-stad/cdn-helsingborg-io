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
        city: sst.TableFieldType.NUMBER,
        language_recordUid: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: 'city', sortKey: 'language_recordUid' },
      globalIndexes: { guideLanguage: { partitionKey: 'language' } },
    });

    this.guidegroupsTable = new sst.Table(this, 'Guidegroups', {
      fields: {
        id: sst.TableFieldType.NUMBER,
        groupId: sst.TableFieldType.NUMBER,
      },
      primaryIndex: { partitionKey: 'id' },
    });

    this.languagesTable = new sst.Table(this, 'Languages', {
      fields: {
        id: sst.TableFieldType.NUMBER,
      },
      primaryIndex: { partitionKey: 'id' },
    });

    this.guidesTable = new sst.Table(this, 'Guides', {
      fields: {
        id: sst.TableFieldType.NUMBER,
      },
      primaryIndex: { partitionKey: 'id' },
    });
  }
}
