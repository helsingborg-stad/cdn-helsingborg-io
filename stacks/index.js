import ApiStack from './ApiStack';
import StorageStack from './StorageService';

export default function main(app) {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: 'nodejs12.x',
  });

  const storageStack = new StorageStack(app, 'storage');

  new ApiStack(app, 'api', {
    navigationsTable: storageStack.navigationsTable,
    guidegroupsTable: storageStack.guidegroupsTable,
    languagesTable: storageStack.languagesTable,
    guidesTable: storageStack.guidesTable,
    interactiveGuidesTable: storageStack.interactiveGuidesTable,
  });
}
