"use strict";

const config = require('../config');
const formAPI = require('../api/form');

function formSubmit(vm) {
    //Prepare form results
    let form = JSON.parse( JSON.stringify(vm.$store.state.form) );

    form.formId = vm.$root.formData.id;
    form.userId = vm.$store.state.user.userId;

    delete form.diseases;
    delete form.medicalProcedures;
    delete form.formResponse;

    form.data.forEach(control => {
        delete control.display;
        delete control.errorMessages;
        delete control.showErrors;
        delete control.valid;

        if (control.controlType === 'checkBoxList') {
            if (control.value === null || control.value.length === 0) {
                control.value = {
                    value: [],
                    $type: "decimal[]"
                };
            }
        }

        if (control.options) {
            control.options = control.options.value;

            control.options.forEach(option => {
                delete option.class;
                delete option.displayCondition;
            });
        }
    });

    form.resultData.forEach(control => {
        delete control.display;
        delete control.errorMessages;
        delete control.showErrors;
        delete control.valid;

        if (control.controlType === 'checkBoxList') {
            if (control.value === null || control.value.length === 0) {
                control.value = {
                    value: [],
                    $type: "decimal[]"
                };
            }
        }

        if (control.options) {
            control.options = control.options.value;

            control.options.forEach(option => {
                delete option.class;
                delete option.displayCondition;
            });
        }
    });

    console.log("Form data submit: ");
    console.log(JSON.stringify(form));

    return formAPI.saveFormResults(JSON.stringify(form), vm.$store.state.user.sessionId);
}

module.exports = formSubmit;
