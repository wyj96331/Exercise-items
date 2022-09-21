<template>
  <div class="spec-preview">
    <img :src="imgUrl.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgUrl.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  props: ['skuImageList'],
  data () {
    return {
      currIndex: 0
    }
  },
  computed: {
    imgUrl () {
      return this.skuImageList[this.currIndex] || {}
    }
  },
  mounted () {
    this.$bus.$on('getIndex', index => {
      this.currIndex = index
    })
  },
  methods: {
    handler (event) {
      const mask = this.$refs.mask
      const big = this.$refs.big
      let maskLeft = event.offsetX - mask.offsetWidth / 2
      let maskTop = event.offsetY - mask.offsetHeight / 2
      // 约束范围
      if (maskLeft < 0) maskLeft = 0
      if (maskLeft >= mask.offsetWidth) maskLeft = mask.offsetWidth
      if (maskTop < 0) maskTop = 0
      if (maskTop >= mask.offsetHeight) maskTop = mask.offsetHeight
      // 修改元素的left 和 top 值
      mask.style.left = maskLeft + 'px'
      mask.style.top = maskTop + 'px'
      big.style.left = -2 * maskLeft + 'px'
      big.style.top = -2 * maskTop + 'px'
    }
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
