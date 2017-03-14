<template>
  <div class="container">
    <el-card class="box-card questioncontainer margintop marginbottom">
    <div>
      <el-button type="text" @click="dialogFormVisible = true">编辑标题</el-button>
      <el-button type="text" @click="addSingle()">添加单选</el-button>
      <el-button type="text" @click="addmulti()">添加多选</el-button>
      <el-button type="text" @click="addAnswer()">添加问答</el-button>
      <el-button type="text" @click="addScore()">添加评分</el-button>
      <el-button type="primary" style="float:right;" @click="submit()">提交</el-button>
    </div>
    <el-dialog title="编辑" v-model="dialogFormVisible" size="tiny">
      <div>
        <el-input v-model="questionnaire.title" placeholder="输入标题"></el-input>
        <el-input v-model="questionnaire.subTitle" placeholder="输入副标题"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="closedialog()">取 消</el-button>
                <el-button type="primary" @click="closedialog()">确 定</el-button>
            </span>
    </el-dialog>
    <div>
      <h1 class="center">{{questionnaire.title}}</h1>
      <h3 class="center">{{questionnaire.subTitle}}</h3>
      <div>
        <div class="block center">
          <el-date-picker v-model="daterange" type="daterange" placeholder="选择日期范围">
          </el-date-picker>
        </div>
        <div class="questioncontainer" v-for="q,index in questionnaire.questionList">
          <el-button type="primary" style="float: right;margin-right: 10px" @click="editquestion(index)">编辑</el-button>
          <el-button type="danger" style="float: right;margin-right: 10px" @click="deleteQuestion(index)">删除</el-button>
          <h2>{{(index+1)+'.'+ q.contents+'['+getStyleString(q.styleId)+']'}}</h2>
          <ul>
            <li class="h4" v-for="o in q.options">{{o.optionContent}}</li>
          </ul>
          <el-card class="box-card" v-show="edit[index].isEdit">
            <el-input v-model="q.contents" placeholder="请输入题干内容"></el-input>
            <el-input v-model="q.maxScore" v-if="q.styleId == 4" placeholder="请输入最高分"></el-input>
            <div style="margin: 10px">
              <ul>
                <li v-for="o,index in q.options">
                  <input type="text" v-model="o.optionContent"></input>
                  <el-button-group>
                    <el-button size="mini" type="primary" icon="plus" @click="optionAdd(q,index)"></el-button>
                    <el-button size="mini" type="danger" icon="minus" @click="optionDelete(q,index)"></el-button>
                  </el-button-group>
                </li>
              </ul>
            </div>
            <el-button type="primary" style="float: right;margin-right: 10px;margin-bottom:10px" @click="complete(index)">完成</el-button>
          </el-card>
        </div>
        </div>
      </div>  
    </el-button>
    </el-card>
    </div>
</template>

<script>
import Api from '../store/api'

export default {
  name: 'newquestionnaire',
  data(){
      return {
          dialogFormVisible: false,
          daterange: '',
          edit: [{
                    isEdit: false
                }],
          questionnaire: {
                    title: "问卷标题",
                    subTitle: "副标题",
                    createTime: new Date(),
                    userId: 0,
                    startTime: '',
                    endTime: '',
                    questionList: [{
                        contents: "题干",
                        styleId: 1,
                        picUrl: "图片url",
                        options: [
                            {
                                optionContent: "选项",
                            },
                            {
                                optionContent: "选项",
                            }]
                    }]
                }
      }
  },
  methods: {
    opendialog(){
        this.dialogFormVisible = true;
        console.log(this.dialogFormVisible);
    },
    closedialog(){
        this.dialogFormVisible = false;
        console.log(this.dialogFormVisible);
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
                },
                optionDelete(q, index){
                    q.options.splice(index, 1);
                },
                optionAdd(q, index){
                    var option = {
                        optionContent: "选项",
                    };
                    q.options.splice(index + 1, 0, option);
                },
                editquestion(index){
                    this.edit[index].isEdit = true;
                },
                complete(index){
                    this.edit[index].isEdit = false;
                },
                deleteQuestion(index){
                    this.edit.splice(index, 1);
                    this.questionnaire.questionList.splice(index, 1);
                },
                addSingle(){
                    this.edit.push({isEdit: false});
                    var question = {
                        contents: "题干",
                        styleId: 1,
                        picUrl: "图片url",
                        options: [
                            {
                                optionContent: "选项",
                            },
                            {
                                optionContent: "选项",
                            }]
                    };
                    this.questionnaire.questionList.push(question);
                },
                addmulti(){
                    this.edit.push({isEdit: false});
                    var question = {
                        contents: "题干",
                        styleId: 2,
                        picUrl: "图片url",
                        options: [
                            {
                                optionContent: "选项",
                            },
                            {
                                optionContent: "选项",
                            }]
                    };
                    this.questionnaire.questionList.push(question);
                },
                addAnswer(){
                    this.edit.push({isEdit: false});
                    var question = {
                        contents: "题干",
                        styleId: 3,
                        picUrl: "图片url",
                        options: []
                    };
                    this.questionnaire.questionList.push(question);
                },
                addScore(){
                    this.edit.push({isEdit: false});
                    var question = {
                        contents: "题干",
                        styleId: 4,
                        picUrl: "图片url",
                        maxScore:1,
                        options: []
                    };
                    this.questionnaire.questionList.push(question);
                },
                submit(){
                    if(this.daterange == ''){
                        this.$message({
                        message: '请选择问卷的开始结束时间！',
                        type: 'warning'
                        })
                        return;
                    }
                    this.questionnaire.startTime = this.daterange[0];
                    this.questionnaire.endTime = this.daterange[1];
                    for(var i = 0;i < this.questionnaire.questionList.length;i++){
                        var q = this.questionnaire.questionList[i];
                        if(q.styleId == 4){
                            for (var j = 1;j <= q.maxScore;j++) {
                                var option = {
                                    optionContent: j,
                                };
                                q.options[j-1] = option;
                            }
                            delete q.maxScore;
                        }
                    }
                    Api.post(`/questionnaire/postQuestionnaire?json=${JSON.stringify(this.questionnaire)}`)
                    .then((data)=>{
                        console.log(data);
                        alert("提交成功");
                    });
                }
  },
  created() {
    if(!Api.getCookie("userId")){
        window.location.href = "login";
    }
    this.questionnaire.userId = Api.getCookie("userId");
  }
}
</script>

<style lang="scss" scope>
  .center {
    text-align: center;
  }
  .marginbottom{
      margin-bottom: 50px;
  }
</style>