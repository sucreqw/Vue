<template>
  <el-container>
    <el-header>
      <br>
      <el-form inline style="text-align: center; color: #fdf6ec;" :model="searchFormData">
        <el-form-item label="暗号" class="word">
          <!--<el-lable  inline class="word">暗号</el-lable>-->
          <el-input v-model="searchFormData.query" placeholder="下次可无需出生年月日" class="put" ></el-input>
        </el-form-item>
        <el-form-item label="性别" class="word" >
          <el-radio v-model="gender" label="1" class="word" >男</el-radio>
          <el-radio v-model="gender" label="2" class="word" >女</el-radio>
        </el-form-item>
        <el-form-item label="出生年月日" class="word" >
          <div class="pick">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="出生时间" class="pick" >
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
    </el-header>
    <el-divider content-position="left"></el-divider>
    <el-main>

    </el-main>
  </el-container>

</template>

<script>
    import defaultImg from '../../assets/fate.jpg';
    export default {
        name: "Fate.vue",
        data() {
            return {
                bgImg: {
                    backgroundImage: "url(" + defaultImg + ")"
                },
                searchFormData: {
                    query: '',
                },
                value1: '',
                time: '',
                gender: '1',
            }
        },
        mounted() {
            this.background();
        },
        methods: {
            background() {
                let div = document.querySelector('main');//document.getElementById('main');
                div.style.backgroundImage = this.bgImg.backgroundImage;

            },
            submit() {
                alert('yes')
            }
        }
    }
</script>

<style>
.word .el-form-item__label {
  color:#fdf6ec;
  background-color:transparent;
}
.word {
  color:#fdf6ec;
  background-color:transparent;
}
.put .el-input__inner{

  background-color:transparent;
}
  .pick .el-input__inner{
    background-color:transparent;
}
</style>
