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
            updateCounter: function (value) {
                this.$emit('counter', value);
            },
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
                this.$emit('update', val)
            }
        }
    }
</script>

<style lang="scss">

</style>