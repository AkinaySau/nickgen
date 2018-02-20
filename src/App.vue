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
                <div class="col-12 col-md-8 offset-md-2">
                    <div class="container-fluid form-inline">
                        <div class="row">
                            <div class="col-12">
                                <label>Корень
                                    <input type="text" class="form-control" v-model="nickname.core">
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <counter :counter="prefix"
                                     :max="prefixes.length"
                                     v-on:update="prefixUpdate"
                                     label="Префиксы"
                            />
                            <counter :counter="suffix"
                                     v-on:update="suffixUpdate"
                                     label="Суффиксы"
                            />
                        </div>
                        <div class="row">
                            <div class="form-group col-12">
                                <button v-on:click="generateNickname()" class="btn btn-dark">Создать</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="nickname.nick">
            <div class="container alert">
                <div class="col-12 col-md-8 offset-md-2">
                    <h3>{{nickname.nick}}</h3>
                    <div class="row">
                        <value-name :list="nickname.value.prefix"/>
                        <value-name :list="nickname.value.suffix"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Counter from './components/Counter.vue';
    import ValueName from './components/ValueName.vue';

    export default {
        name: 'app',
        metaInfo: {
            meta: [

                {
                    charset: 'utf-8'
                },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
                }
            ]
        },
        data() {
            return {
                prefixes: require('./json/prefixes'),
                suffix: 1,
                prefix: 1,
                nickname: {
                    nick: '',
                    core: '',
                    value: {
                        suffix: [],
                        prefix: []
                    }
                }
            }
        },
        components: {
            ValueName,
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
                let prefix = Sau.randArrItems(this.prefixes, this.prefix);
                $.each(prefix, function (k, i) {
                    prefix[k].use = _.join(Sau.randArrItems(i.inscription));
                });
                let suffix = Sau.randArrItems(this.prefixes, this.suffix);
                $.each(suffix, function (k, i) {
                    suffix[k].use = _.join(Sau.randArrItems(i.inscription));
                });

                this.nickname.value.prefix = prefix;
                this.nickname.value.suffix = suffix;
                this.collectNickName();
            },
            collectNickName: function () {
                let p, s;
                p = s = '';
                $.each(this.nickname.value.prefix, function (k, i) {
                    p += i.use;
                });
                $.each(this.nickname.value.suffix, function (k, i) {
                    s += i.use;
                });
                let nick = p + this.nickname.core + s;
                this.nickname.nick = nick[0].toUpperCase() + nick.substring(1).toLowerCase();
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
