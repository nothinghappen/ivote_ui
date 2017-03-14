<template>
  <div>
    <el-card class="box-card questioncontainer margintop">
        <div v-show="answershow">
            <div slot="header" class="clearfix">
                <h1 class="center">{{questionnaire.title}}</h1>
            </div>
            <div class="margintop" v-for="q,index in questionnaire.questionList">
                <h4>{{(index + 1) + "." + q.contents + "[" + getStyleString(q.styleId) + "]"}}</h4>
                <el-radio-group v-if="q.styleId == 1" v-model="answer[index]">
                    <el-radio v-for="o in q.options" :label="o.optionId">{{o.optionContent}}</el-radio>
                </el-radio-group>
                <el-checkbox-group v-if="q.styleId == 2" v-model="answer[index]">
                    <el-checkbox v-for="o in q.options" :label="o.optionId">{{o.optionContent}}</el-checkbox>
                </el-checkbox-group>
                <el-input v-if="q.styleId == 3" v-model="answer[index]" placeholder="请输入答案"></el-input>
                <div v-if="q.styleId == 4" class="block">
                    <el-rate
                        v-model="answer[index]"
                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                        :max=q.options.length>
                    </el-rate>
                </div>
            </div>
            <div class="margintop center">
                <el-button type="primary" @click="submit()">提交</el-button>
            </div>
        </div>
        <div v-show="answercomplete">
            <h2 class="center">您的答卷已经提交，感谢您的参与！</h2>
        </div>    
    </el-card>
  </div>
</template>

<script>
import Api from '../store/api'

  export default {
    
    data() {
      return {
        answershow:true,
        answercomplete:false,
        answer:[],
        id: this.$route.params.id,
        questionnaire:{
            title:'标题',
            subTitle:'副标题',
            questionList:[]
        }
      };
    },
    methods: {
        submit(){
            var answermodals = [];
            for(var i = 0;i < this.questionnaire.questionList.length;i++){
                var question = this.questionnaire.questionList[i];
                var answerModal = {
                    qtnId:this.$route.params.id,
                    userId:3,
                    answerComment:"",
                    answerContent:"",
                    selectedModels:[],
                    questionId:question.questionId
                };
                if(question.styleId == 1){
                    var s = {
                        optionsId:this.answer[i],
                        questionId:question.questionId
                    };
                    answerModal.selectedModels.push(s);
                }
                if(question.styleId == 2){
                    for(var j = 0;j < this.answer[i].length;j++){
                        var s = {
                            optionsId:this.answer[i][j],
                            questionId:question.questionId
                        };
                    }
                    answerModal.selectedModels.push(s);
                }
                if(question.styleId == 3){
                    answerModal.answerContent = this.answer[i];
                }
                if(question.styleId == 4){
                    answerModal.answerComment = this.answer[i];
                    var s = {
                            optionsId:question.options[this.answer[i]-1].optionId,
                            questionId:question.questionId
                        };
                    answerModal.selectedModels.push(s);
                }
                answermodals.push(answerModal);
            }
            // console.log(JSON.stringify(this.answer))
            // console.log(JSON.stringify(answermodals))
            Api.post(`/questionnaire/postAnswer?json=${JSON.stringify(answermodals)}`)
            .then((data)=>{
                console.log(data);
                this.answercomplete = true;
                this.answershow = false;
            })
        },
        print(){
            // console.log(JSON.stringify(this.answer))
        },
        getStyleString(style){
            switch (style) {
                case 1:
                    return "单选";
                    break;
                case 2:
                    return "多选";
                    break;
                case 3:
                    return "问答";
                    break;
                case 4:
                    return "评分";
                break;
            }
        }
    },
    created(){
        Api.get('/questionnaire/getQuestionnaireById', 
        {
            id : this.id
        }).then((data)=>{
            this.questionnaire = data.data;
            for(var i = 0;i < this.questionnaire.questionList.length;i++){
                var style = this.questionnaire.questionList[i].styleId;
                if(style == 1){
                    this.answer[i] = 0;
                }
                if(style == 2){
                    this.answer[i] = [];
                }
                if(style == 3){
                    this.answer[i] = '';
                }
                if(style == 4){
                    this.answer[i] = 0;
                }
            }
        })
    }
  };
</script>

<style lang="scss">
  .center{
      text-align: center;
  }

    .margintop{
      margin-top: 20px; 
    }

  .questioncontainer{
      width: 75%;
      margin: 0 auto;
  }
</style>