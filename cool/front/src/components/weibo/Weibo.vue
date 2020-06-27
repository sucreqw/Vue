<template>
  <PageWapper style="color: white">
    <div v-if="status==0">
      <el-row style="margin-left: 15px;margin-right: 15px">
        <el-col :xs="25" :sm="25" :md="30" :lg="30" :xl="30">
          <p class="ficon_swtxt">
            <em class="spac1">有什么新</em><em class="spac2">鲜</em><em
            class="spac3">事想告诉大家</em><em class="spac4">?</em>
          </p>
          <el-form ref="" :model="FormData" label-width="10px">
            <el-form-item>
              <el-input type="textarea" v-model="FormData.content" rows="5"></el-input>
            </el-form-item>
            <el-form-item inline>
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
            <el-form-item>
              <el-popover
                placement="right"
                width=""
                trigger="click">
                <!--todo-->
                <div style="margin-left: 10px;margin-right: 10px;">
                  <img v-for="(item) in faceFiles" :src="'/static/face/'+ item " @click="showFace(item)"
                       style="width: 30px;height: 30px">
                </div>
                <el-button slot="reference"><em class="W_face">o</em><em>表情 </em></el-button>
              </el-popover>
              <!--<em class="W_face" @click="showFace()">o</em><em @click="showFace()">表情 </em>-->
              <el-divider direction="vertical"></el-divider>
              <el-button type="primary" @click="add()">发布</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <!--结束发微博区-->
      <div style="text-align: center" class="infinite-list-wrapper" v-infinite-scroll="load">
        <el-container v-for="(item,index) in tableData">
          <el-aside style="margin-left: 10%;width: 50px"><img :src="item.avater"
                                                              style="width:50px;border-radius: 50%;height: 50px">
          </el-aside>
          <el-container>
            <el-header style="text-align: left; "><span style="font-weight: bold;">{{item.nickname}}</span> <br>
              <small class="date" style="color: #999">{{item.postday}}</small>
            </el-header>
            <el-col :xs="25" :sm="25" :md="30" :lg="20" :xl="20">
              <el-main style="text-align: left;">
                <div style="margin-bottom: 5px" :id="'content_'+ item.id">{{content2face(item.content,item.id)}}</div>
                <div v-if="item.picurl!=''">
                  <el-image :src=" item.picurl" lazy></el-image>
                </div>
              </el-main>
            </el-col>
            <el-divider></el-divider>
            <!--结束微博区-->
            <el-footer style="text-align: left;">
              <div>
                <span @click="comment(item.id,index)"><em class="W_face"></em><em>评论</em></span>

                <el-divider direction="vertical"></el-divider>
                <span @click="zan(item.id,index)"><em class="W_face">ñ</em><em>{{item.mid}}</em></span>
              </div>
            </el-footer>
          </el-container>
        </el-container>
        <p v-if="nomore!=true"><el-button @click="loadData()">加载中...(或手动点击加载)</el-button></p>
        <p v-if="nomore">没有更多了</p>
        <el-divider></el-divider>
        <br>
      </div>
    </div>
    <div v-if="status==1">
      <el-container>
        <el-header>
          <br>
          <el-button type="primary" @click="cancel()">返回</el-button>
        </el-header>
        <el-main>
          <!--主微博内容-->
          <div style="text-align: center">
            <el-container>
              <el-aside style="margin-left: 10%;width: 50px"><img :src="commentData.avater"
                                                                  style="width:50px;border-radius: 50%;height: 50px">
              </el-aside>
              <el-container>
                <el-header style="text-align: left; "><span style="font-weight: bold;">{{commentData.nickname}}</span>
                  <br>
                  <small class="date" style="color: #999">{{commentData.postday}}</small>
                </el-header>
                <el-col :xs="25" :sm="25" :md="30" :lg="20" :xl="20">
                  <el-main style="text-align: left;">
                    <div style="margin-bottom: 5px" :id="'comment_'+ commentData.id">
                      {{comment2face(commentData.content,commentData.id)}}
                    </div>
                    <div v-if="commentData.picurl!=''">
                      <el-image :src=" commentData.picurl" lazy></el-image>
                    </div>
                  </el-main>
                </el-col>
              </el-container>
            </el-container>
          </div>
          <el-divider></el-divider>
          <!--//评论内容-->
          <el-form ref="" :model="CommentFormData" label-width="10px">
            <el-form-item>
              <el-input type="textarea" v-model="CommentFormData.content" rows="5"></el-input>
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
            <el-container v-for="(item,index) in weiboComment">
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
            <p v-if="commentNomore!=true"><el-button @click="loadComment()">加载中...(或手动点击加载)</el-button></p>
            <p v-if="commentNomore">没有更多了</p>
            <el-divider></el-divider>
            <br>
          </div>
          <!--结束评论列表-->
        </el-main>
      </el-container>
    </div>
  </PageWapper>
</template>

<script>
  import defaultImg from '../../assets/fate.jpg';
  import {create, get, like, listPage} from "../../service/weiboDO";
  import {commentCreate, commentListPage} from "../../service/commentsDO";

  export default {
    name: "Weibo",
    data() {
      return {
        bgImg: {
          backgroundImage: "url(" + defaultImg + ")"
        },
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
          wid: '',
        },
        FormData: {
          id: '',
          content: '',
          mid: 0,
          picurl: '',
          postday: '',
        },
        CommentFormData: {
          id: '',
          content: '',
          wid: '',
          nickname: '',
          avater: '',
        },
        fileList: [],
        tableData: [],
        faceFiles: [],
        loading: false,
        nomore: false,
        commentLoading: false,
        commentNomore: false,
        status: 0,
        commentData: [],
        weiboComment: [],

      }
    },
    mounted() {
      this.faceFiles = [];
      this.tableData = [];
      this.background();
      this.loading = false;
      this.nomore = false;
      let id = this.$route.query.id;
      if (id != null) {
        this.searchFormData.wid = id;
        this.getComment(id);
      } else {
        this.loadData();
      }
      this.getFiles();
      this.status = 0;
    },
    methods: {
      background() {
        let div = document.querySelector('main');//document.getElementById('main');
        div.style.backgroundImage = this.bgImg.backgroundImage;
      },
      handleRemove(file, fileList) {
        this.fileList = {};
        this.FormData.picurl = '';
      },
      handleSuccess(response, file, fileList) {
        this.fileList = response.data;
        this.FormData.picurl = this.fileList.url;
      },
      add() {
        if (this.FormData.content == '') {
          return;
        }
        create(this.FormData, (data, error) => {
          if (error) {
            this.$message({
              message: error.message,
              type: 'error'
            })
          } else {
            this.tableData = [];
            this.pageInfo.page = '1';
            this.loadData();
            this.$message({
              message: '发布成功',
              type: 'success'
            });

          }
        });
      },
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
        });
      },
      showFace(name) {
        this.FormData.content += '[' + name.replace('.png', '') + ']';
      },
      commentShowFace(name) {
        this.CommentFormData.content += '[' + name.replace('.png', '') + ']';
      },
      // 获取全部要预加载的文件
      getFiles() {
        const files = require.context('../../assets/face', false, /.(png|jpg|jpeg|gif|bmp|webp)$/).keys();
        for (let item of files) {
          this.faceFiles.push(item.substring(2));
        }
      },
      content2face(content, id) {
        this.$nextTick(function () {
          let face = this.makeFace(content);
          let div = document.getElementById('content_' + id.toString());
          div.innerHTML = face;
        });
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
      load() {
        //this.FormData.content+=1;
        if (this.loading) {
          this.loading = false;
          this.pageInfo.page++;
          this.loadData();
        }
      },
      loadC() {
        //this.FormData.content+=1;
        if (this.commentLoading) {
          this.commentLoading = false;
          this.commentPageInfo.page++;
          this.loadComment();
        }

      },
      zan(id, index) {
        let mid = this.tableData[index].mid;
        this.tableData[index].mid = parseInt(mid) + 1;
        like(id, (data) => {

        })
      },
      comment(id, index) {
        this.$router.push({path: '/weibo?id=' + id});
        this.commentData = this.tableData[index];
        this.CommentFormData.wid = this.commentData.id;
        this.searchFormData.wid = this.CommentFormData.wid;
        this.status = 1;
        this.weiboComment = [];
        this.loadComment()
      },
      cancel() {
        this.$router.push({path: '/weibo'});
        this.status = 0;
        this.commentData = [];
        if (this.tableData.length == 0) {
          this.loadData();
        }
      },
      loadComment() {
        commentListPage(this.commentPageInfo.page, this.commentPageInfo.pageSize, {params: this.searchFormData}, (data) => {
          if (data.records.length > 0) {
            for (let i = 0; i < data.records.length; i++) {
              this.weiboComment.push(data.records[i]);
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
        if (this.CommentFormData.content == '') {
          return;
        }
        commentCreate(this.CommentFormData, (data, error) => {
          if (error) {
            this.$message({
              message: error.message,
              type: 'error'
            })
          } else {
            this.weiboComment = [];
            this.commentPageInfo.page = '1';
            this.loadComment();
            this.$message({
              message: '评论成功',
              type: 'success'
            })
          }
        });
      },
      getComment(id) {
        get(id, (data) => {
          this.commentData = data;
          this.status = 1;
          this.loadComment();
        })
      }
    }
  }
</script>

<style scoped>
  .ficon_swtxt {

    font-family: myfont;
    color: rgb(27, 127, 182);
    display: inline-block;
    vertical-align: top;
    height: 21px;
    letter-spacing: 3.8px;
    font-size: 18px;
    height: 20px;
    line-height: 20px;
  }

  .spac4 {
    font-size: 28px;
    padding: 15px 0px 0px 0px;
  }

  .spac2 {

    font: normal 16px Tahoma;
  }

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
