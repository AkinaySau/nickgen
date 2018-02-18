<template>
    <ul class="container-fluid col-md-6">
        <li v-for="item in list">
            <b>{{item.text}}</b> - {{item.value}}
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

</style>