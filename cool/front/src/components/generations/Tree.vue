<template>


  <div ref="box" style="position: relative;color: white">
    <div class="talkbubble" v-for="(item,index) in gens" :id="item.id" @click="add($event,index)"
         :style="'margin-left: '+ getLeft(item.id,item.father,index) +'px;margin-top: '+ getTop(item.id) +'px;border: '+ isSelect(item.id)+'px solid '+ gender2color(item.gender) ">
      第{{item.generation}}世<br>姓名：{{item.nickname}}<br>配偶：{{item.wife}}<br>
    </div>
    <div class="dline" v-for="(item,index) in lines"
         :style="'width: '+ item.width +'px; height: '+ item.height +'px; margin-left: ' + item.left + 'px; margin-top:'+ item.top +'px;'">

    </div>
  </div>


</template>

<script>
  import {listPage, get, getAllFather} from '../../service/generationsDO';
  import store from '../../service/store.js';

  export default {
    name: 'Tree',
    data() {
      return {
        top: 0,
        left: 0,
        lastId: '',
        index: 0,
        width: 130,
        height: 70,
        gens: [],//所有信息列表
        lines: [],//所有线位置列表
        getting: false,//记录正在获取状态。
        t: new Map(),//记录top
        l: new Map(),//记录left
        sonSum: new Map(),//记录子女的数量
        lastBrother: new Map(),//记录最后一个兄弟姐妹的位置，用来作清空的索引。
        clickedId: new Map(),//记录点击过的id.
        allFatherId: [],//搜索得到的人的所有上一辈。
        clickIndex: 0,
      }
    },
    methods: {
      add(event, index) {
        this.getPerson(event.currentTarget.id, index, event.currentTarget.offsetLeft, event.currentTarget.offsetTop);
      },
      getPerson(id, index, left, top) {
        // let id = event.currentTarget.id;
        this.lastId = id;//用来记录此人有多少个子女。
        store.commit('setGen', this.gens[index]);
        let lineLength = this.clickedId.get(id.toString());
        if (lineLength) {
          return;
        } else {

          let brother = this.lastBrother.get(id.toString());
          if (brother != null && this.gens.length > brother) {
            //alert('brother has been hit');
            //有同辈被点过了，找到被点过的人是谁。
            let clickedID = this.getFatherId(brother);
            //全部清理掉。
            lineLength = this.clickedId.get(clickedID.toString());
            this.clear(brother, lineLength);
            //clickId里也要清掉，不然下次点不了
            this.clickedId.delete(clickedID.toString());

          }
          this.clickedId.set(id.toString(), this.lines.length);
        }

        /* event.currentTarget.innerText = '1212';*/
        this.left = left;// event.currentTarget.offsetLeft;
        this.top = top;//event.currentTarget.offsetTop;
        this.t.set(id.toString(), this.top);
        this.l.set(id.toString(), this.left);

        //处理index 记录当前点击的人和他的兄弟姐妹人数，用来计算位置。
        this.index = this.gens.length;//index + num;
        this.index = this.index == 0 ? 1 : this.index;


        let lastBrotherId = this.lastBrother.get(id.toString());
        this.getSons(id);

      },
      loadData() {
        this.get('1');
      },
      get(id) {
        get(id, (data) => {
          // this.entity = data;
          if (data) {
            this.gens.push(data);
            this.isNext();
          }

        })
      },
      getSons(id) {
        var searchFormData = {father: id};
        listPage(1, 10, {params: searchFormData}, (data) => {
          //this.gens = _.extend()({}, this.gens, data.records);
          /*if (this.gens.length == 0) {
            this.gens = data.records;
          } else {*/
          if (data.records.length > 0) {
            for (var i = 0; i < data.records.length; i++) {
              this.gens.push(data.records[i]);
            }
            // }
            //记录此人有多少个儿女，用来计算div 放置的位置。
            this.sonSum.set(this.lastId.toString(), data.records.length);
            //被点击的div下面画一条线
            let line = {id: id, left: this.left + 65, top: this.top + 74, width: 3, height: 14};
            this.lines.push(line);
            this.isNext();
          }

        })
      },
      getTop(id) {
        var top = this.t.get(id.toString());
        if (top == null) {
          var ret = this.top + 100;
          this.t.set(id.toString(), ret);
          return ret;
        } else {
          return top;
        }

      },
      getLeft(id, fatherId, index) {
        //起始位置
        if (index == 0) {
          this.clickedId.set(id.toString(), this.lines.length);
          return 2000;
        }
        let ret = 0;
        let left = this.l.get(id.toString());
        let start = 0;
        let dis = 15;
        if (left == null) {
          //子女的数量
          let num = this.sonSum.get(fatherId.toString());

          //起始位置减 （(子女数量-1)*（宽度除2））。dis为div之间的距离
          start = this.left - ((num - 1) * ((this.width + dis) / 2));
          //得出来的位置，加上子女的index*宽度，以根据index分别得出每个子女的位置。this.index为点击div的index.
          ret = start + ((index - this.index) * (this.width + dis));
          //装入记录
          this.l.set(id.toString(), ret);
          this.lastBrother.set(id.toString(), this.index + num);//记录此人的最后一个兄弟姐妹所在的索引，用来清空。
          //每个新的div头上画一条线
          let line = {id: id, left: ret + 65, top: this.top + 85, width: 3, height: 15};
          this.lines.push(line);
          //最后一个div的时候，画横线,全部连接在一起
          if (index == this.gens.length - 1) {
            line = {id: id, left: start + 65, top: this.top + 85, width: ret - start, height: 3};
            this.lines.push(line);
          }
        } else {
          ret = left;
        }


        return ret;
      },
      //窗体滚到最底
      scrollToBottom(top, left) {
        this.$nextTick(function () {
          let div = document.getElementById('mainTree');//document.querySelector('main');//this.$el.querySelector("div");

          div.scrollTop = top == 0 ? div.scrollHeight : top;
          div.scrollLeft = left == 0 ? div.scrollWidth : left;
        })
      },
      //清理掉index后面的数据
      clear(gensIndex, lineIndex) {

        for (let i = gensIndex; i < this.gens.length; i++) {
          let temp = this.gens[i].id;
          this.l.delete(temp.toString());
          this.t.delete(temp.toString());
          this.clickedId.delete(temp.toString());
        }
        this.gens.splice(gensIndex, this.gens.length - gensIndex);
        this.lines.splice(lineIndex, this.lines.length - lineIndex);
      },
      //取指定人的父亲id,用来清空
      getFatherId(index) {
        let id = this.gens[index].father;
        return id;
      },
      //根据性别返回颜色
      gender2color(gender) {
        if (gender.toString() == "1") {
          return '#fdfff8;';
        } else {
          return 'red;';
        }
      },
      //如果被点击了，加粗边框
      isSelect(id) {
        if (id.toString() == this.lastId) {
          return '4';
        } else {
          return '2';
        }
      },
      //搜索到的结果 一层层的展开显示
      searchSomeone(id) {
        getAllFather(id, (data) => {
          //清完所有
          this.gens = [];
          this.lines = [];
          this.l = new Map();
          this.t = new Map();
          this.clickedId = new Map();
          this.allFatherId = data;
          this.clickIndex = this.allFatherId.length - 1;
          this.getting = true;
          this.loadData();
        })
      },
      //用id来取数组所在的index.
      getIndexByid(id) {
        if (this.gens.length == 0) {
          return 0;
        }
        for (var i = 0; this.gens.length; i++) {
          if (id == this.gens[i].id) {
            return i;
          }
          return this.gens.length;
        }
      },
      //取要点击的div的left top
      getLeftById(id) {
        this.$nextTick(function () {
          let div = document.getElementById(id.toString());
          this.getPerson(id, this.getIndexByid(id), div.offsetLeft, div.offsetTop);
        })
      },
      //循环点击 下一个
      clickNextPerson() {
        if (this.clickIndex < 0) {
          this.getting = false;
          return;
        }
        let fatherId = this.allFatherId[this.clickIndex];
        this.getLeftById(fatherId);

      },
      //搜索出来的点击。
      isNext() {
        if (this.getting) {
          this.clickIndex = this.clickIndex - 1;
          this.clickNextPerson();
        }
      },
    },
    mounted() {
      this.loadData();
      this.gens = [];
      this.lines = [];
      //窗体滚到底
      this.scrollToBottom(0, 0);

    },
    updated() {
      //窗体滚到底
      this.scrollToBottom(this.top, this.left == 0 ? 0 : this.left - 65);

    },
  }
</script>

<style scoped>
  .talkbubble {

    width: 130px;
    height: 70px;
    border: 2px solid white;
    /*background: white;*/
    position: absolute;
    /*position: relative;*/
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    font-size: 14px;
    /*display:inline;*/
  }


  .dline {
    background: #fdfff8;
    position: absolute;
    font-size: 1px;
    line-height: 1%;
  }


</style>
