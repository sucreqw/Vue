<template>
  <el-container>
    <el-header>
      <br>
      <!--页面提交数据部分-->
      <el-form inline style="text-align: center; color: #fdf6ec;" :model="person">
        <el-form-item label="暗号" class="word">
          <!--<el-lable  inline class="word">暗号</el-lable>-->
          <el-input v-model="person.nick" placeholder="下次可无需出生年月日" class="put"></el-input>
        </el-form-item>
        <el-form-item label="性别" class="word">
          <el-radio v-model="person.gender" label="1" class="word" aria-checked="true">男</el-radio>
          <el-radio v-model="person.gender" label="0" class="word">女</el-radio>
        </el-form-item>
        <el-form-item label="" class="word">
          <el-radio v-model="isChinese" label="false" class="word">阳历</el-radio>
          <el-radio v-model="isChinese" label="true" class="word">阴历</el-radio>
        </el-form-item>
        <el-form-item label="" class="word">
          <el-checkbox v-model="isLeap" label="闰月" border></el-checkbox>
        </el-form-item>
        <el-form-item label="出生年月日" class="word">
          <div class="pick">
            <el-date-picker
              v-model="date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="出生时间" class="pick">
          <el-time-picker
            v-model="time"
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"
            placeholder="选择时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit()" class="pick">提交</el-button>
        </el-form-item>
      </el-form>
      <el-divider content-position="left"></el-divider>
      <!--抽屉弹框-->
      <el-drawer
        title="更多详情"
        :visible.sync="drawer"
        :with-header="false">
        <div calss="eight" style="width: 100%;height: 100%; background-color: #606266">


          <div class="word"
            style="margin-left:0px; letter-spacing: 10px; overflow-x: scroll;text-align: left;font-size: 10px;white-space: nowrap">
            <!--white-space: nowrap 强制一行里显示-->
            <!--流年甲子天干-->
            <small v-for="(item,index) in yearFate.flowYearGen"
                   style="margin:19px;letter-spacing: 0px;">{{item}}</small>

          </div>
        </div>
      </el-drawer>
    </el-header>
    <!--开始主页面显示-->
    <el-main style="margin-top: 5%;">
      <!--八字显示区域-->
      <!--{"chineseDay":"初七","chineseMonth":"四月","chineseYear":"己巳年","comment":{"立春":"1989-02-04 04:27:11"},"day":11,"eightWord":["己","巳","己","巳","辛","未","庚","寅"],"gender":1,"hour":4,"minute":30,"month":5,"nick":"string","second":0,"year":1989}-->
      <!--{"allFive":["土","土","金","金","火","火","土","木"],"hideDayGen":["己","丁","乙"],"hideDayGod":["枭","杀","才"],"hideHourGen":["甲","丙","戊"],"hideHourGod":["财","官","印"],"hideMonthGen":["丙","庚","戊"],"hideMonthGod":["官","劫","印"],"hideYearGen":["丙","庚","戊"],"hideYearGod":["官","劫","印"],"hourGenGod":"劫","monthGenGod":"枭","yearGenGod":"枭"}-->
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark word" v-if="retData.gender!=undefined" style="text-align: center">
            暗号: {{retData.nick}}
            性别:
            <b v-if="retData.gender==0">女</b>
            <b v-if="retData.gender==1">男</b>
            阳历出生时间:
            {{retData.year}}年{{retData.month}}月{{retData.day}}日{{retData.hour}}时{{retData.minute}}分{{retData.second}}秒
            阴历出生时间: {{retData.chineseYear}}{{retData.chineseMonth}}{{retData.chineseDay}} {{retData.eightWord[7]}}时
            <br>
            立春时间(阳历):{{retData.comment.立春}}
            <br>
            <b v-if="retData.gender==0" style="margin-left:-220px;">坤造: </b>
            <b v-if="retData.gender==1" style="margin-left:-220px;">乾造: </b>

            <br>
            <div class="eight">
              <!--天干十神-->
              <small class="eight">
                {{tenGod.yearGenGod}}{{tenGod.monthGenGod}}主{{tenGod.hourGenGod}}
              </small>
              <br>
              <!--天干五行-->
              <small class="eight">
                {{tenGod.allFive[0]}}{{tenGod.allFive[1]}}{{tenGod.allFive[2]}}{{tenGod.allFive[3]}}
              </small>
              <br>
              <br>
              <!--八字-->
              <b>
                {{retData.eightWord[0]}}{{retData.eightWord[2]}}{{retData.eightWord[4]}}{{retData.eightWord[6]}}
              </b>
              <br>
              <b>
                {{retData.eightWord[1]}}{{retData.eightWord[3]}}{{retData.eightWord[5]}}{{retData.eightWord[7]}}
              </b>
              <br>
              <br>
              <!--地支五行-->
              <small class="eight">
                {{tenGod.allFive[4]}}{{tenGod.allFive[5]}}{{tenGod.allFive[6]}}{{tenGod.allFive[7]}}
              </small>
              <br>
              <!--//人元藏干-->
              <div class="eight" style="margin-left: -50px;">
                <small class="god">
                  {{tenGod.hideYearGen[0]}}{{tenGod.hideYearGen[1]}}{{tenGod.hideYearGen[2]}}
                </small>
                <small class="god">
                  {{tenGod.hideMonthGen[0]}}{{tenGod.hideMonthGen[1]}}{{tenGod.hideMonthGen[2]}}
                </small>
                <small class="god">
                  {{tenGod.hideDayGen[0]}}{{tenGod.hideDayGen[1]}}{{tenGod.hideDayGen[2]}}
                </small>
                <small class="god">
                  {{tenGod.hideHourGen[0]}}{{tenGod.hideHourGen[1]}}{{tenGod.hideHourGen[2]}}
                </small>
              </div>
              <!--//人元藏干的十神-->
              <div class="eight" style="margin-left: -50px;">
                <small class="god">
                  {{tenGod.hideYearGod[0]}}{{tenGod.hideYearGod[1]}}{{tenGod.hideYearGod[2]}}
                </small>
                <small class="god">
                  {{tenGod.hideMonthGod[0]}}{{tenGod.hideMonthGod[1]}}{{tenGod.hideMonthGod[2]}}
                </small>
                <small class="god">
                  {{tenGod.hideDayGod[0]}}{{tenGod.hideDayGod[1]}}{{tenGod.hideDayGod[2]}}
                </small>
                <small class="god">
                  {{tenGod.hideHourGod[0]}}{{tenGod.hideHourGod[1]}}{{tenGod.hideHourGod[2]}}
                </small>
              </div>
              <br>
              <!--流年-->
              <!--{"ageDay":12,"ageMonth":7,"ageYear":8,"bigFateAge":[8,18,28,38,48,58,68,78,88,98],"bigFateGen":["庚","辛","壬","癸","甲","乙","丙","丁","戊","己"],"bigFateGod":["劫","比","伤","食","财","才","官","杀","印","枭"],"bigFateYear":[1997,2007,2017,2027,2037,2047,2057,2067,2077,2087],"bigFateZhi":["午","未","申","酉","戌","亥","子","丑","寅","卯"],"fateDay":23,"fateMonth":12,"fateYear":1997,"fateYearDetail":"公历","flowYear":[1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039,2040,2041,2042,2043,2044,2045,2046,2047,2048,2049,2050,2051,2052,2053,2054,2055,2056,2057,2058,2059,2060,2061,2062,2063,2064,2065,2066,2067,2068,2069,2070,2071,2072,2073,2074,2075,2076,2077,2078],"littleFateGen":["辛","壬","癸","甲","乙","丙","丁","戊","己","庚","辛","壬","癸","甲","乙","丙","丁","戊","己","庚","辛","壬","癸","甲","乙","丙","丁","戊","己","庚","辛","壬","癸","甲","乙","丙","丁","戊","己","庚","辛","壬","癸","甲","乙","丙","丁","戊","己","庚","辛","壬","癸","甲","乙","丙","丁","戊","己","庚","辛","壬","癸","甲","乙","丙","丁","戊","己","庚","辛","壬","癸","甲","乙","丙","丁","戊","己","庚","辛","壬","癸","甲","乙","丙","丁","戊","己","庚"],"littleFateZhi":["卯","辰","巳","午","未","申","酉","戌","亥","子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥","子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥","子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥","子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥","子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥","子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥","子","丑","寅","卯","辰","巳","午","未","申"]}-->
              <div style="margin-left:0px; letter-spacing: 0px;">
                <b>大运:
                  <el-button type="text" @click="drawer = true">查看详情</el-button>
                </b>
                <br>
                <b>起运岁数: {{yearFate.ageYear}}岁{{yearFate.ageMonth}}月{{yearFate.ageDay}}天</b>
                <br>
                <b>起运时间(阳历): {{yearFate.fateYear}}年{{yearFate.fateMonth}}月{{yearFate.fateDay}}日</b>
              </div>
              <br>
              <div style="margin-left:0px; letter-spacing: 30px;">
                <!--大运天干十神-->
                <small style="letter-spacing: 33px;" v-for="(item,index) in yearFate.bigFateGod">{{item}}</small>
                <br>
                <!--大运天干-->
                <b v-for="(item,index) in yearFate.bigFateGen">{{item}}</b>
                <br>
                <!--大运地支-->
                <b v-for="(item,index) in yearFate.bigFateZhi">{{item}}</b>
                <br>
                <!--大运对应岁数-->
                <div style="margin-left: -22px;">
                  <small style="margin:14px;letter-spacing: 0px;" v-for="(item,index) in yearFate.bigFateAge">
                    {{item}}
                  </small>
                </div>
                <!--大运对应年份-->
                <div style="margin-left: -22px;">
                  <small style="margin:8.5px;letter-spacing: 0px;"
                         v-for="(item,index) in yearFate.bigFateYear">{{item}}</small>
                </div>
                <!--小运-->
                <br>
                <div style="margin-left:0px; letter-spacing: 0px;">
                  <b>小运:</b>
                  <br>
                  <div
                    style="margin-left:0px; letter-spacing: 10px; overflow-x: scroll;text-align: left;font-size: 10px;white-space: nowrap">
                    <!--white-space: nowrap 强制一行里显示-->
                    <!--小运对应年份-->
                    <small v-for="(item,index) in yearFate.flowYear"
                           style="margin:11.65px;letter-spacing: 0px; font-size: 1px;">{{item}}</small>
                    <br>
                    <!--小运天干-->
                    <small v-for="(item,index) in yearFate.littleFateGen" style="margin:19px;letter-spacing: 0px;">{{item}}</small>
                    <br>
                    <!--小运地支-->
                    <small v-for="(item,index) in yearFate.littleFateZhi" style="margin:19px;letter-spacing: 0px;">{{item}}</small>
                    <br>
                    <br>
                    <!--流年甲子天干-->
                    <small v-for="(item,index) in yearFate.flowYearGen" style="margin:19px;letter-spacing: 0px;">{{item}}</small>
                    <br>
                    <!--流年甲子天干地支-->
                    <small v-for="(item,index) in yearFate.flowYearZhi" style="margin:19px;letter-spacing: 0px;">{{item}}</small>
                  </div>
                </div>

              </div>


            </div>
          </div>
        </el-col>
      </el-row>

    </el-main>
  </el-container>
</template>

<script>
    import defaultImg from '../../assets/fate.jpg';
    import {getEightWord, tenGod, yearFate} from "../../service/FateDo";

    export default {
        name: "Fate.vue",
        data() {
            return {
                bgImg: {
                    backgroundImage: "url(" + defaultImg + ")"
                },
                bg: defaultImg,
                searchFormData: {
                    query: '',
                },
                date: '',//用户设置的出生日期 年月日
                time: '',//用户设置的出生时间 时分秒
                isChinese: "false",//是否农历
                isLeap: false,//是否闰月
                person: { //用户资料DTO
                    "birthday": "",
                    "day": "",
                    "gender": "1",//性别 0为女,1为男
                    "hour": "",
                    "minute": "",
                    "month": "",
                    "nick": "",
                    "second": "",
                    "year": "",
                },
                retData: [],//基础info类返回,包含姓名,性别,阳阴历,八字,立春时间.
                yearFate: [],//流年info类,包含小运,大运.起运时间,流年及对应的六十甲子
                tenGod: [],//十神info类,包含八字对应属性,五行等. 十神的获取方式是直接用八字.
                //十神DTO
                tenGodDTO: {
                    "dayGen": "",
                    "dayZhi": "",
                    "hourGen": "",
                    "hourZhi": "",
                    "monthGen": "",
                    "monthZhi": "",
                    "yearGen": "",
                    "yearZhi": ""
                },
                drawer: false,//不显示抽屉框
                direction: 'rtl',//抽屉框弹出方向
            }
        },
        mounted() {
            this.background();
        },
        methods: {
            //设置背景图片
            background() {
                let div = document.querySelector('main');//document.getElementById('main');
                div.style.backgroundImage = this.bgImg.backgroundImage;
            },
            //提交按钮
            submit() {
                //提交数据到后台
                getEightWord(this.isChinese, this.isLeap, this.person, (data,error) => {
                    if (!error) {
                        this.retData = data;//装载数据,自动渲染页面
                        //把八字装进DTO,用来获取十神
                        this.tenGodDTO.yearGen = data.eightWord[0]
                        this.tenGodDTO.yearZhi = data.eightWord[1]
                        this.tenGodDTO.monthGen = data.eightWord[2]
                        this.tenGodDTO.monthZhi = data.eightWord[3]
                        this.tenGodDTO.dayGen = data.eightWord[4]
                        this.tenGodDTO.dayZhi = data.eightWord[5]
                        this.tenGodDTO.hourGen = data.eightWord[6]
                        this.tenGodDTO.hourZhi = data.eightWord[7]
                        //获取十神数据
                        tenGod(this.tenGodDTO, (data) => {
                            this.tenGod = data;
                        });
                        //获取流年数据
                        yearFate(this.isChinese, this.isLeap, this.person, (data) => {
                            this.yearFate = data;
                        });
                    } else {
                        this.$message({
                            message: '出错了.',
                            type: 'error'
                        })
                    }

                });
            },
            //关闭抽屉框的回调
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            }
        },
        watch: {
            //监控用户设置的时间,并装载到DTO类.
            time: function (val, oldVal) {
                let datetime = new Date(val);
                this.person.hour = datetime.getHours();
                this.person.minute = datetime.getMinutes();
                this.person.second = datetime.getSeconds();
            },
            //监控用户设置的日期,并装载到DTO类
            date: function (val, oldVal) {
                let datetime = new Date(val);
                this.person.year = datetime.getFullYear();
                this.person.month = datetime.getMonth() + 1;//月份从0开始算起,所在要加1
                this.person.day = datetime.getDate();
            }
        },
    }
</script>

<style>
  .word .el-form-item__label {
    color: #fdf6ec;
    background-color: transparent;
  }

  .word {
    color: #fdf6ec;
    background-color: transparent;
  }

  .put .el-input__inner {

    background-color: transparent;
  }

  .pick .el-input__inner {
    background-color: transparent;
  }

  .eight {
    letter-spacing: 50px;
    text-align: center;
  }

  .god {
    margin: 15px;
    letter-spacing: 0px;
    #margin-right: 1px;
    text-align: left;
    #margin-left: 40px;

  }

  body::-webkit-scrollbar {
    display: none;
  }
</style>
