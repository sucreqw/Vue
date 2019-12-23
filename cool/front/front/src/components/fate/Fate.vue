<template>
  <el-container>
    <el-header>
      <br>
      <el-form inline style="text-align: center" :model="searchFormData">
        <el-form-item label="暗号">
          <el-input v-model="searchFormData.query" placeholder="下次可无需出生年月日"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="gender" label="1">男</el-radio>
          <el-radio v-model="gender" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="出生年月日">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="出生时间">
          <el-time-picker
            v-model="time"
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:59'
            }"
            placeholder="选择时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
    </el-main>
  </el-container>

</template>

<script>
    export default {
        name: "Fate.vue",
        data() {
            return {
                bgImg: {
                    backgroundImage: "url()"
                },
                searchFormData: {
                    query: '',
                },
                value1: '',
                time: '',
                gender:'1',
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

<style scoped>

</style>
