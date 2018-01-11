<template>
    <div class="form-control-textblock">
        <h3 v-if="control.title">{{ control.title }}</h3>
        <div v-html="text"></div>
    </div>
</template>

<style scoped>

</style>

<script>
    module.exports = {
        props: ['control'],
        computed: {
            text() {
                // Replace /n/r with <br> tags
                return this.control.description ? this.control.description.replace(/(?:\r\n|\r|\n)/g, '<br />') : null;
            }
        }
    }
</script>
