<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ counter }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  <div>counter:{{counter}}</div>
  <div>double counter:{{dbcounter}}</div>
  <div ref="desc"></div>
</template>

<script>
import { reactive, computed, onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      counter: 0
    }
  },
  setup(){
    // counter相关
    const {counter, dbcounter} = useCounter()

    // 单值响应式
    const msg2 = ref('some message')

    // 使用元素的引用
    const desc = ref(null)

    // 侦听器
    // 刚才已经使用toRef已经转换过了所以直接可以watchcounter
    watch(counter, (val, oldVal) =>{
      const p = desc.value
      p.textContent = `counter change from ${oldVal} to ${val}`
    })
    return {counter, dbcounter, msg2, desc}
  }


}
  function useCounter(){
      const data = reactive({
      counter: 1,
      dbcounter: computed(() => data.counter * 2)
    })

    let timer
    onMounted(() =>{
      setInterval(() =>{
        data.counter ++
      }, 1000)
    })

    onUnmounted(() =>{
      clearInterval(timer)
    })
    return toRefs(data)
  }
</script>
