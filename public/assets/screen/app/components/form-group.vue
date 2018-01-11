<template>
    <div class="form-group" :class="'form-group-' + index + ' ' + (group.class ? group.class : '')" v-if="display">
        <div class="form-group-title" v-if="group.title">{{ group.title }}</div>
        <form-control v-for="(control, index) in group.controls" :control="control" :index="index"></form-control>
    </div>
</template>

<style scoped>

</style>

<script>
    var displayCondition = require('./../helpers/displayCondition');
    var formControl = require('./form-control.vue');

    module.exports = {
        props: ['group', 'index'],
        components: {
            'form-control': formControl
        },
        computed: {
            display() {
                return displayCondition(this.group, this.$store);
            }
        }
    }
</script>
