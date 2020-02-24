<style lang="less" scoped>
.upload-icon {
  border: 1px dashed #000;
  padding: 24px 0;
}
.logo {
  width: 220px;
  height: 100px;
  margin: 5px 0;
}
/deep/.dialog {
  width: 350px;
  overflow: visible;
}
.classify {
  margin: 0 20px;
}
.pb24 {
  line-height: 2;
  padding-left: 24px;
}
.current {
  color: #6582ff;
}
.total {
  padding-left: 24px;
  color: #aaa;
}
.thumb-wrap {
  max-height: ~"calc(100% - 80px)";
  overflow: auto;
  .current {
    border: 2px solid rgba(101, 130, 255, 1);
    box-shadow: 0px 2px 6px rgba(76, 79, 156, 0.14);
  }
  .tm-li {
    padding: 10px;
    display: inline-block;
    margin: 0 70px 30px 0;
    border: 2px solid #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
    vertical-align: top;
    &:hover {
      .current;
    }
    .thumb {
      width: 180px;
      height: 120px;
    }
    .text {
      padding: 15px 5px 10px;
    }
  }
}
.more-wrap {
  &:hover .action {
    height: auto;
    padding: 12px 0;
    // opacity: 1;
  }
}
.action {
  // opacity: 0;
  height: 0;
  position: absolute;
  transform: translateX(-35%);
  box-shadow: 0px 3px 4px rgba(58, 64, 74, 0.37);
  border-radius: 5px;
  transition: 0.3s;
  overflow: hidden;
  .ac-li {
    width: 96px;
    padding: 12px 0;
  }
}
.select-wrap {
  position: absolute;
  width: 235px;
  padding: 20px;
  right: 27px;
  top: 185px;
}
</style>
<template>
  <div style="height: calc(100% - 100px)">
    <!-- <div class="right">
          <Button type="primary" size="small" style="margin-right:5px;" @click="edit(0)">添加分类</Button>
          <Button type="primary" size="small" style="margin-right:5px;" @click="edit(1)">添加标题</Button>
    </div>-->

    <div class="pb24">
      <span>分类：</span>
      <span
        :class="['classify cp', !query.classifyId && 'current']"
        key="a"
        @click="query.classifyId = '', getData(1)"
      >全部</span>
      <span
        v-for="(value, key, index) of listClass"
        :class="['classify cp', query.classifyId === key && 'current']"
        :key="index"
        @click="query.classifyId = key, getData(1)"
      >{{ value }}</span>

      <div class="fr">
        <!-- <Input
          prefix="ios-funnel"
          suffix="ios-arrow-down"
          v-model="query.classifyId"
          placeholde="图片筛选"
          style="width: 150px;"
        >
          <Icon type="ios-funnel" size="16" slot="prefix" color="#C5C8CE" />
        </Input>-->
        <Button @click="select.show = !select.show">
          <div
            style="display: flex; justify-content: space-between; justify-items: center; width: 100px;"
          >
            <Icon type="ios-funnel" size="16" color="#C5C8CE"></Icon>图片筛选
            <Icon type="ios-arrow-down" size="16" color="#A2A8B7"></Icon>
          </div>
        </Button>
        <div class="mask" style="background: none; left: 0;" v-show="select.show" @click.self="select.show = false">
          <Card class="select-wrap" :padding="0">
            <div>
              年龄：
              <Input v-model="select.startAge" style="width: 50px;" />-
              <Input v-model="select.endAg" style="width: 50px;" />
              <span>岁</span>
            </div>
            <div>
              性别：
              <RadioGroup v-model="select.sex">
                <Radio label="0">无</Radio>
                <Radio label="1">男性</Radio>
                <Radio label="2">女性</Radio>
              </RadioGroup>
            </div>
            <div>
              场景：
              <RadioGroup v-model="select.scene">
                <Radio label="0">无</Radio>
                <Radio label="1">室内</Radio>
                <Radio label="2">户外</Radio>
              </RadioGroup>
            </div>
          </Card>
        </div>
      </div>
    </div>

    <span class="total">共{{total}}张图片</span>

    <ul class="thumb-wrap" ref="scroll" @scroll="scroll">
      <template v-for="(item, index) of list">
        <li class="tm-li" v-show="showWhich(item) || isSelect" :key="index">
          <img class="thumb" :preview="index" :src="item.cover" alt />
          <div class="text">
            <span>{{listClass[item.classifyId]}}</span>
            <div class="fr more-wrap">
              <Icon type="ios-more" class="more cp" size="28" />
              <ul class="action ac bw">
                <li class="ac-li cp" @click="edit(0, item)">修改分类</li>
                <li class="ac-li cp" @click="edit(1, item)">添加标签</li>
                <li class="ac-li cp" @click="remove(item.id)">删除图片</li>
              </ul>
            </div>
          </div>
        </li>
      </template>
      <li v-show="loading">正在加载...</li>
    </ul>

    <!-- <Table :loading="loading" :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="cover">
          <img :src="row.cover" class="logo" />
        </template>

        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="edit(1, row)">编辑</Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="remove(row.id)">删除</Button>
        </template>
    </Table>-->

    <!-- <Page :total="total" show-elevator show-total class="c-page" @on-change="getData" /> -->

    <dialogBox v-model="isShow">
      <template slot="title">{{editType === 0 ? '修改分类' : '添加标签'}}</template>
      <template>
        <Form ref="form" :model="form" :rules="rules">
          <FormItem prop="classifyId" v-if="editType === 0">
            <!-- <Input type="text" v-model="form.value" placeholder="请输入分类"></Input> -->
            <Select v-model="form.classifyId">
              <Option v-for="(value, key, index) in listClass" :value="key" :key="index">{{ value }}</Option>
            </Select>
          </FormItem>

          <template v-else>
            <div>
              年龄：
              <Input v-model="form.labelObject.startAge" style="width: 50px;" />-
              <Input v-model="form.labelObject.endAg" style="width: 50px;" />
              <span>岁</span>
            </div>
            <div>
              性别：
              <RadioGroup v-model="form.labelObject.sex">
                <Radio label="0">无</Radio>
                <Radio label="1">男性</Radio>
                <Radio label="2">女性</Radio>
              </RadioGroup>
            </div>
            <div>
              场景：
              <RadioGroup v-model="form.labelObject.scene">
                <Radio label="0">无</Radio>
                <Radio label="1">室内</Radio>
                <Radio label="2">户外</Radio>
              </RadioGroup>
            </div>
          </template>
          <div class="ar">
            <Button type="primary" ghost @click="isShow = false">取消</Button>
            <Button type="primary" @click="submit(1, form)">确定</Button>
          </div>
        </Form>
      </template>
    </dialogBox>

    <!-- <dialogBox v-model="isShow1">
      <template slot="title">添加标题</template>
      <template>
        <Form ref="form1" :model="form1" :rules="rules">
          <FormItem prop="classifyId">
            <Select v-model="form1.classifyId">
              <Option v-for="(value, key, index) in listClass" :value="key" :key="index">{{ value }}</Option>
            </Select>
          </FormItem>

          <FormItem prop="cover" label="上传封面">
            <Upload
              :action="$config.services.upload"
              :show-upload-list="false"
              :format="['jpg','jpeg','png']"
              accept="image/*"
              :on-success="upFile"
            >
              <img class="logo" v-if="form1.cover" :src="form1.cover" />
              <div v-else class="upload-icon cp">
                <Icon type="md-cloud-upload" />
              </div>
            </Upload>
          </FormItem>
          <div class="ar">
            <Button type="primary" ghost @click="isShow1 = false">取消</Button>
            <Button type="primary" @click="submit(1, form1)">确定</Button>
          </div>
        </Form>
      </template>
    </dialogBox>-->
  </div>
</template>

<script>
import {
  getProposalPage,
  saveProposal,
  deleteProposal,
  getProposalDictPage,
  saveProposalDict,
  getClasses
} from "@/api/proposal";

// const form = {
//   value: ""
// };

const form = {
  classifyId: "",
  title: "",
  cover: "",
  type: 1,
  labelObject: {},
  createTime: "",
  updateTime: ""
};

export default {
  data() {
    return {
      loading: true,
      query: {
        page: 1,
        size: 10,
        type: 1,
        classifyId: "",
        params: ''
      },
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "分类",
          key: "value",
          align: "center"
        },
        {
          title: "标题",
          slot: "cover",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      list: [],
      listClass: {},
      rules: {
        value: [{ required: true, message: "不能为空", trigger: "blur" }],
        cover: [{ required: true, message: "不能为空", trigger: "change" }],
        classifyId: [{ required: true, message: "不能为空", trigger: "change" }]
      },
      form: Object.assign({}, form),
      // form1: Object.assign({}, form1),
      isShow: false,
      // isShow1: false,
      total: 0,
      editType: 0,
      select: {
        show: false,
        startAge: 0,
        endAg: 0,
        sex: 0,
        scene: 0,
      }
    };
  },
  computed: {
    showWhich(data) {
      // for (const key in this.select) {
      //   if (object.hasOwnProperty(key)) {
      //     if (data[key] === this.select[key]) {
      //       return true
      //     }
      //   }
      // }

      return data.labelObject.startAge > this.select.startAge || data.labelObject.endAg < this.select.endAg || data.labelObject.sex === this.select.sex || data.labelObject.scene === this.select.scene
    },
    isSelect() {
      for (const key in this.select) {
        if (object.hasOwnProperty(key)) {
          if (this.select[key]) {
            return false
          }
        }
      }
      return true
    }
  },
  // watch: {
  //   isShow(val) {
  //     if (!val) {
  //       this.cancel();
  //     }
  //   },
  //   isShow1(val) {
  //     if (!val) {
  //       this.cancel();
  //     }
  //   }
  // },
  mounted() {
    getClasses().then(res => {
      console.log("ProposalDictPage", res);
      // 先写死，后期获取
      let temp = {}
      for (const iterator of res) {
        temp[iterator.dataCode] = iterator.dataName
      }
      this.listClass = temp
      this.getData();
    });

  },
  methods: {
    getData(page) {
      this.loading = true;
      page && (this.query.page = page);
      getProposalPage(this.query).then(res => {
        console.log('ProposalPage: ', res);
        this.loading = false;
        this.list = this.list.concat(res.list);
        this.total = ~~res.total;
      });
    },
    edit(_type, item) {
      this.isShow = true;
      this.form = Object.assign({}, item || form);
      this.editType = _type

      // if (_type === 0) {
      // } else {
      //   this.isShow1 = true;
      //   this.form1 = Object.assign({}, form1);
      //   item && (this.form1 = Object.assign({}, item));
      // }
    },
    submit(type, item) {
      // 0 分类 ， 1 建议书
      // console.log('supplierForm', this.supplierForm)
      // console.log('productForm', this.productForm)
      // (type === 0 ? this.$refs.form.validate() : this.$refs.form.validate())
      this.$refs.form.validate()
        .then(data => {
          if (data) {
            // if (type === 0) {
            //   return saveProposalDict(item);
            // } else {
            //   }
            return saveProposal(item);
          } else {
            return Promise.reject();
          }
        })
        .then(data => {
          // this.getData();
          this.$Message.success("操作成功");
          this.cancel(type);
        });
    },
    cancel(type) {
      this.$refs.form.resetFields();
      this.isShow = false
      // this.$refs.form1.resetFields();
      // type === 1 ? (this.isShow = false) : (this.isShow1 = false);
    },
    remove(id) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要删除吗",
        onOk: () => {
          deleteProposal(id).then(data => {
            this.getData();
            this.$Message.success("操作成功");
          });
        }
      });
    },
    upFile(response, file, fileList) {
      if (!response.result) {
        this.$Message.error(response.message);
      } else {
        this.form1.cover = response.result.fileUrl;
      }
      // console.log(response, file, fileList)
      // console.log(response.result.fileUrl)
    },
    scroll() {
      if (this.loading) {
        return
      }
      let el = this.$refs.scroll
      if (el.scrollHeight <= el.scrollTop + el.offsetHeight + 5) {
        this.query.page++
        this.getData()
      }
    }
  }
};
</script>
