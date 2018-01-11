<template>
    <div class="modal-overlay" @click.self="closeModal">
        <div class="form-auth-modal" :class="progress ? 'in-progress' : ''">
            <a href="#" @click.prevent="closeModal" class="form-auth-modal-close"></a>

            <div v-if="formType == 'register'">
                <div class="form-auth-modal-title">Регистрация</div>

                <form @submit.prevent="submitRegister" class="form-auth-modal-form" autocomplete="off">
                    <input type="text" v-model="login" required class="form-auth-modal-input" placeholder="Придумайте логин">
                    <input type="password" v-model="password" required class="form-auth-modal-input" placeholder="Придумайте пароль">
                    <button type="submit" class="form-auth-modal-submit">Зарегистрироваться</button>
                </form>
            </div>

            <div v-if="formType == 'login'">
                <div class="form-auth-modal-title">Вход</div>

                <form @submit.prevent="submitLogin" class="form-auth-modal-form">
                    <input type="text" v-model="login" required class="form-auth-modal-input" placeholder="Ваш логин">
                    <input type="password" v-model="password" required class="form-auth-modal-input" placeholder="Ваш пароль">
                    <button type="submit" class="form-auth-modal-submit" :class="progress ? 'in-progress' : ''">Войти</button>
                </form>
            </div>

            <div v-if="error" class="form-auth-modal-error">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<style>
</style>

<script>
    const config = require('../config'),
        userModalLogin = require('../helpers/userModalLogin'),
        userModalRegistration = require('../helpers/userModalRegistration');

    module.exports = {
        data() {
            return {
                login: null,
                password: null,
                progress: false,
                error: null
            }
        },
        computed: {
            formType() {
                return this.$store.state.authModalType;
            }
        },
        methods: {
            closeModal() {
                this.login = null;
                this.password = null;
                this.progress = false;
                this.error = null;
                this.$store.commit('setAuthModal', false);
            },
            submitRegister() {
                userModalRegistration(this);
            },
            submitLogin() {
                userModalLogin(this);
            }
        }
    }
</script>
