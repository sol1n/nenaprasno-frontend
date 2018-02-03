<template>
    <div class="form-control" :class="'form-control-' + index + ' ' + (control.class ? control.class : '') + ' form-control-' + control.id" v-if="display">
        <component :is="'form-' + control.type" :control="control" :value="value"></component>
    </div>
</template>

<style scoped>

</style>

<script>
    const displayCondition = require('./../helpers/displayCondition'),
        controlValidation = require('./../helpers/controlValidation'),
        formRadioButtons = require('./controls/form-radioButtons.vue'),
        formTextBlock = require('./controls/form-textBlock.vue'),
        formTextBox = require('./controls/form-textBox.vue'),
        formNumberInput = require('./controls/form-numberInput.vue'),
        formDateTimePicker = require('./controls/form-dateTimePicker.vue'),
        formCheckbox = require('./controls/form-checkBox.vue'),
        formCheckboxList = require('./controls/form-checkBoxList.vue'),
        formComboBox = require('./controls/form-comboBox.vue');

    module.exports = {
        components: {
            'form-radioButtons': formRadioButtons,
            'form-textBlock': formTextBlock,
            'form-textBox': formTextBox,
            'form-numberInput': formNumberInput,
            'form-dateTimePicker': formDateTimePicker,
            'form-checkBox': formCheckbox,
            'form-checkBoxList': formCheckboxList,
            'form-comboBox': formComboBox
        },
        props: ['control', 'index'],
        data() {
            return {
                value: null,
                valid: false
            }
        },
        computed: {
            showErrors() {
                let _this = this;
                return this.$store.state.form.data.filter(function(ctrl) {
                    return ctrl.controlId == _this.control.id;
                })[0].showErrors;
            },
            display() {
                let _this = this;
                let display = displayCondition(this.control, this.$store);
                let ctrl = this.$store.state.form.data.filter(function(ctrl) {
                    return ctrl.controlId == _this.control.id;
                });

                _this.$store.commit('setControlDisplay', {
                    id: _this.control.id,
                    display: display
                });

                return display;
            }
        },
        methods: {
            fetchControl() {
                let _this = this;
                let ctrl = this.$store.state.form.data.filter(function(ctrl) {
                    return ctrl.controlId == _this.control.id;
                });

                if (ctrl.length) {
                    _this.value = ctrl[0].value;
                    _this.valid = ctrl[0].valid;
                    _this.showErrors = ctrl[0].showErrors;
                }
            },
            validate() {
                this.valid = controlValidation(this);
            }
        },
        watch: {
            value: function(val, oldVal) {
                console.log(val, oldVal);
                if (oldVal !== val) {
                    this.validate();

                    this.$store.commit('setControlValue', {
                        id: this.control.id,
                        value: val
                    });

                    this.showErrors = true;

                    this.$store.commit('setControlShowErrors', {
                        id: this.control.id,
                        showErrors: true
                    });
                }
            }
        },
        mounted() {
            this.fetchControl();
            this.validate();
        }
    }
</script>
