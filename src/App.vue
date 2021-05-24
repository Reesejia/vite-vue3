<template>
<div>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
  <Vote :title="title"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Vote from './components/Vote.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Vote
  },
  data(){
    return {
      title: "vue好学吗"
    }
  },
  mounted(){
    setTimeout(()=>{
      this.title = 'Vue还是react好'
    }, 2000)
  }
}
</script>
