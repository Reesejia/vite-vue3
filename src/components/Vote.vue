<template>
  <div>
    <div>{{title}}</div>
    <div>
      <div>支持人数：{{supNum}}</div>
      <div>反对人数：{{oppNum}}</div>
      <div>支持率：{{ratio}}</div>
      <button @click="change(0)">支持</button>
      <button @click="change(1)">反对</button>
    </div>
  </div>
</template>
<script>
import {
  watchEffect,
  ref,
  toRef,
  reactive,
  toRefs,
  computed,
  watch
} from "vue";
export default {
  props: {
    title: String
  },
  // 初始化props 和 beforeCreate之间
  setup(props) {
    // {title} 这里不能解构
    // console.log('props', props)

    // props: 基于Proxy代理的响应式数据，不能是props；得是props.title
    // watchEffect(() => {
    //   console.log("state.supNum", state.supNum);
    // });

    // ref 构建响应式数据（一般处理简单值的响应式）
    // 原理还是defineProperty
    // let supNum = ref(0),
    //   oppNum = ref(0);
    // console.log("supNum", supNum);
    // function change(lx) {
    //   console.log("lx", lx);
    //   lx == 0 ? supNum.value++ : oppNum.value++;
    // }

    // ref 2
    // let state = ref({
    //   supNum: 0,
    //   oppNum: 0
    // })
    //   function change(lx) {
    //   console.log("lx", lx);
    //   lx == 0 ? state.value.supNum++ : state.value.oppNum++;
    // }

    // reactive 响应式数据构建方案 reactive，基于Proxy对数据进行深度监听，以此构建响应式
    // let state = reactive({
    //   supNum: 0,
    //   oppNum: 0
    // });

    // function change(lx) {
    //   console.log("lx", lx);
    //   lx == 0 ? state.supNum++ : state.oppNum++;
    // }
    //  return { state, change };

    // toRefs
    let state = reactive({
      supNum: 0,
      oppNum: 0
    });

    function change(lx) {
      console.log("lx", lx);
      lx == 0 ? state.supNum++ : state.oppNum++;
    }

    // let ratio = computed(() =>{
    //   let total = state.supNum+ state.oppNum
    //   return  total === 0 ? '--' : (state.supNum/total*100).toFixed(2) + '%'
    // })
    // let ratio = computed({
    //   get: () => {
    //     let total = state.supNum + state.oppNum;
    //     return total === 0
    //       ? "--"
    //       : ((state.supNum / total) * 100).toFixed(2) + "%";
    //   },
    //   set: val => {
    //     console.log("set val", val);
    //   }
    // });
    // ratio.value = 100

    // watchEffect
    // watchEffect(() => {
    //   console.log("state.supNum", state.supNum);
    // });

    // 监听state，不是监听state.supNum
    // watch(state, () =>{
    //   console.log('watch state.supNum', state.supNum)
    // })

    // watch 只监听state.supNum
    // watch(() => state.supNum, () =>{
    //   console.log('watch state.supNum', state.supNum)
    // })

    let ratio = ref("--");
    watch(
      () => [state.supNum, state.oppNum],
      ([supNum, oppNum], [prevSupNum, prevOppNum]) => {
        console.log("watch 实现ratio");
        let total = supNum + oppNum;
        ratio.value =
          total === 0 ? "--" : ((supNum / total) * 100).toFixed(2) + "%";
      }
    );

    return { ...toRefs(state), change, ratio };
  }
};
</script>