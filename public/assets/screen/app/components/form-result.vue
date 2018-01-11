<template>
    <div class="form-result" v-if="display">
        <div class="form-result-title" v-if="resultPart.title">
            {{ resultPart.title }}
        </div>

        <div class="form-result-desc" v-if="resultPart.description">{{ resultPart.description }}</div>

        <form-section v-for="(section, index) in resultPart.sections" :section="section" :index="index"></form-section>

        <div v-if="risks.length" class="form-result-risks">
            <div class="form-result-risks-title">Ваши риски</div>
            <div class="form-result-risks-row">
                <div v-for="(risk, index) in risks" class="form-result-risks-item" :class="'form-result-risks-item-' + index + ' form-result-risks-item-' + risk.levelOfRisk">
                    <div class="form-result-risks-item-name">
                        {{ risk.name }}
                    </div>
                    <div class="form-result-risks-item-level" :class="'form-result-risks-item-level-' + risk.levelOfRisk">
                        <span v-if="risk.levelOfRisk == 'low'">низкий риск</span>
                        <span v-else-if="risk.levelOfRisk == 'medium'">средний риск</span>
                        <span v-else-if="risk.levelOfRisk == 'high'">высокий риск</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="recommendations.length" class="form-result-recommendations">
            <div class="form-result-recommendations-title">Рекомендации</div>
            <div class="form-result-recommendations-row">
                <div v-for="(recommendation, index) in recommendations" class="form-result-recommendations-item" :class="'form-result-recommendations-item-' + index">
                    <div class="form-result-recommendations-item-name">
                        {{ recommendation.name }}
                    </div>
                    <div class="form-result-recommendations-item-buttons" style="display: none">
                        <a href="#" class="form-result-recommendations-item-button">Записаться</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-part-buttons">
            <button class="form-part-button" @click.prevent="restartTest">Повторить тестирование</button>
        </div>
    </div>
</template>

<style scoped>

</style>

<script>
    const formAPI = require('../api/form'),
        formSection = require('./form-section.vue'),
        displayCondition = require('./../helpers/displayCondition');

    module.exports = {
        props: ['resultPart'],
        components: {
            'form-section': formSection
        },
        data() {
            return {
                risks: [],
                recommendations: []
            }
        },
        computed: {
            display() {
                return displayCondition(this.resultPart, this.$store);
            },
            results() {
                return this.$store.state.form.formResponse;
            },
            isAnonymous() {
                return this.$store.state.user.isAnonymous;
            }
        },
        methods: {
            getDiseasesAndProcedures() {
                let _this = this;
                let token = this.$store.state.user.sessionId;

                formAPI.getDiseases(token).then(response => {
                    _this.$store.commit('setDiseases', response.data);

                    formAPI.getMedicalProcedures(token).then(response => {
                        _this.$store.commit('setMedicalProcedures', response.data);

                        _this.clearFormResults();

                        // Parse risks and recommendations
                        _this.$store.state.form.formResponse.forEach(formResponseItem => {
                            let risk = {
                                id: formResponseItem.TestResult.id,
                                diseaseId: formResponseItem.TestResult.diseaseId,
                                levelOfRisk: formResponseItem.TestResult.levelOfRisk,
                                name: _this.$store.state.form.diseases.find(disease => {
                                    if (disease.id == formResponseItem.TestResult.diseaseId) {
                                        return true;
                                    }
                                }).name
                            };

                            _this.risks.push(risk);

                            formResponseItem.Recommendations.forEach(recommendation => {
                                recommendation.name = _this.$store.state.form.medicalProcedures.find(medicalProcedure => {
                                    if (medicalProcedure.id == recommendation.medicalProcedureId) {
                                        return true;
                                    }
                                }).name;
                                _this.recommendations.push(recommendation);
                            });
                        });
                    }).catch(error => {

                    });
                }).catch(error => {

                });
            },
            clearFormResults() {
                let _this = this;

                window.sessionStorage.removeItem('appercode-form-data-' + _this.$root.formData.id);
            },
            restartTest() {
                this.clearFormResults();
                window.location.reload();
            }
        },
        mounted() {
            this.getDiseasesAndProcedures();
        }
    }
</script>
