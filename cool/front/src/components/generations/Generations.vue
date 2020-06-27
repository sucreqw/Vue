<template>
  <PageWapper style="color: white">
    <el-container v-if="status==0">

      <el-main style="border-bottom: 1px solid #ccc;color: white" ref="main" id="mainTree">
        <Tree ref="tree"></Tree>
      </el-main>
      <br>
      <br>
      <el-footer>
        <el-row>
          <el-col :xs="25" :sm="25" :md="30" :lg="30" :xl="30">

            <el-form ref="" :model="FormData" label-width="80px">
              <el-form-item label="父亲姓名">
                <el-button>{{nickNow}}</el-button>
                <el-button type="primary" @click="showDetail">查看 {{nickNow}} 详细信息</el-button>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="FormData.nickname"></el-input>
              </el-form-item>
              <el-form-item label="配偶姓名">
                <el-input v-model="FormData.wife"></el-input>
              </el-form-item>
              <el-form-item label="出生年月日">
                <el-input v-model="FormData.birthday"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <!--<el-input v-model="FormData.gender"></el-input>-->
                <el-select v-model="FormData.gender">
                  <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-upload
                  class="upload-demo"
                  action="/cool/api/common/upload"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :on-success="handleSuccess"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传图片</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="详情" prop="desc">
                <el-input type="textarea" v-model="FormData.details"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="add()">提交</el-button>
                <el-button @click="resetForm()">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-divider></el-divider>


        <el-form :model="searchFormData" inline label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="searchFormData.query"></el-input>
          </el-form-item>
          <el-button type="primary" @click="loadData()">搜索</el-button>
        </el-form>
        <el-divider></el-divider>
        <el-table
          :data="tableData"
          border
          style="width: 100%">

          <el-table-column
            prop="nickname"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            prop="wife"
            label="配偶"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="searchSomeone(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <br>
        <br>

      </el-footer>
    </el-container>
    <el-container v-if="status==1">
      <PageOptionsWapper>
        <el-button type="primary" @click="cancel()">返回</el-button>
      </PageOptionsWapper>
      <PageContainerWapper>
        <el-row>
          <el-col :span="24">
            <el-form ref="" :model="detailData" label-width="100px">
              <el-form-item label="代数">第 {{detailData.generation}} 世
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="detailData.nickname"></el-input>
              </el-form-item>
              <el-form-item label="配偶">
                <el-input v-model="detailData.wife"></el-input>
              </el-form-item>
              <el-form-item label="出生年月日">
                <el-input v-model="detailData.birthday"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <!--<el-input v-model="FormData.gender"></el-input>-->
                <el-select v-model="detailData.gender">
                  <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="详情">
                <el-input type="textarea" v-model="detailData.details"></el-input>
              </el-form-item>

              <el-form-item label="图片">
                <el-image :src="detailData.avater"></el-image>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </PageContainerWapper>
    </el-container>
  </PageWapper>
</template>

<script>
  import defaultImg from '../../assets/fate.jpg';
  import Tree from "./Tree";
  import store from '../../service/store.js';
  import {create, listPage} from "../../service/generationsDO";

  export default {
    name: "Generations",
    components: {Tree},
    data() {
      return {
        bgImg: {
          backgroundImage: "url(" + defaultImg + ")",
        },
        searchFormData: {
          query: '',
        },
        FormData: {
          nickname: '',
          wife: '',
          gender: 1,
          father: '',
          sons: '',
          details: '',
          generation: '',
          birthday: '',
          avater: '',

        },
        detailData: {},
        value: 0,
        options: [{
          value: 0,
          label: '女'
        }, {
          value: 1,
          label: '男'
        }
        ],
        nickNow: '',
        fileList: {},
        tableData: [],
        status: 0,
      }
    },
    mounted() {
      this.FormData.nickname = '';
      this.nickNow = '';
      this.fileList = {};
      this.background();
      //this.router.push('/tree');
    },
    methods: {

      resetForm(formName) {
        this.FormData.nickname = '';
        this.FormData.wife = '';
        this.FormData.details = '';
        this.FormData.avater = '';
      },
      add() {
        create(this.FormData, (data, error) => {
          if (error) {
            this.$message({
              message: error.message,
              type: 'error'
            })
          } else {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          }
        });
      },
      handleRemove(file, fileList) {
        this.fileList = {};
        this.FormData.avater = '';
      },
      handleSuccess(response, file, fileList) {
        this.fileList = response.data;
        this.FormData.avater = this.fileList.url;
      },
      loadData() {
        listPage(1, 10, {params: this.searchFormData}, (data) => {
          this.tableData = data.records;
        })
      },
      showDetail() {
        this.status = 1;
      },
      cancel() {
        this.status = 0;
      },
      background() {
        let div = document.querySelector('main');//document.getElementById('main');
        div.style.backgroundImage = this.bgImg.backgroundImage;
      },
      searchSomeone(id) {
        this.$refs.tree.searchSomeone(id);
      },
    },
    updated() {
    },
    watch: {
      nick() {
        this.FormData.father = store.state.genInfo.id;
        this.nickNow = store.state.genInfo.nickname;
        this.FormData.generation = store.state.genInfo.generation;
        this.detailData = store.state.genInfo;
      },

    },
    computed: {
      nick() {
        return store.state.genInfo;
      }
    }
  }
</script>

<style scoped>

</style>
