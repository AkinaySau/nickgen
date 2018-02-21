<template>
	<div class="input-group">
		<p>Пол</p>
		<div class="btn-group" role="group" :aria-label="label">
			<button v-for="item in list" v-on:click="check(item.value)" type="button" class="btn btn-secondary">
				{{item.label}}
			</button>
		</div>
	</div>
</template>

<script>
    export default {
        name: "toggle",
        data() {
            return {
                toggle: _.first(this.list).value
            }
        },
        methods: {
            check: function (val) {
                this.toggle = val;
            },
        },
        props: {
            label: {
                type: String,
                default: 0
            },
            list: {
                type: Array,
                default: []
            }
        },
        watch: {
            toggle: function (val) {
                this.$emit('update', val)
            }
        }
    }
</script>

<style scoped>

</style>