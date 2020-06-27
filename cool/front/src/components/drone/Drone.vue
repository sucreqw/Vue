<template>
  <PageWapper style="color:white;">
    <meta name="referrer" content="never">
    <div v-if="status==0" class="infinite-list-wrapper" v-infinite-scroll="load">
      <el-container v-for="(item,index) in tableData" style="margin-left: 10px;margin-right: 10px;">
        <el-aside style="width: 5%"></el-aside>
        <el-col :xs="25" :sm="25" :md="30" :lg="20" :xl="20">
          <el-main>
            <div style="margin-bottom: 5px">{{item.content}}</div>
            <!--//如果是视频-->
            <div v-if="item.type==1">
              <video :src="item.urls" style="width: 100%; height: 100%; object-fit: fill" controls="controls" preload>
                your browser does not support the video tag
              </video>
            </div>
            <!--图片-->
            <div v-if="item.type==0">
              <el-image :src="item.urls" lazy></el-image>
            </div>

            <!--全景图-->
            <div v-if="item.type==2">
              <iframe name="Tmain" id="Tmain" style="width: 100%; height: 100%; object-fit: fill"></iframe>
              <a :href="item.urls" target="Tmain">打开全景图</a><em>---</em><a :href="item.urls" target="_blank">全屏打开</a>
            </div>
          </el-main>
          <el-divider></el-divider>
          <!--结束展示区-->
          <el-footer>
            <div>
              <span @click="comment(item.id,index)"><em class="W_face"></em><em>评论</em></span>

              <el-divider direction="vertical"></el-divider>
              <span @click="zan(item.id,index)"><em class="W_face">ñ</em><em>{{item.likecount}}</em></span>
            </div>

          </el-footer>
        </el-col>
      </el-container>
      <div style="text-align: center">
        <p v-if="nomore!=true">加载中...</p>
        <p v-if="nomore">没有更多了</p>
      </div>

    </div>
    <div v-if="status==1">

      <br>
      <el-button type="primary" @click="cancel()" style="margin-left: 10px">返回无人机区</el-button>
      <el-divider></el-divider>
      <el-container style="margin-left: 10px;margin-right: 10px;">
        <el-aside style="width: 10%"></el-aside>
        <el-col :xs="25" :sm="25" :md="30" :lg="30" :xl="30">
          <el-main>
            <div style="margin-bottom: 5px;">{{droneData.content}}</div>
            <!--//如果是视频-->
            <div v-if="droneData.type==1">
              <video :src="droneData.urls" style="width: 100%; height: 100%; object-fit: fill" controls="controls"
                     preload>
                your browser does not support the video tag
              </video>
            </div>
            <!--图片-->
            <div v-if="droneData.type==0">
              <el-image :src=" droneData.urls" lazy></el-image>
            </div>
            <!--全景图-->
            <div v-if="droneData.type==2">
              <iframe name="Tmain1" id="Tmain1" style="width: 100%; height: 100%; object-fit: fill"></iframe>
              <a :href="droneData.urls" target="Tmain1">打开全景图</a><em>---</em><a :href="droneData.urls" target="_blank">全屏打开</a>
            </div>
          </el-main>
        </el-col>
      </el-container>
      <!--结束展示区-->
      <!--//评论内容-->
      <el-form ref="" :model="commentDrone" label-width="10px" style="margin-left: 15px;margin-right: 15px">
        <el-form-item>
          <el-input type="textarea" v-model="commentDrone.content" rows="5"></el-input>
        </el-form-item>
        <el-form-item>
          <el-popover
            placement="right"
            width=""
            trigger="click">
            <!--todo-->
            <div style="margin-left: 10px;margin-right: 10px;">
              <img v-for="(item) in faceFiles" :src="'/static/face/'+ item " @click="commentShowFace(item)"
                   style="width: 30px;height: 30px">
            </div>
            <el-button slot="reference"><em class="W_face">o</em><em>表情 </em></el-button>
          </el-popover>
          <!--<em class="W_face" @click="showFace()">o</em><em @click="showFace()">表情 </em>-->
          <el-divider direction="vertical"></el-divider>
          <el-button type="primary" @click="postComment()">发布</el-button>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <!--评论列表-->
      <div style="text-align: center" class="infinite-list-wrapper" v-infinite-scroll="loadC()">
        <el-container v-for="(item,index) in droneComment">
          <el-aside style="margin-left: 10%;width: 50px"><img :src="item.avater"
                                                              style="width:50px;border-radius: 50%;height: 50px">
          </el-aside>
          <el-container>
            <el-header style="text-align: left;"><span style="font-weight: bold;">{{item.nickname}}</span> <br>
              <small class="date" style="color: #999">{{item.postday}}</small>
            </el-header>
            <el-col :xs="25" :sm="25" :md="30" :lg="20" :xl="20">
              <el-main style="text-align: left;">
                <div style="margin-bottom: 5px" :id="'comment_'+ item.id">{{comment2face(item.content,item.id)}}
                </div>
              </el-main>
            </el-col>
            <el-divider></el-divider>
          </el-container>
        </el-container>
        <p v-if="commentNomore!=true">加载中...</p>
        <p v-if="commentNomore">没有更多了</p>
        <br>
      </div>
      <!--结束评论列表-->
    </div>
  </PageWapper>
</template>

<script>
  import defaultImg from '../../assets/fate.jpg';
  import {listPage, like, get} from "../../service/droneDO";
  import {commentCreate, commentListPage} from "../../service/dronecommentDO";

  export default {
    name: "Drone",
    data() {
      return {
        bgImg: {
          backgroundImage: "url(" + defaultImg + ")"
        },
        status: 0,
        droneId: '',
        pageInfo: {
          page: 1,
          pageSize: 10,
          total: 0
        },
        commentPageInfo: {
          page: 1,
          pageSize: 10,
          total: 0
        },
        searchFormData: {
          query: '',
          id: '',
        },
        commentDrone: {
          id: '',
          content: '',
          mid: '',//要评论的作品id
        },
        tableData: [],
        loading: false,
        nomore: false,
        commentLoading: false,
        commentNomore: false,
        droneData: [],
        faceFiles: [],
        droneComment: [],
      }
    },
    mounted() {
      this.background();
      this.faceFiles = [];
      let id = this.$route.query.id;
      if (id != null) {
        this.droneId = id;
        //this.status = 1;
        this.searchFormData.id=id;
        this.getDrone(id);
      } else {
        this.loadData();
      }

      this.getFiles();

    },
    methods: {
      loadData() {
        listPage(this.pageInfo.page, this.pageInfo.pageSize, {params: this.searchFormData}, (data) => {
          if (data.records.length > 0) {
            for (let i = 0; i < data.records.length; i++) {
              this.tableData.push(data.records[i]);
            }
            this.pageInfo.total = data.total
            this.loading = true;
          } else {
            this.pageInfo.page = '1';
            this.nomore = true;
          }
        })
      },
      cancel() {
        this.$router.push({path:'/drone'});
        this.status = 0;
        if (this.tableData.length == 0) {
          this.loadData();
        }
      },
      load() {
        if (this.loading) {
          this.loading = false;
          this.pageInfo.page++;
          this.loadData();
        }
      },
      zan(id, index) {
        let likecount = this.tableData[index].likecount;
        this.tableData[index].likecount = parseInt(likecount) + 1;
        like(id, (data) => {

        })
      },
      comment(id, index) {
        this.$router.push({path:'/drone?id='+id});
        this.droneData = this.tableData[index];
        this.commentDrone.mid = id;
        this.status = 1;
        this.searchFormData.id = id;
        this.droneComment = [];
        this.loadComment();
      },
      // 获取全部要预加载的文件
      getFiles() {
        const files = require.context('../../assets/face', false, /.(png|jpg|jpeg|gif|bmp|webp)$/).keys();
        for (let item of files) {
          this.faceFiles.push(item.substring(2));
        }
      },
      comment2face(content, id) {
        this.$nextTick(function () {
          let face = this.makeFace(content);
          let div = document.getElementById('comment_' + id.toString());
          div.innerHTML = face;
        });
      },
      //处理文字中的表情
      makeFace(strs) {
        let ret;
        let str = strs;

        if (str.indexOf('[') == -1 || !str.indexOf(']') == -1) {
          return strs;
        }
        try {
          while ((ret = str.match(/\[([\u4e00-\u9fa5]*\w*)\]/)[1]) != null) {
            str = str.replace('[' + ret + ']', '<img src=\"' + '/static/face/' + ret + '.png' + '\" style=\"width:20px;height:20px\">');
          }
        } catch (err) {
        } finally {
          return str;
        }
      },
      commentShowFace(name) {
        this.commentDrone.content += '[' + name.replace('.png', '') + ']';
      },
      loadComment() {
        commentListPage(this.commentPageInfo.page, this.commentPageInfo.pageSize, {params: this.searchFormData}, (data) => {
          if (data.records.length > 0) {
            for (let i = 0; i < data.records.length; i++) {
              this.droneComment.push(data.records[i]);
            }
            this.pageInfo.total = data.total
            this.commentLoading = true;
          } else {
            this.commentPageInfo.page = '1';
            this.commentNomore = true;
          }
        })
      },
      postComment() {
        if(this.commentDrone.content==''){return;}
        commentCreate(this.commentDrone, (data, error) => {
          if (error) {
            this.$message({
              message: error.message,
              type: 'error'
            })
          } else {
            this.droneComment = [];
            this.commentPageInfo.page = '1';
            this.loadComment();
            this.$message({
              message: '评论成功',
              type: 'success'
            })
          }
        });
      },
      loadC() {
        //this.FormData.content+=1;
        if (this.commentLoading) {
          this.commentLoading = false;
          this.commentPageInfo.page++;
          this.loadComment();
        }
      },
      getDrone(id){
        get(id, (data) => {
          this.droneData = data;
          this.status=1;
          this.loadComment();
        })
      },
      background() {
        let div = document.querySelector('main');//document.getElementById('main');
        div.style.backgroundImage = this.bgImg.backgroundImage;;
      },
    }
  }
</script>

<style scoped>

  .W_face {
    font-family: weifont;
    color: rgb(218, 119, 37);
    font-size: 15px;
    letter-spacing: 3.8px;
  }

  @font-face {
    font-family: myfont;
    src: url("../../assets/font/iwawa.ttf") ;
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: weifont;
    src: url("../../assets/font/wbficon.woff") ;
    font-weight: normal;
    font-style: normal;
  }
</style>
