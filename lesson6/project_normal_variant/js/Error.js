Vue.component('error', {
    data() {
        return {
            errorText: '',
            cartHide: true,
        }
    },
    methods: {
        handleError(error) {
            console.log(error)
            this.errorText = error;
            this.cartHide = false;
        }
    },
    template: `
        <div class="error" :class="{invisible:cartHide}">
            <div class="error-content">
                {{errorText}}
                <button @click="cartHide = true">
                    close
                </button>
            </div>
        </div>`
})