<template>
    <div :id="control.id" class="form-control-radiobuttons" :class="(!control.valid && $parent.showErrors) ? 'has-danger': ''">
        <div class="form-control-title" v-if="control.title">{{ control.title }}</div>
        <div class="form-control-radiobutton-item" v-for="(option, index) in control.options.value">
            <input class="form-control-input" type="radio" :name="control.id" :value="option.value" v-model="$parent.value" :id="'radiobutton-' + control.id + '-' + index">
            <label :for="'radiobutton-' + control.id + '-' + index" class="form-control-label" :class="'form-control-label-' + index + ($parent.value == option.value ? ' form-control-label-checked' : '')">
                {{ option.title }}
            </label>
        </div>
        <div class="form-control-feedback" v-for="message in control.errorMessages" v-if="!control.valid && $parent.showErrors">
            {{ message }}
        </div>
    </div>
</template>

<style scoped>

</style>

<script>
    module.exports = {
        props: ['control']
    }
</script>
