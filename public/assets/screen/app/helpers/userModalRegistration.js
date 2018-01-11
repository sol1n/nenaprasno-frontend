const config = require('../config');
const userAPI = require('../api/user');
const getUserProfile = require('../helpers/getUserProfile');

function login(vm, response) {
    userAPI.login({
        username: vm.login,
        password: vm.password
    }).then(response => {
        vm.$store.commit('setUser', response.data);
        vm.$store.commit('setUsername', vm.login);
        vm.closeModal();
        getUserProfile(vm);
    });
}

function processError(vm, error) {
    if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        // User already exists
        if (error.response.status == 409) {
            vm.error = "Ошибка: " + config.messages.errorUserAlreadyExists;
        } else if (error.response.status == 401) {
            vm.error = "Ошибка авторизации. Пожалуйста, проверьте логин и пароль.";
        } else if ([401, 403, 409].indexOf(error.response.status) > -1) {
            vm.error = "Ошибка: " + error.response.data.message;
        } else {
            vm.error = "Ошибка: " + error.response.status;
        }
    } else {
        // Something happened in setting up the request that triggered an Error
        vm.error = "Ошибка запроса";
        console.log('Error', error.message);
    }
    console.log(error.config);
}

function userRegistration(vm) {
    return new Promise((resolve, reject) => {
        vm.progress = true;

        if (vm.$store.state.user && vm.$store.state.user.sessionId) {
            userAPI.registerAndMerge(
                {
                    username: vm.login,
                    password: vm.password,
                    generateRefreshToken: true
                },
                vm.$store.state.user.sessionId
            ).then(response => {
                login(vm, response);
                resolve();
            }).catch(error => {
                processError(vm, error);
                vm.progress = false;
                reject(error);
            });
        } else {
            userAPI.register({
                username: vm.login,
                password: vm.password,
                generateRefreshToken: true
            }).then(response => {
                login(vm, response);
                resolve();
            }).catch(error => {
                processError(vm, error);
                vm.progress = false;
                reject(error);
            });
        }
    });
}

module.exports = userRegistration;
