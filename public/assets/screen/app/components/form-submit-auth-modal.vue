<template>
    <div class="modal-overlay">
        <div class="form-auth-modal" :class="progress ? 'in-progress' : ''">
            <div class="form-auth-modal-padding">
                <a href="#" @click.prevent="confirmCloseModal('Вы действительно не хотите отказаться от сохранения результатов теста на ваш Email?')" class="form-auth-modal-close"></a>
                <div class="form-auth-modal-title">
                    Результат теста
                </div>

                <div class="form-auth-modal-subtitle">
                    Пожалуйста, зарегистрируйтесь и мы отправим вам полные результаты тестирования
                </div>

                <div v-if="formType == 'register'">
                    <form @submit.prevent="submitRegister" class="form-auth-modal-form" autocomplete="off">
                        <div class="form-auth-modal-control">
                            <label class="form-auth-modal-label">
                                E-mail
                            </label>
                            <input type="text" v-model="login" required class="form-auth-modal-input" placeholder="Введите e-mail адрес">
                        </div>

                        <div class="form-auth-modal-control">
                            <label class="form-auth-modal-label">
                                Пароль
                            </label>
                            <input type="password" v-model="password" required class="form-auth-modal-input" placeholder="Придумайте пароль">
                        </div>

                        <div class="form-auth-modal-control">
                            <button type="submit" class="form-auth-modal-submit">
                                Зарегистрироваться
                            </button>
                        </div>
                    </form>

                    <div class="form-auth-modal-error" v-if="error">
                        {{ error }}
                    </div>

                    <div class="form-auth-modal-sublinks">
                        <a href="#" @click.prevent="formType = 'login'">
                            Уже зарегистрирован
                        </a>
                        <a href="#" @click.prevent="confirmCloseModal('Вы действительно не хотите отказаться от сохранения результатов теста на ваш Email?')">
                            Продолжить без регистрации
                        </a>
                    </div>
                </div>

                <div v-if="formType == 'login'">
                    <form @submit.prevent="submitLogin" class="form-auth-modal-form">
                        <div class="form-auth-modal-control">
                            <label class="form-auth-modal-label">
                                E-mail
                            </label>
                            <input type="text" v-model="login" required class="form-auth-modal-input" placeholder="Ваш e-mail адрес">
                        </div>

                        <div class="form-auth-modal-control">
                            <label class="form-auth-modal-label">
                                Пароль
                            </label>
                            <input type="password" v-model="password" required class="form-auth-modal-input" placeholder="Ваш пароль">
                        </div>

                        <div class="form-auth-modal-control">
                            <button type="submit" class="form-auth-modal-submit" :class="progress ? 'in-progress' : ''">
                                Войти
                            </button>
                        </div>

                        <div class="form-auth-modal-error" v-if="error">
                            {{ error }}
                        </div>

                        <div class="form-auth-modal-sublinks">
                            <a href="#" @click.prevent="formType = 'register'">
                                Зарегистрироваться
                            </a>
                            <a href="#" @click.prevent="confirmCloseModal('Вы действительно не хотите отказаться от сохранения результатов теста на ваш Email?')">
                                Продолжить без регистрации
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            <div class="form-auth-modal-footer">
                <div class="form-auth-modal-padding">
                    <div class="form-auth-modal-socials">
                        <div class="form-auth-modal-socials-title">
                            Войти с помощью вашего аккаунта в соцсети
                        </div>

                        <social-auth></social-auth>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>

<script>
    const config = require('../config'),
        axios = require("axios"),
        userModalLogin = require('../helpers/userModalLogin'),
        userModalRegistration = require('../helpers/userModalRegistration'),
        SocialAuth = require('./social-auth.vue');

    module.exports = {
        components: {
            'social-auth': SocialAuth
        },
        data() {
            return {
                login: null,
                password: null,
                formType: "register",
                progress: false,
                error: null
            }
        },
        computed: {

        },
        methods: {
            closeModal() {
                this.login = null;
                this.password = null;
                this.progress = false;
                this.$store.commit('setSubmitAuthModal', false);
            },
            confirmCloseModal(message) {
                let closeConfirm = confirm(config.messages.confirmSkipAuth);
                if (closeConfirm) {
                    this.closeModal();
                }
            },
            submitRegister() {
                userModalRegistration(this)
                    .then(() => {
                        this.cabinetAuthAndRedirect();
                    });
            },
            submitLogin() {
                userModalLogin(this)
                    .then(() => {
                        this.cabinetAuthAndRedirect();
                    });
            },
            cabinetAuthAndRedirect() {
                axios.post(config.cabinetURL + '/loginByToken',
                    JSON.stringify({token: this.$store.state.user.refreshToken}),
                    {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        withCredentials: true
                    })
                    .then(() => {
                        this.$store.commit('setSuccessModal', true);

                        setTimeout(() => {
                            this.$store.state.form = {};
                            this.$store.state.user = {};
                            this.$store.state.userProfile = {};
                            window.sessionStorage.clear();
                        }, 2000);

                        setTimeout(() => {
                            window.location.replace(config.cabinetURL);
                        }, 5000);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
    }
</script>
