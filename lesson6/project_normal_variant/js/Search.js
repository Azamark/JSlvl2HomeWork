Vue.component('search', {
    data() {
        return {
            searchLine: '',
        }
    },
    template: `
        <form action="#" class="search-form">
            <button @click.stop="$root.$refs.products.clearFilter">
                All item
            </button>
            <input type="text" class="search-field" v-model.lazy="searchLine">
            <button class="btn-search" type="submit" @click.stop="$root.$refs.products.filter(searchLine)">
                <i class="fas fa-search"></i>
            </button>
        </form>`
})