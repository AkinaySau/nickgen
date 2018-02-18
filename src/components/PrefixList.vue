<template>
    <div class="container-fluid">
        <div class="row" v-for="prefix in prefixes">
            <label>
                <input v-bind:value="prefix.prefix" type="checkbox"/>
                {{prefix.value}}
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        name: "prefix-list",
        data() {
            return {
                prefixes: require('../json/prefixes')
            }
        }
    }
</script>

<style lang="scss">

</style>