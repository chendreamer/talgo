<template>
  <div>
    <el-container class="container">
      <el-header>
        <Header></Header>
      </el-header>
      <div>
        <h2 id="bookTitle">{{ bookTitle }}</h2>
      </div>
      <!-- <pre
        id="textCalculation"
        v-show="false"
        style="word-wrap: break-word; white-space: pre-wrap;line-height:28px"
      ><p></p></pre>-->
      <div id="textContainer" class="df">
        <div class="page-web tc">
          <img
            class="pagination-btn-web read-last-web hover"
            src="../assets/images/left-arrow.png"
            @click="lastPage"
          />
        </div>
        <div class="text-content">
          <div v-if="loadingState" class="loading-content">
            <img src="../assets/images/loading.gif" alt />
          </div>
          <div v-else>
            <div id="textContent" :style="textContentTop">
              <p id="heightCalculation" v-if="calculating"></p>
              <p
                v-else
                v-for="(item, index) in currentPageContentArray"
                :key="index"
              >
                {{ item.text }}
              </p>
            </div>
          </div>
        </div>
        <div class="page-web tc">
          <img
            class="pagination-btn-web read-next-web hover"
            src="../assets/images/right-arrow.png"
            @click="nextPage"
          />
        </div>
      </div>

      <h2 class="tc read-pagination" style="color: white; margin-top: 0.5rem">
        <img
          class="pagination-btn-mobile read-last hover"
          src="../assets/images/left-arrow.png"
          @click="lastPage"
        />
        {{ currentPage }}/{{ totalPage }}
        <img
          class="pagination-btn-mobile read-next hover"
          src="../assets/images/right-arrow.png"
          @click="nextPage"
        />
      </h2>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import i18n from "@/i18n";
import Header from "@/components/Header.vue";
import _ from "lodash";
export default {
  components: { Header },
  name: "read",
  props: ["summaryID"],
  data: function () {
    return {
      url: this.$store.state.media_server + "/book/" + this.summaryID,
      bookTitle: "",
      bookContent: "",
      contentArray: [],
      currentPageContentArray: [],
      contentHeightArray: [],
      textCalculation: "",
      currentPage: 1,
      totalPage: 1,
      init_startIndex: 1, //当前阅读第一段的下标，当前页应包含的当前阅读第一段
      calculating: true,
      textContentTop: { top: 0 },
      loadingState: true,
      screen_type: this.getType(document.documentElement.clientWidth), //屏幕宽度
    };
  },
  mounted: function () {
    let that = this;
    //window.addEventListener("resize", that.resizefun(),false);
    window.onresize = function () {
      //console.log(document.documentElement.clientWidth);
      var _type = that.getType(document.documentElement.clientWidth);
      if (_type !== that.screen_type) {
        that.screen_type = _type;
        console.log(that.screen_type);
        that.loadingState = true;
        // that.init_startIndex =
        //   that.contentHeightArray[that.currentPageContentArray[0]["index"]];
        that.produceContentArray();
      }
    };
    this.getBookList();
  },
  methods: {
    getBookList: function () {
      let that = this;
      axios
        .get(that.url, {
          params: {
            id: that.summaryID,
            lang: i18n.locale,
          },
        })
        .then(function (response) {
          console.log(response);
          that.bookTitle = response["data"]["data"][0]["title"];
          that.getBookDetile(
            that.$store.state.media_server +
              response["data"]["data"][0]["filepath"]
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getBookDetile: function (bookURL) {
      let that = this;
      axios
        .get(bookURL, {
          responseType: "blob",
          transformResponse: [
            function (data) {
              //console.log("-------------------1");
              console.log(data);
              var reader = new FileReader();
              reader.readAsText(data, "UTF-8");
              reader.onload = function () {
                that.bookContent = reader.result;
                that.contentArray = that.bookContent.split("\r");
                that.produceContentArray();
              };
              return data;
            },
          ],
          // headers: {
          //   'Content-Type': 'application/x-www-form-urlencoded'
          // }
        })
        .then(function (response) {
          //console.log("-------------------2");
          console.log(response);
          //that.bookContent = response['data']['data'];
        })
        .catch(function (error) {
          console.log(error);
          that.$message({
            message: i18n.tc("message.networkError"),
            type: "info",
            center: true,
            // iconClass: "",
            duration: 1800,
          });
        });
    },
    produceContentArray: function () {
      let that = this;
      that.calculating = true;
      that.loadingState = false;
      that.contentHeightArray.length = 0;

      that.$nextTick(function () {
        var textContainer = document.getElementById("heightCalculation");
        //计算每段行数,固定每页17行
        that.contentArray.forEach((element, index) => {
          textContainer.innerHTML = element;
          var _tempLineNum = Math.round(textContainer.clientHeight / 28); //每行高28px  ,防止设备差异导致不是整数
          if (index == 0) {
            that.contentHeightArray.push(_tempLineNum);
          } else {
            that.contentHeightArray.push(
              _tempLineNum + that.contentHeightArray[index - 1]
            );
          }
          that.totalPage = Math.ceil(that.contentHeightArray[index] / 17);
        });
        //console.log(that.contentHeightArray);
        that.$nextTick(function () {
          // console.log("**********************");
          // console.log(that.init_startIndex);
          if (that.init_startIndex == 1) {
            that.currentPage = 1;
          } else {
            that.currentPage = Math.ceil(
              that.contentHeightArray[that.init_startIndex] / 17
            );
          }

          that.produceCurrentContentArray();
        });
      });
    },
    produceCurrentContentArray: function () {
      let that = this;
      //计算当前页所需要的段落
      that.currentPageContentArray.length = 0;
      that.textContentTop = { top: "0" };

      //console.log(that.currentPage);
      //document.getElementById("textContent").style.top = "0";
      that.$nextTick(function () {
        var startLine = (that.currentPage - 1) * 17 + 1;
        var endLine = that.currentPage * 17;
        // console.log(startLine);
        // console.log(endLine);
        for (let i = 0; i < that.contentHeightArray.length; i++) {
          if (that.contentHeightArray[i] >= startLine) {
            that.currentPageContentArray.push({
              index: i,
              text: that.contentArray[i],
            });
          }
          if (that.contentHeightArray[i] >= endLine) {
            break;
          }
        }
        // console.log(that.currentPageContentArray);
        // console.log(that.contentHeightArray);
        //有超出，调整top值
        var difference = 0;
        if (that.currentPageContentArray[0]["index"] != 0) {
          difference =
            startLine -
            that.contentHeightArray[
              that.currentPageContentArray[0]["index"] - 1
            ] -
            1;
          //console.log(difference);
          that.textContentTop = { top: -28 * difference + "px" };
        }
        that.calculating = false;
      });
    },
    nextPage: _.throttle(function () {
      var that = this;
      if (that.currentPage < that.totalPage) {
        that.init_startIndex = that.currentPageContentArray.pop().index;
        that.currentPage++;
        that.produceCurrentContentArray();
      }
    }, 500),
    lastPage: _.throttle(function () {
      var that = this;
      if (that.currentPage > 1) {
        that.init_startIndex = that.currentPageContentArray.pop().index;
        that.currentPage--;
        that.produceCurrentContentArray();
      }
    }, 500),
    getType: function (width) {
      //依据屏幕宽度划分出不同类型
      if (width < 320) {
        return "A";
      } else if (width < 360) {
        return "B";
      } else if (width < 420) {
        return "C";
      } else if (width < 520) {
        return "D";
      } else if (width < 640) {
        return "E";
      } else if (width < 768) {
        return "F";
      } else if (width < 992) {
        return "G";
      } else if (width < 1200) {
        return "H";
      } else {
        return "I";
      }
    },
    // resizefun: function () {

    // },
  },

  beforeRouteLeave(to, from, next) {
    //let that = this;
    // window.removeEventListener("resize", that.resizefun(),false);
    //window.removeEventListener('resize');
    next();
  },
};
</script>

<style lang="scss" scoped>

#textContent p {
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

@media (max-width: 320px) {
  #bookTitle {
    color: #f8ab08;
    font-size: 1.4rem;
    padding-left: 5%;
  }

  #textContainer {
    width: 100%;
    margin: 0 auto;
    padding-top: 6px;
    padding-bottom: 6px;
    > .text-content {
      $lineHeight: 28px;
      $mt: 6px;
      border-bottom: 2px solid #a02d88;
      border-top: 2px solid #a02d88;
      width: 100%;
      height: 17 * $lineHeight + $mt * 2;
      flex: 1;
      > div {
        position: relative;
        height: 17 * $lineHeight;
        overflow: hidden;
        margin-top: $mt;
        #textContent {
          position: relative;
          word-wrap: break-word;
          line-height: $lineHeight;
          //height: 100%;
          p {
            color: #eee;
            font-size: 16px;
            text-indent: 32px;
          }
        }
      }
    }
  }
}

@media (min-width: 321px) and (max-width: 360px) {
  #bookTitle {
    color: #f8ab08;
    font-size: 1.5rem;
    padding-left: 5%;
  }

  #textContainer {
    width: 100%;
    margin: 0 auto;
    padding-top: 6px;
    padding-bottom: 6px;
    > .text-content {
      $lineHeight: 28px;
      $mt: 6px;
      border-bottom: 2px solid #a02d88;
      border-top: 2px solid #a02d88;
      width: 100%;
      height: 17 * $lineHeight + $mt * 2;
      flex: 1;
      > div {
        position: relative;
        height: 17 * $lineHeight;
        overflow: hidden;
        margin-top: $mt;
        #textContent {
          position: relative;
          word-wrap: break-word;
          line-height: $lineHeight;
          //height: 100%;
          p {
            color: #eee;
            font-size: 16px;
            text-indent: 32px;
          }
        }
      }
    }
  }
}

@media (min-width: 361px) and (max-width: 420px) {
  #bookTitle {
    color: #f8ab08;
    font-size: 1.7rem;
    padding-left: 5%;
  }

  #textContainer {
    width: 100%;
    margin: 0 auto;
    padding-top: 10px;
    padding-bottom: 10px;
    > .text-content {
      $lineHeight: 28px;
      $mt: 20px;
      border-bottom: 2px solid #a02d88;
      border-top: 2px solid #a02d88;
      width: 100%;
      height: 17 * $lineHeight + $mt * 2;
      flex: 1;
      > div {
        position: relative;
        height: 17 * $lineHeight;
        overflow: hidden;
        margin-top: $mt;
        #textContent {
          position: relative;
          word-wrap: break-word;
          line-height: $lineHeight;
          //height: 100%;
          p {
            color: #eee;
            font-size: 16px;
            text-indent: 32px;
          }
        }
      }
    }
  }
}

@media (min-width: 421px) and (max-width: 520px) {
  #bookTitle {
    color: #f8ab08;
    font-size: 1.9rem;
    padding-left: 5%;
  }

  #textContainer {
    width: 100%;
    margin: 0 auto;
    padding-top: 10px;
    padding-bottom: 10px;
    > .text-content {
      $lineHeight: 28px;
      $mt: 20px;
      border-bottom: 2px solid #a02d88;
      border-top: 2px solid #a02d88;
      width: 100%;
      height: 17 * $lineHeight + $mt * 2;
      flex: 1;
      > div {
        position: relative;
        height: 17 * $lineHeight;
        overflow: hidden;
        margin-top: $mt;
        #textContent {
          position: relative;
          word-wrap: break-word;
          line-height: $lineHeight;
          //height: 100%;
          p {
            color: #eee;
            font-size: 16px;
            text-indent: 32px;
          }
        }
      }
    }
  }
}

@media (min-width: 521px) and (max-width: 640px) {
  #bookTitle {
    color: #f8ab08;
    font-size: 2rem;
    padding-left: 5%;
  }

  #textContainer {
    width: 100%;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 20px;
    > .text-content {
      $lineHeight: 28px;
      $mt: 30px;
      border-bottom: 2px solid #a02d88;
      border-top: 2px solid #a02d88;
      width: 100%;
      height: 17 * $lineHeight + $mt * 2;
      flex: 1;
      > div {
        position: relative;
        height: 17 * $lineHeight;
        overflow: hidden;
        margin-top: $mt;
        #textContent {
          position: relative;
          word-wrap: break-word;
          line-height: $lineHeight;
          //height: 100%;
          p {
            color: #eee;
            font-size: 16px;
            text-indent: 32px;
          }
        }
      }
    }
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  #bookTitle {
    color: #f8ab08;
    font-size: 2.4rem;
    padding-left: 6%;
  }

  #textContainer {
    width: 100%;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 20px;
    > .text-content {
      $lineHeight: 28px;
      $mt: 30px;
      border-bottom: 2px solid #a02d88;
      border-top: 2px solid #a02d88;
      width: 100%;
      height: 17 * $lineHeight + $mt * 2;
      flex: 1;
      > div {
        position: relative;
        height: 17 * $lineHeight;
        overflow: hidden;
        margin-top: $mt;
        #textContent {
          position: relative;
          word-wrap: break-word;
          line-height: $lineHeight;
          //height: 100%;
          p {
            color: #eee;
            font-size: 16px;
            text-indent: 32px;
          }
        }
      }
    }
  }
}

@media (min-width: 769px) and (max-width: 999px) {
  #bookTitle {
    color: #f8ab08;
    font-size: 2.4rem;
    padding-left: 6%;
  }

  #textContainer {
    width: 100%;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 20px;
    > .text-content {
      $lineHeight: 28px;
      $mt: 30px;
      border-bottom: 2px solid #a02d88;
      border-top: 2px solid #a02d88;
      width: 100%;
      height: 17 * $lineHeight + $mt * 2;
      flex: 1;
      > div {
        position: relative;
        height: 17 * $lineHeight;
        overflow: hidden;
        margin-top: $mt;
        #textContent {
          position: relative;
          word-wrap: break-word;
          line-height: $lineHeight;
          //height: 100%;
          p {
            color: #eee;
            font-size: 16px;
            text-indent: 32px;
          }
        }
      }
    }
  }
}

@media (min-width: 1000px) and (max-width: 1239px) {
  #bookTitle {
    color: #f8ab08;
    font-size: 2.4rem;
    padding-left: 6%;
  }

  #textContainer {
    width: 100%;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 20px;
    > .text-content {
      $lineHeight: 28px;
      $mt: 30px;
      border-bottom: 2px solid #a02d88;
      border-top: 2px solid #a02d88;
      width: 100%;
      height: 17 * $lineHeight + $mt * 2;
      flex: 1;
      > div {
        position: relative;
        height: 17 * $lineHeight;
        overflow: hidden;
        margin-top: $mt;
        #textContent {
          position: relative;
          word-wrap: break-word;
          line-height: $lineHeight;
          //height: 100%;
          p {
            color: #eee;
            font-size: 16px;
            text-indent: 32px;
          }
        }
      }
    }
  }
}

@media (min-width: 1240px) {
  #bookTitle {
    color: #f8ab08;
    font-size: 2.4rem;
    padding-left: 6%;
  }

  #textContainer {
    width: 100%;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 20px;
    > .text-content {
      $lineHeight: 28px;
      $mt: 30px;
      border-bottom: 2px solid #a02d88;
      border-top: 2px solid #a02d88;
      width: 100%;
      height: 17 * $lineHeight + $mt * 2;
      flex: 1;
      > div {
        position: relative;
        height: 17 * $lineHeight;
        overflow: hidden;
        margin-top: $mt;
        #textContent {
          position: relative;
          word-wrap: break-word;
          line-height: $lineHeight;
          //height: 100%;
          p {
            color: #eee;
            font-size: 0.8rem;
            text-indent: 32px;
          }
        }
      }
    }
  }
}

// .page-web {
//   width: 6%;
//   //line-height: 550px;
//   .read-last-web,
//   .read-next-web {
//     width: 2.4rem;
//     height: 2.4rem;
//   }
// }

// .read-last,
// .read-next {
//   width: 2.4rem;
//   height: 2.4rem;
// }

// .read-pagination {
//   > span {
//     display: inline-block;
//     vertical-align: middle;
//   }
// }
</style>