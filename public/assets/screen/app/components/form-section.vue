<template>
    <div class="form-section" :class="'form-section-' + index + ' ' + (section.class ? section.class : '')" v-if="display">
        <div class="form-section-title" v-if="section.title">{{ section.title }}</div>
        <form-group v-for="(group, index) in section.groups" :group="group" :index="index"></form-group>
    </div>
</template>

<style scoped>

</style>

<script>
    let displayCondition = require('./../helpers/displayCondition');
    let formGroup = require('./form-group.vue');

    module.exports = {
        props: ['section', 'index'],
        components: {
            'form-group': formGroup
        },
        computed: {
            display() {
                return displayCondition(this.section, this.$store);
            }
        }
    }
</script>
