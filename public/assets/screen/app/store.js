const Vuex = require('vuex');
const userAPI = require('./api/user');
const formAPI = require('./api/form');

module.exports = new Vuex.Store({
    state: {
        form: {
            formId: 0,
            userId: 0,
            isDeleted: false,
            startDate: new Date(),
            submitDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            data: [],
            resultData: [],
            formResponse: null,
            diseases: null,
            medicalProcedures: null
        },
        totalParts: 0,
        totalSections: 0,
        current: 0,
        showSubmitAuthModal: false,
        showAuthModal: false,
        showSuccessModal: false,
        authModalType: 'login',
        showProfileModal: false,
        showResult: false,
        user: {
            sessionId: null,
            refreshToken: null,
            userId: 0,
            isAnonymous: true,
            roleId: null
        },
        userProfile: {
            username: null,
            data: null
        }
    },
    mutations: {
        setTotalParts(state, n) {
            state.totalParts = n;
        },
        setTotalSections(state, n) {
            state.totalSections = n;
        },
        incCurrent(state) {
            state.current++;
        },
        decCurrent(state) {
            state.current--;
        },
        addControl(state, control) {
            let foundControls = state.form.data.filter(function (v) {
                return v.controlId == control.controlId;
            })[0];

            if (!foundControls) {
                state.form.data.push(control);
            }
        },
        addResultControl(state, control) {
            let foundControls = state.form.resultData.filter(function (v) {
                return v.controlId == control.controlId;
            })[0];

            if (!foundControls) {
                state.form.resultData.push(control);
            }
        },
        setControlValue(state, payload) {
            state.form.data.forEach(function (c) {
                if (payload.id == c.controlId) {
                    c.value = payload.value;
                    c.controlShown = true;
                }
            });
        },
        setControlShowErrors(state, payload) {
            state.form.data.forEach(function (c) {
                if (payload.id == c.controlId) {
                    c.showErrors = payload.showErrors;
                }
            });
        },
        setControlDisplay(state, payload) {
            state.form.data.forEach(function (c) {
                if (payload.id == c.controlId) {
                    c.display = payload.display;

                    if (payload.display) {
                        c.controlShown = true;
                    }
                }
            });
        },
        setControlValid(state, payload) {
            state.form.data.forEach(function (c) {
                if (payload.id == c.controlId) {
                    c.valid = payload.valid;
                }
            });
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setUsername(state, payload) {
            state.userProfile.username = payload;
        },
        setUserProfileId(state, payload) {
            state.userProfile.profileId = payload;
        },
        setUserProfileData(state, payload) {
            state.userProfile.data = payload;
        },
        setSubmitAuthModal(state, payload) {
            state.showSubmitAuthModal = payload;
        },
        setAuthModal(state, payload) {
            state.showAuthModal = payload;
        },
        setProfileModal(state, payload) {
            state.showProfileModal = payload;
        },
        setAuthModalType(state, payload) {
            state.authModalType = payload;
        },
        setSuccessModal(state, payload) {
            state.showSuccessModal = payload;
        },
        setDiseases(state, payload) {
            state.form.diseases = payload;
        },
        setMedicalProcedures(state, payload) {
            state.form.medicalProcedures = payload;
        },
        setFormResponse(state, payload) {
            state.form.formResponse = payload;
        },
        showResult(state) {
            state.showResult = true;
        }
    },
    actions: {
        loginAnonymous(context) {
            return new Promise((resolve, reject) => {
                userAPI.loginAnonymous()
                    .then(response => {
                        context.commit('setUser', response.data);
                        resolve();
                    })
                    .catch(e => {
                        reject(e);
                    });
            });
        },
        loginByToken(context) {
            return new Promise((resolve, reject) => {
                userAPI.loginByToken(context.state.user.refreshToken)
                    .then(response => {
                        context.commit('setUser', response.data);
                        resolve();
                    })
                    .catch(e => {
                        reject(e);
                    });
            });
        },
        fetchForm(context, id) {
            return new Promise((resolve, reject) => {
                formAPI.getFormById(id, context.state.user.sessionId)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(e => {
                        reject(e);
                    });
            });
        },
        parseFormData(context, formData) {
            // Count Parts in Form
            context.commit('setTotalParts', formData.parts.length);

            // Count Sections in Form
            let totalSections = 0;
            formData.parts.forEach(function(part) {
                Object.keys(part).forEach(function (key) {
                    if (key == 'sections') {
                        totalSections += part[key].length;
                    }
                });
            });
            context.commit('setTotalSections', totalSections);

            // Parse & store all inputs
            function parseParts(part, isResultPart = false) {
                part.sections.forEach(function (section) {
                    section.groups.forEach(function (group) {
                        if (group.controls) {
                            group.controls.forEach(function (control) {
                                let newControl = {
                                    controlId: control.id,
                                    controlTitle: control.title,
                                    controlType: control.type,
                                    display: false,
                                    controlShown: false,
                                    showErrors: false,
                                    errorMessages: [],
                                    value: null
                                };

                                if (control.options) {
                                    newControl.options = control.options;
                                }

                                if (isResultPart) {
                                    context.commit('addResultControl', newControl);
                                } else {
                                    context.commit('addControl', newControl)
                                }
                            });
                        }
                    });
                });
            }
            formData.parts.forEach(function(part) {
                parseParts(part);
            });

            parseParts(formData.resultPart, true);
        },
        changeStep(context, action) {
            switch (action) {
                case 'next':
                    context.commit('incCurrent');
                    context.commit('showResult');
                    break;
                case 'prev':
                    context.commit('decCurrent');
                    break;
            }
        },
        showResult() {
            context.commit('showResult');
        }
    }
});
