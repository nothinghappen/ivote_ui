<template>
  <div>
    <el-table
      :data="table"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        v-for="item in items"
        :prop="item.prop"
        :label="item.label"
        :width="item.width">
      </el-table-column>
      <el-table-column
        inline-template
        :context="_self"
        label="操作"
        width="200">
        <span>
          <el-button @click="handleStatistics($index)" type="success" size="small">统计</el-button>
          <el-button @click="handleRelease($index)" type="primary" size="small">发布</el-button>
          <el-button @click="handleDelete(row, $index)" type="danger" size="small">删除</el-button>
        </span>
      </el-table-column>
    </el-table>
    <el-dialog title="发布链接" v-model="dialogVisible" size="tiny">
      <span>{{"问卷链接:" + url}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Api from '../store/api'

export default {
  name: 'myquestionnairelist',
  data () {
    return {
      dialogVisible:false,
      url:'',
      userId:0,
      table: [],
      tableRowClassName: 'temp',
      items: [
        {
          prop: 'title',
          label: '标题',
        },
        {
          prop: 'createTime',
          label: '创建时间',         
        },
        {
          prop: 'startTime',
          label: '开始时间',
        },
        {
          prop: 'endTime',
          label: '结束时间',
        },
        {
          prop: 'answeredNum',
          label: '答卷',
        },
      ]
    }
  },
  methods: {
    handleRelease(index){
      var id = this.table[index].questionnaireId;
      this.url = "http://localhost:8081/answer/"+id;
      this.dialogVisible = true;
    },
    handleStatistics(index){
      var id = this.table[index].questionnaireId;
      window.location.href = "statistics/"+id;
    },
    handleDelete(row, index) {
      Api.post(`/questionnaire/deleteQuestionnaire?questionnaireId=${row.questionnaireId}&userId=${1}`)
      .then((data)=>{
        this.table.splice(index, 1);
      })
    }
  },
  created() {
    if(!Api.getCookie("userId")){
        window.location.href = "login";
    }
    this.userId = Api.getCookie("userId");
    Api.get('/questionnaire/getQuestionnaireList', {
      page: 1,
      pageSize: 50,
      userId: this.userId
    }).then((data)=>{
      this.table = data.data
    })
  }
}
</script>

<style lang="scss" scoped>

  .container{
    margin-left:100px;
    margin-right: 100px; 
  }

</style>
