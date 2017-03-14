<template>
    <div>
        <div class="divcontainer">
            <h4 class="margintop">{{"当前问卷:" + questionnaireListItem.title}}</h4>
            <div class="margintop">
            <el-tabs class="div" v-model="activeName" type="border-card">
                <el-tab-pane label="默认报告" name="first">
                    <defaultreport/>
                </el-tab-pane>
                <el-tab-pane label="分类统计" name="second">
                    敬请期待
                </el-tab-pane>
                <el-tab-pane label="交叉统计" name="third">
                    敬请期待
                </el-tab-pane>
            </el-tabs>
            </div>
        </div>    
    </div>
</template>

<script>
import Api from '../store/api'

  export default {
    components: {
      'defaultreport': require('components/defaultreport')
    },
    data() {
      return {
        activeName:"first",
        id : this.$route.params.id,
        questionnaireListItem : {}
      };
    },
    methods: {
      
    },
    created(){
        Api.get('/analysis/questionnaire', 
        {
            id : this.id
        }).then((data)=>{
            this.questionnaireListItem = data.data.questionnaireListItem;
            //console.log(JSON.stringify(data.data));
        });
    }
  };
</script>

<style lang="scss">

  .center {
    text-align: center;
  }

  .divcontainer{
      margin: 0 auto;
      width: 75%;
  }

  .margintop{
      margin-top: 20px; 
  }

</style>