<template>
  <div class="progressBar" ref="progressBar">
    <div class="bar">
      <canvas ref="canvasBar" :width="width" :height="height"></canvas>
    </div>
  </div>
</template>

<script>
function empty(obj = {}) {
  return {
    totalTime: 10,
    currentTime: 10,
    barDefaultColor: "#E9E9E9",
    barColor: "#FFB936",
    ...obj
  };
}

let methods = {
  draw(width, startTimestamp = null, lastTimestamp = null, delta = 0) {
    if (!this.$refs.canvasBar) return false;
    let canvas = this.$refs.canvasBar,
      ctx = canvas.getContext("2d"),
      defaultWidth = this.width,
      height = this.height,
      speed = this.width / this.value.totalTime,
      distance = 0,
      countDown = this.value.totalTime;
    this.bar(ctx, defaultWidth, height, this.value.barDefaultColor);
    this.bar(ctx, width, height, this.value.barColor);
    let requestAnimationFrame = window.requestAnimationFrame(timestamp => {
      if (lastTimestamp === null) {
        startTimestamp = timestamp;
        lastTimestamp = timestamp;
      }
      delta = timestamp - lastTimestamp;
      distance = (speed * delta) / 1000;
      if (width > height) {
        countDown =
          this.value.totalTime -
          new Date(lastTimestamp - startTimestamp).getSeconds();
        this.draw(
          width - distance,
          startTimestamp,
          (lastTimestamp = timestamp),
          delta
        );
        this.$emit("change", countDown);
      } else {
        window.cancelAnimationFrame(requestAnimationFrame);
        this.$emit("changeEnd");
      }
    });
  },
  bar(ctx, width, height, color) {
    if (Math.floor(width) <= height) color = "rgba(0,0,0,0)";
    ctx.fillStyle = color;
    ctx.fillRect(height / 2, 0, width - height, height);
    ctx.beginPath();
    ctx.arc(height / 2, height / 2, height / 2, 0, 2 * Math.PI);
    ctx.arc(width - height / 2, height / 2, height / 2, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
};

let Logic = {
  setCurrentTime(currentTime) {
    return {
      ...this.value,
      currentTime
    };
  }
};

export default {
  name: "NormalBar",
  props: ["value"],
  data () {
    return {
      width: 0,
      height: 0
    }
  },
  empty,
  methods,
  Logic,
  mounted() {
    this.width = this.$refs.progressBar.clientWidth
    this.height = this.$refs.progressBar.clientHeight
    this.draw(this.width);
  }
};
</script>

<style scoped>
.progressBar {
  width: 100%;
  height: 100%;
  display: inline-block;
}
</style>

