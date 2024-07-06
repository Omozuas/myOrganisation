const {User} = require('./user.model');
const {Organisation} = require('./organization.model');


// Define the association
User.belongsToMany(Organisation, { through: 'UserOrganisations' });
Organisation.belongsToMany(User, { through: 'UserOrganisations' });


module.exports = { User, Organisation };
//i created a relationshiph between the two  collection in another collection which is UserOrganisations
