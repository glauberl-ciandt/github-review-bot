var githubApi = require('./github-api'),
	github = githubApi.service,
	debug = require('debug')('reviewbot:bot'),
	config = require('../../../config');

	/**
	 * Private: Authenticate next request
	 */
	function authenticate() {
		if (!config.accessToken) {
			throw Error('Fatal: No access token configured!');
		}

		github.authenticate({
			type: "basic",
	    username: config.username,
	    password: config.accessToken
			// type: 'oauth',
			// token: config.oauth2token
		});
	}

	function isUserInOrganization(user, callback) {
		authenticate();
		console.log("membership for " + user.username + " in " + config.organization);
		github.orgs.getOrganizationMembership({
			org: config.organization,
			user: user.username
		}, function(err, result) {
			if(err){
				callback(false);
			} else {
				callback(true);
			}
		});
	}

	module.exports = {
		authenticate: authenticate,
		isUserInOrganization: isUserInOrganization
	};