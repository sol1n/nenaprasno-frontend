<template>
    <div class="form-control-checkboxlist" :id="control.id">
        <div class="form-control-checkboxlist-item" v-for="(option,index) in control.options.value" v-if="display(option)">
            <input type="checkbox" v-model="listValue" @change="valueChange" :value="option.value" :id="'checkbox-' + control.id + '-' + index">
            <label :for="'checkbox-' + control.id + '-' + index">
                {{ option.title }}
            </label>
        </div>
    </div>
</template>

<style scoped>

</style>

<script>
    var displayCondition = require('./../../helpers/displayCondition');

    module.exports = {
        props: ['control', 'value'],
        data() {
            return {
                listValue: []
            }

        },
        methods: {
            display(option) {
                return displayCondition(option, this.$store);
            },
            valueChange() {
                this.$parent.value = this.listValue;
            }
        },
        watch: {
            value(val, oldVal) {
                if (val !== oldVal) {
                    this.listValue = val;
                }
            }
        }
    }
</script>