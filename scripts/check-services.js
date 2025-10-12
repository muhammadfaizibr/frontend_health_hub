// quick syntax check by importing service modules
try {
  // require resolves .js via Node
  require('../src/services/axiosInstance');
  require('../src/services/apiClient');
  require('../src/services/endpoints/patients');
  require('../src/services/endpoints/organization');
  require('../src/services/endpoints/translator');
  require('../src/services/patientsService');
  require('../src/services/organizationService');
  require('../src/services/translatorService');
  require('../src/services');
  console.log('Services imported successfully');
} catch (err) {
  console.error('Import error', err);
  process.exit(1);
}
