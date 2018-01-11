<template>
    <div class="form-control-textbox" :class="(!control.valid && control.showErrors) ? 'has-danger': ''">
        <label :for="control.id" v-if="control.title">{{ control.title }}</label>
        <input :id="control.id" type="text" v-model="$parent.value" :placeholder="control.placeholder">
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
