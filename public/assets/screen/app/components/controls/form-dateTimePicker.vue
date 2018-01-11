<template>
    <div>
        <label :for="control.id" v-if="control.title">{{ control.title }}</label>
        <input class="form-control" :id="control.id" type="date" v-model="$parent.value">
    </div>
</template>

<style scoped>

</style>

<script>
    module.exports = {
        props: ['control']
    }
</script>