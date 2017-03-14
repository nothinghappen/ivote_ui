<template>
  <div>
      <el-menu theme="light" default-active="1" class="el-menu-demo" mode="horizontal" router="true">
      <div style="margin-left:250px;">
        <el-menu-item index="/mainhome"><i class="el-icon-menu"></i>首页</el-menu-item>
      </div>
      <div style="margin-right:150px;float:right;"> 
        <el-menu-item index="/login"><i class="el-icon-circle-check"></i>登陆</el-menu-item>
        <el-menu-item index="/register"><i class="el-icon-circle-check"></i>注册</el-menu-item>
      </div>
    </el-menu>
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
    </div>
</template>

<script>
export default {
  components: {
    'top-bar': require('components/TopBar')
  },
  methods: {
    
  }
}
</script>

<style lang="scss">

html, body {
  width: 100%;
  height: 100%;
  margin: 0px;
}

.headcontainer{
    width: 100%;
    height: 100px;
    background-color: rgb(239,242,247);
}

.acontainer{
    width:60%;
    float: right;
    background-color: pink;
}

.a{
    padding-right:20px; 
    padding-top: 40px;
    font-size: 20px;
}



</style>