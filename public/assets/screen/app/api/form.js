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

let form = {
    getFormById(formId, token) {
        return instance.get('/forms/' + formId, {
            headers: {
                "Content-Type": "application/json",
                'X-Appercode-Session-Token': token
            }
        });
    },
    getDiseases(token) {
        return instance.get('/objects/Disease', {
            headers: {
                "Content-Type": "application/json",
                'X-Appercode-Session-Token': token
            }
        });
    },
    getMedicalProcedures(token) {
        return instance.get('/objects/MedicalProcedure', {
            headers: {
                "Content-Type": "application/json",
                'X-Appercode-Session-Token': token
            }
        });
    },
    saveFormResults(result, token) {
        return instance.post('testResult/FormResponce?recommendation=true', result, {
            headers: {
                "Content-Type": "application/json",
                'X-Appercode-Session-Token': token
            }
        });
    }
};

module.exports = form;
