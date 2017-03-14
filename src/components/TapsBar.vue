<template>
  <div>
    <el-tabs class="div" v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="列表视图" name="first">
        <list />
      </el-tab-pane>
      <el-tab-pane label="网络视图" name="second">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Api from '../store/api'

  export default {
    components: {
      'list': require('components/MyQuestionnaire')
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        
      }
    },
    created(){
      
    }
  };
</script>

<style lang="scss">
  .div{
    width: 100%;
  }

</style>