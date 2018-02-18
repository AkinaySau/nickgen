<template>
    <div id="app" class="container-fluid">
        <div class="row">
            <div class="container">
                <h1> Генератор ников</h1>
            </div>
        </div>
        <div class="row">
            <div class="container">
                <div class="alert-light">
                    <span v-if="prefix">Префиксов: {{prefix}}.</span>
                    <span v-if="suffix">Суффиксов: {{suffix}}.</span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-8">
                        <div class="container-fluid configure form-inline">
                            <div class="col-6">
                                <counter :counter="prefix"
                                         :max="prefixes.length"
                                         v-on:update="prefixUpdate"
                                         title="Префиксы"
                                />
                            </div>
                            <div class="col-6">
                                <counter :counter="suffix"
                                         v-on:update="suffixUpdate"
                                         title="Суффиксы"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <!--<PrefixList/>-->
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="nickname.nick">
            <div class="container alert alert-success">
                <i>{{nickname.nick}}</i>
            </div>
        </div>
    </div>
</template>

<script>
    import Counter from './components/Counter.vue';

    export default {
        name: 'app',
        data() {
            return {
                prefixes: require('./json/prefixes'),
                suffix: 1,
                prefix: 1,
                nickname: {
                    nick: '',
                    core: 'sdf',
                    value: {
                        suffix: [],
                        prefix: []
                    }
                }
            }
        },
        components: {
            Counter
        },
        methods: {
            prefixUpdate: function (val) {
                this.prefix = val;
            },
            suffixUpdate: function (val) {
                this.suffix = val;
            },
            generateNickname: function () {
                this.nickname.nick = this.prefix + this.nickname.core + this.suffix;
                this.nickname.value.prefix = Sau.randArrItems(this.prefixes, this.prefix);
                // this.nickname.value.prefix = {};
                console.log(this.nickname.value.prefix)
            }
        },
        watch: {
            prefix: function () {
                this.generateNickname()
            },
            suffix: function () {
                this.generateNickname()
            },
        }
    }
</script>

<style lang="scss">
    #app {
        min-height: 100%;
        min-width: 100%;
    }
</style>
