<template>
  <div id="datav-container"
       :ref="refName">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted, nextTick } from 'vue'
import { debounce } from '../../utils'

export default {
  name: 'DatavContainer',
  props: {
    options: Object
  },
  setup (ctx) {
    const refName = 'datavContainer'
    const width = ref(0)
    const height = ref(0)
    const originalWidth = ref(0)
    const originalHeight = ref(0)
    const ready = ref(false)
    let context, dom, observer

    const initSize = () => {
      return new Promise((resolve) => {
        nextTick(() => {
          dom = document.getElementById('datav-container')
          // 获取大屏的真实尺寸
          if (ctx.options && ctx.options.width && ctx.options.height) {
            width.value = ctx.options.width
            height.value = ctx.options.height
          } else {
            width.value = dom.clientWidth
            height.value = dom.clientHeight
          }
          // 获取画布尺寸
          if (!originalWidth.value || !originalHeight.value) {
            originalWidth.value = window.screen.width
            originalHeight.value = window.screen.height
          }
          resolve()
        })
      })
    }

    const updateSize = () => {
      if (width.value && height.value) {
        dom.style.width = `${width.value}px`
        dom.style.height = `${height.value}px`
      } else {
        dom.style.width = `${originalWidth.value}px`
        dom.style.height = `${originalHeight.value}px`
      }
    }

    const updateScale = () => {
      // 获取真实的视口尺寸
      const currentWidth = document.body.clientWidth
      const currentHeight = document.body.clientHeight
      // 获取大屏最终的宽高
      const realWidth = width.value || originalWidth.value
      const realHeight = height.value || originalHeight.value

      const widthScale = currentWidth / realWidth
      const heightScale = currentHeight / realHeight
      dom && (dom.style.transform = `scale(${widthScale}, ${heightScale})`)
    }

    const onResize = async () => {
      await initSize()
      updateScale()
    }

    const initMutationObserver = () => {
      const MutationObserver = window.MutationObserver
      observer = new MutationObserver(onResize)
      observer.observe(dom, {
        attributes: true,
        attributeFilter: ['style'],
        attributeOldValue: true
      })
    }

    const removeMutationObserver = () => {
      if (observer) {
        observer.disconnect()
        observer.takeRecords()
        observer = null
      }
    }

    onMounted(async () => {
      ready.value = false
      context = getCurrentInstance().ctx
      await initSize()
      updateSize()
      updateScale()
      window.addEventListener('resize', debounce(100, onResize))
      initMutationObserver()
      ready.value = true
    })

    onUnmounted(() => {
      window.removeEventListener('resize', onResize)
      removeMutationObserver()
    })

    return {
      refName,
      ready
    }
  }
}
</script>

<style lang="scss">
#datav-container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>