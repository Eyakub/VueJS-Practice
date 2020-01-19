var Event = new Vue();

Vue.component("tabs",{
    template: `
        <div class="tab">
            <ul>
                <li v-for="tab in tabs" @click="makeEvent(tab.name)" :class="{ 'active': tab.selectedNow }">
                    {{ tab.name }}
                </li>
            </ul>
            <div class="details">
                <slot></slot>
            </div>
        </div>
    `,

    data: function(){
        return {
            tabs:[]
        }
    },

    methods: {
        makeEvent (s){
            Event.$emit("tabChange", s);
        }
    },

    created: function(){
        this.tabs = this.$children;
    },
});


Vue.component("tab",{
    template: `
        <div v-if="selectedNow">
            <slot></slot>
        </div>
    `,

    data: function(){
        return {
            selectedNow: false
        }
    },

    created: function(){
        this.selectedNow = this.selected;
        var currentTab = this;
        Event.$on("tabChange", function(s){
            console.log(s);
            if(s == currentTab.name){
                currentTab.selectedNow = true;
            } else{
                currentTab.selectedNow = false;
            }
        })
    },

    props: ['name', 'selected']
})