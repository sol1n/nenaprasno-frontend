<template>
    <div class="form-breadcrumbs">
        <div class="form-breadcrumbs-list">
            <div v-for="(breadcrumb, index) in breadcrumbs"
                    class="form-breadcrumbs-item"
                    :class="
                        'form-breadcrumb-item-' + index +
                        (index < current ? ' form-breadcrumbs-item-done ' : '') +
                        (index == current ? ' form-breadcrumbs-item-active ' : '') +
                        (index == current+1 ? ' form-breadcrumbs-item-next ' : '') +
                        ' ' + breadcrumb.class
                    "
            >
                <span class="form-breadcrumbs-item-value">
                    {{ breadcrumb.title }}
                </span>
            </div>
        </div>
    </div>
</template>
<style scoped>
</style>
<script>
    module.exports = {
        data() {
            return {

            }
        },
        props: ['current', 'form'],
        computed: {
            breadcrumbs() {
                let breadcrumbs = [];

                if (this.form.parts) {
                    this.form.parts.forEach(function(v) {
                        breadcrumbs.push({
                            "title": v.title,
                            "class": v.class
                        });
                    });
                }

                if (this.form.resultPart) {
                    breadcrumbs.push({
                        "title": "Результаты",
                        "class": "form-breadcrumbs-item-results"
                    });
                }
                return breadcrumbs;
            }
        }
    }
</script>
