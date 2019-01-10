<template>
  <div id="app">
    <div class="defaultBox">
      <h2>进度条</h2>
      <div class="defaultBarBox">
        <NormalBar :value="normalBar"/>
      </div>
    </div>
  </div>
</template>

<script>
  import NormalBar from '@/components/normalBar/NormalBar'

  let components = {
    NormalBar
  }

  // let emit = {
    
  // }

  let methods = {
    
  }

  export default {
    data () {
      return {
        normalBar: NormalBar.empty()
      }
    },
    name: 'App',
    components,
    methods
  }
</script>

<style>
#app{
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
}
.defaultBox{
  width: 100%;
  margin-bottom: 20px;
}
.defaultBox>h2 {
  font-size: 20px;
  margin-bottom: 10px;
  user-select:none;
}
.defaultBox>.defaultBarBox {
  width: 100%;
}
</style>
