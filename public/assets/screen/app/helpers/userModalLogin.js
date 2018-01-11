const config = require('../config');
const userAPI = require('../api/user');
const getUserProfile = require('../helpers/getUserProfile');

function userLogin(vm) {
    return new Promise((resolve, reject) => {
        vm.progress = true;

        let loginType = vm.$store.state.user.sessionId ? 'loginAndMerge' : 'login';

        userAPI[loginType]({
                username: vm.login,
                password: vm.password,
                generateRefreshToken: true
            },
            vm.$store.state.user.sessionId
        ).then(response => {
            if (response.data.userId) {
                vm.$store.commit('setUser', response.data);
                vm.$store.commit('setUsername', vm.login);
                vm.progress = false;
                vm.closeModal();

                getUserProfile(vm);

                resolve();
            }
        }).catch(error => {
            if (error.response) {
                // The request was made, but the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);

                vm.error = "Ошибка: " + error.response.status;
            } else {
                // Something happened in setting up the request that triggered an Error
                vm.error = "Ошибка запроса";
                console.log('Error', error.message);
            }
            console.log(error.config);

            vm.progress = false;

            reject(e);
        });
    });
}

module.exports = userLogin;
