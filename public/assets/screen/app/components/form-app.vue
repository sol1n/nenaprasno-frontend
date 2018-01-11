<template>
    <form action="#" method="POST" :class="'form-app form-app-' + form.id + ' form-app-current-' + current" :id="'form-' + form.id">
        <form-breadcrumbs :current="current" :form="form"></form-breadcrumbs>
        <div class="form-app-title" v-if="form.title">
            {{ form.title }}
        </div>
        <form-part v-for="(part, index) in form.parts" :part="part" :index="index" v-if="current === index"></form-part>
        <form-result v-if="form.resultPart && activeParts()" :resultPart="form.resultPart"></form-result>

        <transition name="fade">
            <form-submit-auth-modal v-if="showSubmitAuthModal"></form-submit-auth-modal>
        </transition>

        <transition name="fade">
            <form-success-modal v-if="showSuccessModal"></form-success-modal>
        </transition>

        <transition name="fade">
            <form-auth-modal v-if="showAuthModal"></form-auth-modal>
        </transition>

        <transition name="fade">
            <form-profile-modal v-if="showProfileModal"></form-profile-modal>
        </transition>
    </form>
</template>

<style scoped>
</style>

<script>
    let formBreadcrumbs = require('./form-breadcrumbs.vue'),
        formPart = require('./form-part.vue'),
        formResult = require('./form-result.vue'),
        formSubmitAuthModal = require('./form-submit-auth-modal.vue'),
        formAuthModal = require('./form-auth-modal.vue'),
        formProfileModal = require('./form-profile-modal.vue'),
        formSuccessModal = require('./form-success-modal.vue'),

        displayCondition = require('./../helpers/displayCondition');

    module.exports = {
        props: ['form'],
        components: {
            'form-breadcrumbs': formBreadcrumbs,
            'form-part': formPart,
            'form-result': formResult,
            'form-submit-auth-modal': formSubmitAuthModal,
            'form-auth-modal': formAuthModal,
            'form-profile-modal': formProfileModal,
            'form-success-modal': formSuccessModal
        },
        computed: {
            current() {
                return this.$store.state.current;
            },
            showSubmitAuthModal() {
                return this.$store.state.showSubmitAuthModal;
            },
            showAuthModal() {
                return this.$store.state.showAuthModal;
            },
            showProfileModal() {
                return this.$store.state.showProfileModal;
            },
            showSuccessModal() {
                return this.$store.state.showSuccessModal;
            }
        },
        methods: {
            activeParts() {
                //Method checks, if any parts displaying at this moment
                let _this = this;
                let results = [];

                this.form.parts.forEach(function(part) {
                    results.push( displayCondition(part, _this.$store ) );
                });

                let remainingParts = results.splice( _this.current, results.length );

                return !remainingParts.includes(true);
            }
        }
    }
</script>
