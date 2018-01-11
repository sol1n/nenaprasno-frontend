<template>
    <div class="form-userarea">
        <div v-if="isAnonymous">
            <a href="#" @click.prevent="showLoginModal" class="link-dotted">Вход</a>
            /
            <a href="#" @click.prevent="showRegisterModal" class="link-dotted">Регистрация</a>
        </div>
        <div v-else>
            <a href="#" @click.prevent="showProfileModal" class="link-dotted">{{ username }}</a>
            <a href="#" @click.prevent="logout">&times;</a>
        </div>
    </div>
</template>
<style scoped>
</style>
<script>
    const config = require('../config');
    const userAPI = require('../api/user');

    module.exports = {
        data() {
            return {

            }
        },
        computed: {
            isAnonymous() {
                return this.$store.state.user.isAnonymous;
            },
            username() {
                return this.$store.state.userProfile.username;
            }
        },
        methods: {
            showLoginModal() {
                this.$store.commit('setAuthModal', true);
                this.$store.commit('setAuthModalType', 'login');
            },
            showRegisterModal() {
                this.$store.commit('setAuthModal', true);
                this.$store.commit('setAuthModalType', 'register');
            },
            showProfileModal() {
                this.$store.commit('setProfileModal', true);
            },
            logout() {
                let submit = confirm( config.messages.confirmLogout );

                if (submit) {
                    userAPI.logout( this.$store.state.user.sessionId ).catch(error => {
                        console.log(error);
                    });

                    this.$store.commit('setUser', {
                        sessionId: null,
                        refreshToken: null,
                        userId: 0,
                        isAnonymous: true,
                        roleId: null
                    });
                    this.$store.commit('setUsername', null);
                    this.$store.commit('setUserProfileId', null);
                    this.$store.commit('setUserProfileData', null);
                }
            }
        }
    }
</script>
