<template>
    <div class="form-part" :class="'form-part-' + index + ' ' + (part.class ? part.class : '')" v-if="display">
        <div class="form-part-title">
            {{ part.title }}
        </div>

        <div class="form-part-desc" v-if="part.description">{{ part.description }}</div>

        <form-section v-for="(section, index) in part.sections" :section="section" :index="index"></form-section>

        <div class="form-part-buttons" v-if="current != 0 || current != totalParts-1 || current === totalParts-1">
            <button class="form-part-button form-part-button-prev" v-if="current != 0" @click.prevent="changeStep('prev', false)">Назад</button>
            <button class="form-part-button form-part-button-next" v-if="current != totalParts-1" @click.prevent="changeStep('next', true)">Далее</button>
            <button class="form-part-button form-part-button-send" v-if="current === totalParts-1" @click.prevent="submitForm">Отправить</button>
        </div>
    </div>
</template>

<style scoped>

</style>

<script>
    const config = require('../config'),
        displayCondition = require('../helpers/displayCondition'),
        pageValidation = require('../helpers/pageValidation'),
        formSubmit = require('../helpers/formSubmit'),
        formSection = require('./form-section.vue');

    module.exports = {
        props: ['part', 'index'],
        components: {
            'form-section': formSection
        },
        computed: {
            current() {
                return this.$store.state.current;
            },
            totalParts() {
                return this.$store.state.totalParts;
            },
            totalSections() {
                return this.$store.state.totalSections;
            },
            display() {
                return displayCondition(this.part, this.$store);
            }
        },
        methods: {
            changeStep(action, validate) {
                if ( (validate && pageValidation(this.part, this.$store)) || validate == false ) {
                    this.$store.dispatch('changeStep', action);
                    // Scrolling to top of next page
                    this.$root.$el.scrollIntoView(true);
                } else {
                    console.log(this.part);
                }
            },
            submitForm() {
                if ( pageValidation(this.part, this.$store) ) {
                    let _this = this;

                    formSubmit(_this)
                        .then(response => {
                            alert(config.messages.successFormPost);

                            if (!_this.$store.state.user || _this.$store.state.user.isAnonymous) {
                                _this.$store.commit('setSubmitAuthModal', true);
                            }

                            _this.$store.commit('setFormResponse', response.data);

                            // Go to form result page
                            _this.$store.dispatch('changeStep', 'next');

                            if (!_this.$store.state.user.isAnonymous) {
                                _this.$store.commit('setSuccessModal', true);

                                setTimeout(() => {
                                    _this.$store.state.form = {};
                                    _this.$store.state.user = {};
                                    _this.$store.state.userProfile = {};
                                    window.sessionStorage.clear();
                                }, 2000);

                                setTimeout(() => {
                                    window.location.replace(config.cabinetURL);
                                }, 5000);
                            }
                        })
                        .catch(error => {
                            alert(config.messages.errorSendingFormResults);

                            if (error.response) {
                                // The request was made, but the server responded with a status code
                                // that falls out of the range of 2xx
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers);
                            } else {
                                // Something happened in setting up the request that triggered an Error
                                console.log('Error', error.message);
                            }
                            console.log(error.config);
                        });
                }
            }
        }
    }
</script>
