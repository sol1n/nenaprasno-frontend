const config = require("../config");
const axios = require("axios");

let instance = axios.create({
    baseURL: config.apiUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

let user = {
    login(credentials) {
        return instance.post(
            '/login',
            credentials,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    },
    loginAnonymous() {
        return instance.post(
            '/login/anonymous',
            {},
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    },
    loginByToken(token) {
        return instance.post(
            '/login/byToken',
            JSON.stringify(token),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    },
    loginAndMerge(credentials, token) {
        return instance.post(
            '/users/loginAndMerge',
            credentials,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Appercode-Session-Token": token
                }
            }
        );
    },
    logout(token) {
        return instance.get(
            '/logout',
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Appercode-Session-Token": token
                }
            }
        );
    },

    /*
     newUser {
         username (string, optional)
         password (string, optional)
         roleId (string, optional)
         language (string, optional)
     }
    */
    register(newUser) {
        return instance.post('/users', newUser);
    },
    registerAndMerge(newUser, token) {
        return instance.post('/users/registerAndMerge', newUser,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Appercode-Session-Token": token
                }
            }
        );
    },
    getProfiles(token, userId) {
        return instance.get('/users/' + userId + '/profiles',
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Appercode-Session-Token": token
                }
            }
        );
    },
    getProfile(token, schemaId) {
        return instance.get(
            '/objects/' + config.userProfileName + '/' +  schemaId,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Appercode-Session-Token": token
                }
            }
        );
    },
    assignProfile(token, schemaName, profile) {
        return instance.post('/objects/' + schemaName,
            profile,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Appercode-Session-Token": token
                }
            }
        );
    },
    saveProfile(token, schemaName, schemaId, profile) {
        return instance.put(
            '/objects/' + schemaName + '/' + schemaId,
            profile,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Appercode-Session-Token": token
                }
            }
        );
    },
    changePassword(token, userId, passwords) {
        return instance.put(
            config.apiUrl + '/users/' + userId + '/changePassword',
            passwords,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Appercode-Session-Token": token
                }
            }
        );
    }
};

module.exports = user;
