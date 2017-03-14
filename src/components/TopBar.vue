<template>
  <div>
    <!--顶部导航栏-->
    <el-menu theme="light" default-active="1" class="el-menu-demo" mode="horizontal" router="true">
      <div class="contanier_left">
        <el-menu-item index="/newquestionnaire"><i class="el-icon-plus"></i>新建问卷</el-menu-item>
        <el-menu-item index="/tapsbar"><i class="el-icon-document"></i>我的问卷</el-menu-item>
      </div>
      <div class="contanier_right"> 
        <el-menu-item index=""></i>欢迎</el-menu-item>
        <el-menu-item index="" @click.native="logoff"><i class="el-icon-close"></i>注销</el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
  export default {
    components: {
      
    },
    data() {
      return {
        
      };
    },
    methods: {
      logoff(){
        var t = new Date();
        t.setTime(-1000);
        document.cookie = "userId='';"+"expires="+t.toGMTString();
        window.location.href = "mainhome"
      }
    }
  };
</script>

<style lang="scss" scope>
   .middle{
       text-align: center;
   }

   .floatright {
       float: right;
   }

   .contanier_left {
     margin-left: 150px;
   }

   .contanier_right{
     float: right;
     margin-right: 50px;
   }
    
</style>