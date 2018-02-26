<template>
	<ul class="col-md-6 col-sm-auto nick-values">
		<li v-for="item in list">
			<b>{{item.use}}</b> - {{item.value}}
		</li>
	</ul>
</template>

<script>
    export default {
        name: "value-name",
        props: {
            list: {
                type: Array,
                default: []
            }
        }
    }
</script>

<style lang="scss">
	.nick-values {
		list-style: none
	}
</style>