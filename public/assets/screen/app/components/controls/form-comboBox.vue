<template>
    <div class="form-control-combobox" :id="control.id">
        <div class="form-control-combobox-select-wrapper">
            <multiselect v-if="control.class.includes('autocomplete')" v-model="selected" label="title" track-by="value" :placeholder="control.placeholder" :options="control.options.value">
                <span slot="noResult">Ничего не найдено, попробуйте изменить запрос</span>
            </multiselect>

            <select v-else class="form-control-combobox-select" v-model="$parent.value">
                <option v-for="(option,index) in control.options.value" :value="option.value" v-if="display(option)">
                    {{ option.title }}
                </option>
            </select>
        </div>
    </div>
</template>

<style scoped>

</style>

<script>
    import multiselect from 'vue-multiselect';
    const displayCondition = require('./../../helpers/displayCondition');

    module.exports = {
        components: {
            multiselect
        },
        data() {
            return {
                selected: null
            }
        },
        computed: {
            value() {
                return this.$parent.value;
            }
        },
        props: ['control'],
        methods: {
            display(option) {
                return displayCondition(option, this.$store);
            }
        },
        watch: {
            value(val, oldVal) {
                if (val !== oldVal) {
                    this.selected = this.control.options.value.find(option => option.value === val);
                }
            },
            selected(val, oldVal) {
                this.$parent.value = val.value;
            }
        }
    }
</script>