const Vue = require('vue/dist/vue.js'),
    Vuex = require('vuex');
Vue.use(Vuex);
Vue.config.debug = (NODE_ENV == 'dev');
const createPersistedState = require('vuex-persistedstate'),
    config = require('./config'),
    axios = require('axios');

// Component
const formApp = require('./components/form-app.vue'),
    formUserarea = require('./components/form-userarea.vue');

// Store
const formStore = require('./store'),
    Cookies = require('js-cookie');

let app = new Vue({
    el: "#app",
    store: formStore,
    data: {
        config: config,
        formData: {}
    },
    components: {
        'form-app': formApp,
        'form-userarea': formUserarea
    },
    methods: {
        initSessionStorage(formId) {
            // Init sessionStorage save plugin
            const formLocalStorage = createPersistedState({
                key: 'appercode-form-data-' + formId,
                paths: ['form', 'totalParts', 'totalSections', 'current'],
                storage: window.sessionStorage
            });
            formLocalStorage(formStore);

            const userLocalStorage = createPersistedState({
                key: 'appercode-form-user',
                paths: ['user', 'userProfile'],
                storage: window.sessionStorage
            });
            userLocalStorage(formStore);
        },
        getCookieSession() {
            let userInfo;
            try {
                userInfo = JSON.parse(decodeURIComponent(Cookies.get('userInfo')));
                if (userInfo) {
                    userInfo = {
                        userId: userInfo.id,
                        sessionId: userInfo.token,
                        refreshToken: userInfo.refreshToken,
                        isAnonymous: false
                    }
                }
            } catch(e) {
                console.log(e);
            }

            console.log(userInfo);

            return userInfo;
        },
        auth() {
            return new Promise((resolve, reject) => {
                let cookieUser = this.getCookieSession();
                let _this = this;

                function anonimousLogin() {
                    _this.$store.dispatch('loginAnonymous')
                        .then(() => {
                            resolve();
                        }).catch(e => {
                        reject(e);
                    });
                }

                if (cookieUser) {
                    this.$store.commit('setUser', cookieUser);
                    resolve();
                } else {
                    anonimousLogin();
                }
            });
        },
        init() {
            let formId = this.$el.dataset.formId;

            this.initSessionStorage(formId);

            this.auth()
                .then(() => {
                    return this.$store.dispatch('fetchForm', formId);
                })
                .then(res => {
                    this.formData = res.data;
                    this.$store.dispatch('parseFormData', res.data);
                }).catch(e => {
                    if (e.response && e.response.status === 401) {
                        this.$store.dispatch('loginByToken')
                            .then(() => {
                                this.$store.dispatch('fetchForm', formId)
                                    .then(res => {
                                        this.formData = res.data;
                                        this.$store.dispatch('parseFormData', res.data);
                                    });
                            });
                    }
                });
        }
    },
    mounted() {
        this.init();
    }
});
