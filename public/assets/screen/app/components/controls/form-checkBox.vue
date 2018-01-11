<template>
    <div class="form-control-checkbox" :id="control.id" :class="(!control.valid && $parent.showErrors) ? 'has-danger': ''">
        <input type="checkbox" :id="'checkbox-' + control.id" v-model="$parent.value">
        <label :for="'checkbox-' + control.id">
            {{ control.title }}
        </label>
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