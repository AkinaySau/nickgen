<template>
	<div id="app" class="container">
		<div class="row">
			<div class="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12 offset-xl-4 offset-lg-3 offset-md-2 offset-sm-1 application">
				<div class="row">
					<div class="container">
						<h1 class="text-center text-uppercase">Генератор ников</h1>
						<div class="text-justify">
							<p>Ник генерируется из префиксов корня и суффиксов. Вы можете менять их колличество.</p>
							<p>За основу был взят вот <a href="http://forums.goha.ru/showthread_0_0_t150619">этот
								пост</a>
							</p>
						</div>
					</div>
				</div>
				<hr>
				<div class="row">
					<core-nick @update="core"
					           class="col-md-6"
					           label="Корень"
					/>
					<toggle :type="type"
					        :list="gender()"
					        @update="toggleType"
					        class="col-md-6"
					        label="Пол"
					/>
					<counter :counter="prefix"
					         :max="prefixes.length"
					         @update="prefixUpdate"
					         class="col-md-6"
					         label="Префиксы"
					/>
					<counter :counter="suffix"
					         @update="suffixUpdate"
					         class="col-md-6"
					         label="Суффиксы"
					/>
					<div class="form-group col-12">
						<button v-on:click="generateNickname()" class="btn btn-dark">Создать</button>
					</div>
				</div>
				<hr v-if="nickname.nick">
				<div class="row" v-if="nickname.nick">
					<h3 class="col-12">Ваш ник: {{nickname.nick}}</h3>
					<value-name :list="nickname.value.prefix" />
					<value-name :list="nickname.value.suffix" />
				</div>
			</div>

		</div>
	</div>
</template>

<script>
    import Counter from './components/Counter.vue';
    import ValueName from './components/ValueName.vue';
    import Toggle from "./components/Toggle.vue";
    import CoreNick from "./components/CoreNick.vue";

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
                type: 0,
                prefixes: require('./json/prefixes'),
                suffixes: require('./json/suffixes'),
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
            CoreNick,
            Toggle,
            ValueName,
            Counter
        },
        methods: {
            core: function (val) {
                this.nickname.core = val;
                this.generateNickname()
            },
            gender: function () {
                return [
                    {value: 0, label: 'Без разницы'},
                    {value: 1, label: 'М'},
                    {value: 2, label: 'Ж'}
                ]
            },
            prefixUpdate: function (val) {
                this.prefix = val;
            },
            suffixUpdate: function (val) {
                this.suffix = val;
            },
            generateNickname: function () {
                let type = this.type;
                let prefix = Sau.randArrItems(this.prefixes, this.prefix);
                $.each(prefix, function (k, i) {
                    prefix[k].use = _.sample(i.inscription);
                });
                let suffix = Sau.randArrItems(this.suffixes, this.suffix);
                $.each(suffix, function (k, i) {
                    let group = i.inscription.general;
                    if (type === 1 || type === 0) {
                        group = _.concat(group, i.inscription.male)
                    }
                    if (type === 2 || type === 0) {
                        group = _.concat(group, i.inscription.female)
                    }
                    suffix[k].use = _.sample(group);
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
            },
            toggleType(val) {
                this.type = val;
            }
        },
        watch: {
            type: function () {
                this.generateNickname()
            },
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
