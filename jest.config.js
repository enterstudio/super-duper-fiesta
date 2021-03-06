function integrationTest() {
  return process.env.SDF_INTEGRATION_TEST && process.env.SDF_INTEGRATION_TEST.toLowerCase() === 'true';
}

function coverageGlobs() {
  const globs = ['server/**/*.js', '!server/migrations/*.js', '!server/logging.js', '!server/auth/oidc.js'];
  if (!integrationTest()) {
    globs.push('!server/models/**');
    globs.push('!server/utils/integrationTestUtils.js');
    globs.push('!server/app.js');
    globs.push('!server/server.js');
  }

  return globs;
}

function testGlobs() {
  const globs = ['/node_modules/'];

  if (!integrationTest()) {
    globs.push('/(.*)?.integration.js');
  }

  return globs;
}

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'sqlite:///db.db';
}

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: './coverage/',
  coverageReporters: ['json', 'lcov', 'text'],
  collectCoverageFrom: coverageGlobs(),
  testPathIgnorePatterns: testGlobs(),
};
