<template>
    <div class="social-auth">
        <div class="social-auth-item">
            <a href="#" @click.prevent="loginVk" class="social-auth-item-link social-auth-item-link-vk">
                Вконтакте
            </a>
        </div>
        <div class="social-auth-item">
            <a href="#" @click.prevent="loginFb" class="social-auth-item-link social-auth-item-link-fb">
                Facebook
            </a>
        </div>
    </div>
</template>

<script>
    const config = require('../config');
    const axios = require('axios');

    module.exports = {
        data() {
            return {}
        },
        computed: {
            token() {
                return this.$store.state.user.refreshToken
            }
        },
        methods: {
            placeScripts() {
                function placeJS(d, s, id, src) {
                    return new Promise((resolve, reject) => {
                        let js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) {return;}
                        js = d.createElement(s); js.id = id;
                        js.src = src;
                        js.onload = () => {
                            resolve()
                        };
                        fjs.parentNode.insertBefore(js, fjs);
                    });
                }

                let fb = placeJS(document, 'script', 'facebook-jssdk', 'https://connect.facebook.net/ru_ru/sdk.js');
                let vk = placeJS(document, 'script', 'vk-openapi', 'https://vk.com/js/api/openapi.js?151');

                Promise.all([fb, vk]).then(() => {
                    VK.init({
                        apiId: config.APP_VK
                    });

                    FB.init({
                        appId: config.APP_FB,
                        cookie: true,
                        xfbml: true,
                        version: 'v2.11'
                    });

                    FB.AppEvents.logPageView();
                });
            },
            handleSocial(networkName, userId) {
                const url = config.cabinetURL + '/loginBySocial';

                axios.post(url, {
                    userId: userId,
                    networkName: networkName,
                    sessionId: this.$store.state.user.sessionId,
                    refreshToken: this.$store.state.user.refreshToken
                },{
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                })
                    .then(res => {
                        if (res.data && res.data.type === 'success') {
                            window.location.href = res.data.data;
                        }
                    })
                    .catch(e => {
                        alert("Ошибка авторизации");
                        console.log(e);
                    });
            },
            loginFb() {
                FB.getLoginStatus(response => {
                    console.log(response);
                    if (response.authResponse) {
                        this.handleSocial('fb', response.authResponse.userID);
                    } else {
                        FB.login(response => {
                                if (response.authResponse) {
                                    this.handleSocial('fb', response.authResponse.userID);
                                } else {
                                    console.log('Пользователь передумал логиниться через ФБ');
                                }
                            },
                            {
                                scope:'email'
                            });
                    }
                }, {
                    scope: 'email,id'
                });
            },
            loginVk() {
                VK.Auth.login(res => {
                    if (res.status === "connected" && res.hasOwnProperty('session')) {
                        this.handleSocial('vk', res.session.user.id);
                    }
                }, 4194304 );
            }
        },
        created() {
            this.placeScripts();
        }
    }
</script>