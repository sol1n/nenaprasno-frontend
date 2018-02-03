<template>
    <div class="modal-overlay" @click.self="closeModal">
        <div class="form-profile-modal" :class="progress ? 'in-progress' : ''">
            <a href="#" @click.prevent="closeModal" class="form-auth-modal-close"></a>
            <div class="form-profile-modal-padding">

                <div class="form-profile-modal-title">Личный кабинет</div>

                <form @submit.prevent="submitProfile" class="form-profile-modal-form form-profile-modal-form-user" autocomplete="off">
                    <div class="form-profile-modal-row">
                        <div class="form-profile-modal-col">
                            <label class="form-profile-modal-label">
                                Имя
                                <input type="text" class="form-profile-modal-input" v-model="user.name">
                            </label>
                        </div>
                        <div class="form-profile-modal-col">
                            <label class="form-profile-modal-label">
                                Фамилия
                                <input type="text" class="form-profile-modal-input" v-model="user.surname">
                            </label>
                        </div>
                    </div>
                    <div class="form-profile-modal-row">
                        <div class="form-profile-modal-col">
                            <label class="form-profile-modal-label">
                                Отчество
                                <input type="text" class="form-profile-modal-input" v-model="user.middlename">
                            </label>
                        </div>
                        <div class="form-profile-modal-col">
                            <label class="form-profile-modal-label">
                                Пол
                            </label>
                            <div class="form-control-radiobutton-item">
                                <input id="form-profile-modal-sex-field-man" type="radio" class="form-profile-modal-input" v-model="user.sex" value="true">
                                <label for="form-profile-modal-sex-field-man">Мужчина</label>
                            </div>

                            <div class="form-control-radiobutton-item">
                                <input id="form-profile-modal-sex-field-woman" type="radio" class="form-profile-modal-input" v-model="user.sex" value="false">
                                <label for="form-profile-modal-sex-field-woman">Ура, я женщина!</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-profile-modal-row">
                        <div class="form-profile-modal-col">
                            <label class="form-profile-modal-label">
                                Телефон
                                <input type="text" class="form-profile-modal-input" v-model="user.phone">
                            </label>
                        </div>
                        <div class="form-profile-modal-col">
                            <label class="form-profile-modal-label">
                                E-mail
                                <input type="email" class="form-profile-modal-input" v-model="user.email">
                            </label>
                        </div>
                    </div>

                    <div v-if="submitProfileError" class="form-profile-modal-error">
                        {{ submitProfileError }}
                    </div>

                    <button type="submit" class="form-profile-modal-submit" :class="progress ? 'in-progress' : ''">Сохранить</button>
                </form>
            </div>

            <div class="form-profile-modal-padding">
                <div class="form-profile-modal-title">Изменения пароля</div>

                <form @submit.prevent="submitPassword" class="form-profile-modal-form form-profile-modal-form-password" autocomplete="off">
                    <div class="form-profile-modal-row">
                        <div class="form-profile-modal-col-3">
                            <label class="form-profile-modal-label">
                                Логин
                                <input type="text" disabled class="form-profile-modal-input" v-model="username">
                            </label>
                        </div>
                        <div class="form-profile-modal-col-3">
                            <label class="form-profile-modal-label">
                                Текущий пароль
                                <input type="text" class="form-profile-modal-input" v-model="oldPassword" required>
                            </label>
                        </div>
                        <div class="form-profile-modal-col-3">
                            <label class="form-profile-modal-label">
                                Новый пароль
                                <input type="text" class="form-profile-modal-input" v-model="newPassword" required>
                            </label>
                        </div>
                    </div>

                    <div v-if="submitPasswordError" class="form-profile-modal-error">
                        {{ submitPasswordError }}
                    </div>

                    <button type="submit" class="form-profile-modal-submit" :class="progress ? 'in-progress' : ''">Изменить пароль</button>
                </form>
            </div>
        </div>
        ы
    </div>
</template>

<style>
</style>

<script>
    const config = require('../config'),
        userAPI = require('../api/user'),
        getUserProfile = require('../helpers/getUserProfile');

    module.exports = {
        data() {
            return {
                user: {
                    name: '',
                    middlename: '',
                    surname: '',
                    sex: '',
                    phone: '',
                    email: ''
                },
                oldPassword: null,
                newPassword: null,
                submitProfileError: null,
                submitPasswordError: null,
                progress: false
            }
        },
        computed: {
            username() {
                return this.$store.state.userProfile.username;
            }
        },
        methods: {
            closeModal() {
                getUserProfile(this);
                this.progress = false;
                this.submitProfileError = null;
                this.submitPasswordError = null;
                this.$store.commit('setProfileModal', false);
            },
            submitProfile() {
                let _this = this;

                userAPI.saveProfile(
                    _this.$store.state.user.sessionId,
                    config.userProfileName,
                    _this.$store.state.userProfile.data.id,
                    {
                        name: _this.user.name,
                        patronymic: _this.user.middlename,
                        surname: _this.user.surname,
                        sex: _this.user.sex,
                        phone: _this.user.phone,
                        email: _this.user.email
                    }
                ).then(response => {
                    alert(config.messages.successProfileSave);
                }).catch(error => {
                    _this.progress = false;
                    _this.submitProfileError = "Ошибка сохранения профиля";
                    //todo: process error
                });
            },
            submitPassword() {
                let _this = this;

                _this.progress = true;

                userAPI.changePassword(
                    _this.$store.state.user.sessionId,
                    _this.$store.state.user.userId,
                    {
                        oldPassword: _this.oldPassword,
                        newPassword: _this.newPassword
                    }
                ).then(response => {
                    console.log(response);
                    alert(config.messages.successPasswordChange);
                    _this.oldPassword = null;
                    _this.newPassword = null;

                    _this.progress = false;_this.progress = false;
                }).catch(error => {
                    if (error.response) {
                        // The request was made, but the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);

                        _this.submitPasswordError = "Ошибка: " + error.response.status;
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        _this.submitPasswordError = "Ошибка запроса";
                        console.log('Error', error.message);
                    }
                    console.log(error.config);

                    _this.progress = false;
                });
            }
        },
        mounted() {
            getUserProfile(this);

            if (this.$store.state.userProfile.data) {
                this.user.name = this.$store.state.userProfile.data.name || "";
                this.user.middlename = this.$store.state.userProfile.data.patronymic || "";
                this.user.surname = this.$store.state.userProfile.data.surname || "";
                this.user.sex = (this.$store.state.userProfile.data.sex == null) ? true : this.$store.state.userProfile.data.sex;
                this.user.phone = this.$store.state.userProfile.data.phone || "";
                this.user.email = this.$store.state.userProfile.data.email || "";
            }
        }
    }
</script>
