<template>
	<div class="form-group">
		<label v-if="label">{{label}}</label>
		<div class="input-group">
			<div class="input-group-prepend">
				<button v-on:click="downCount" class="btn btn-danger">-</button>
			</div>
			<input v-model="iterator" type="text"
			       class="form-control counter-field">
			<div class="input-group-append">
				<button v-on:click="upCount" class="btn btn-success">+</button>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "counter",
        data: function () {
            return {
                iterator: this.counter
            }
        },
        props: {
            counter: {
                type: Number,
                required: true
            },
            label: {
                type: String,
                default: ''
            },
            max: {
                type: Number,
                default: null
            },
        },
        methods: {
            downCount: function () {
                if (this.iterator > 1) {
                    this.iterator--;
                }
            },
            upCount: function () {
                if (this.iterator < this.max || this.max == null)
                    this.iterator++;
            },
        },
        watch: {
            iterator: function (val) {
                val = _.parseInt(val);
                if (val > this.max) {
                    val = this.max;
                } else if (val < 1) {
                    val = 1;
                }
                this.iterator = val;

                this.$emit('update', val)
            }
        }
    }
</script>

<style lang="scss">

</style>