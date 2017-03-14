<template>
<div>
  <div class="carouselcontainer">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4">
            <h3 class="template">{{ item }}</h3>
        </el-carousel-item>
    </el-carousel>
  </div>
  <div class="homebottom center">
      <h2>3个用户正在使用</h2>
      <el-button type="primary" @click="use()">立即使用</el-button>
  </div>    
</div>
</template>

<script>
import Api from '../store/api'

export default {
  components: {
    
  },
  methods: {
    use(){
        if(!Api.getCookie("userId")){
            window.location.href = "login";
        }else{
            window.location.href = "tapsbar";
        }
    }
  }
}
</script>

<style lang="scss">

.homebottom{
    margin-top:50px; 
}

.carouselcontainer{
    background-image: url(/static/index_sliders_bg.jpg);
    
}

.el-carousel__item h3 {
    color: white;
    font-size: 50px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
  }
  
  


</style>