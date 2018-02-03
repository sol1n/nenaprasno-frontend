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

let object = {
    objectsBySchemaIdGet(schemaId, params, token) {
        return instance.get(
            '/objects/' + schemaId,
            {
                params,
                headers: {
                    "Content-Type": "application/json",
                    "X-Appercode-Session-Token": token
                }
            }
        );
    },
    objectsBySchemaIdPost(schemaId, newObj, token) {
        return instance.post(
            '/objects/' + schemaId,
            newObj,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Appercode-Session-Token": token
                }
            }
        );
    }
};

module.exports = object;