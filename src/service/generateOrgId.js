const crypto = require('crypto');

function generateOrganizationId() {
  return crypto.randomBytes(16).toString('hex');
}

module.exports = { generateOrganizationId };
