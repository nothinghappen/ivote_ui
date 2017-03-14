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
                <div class="button">
                    <el-button type="primary" style="width:100%" @click="login()">登陆</el-button>
                </div>
                <div class="center margintop">
                    <el-button type="text" @click="register()">注册</el-button>
                    <el-button type="text">忘记密码？</el-button>
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
          window.location.href = "register";
      },
      login(){
          console.log(JSON.stringify(this.user));
          Api.post(`/user/login?json=${JSON.stringify(this.user)}`)
            .then((data)=>{
                console.log(JSON.stringify(data));
                if(data.status == "success"){
                    document.cookie = "userId=" + escape(data.data);
                    window.location.href = "tapsbar";
                }else{
                    this.$message({
                        message: '用户名或密码错误',
                        type: 'warning'
                    })
                }
            });
      }
    }
  };
</script>

<style lang="scss">

    .headcontainer{
        width: 100%;
        height: 100px;
        background-color: rgb(239,242,247);
    }

    .rightdiv{
        width: 70%;
        float: right;
    }

    .leftdiv{
        width: 30%;
    }

    .input{
        width: 80%;
        margin:0 auto;
        margin-top: 20px;
    }

    .button{
        width: 80%;
        margin:0 auto;
        margin-top: 20px;
    }

    .logincontainer{
        width:35%;
        margin: 0 auto;
    }

</style>