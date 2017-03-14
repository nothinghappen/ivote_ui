<template>
    <div>
        <div>
            <el-card class="box-card logincontainer" style="margin-top:50px">  
                <el-input
                    class="input"
                    placeholder="输入用户名"
                    v-model="user.username">
                </el-input>
                <el-input
                    class="input"
                    placeholder="输入密码"
                    type="password"
                    v-model="user.password">
                </el-input>
                <el-input
                    class="input"
                    placeholder="确认密码"
                    type="password"
                >
                </el-input>
                <div class="button">
                    <el-button type="primary" style="width:100%" @click="register()">立即注册</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import Api from '../store/api'

  export default {
    components: {
      
    },
    data() {
      return {
        user:{
            username:'',
            password:''
        }
      };
    },
    methods: {
      register(){
          Api.post(`/user/register?json=${JSON.stringify(this.user)}`)
            .then((data)=>{
                if(data.status == "success"){
                    document.cookie = "userId=" + escape(data.data);
                    window.location.href = "tapsbar";
                }else{
                    this.$message({
                        message: '注册失败，请再次尝试',
                        type: 'warning'
                    })
                }
            });
      }
    }
  };
</script>

<style lang="scss">

</style>