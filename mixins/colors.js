export const colors = {
    methods : {
        hoverColor(event, hover) {
          if (hover) {
            this.$route.params.id
              ? (event.target.style.color = this.services[this.$route.params.id].supportColor)
              : event.target.style.color = "red";
          } else {
            this.$route.params.id
              ? (event.target.style.color = this.services[
                  this.$route.params.id
                ].darkFontColor)
              : event.target.style.color = "#2c3e50";
          }
       },
       borderClass(obj){
          const border = `border-left:solid 6px ${obj.color}`;
          return border;
       }
    },
    computed: {
        backgroundColor() {
            return this.$route.params.id
                ? this.services[this.$route.params.id].lightbgcolor
                : ""
        },
        headerBackColor() {
            return this.$route.params.id
                ? this.services[this.$route.params.id].bgcolor
                : ""
        },
        fontColor() {
            return this.$route.params.id
                ? this.services[this.$route.params.id].darkFontColor
                : ""
        },
        borderColor() {
            return this.$route.params.id
                ? this.services[this.$route.params.id].supportColor
                : ""
        },
    },
}
