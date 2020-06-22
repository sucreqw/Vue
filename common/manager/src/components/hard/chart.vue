<template>
  <PageWapper>
    <PageOptionsWapper>
      <Button type="primary" @click="loadData()">搜索</Button>
    </PageOptionsWapper>
    <PageContainerWapper>
      <Row>
        <Col span="24">
          <DatePicker  @on-change="queryTimeRange=$event" :transfer="true" type="daterange" format="yyyy-MM-dd"
                      v-model="queryTimeRange" :options="options2" placement="bottom-end"
                      placeholder="选择日期范围" style="width: 200px"></DatePicker>
        </Col>
      </Row>

      <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    </PageContainerWapper>
  </PageWapper>
</template>

<script>
    import {getChart} from '../../service/hardVisitDO.js';

    export default {
        name: "chart.vue",
        data() {
            this.chartSettings = {
                labelMap: {
                    'visitCount': '访问用户',
                    'messageCount': '留言用户'
                },
                /*legendName: {
                    '访问用户': '访问用户 total: 10000'
                }*/
            }
            return {
                chartData: {
                    columns: ['time', 'visitCount', 'messageCount'],
                    rows: []
                },
                queryTimeRange: [new Date(),new Date()],
                searchFormData: {
                    startTime: '',
                    endTime: '',
                },
                //日期选择器
                options2: {
                    shortcuts: [
                        {
                            text: '昨天',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24);
                                return [start, end];
                            }
                        }, {
                            text: '最近三天',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                                return [start, end];
                            }
                        }, {
                            text: '最近一周',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一月',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三月',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                },
            }
        },
        created() {
            this.status = 0
            this.loadData()

        },
        methods: {

            loadData() {
                if (this.queryTimeRange.length > 0) {
                    this.searchFormData.startTime = this.queryTimeRange[0];
                    this.searchFormData.endTime = this.queryTimeRange[1];
                }
                getChart({params: this.searchFormData}, (data) => {
                    this.chartData.rows=data
                })
            },
        },
    }
</script>

<style scoped>

</style>
