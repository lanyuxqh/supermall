<template>
  <div class="toast" v-show="visible">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      duration: 1000,
      visible: false,
      closed: false,
      timer: null,
    };
  },
  mounted() {
    this.startTimer();
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.destroyElement();
      }
    },
  },
  methods: {
    destroyElement() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
    startTimer() {
      this.timer = setTimeout(() => {
        if (!this.closed) {
          this.closed = true;
          clearTimeout(this.timer);
        }
      }, this.duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 15vh;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  min-width: 40vw;
  max-width: 100vw;
  font-size: 15px;
  text-align: center;
  padding: 10px 2vw;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: rgb(223, 219, 219);
  letter-spacing: 3px;
  transition:all .5s;
}
</style>