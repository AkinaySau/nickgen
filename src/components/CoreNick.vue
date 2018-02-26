<template>
	<div class="form-group">
		<label>{{label}}</label>
		<input type="text" class="form-control" v-model="str">
	</div>
</template>

<script>
    export default {
        name: "core-nick",
        data() {
            return {
                str: this.core
            }
        },
        props: {
            core: {
                default: '',
                type: String
            },
            label: {
                default: 'label',
                type: String
            }
        },
        watch:
            {
                str(val) {
                    this.$emit('update', val)
                }
            }
    }
</script>

<style scoped>

</style>