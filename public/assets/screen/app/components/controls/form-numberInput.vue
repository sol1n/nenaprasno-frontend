<template>
    <div class="form-control-numberinput" :class="(!control.valid && $parent.showErrors) ? 'has-danger': ''">
        <div v-if="control.title" class="form-control-title">{{ control.title }}</div>
        <input :id="control.id" type="number" v-model="$parent.value" :placeholder="control.placeholder">
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
