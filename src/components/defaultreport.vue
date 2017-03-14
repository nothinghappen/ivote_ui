<template>
    <div>
        <div class="" v-for="q,index in questionChatData">
            <p class="margintop">{{"第" + (index + 1) + "题:"+q.questionContent}}</p>
            <div class="buttongroup">
                <el-button-group>
                    <el-button @click="showTable(index)">表格</el-button>
                    <el-button @click="showChart(index,'doughnut')">环形图</el-button>
                    <el-button @click="showChart(index,'bar')">柱状图</el-button>
                    <el-button @click="showChart(index,'pie')">圆饼图</el-button>
                </el-button-group>
            </div>
            <div class="chartcontainer" v-show="isChartShow[index].show">
                <canvas class="chart"></canvas>
            </div>    
            <div v-show="isTableShow[index].show">
                <el-table
                :data="tabledata[index]"
                style="width: 100%"
                >
                    <el-table-column
                        prop="option"
                        label="选项"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="count"
                        label="小记"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="percent"
                        label="百分比">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '../store/api'
import Chart from '../store/Chart.min'

  export default {
    components: {
      
    },
    data() {
      return {
        charts:[],
        isFirstDraw:[],
        isTableShow:[],
        isChartShow:[],
        tabledata:[],
        id : this.$route.params.id,
        questionnaireListItem : {},
        questionChatData:{},
        chartColors : [
            'rgb(242,155,135)',
            'rgb(255,245,175)',
            'rgb(200, 222, 140)',
            'rgb(202,217,185)',
            'rgb(231,145,145)',
            'rgb(156,187,204)',
            'rgb(145,210,228)',
            'rgb(254,238,218)',
            'rgb(184,212,176)',
            'rgb(191,224,224)',
            'rgb(238,220,213)',
            'rgb(172,218,224)',
            'rgb(149,183,225)',
            'rgb(78,140,168)',
            'rgb(224,241,244)',
            'rgb(35,173,229)',
            'rgb(244,169,141)',
            'rgb(226,110,72)',
            'rgb(153, 102, 255)',
            'rgb(68,181,73)'
        ]
      };
    },
    methods: {
        showTable(index){
            this.isTableShow[index].show = true;
            this.isChartShow[index].show = false;
            //console.log(this.isTableShow[index].show);
        },
        showChart(index,type){
            this.isTableShow[index].show = false;
            this.isChartShow[index].show = true;
            //console.log(this.isChartShow[index].show);
            var dt = this.questionChatData[index].barchatdata;
            var configCtx = {};
            configCtx.data = {};
            configCtx.data.datasets = [];
            configCtx.options = {};
            configCtx.data.datasets[0] = {};
            configCtx.data.datasets[0].backgroundColor = this.chartColors;
            configCtx.type = type;
            configCtx.data.datasets[0].data = dt.datasets[0].data;
            configCtx.data.labels = dt.labels;
            if(type == 'bar'){
                configCtx.options = {
                    responsive: true,
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: ''
                    }
                };
            }
            if(type == 'pie'){
                configCtx.options.responsive = true;
            }
            if(type == 'doughnut'){
                configCtx.options = {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    }
                };
            }
            var canvas = document.getElementsByClassName("chart")[index];
            var ctx = canvas.getContext("2d");
            if(this.isFirstDraw[index] == true){
                this.isFirstDraw[index] = false;
            }else{
                this.charts[index].destroy();
            }
            var chart = new Chart(ctx,configCtx);
            this.charts[index] = chart;
        }
    },
    created(){
        Api.get('/analysis/questionnaire', 
        {
            id : this.id
        }).then((data)=>{
            this.questionnaireListItem = data.data.questionnaireListItem;
            this.questionChatData = data.data.questionChatData;
            for(var i = 0;i < this.questionChatData.length;i++){
                this.charts[i] = {};
                this.isFirstDraw[i] = true;
                this.isTableShow.push({show:true});
                this.isChartShow.push({show:false});
                this.tabledata[i] = [];
                var data = this.questionChatData[i].barchatdata.datasets[0].data;
                var all = 0;
                for(var x = 0;x < data.length;x++){
                    all = all + data[x];
                }
                for(var j = 0;j < this.questionChatData[i].barchatdata.labels.length;j++){
                    var labels = this.questionChatData[i].barchatdata.labels;
                    var optionObj = {
                        option :labels[j],
                        count : data[j],
                        percent : 0
                    }
                    if(data[j] != 0){
                        var per = data[j]/all
                        optionObj.percent = per.toFixed(2);
                    }
                    this.tabledata[i].push(optionObj);
                }
            }
        });
    }
  };
</script>

<style lang="scss">

    .chartcontainer{
        width: 300px;
        height: 300px;
        margin: 30px;
    }

    .chart{
        width: 100px;
        height: 100px;
    }

    .margintop{
      margin-top: 20px; 
    }

    .buttongroup{
        float: right;
        margin-right: 20px;
    }
</style>