<template>
  <div>
    <div style="margin-bottom: 15px;">
      <Select v-model="type" style="width:150px; margin-right:10px;" placeholder="请选择类型">
        <Option v-for="(item, index) in typeList" :value="item.value" :key="index">{{ item.label }}</Option>
      </Select>
      <Select v-model="status" style="width:150px;" placeholder="请选择状态">
        <Option v-for="(item, index) in typeList" :value="item.value" :key="index">{{ item.label }}</Option>
      </Select>
      <div class="right fr">
        <Button type="primary" size="small" style="margin-right: 5px" @click="goDetail(row.id)">处理</Button>
        <Button type="warning" size="small" style="margin-right: 5px" @click="goDetail(row.id)">关闭</Button>
        <Button type="error" size="small" style="margin-right: 5px" @click="goDetail(row.id)">删除</Button>
      </div>
    </div>

    <Table border :loading="loading" :columns="columns" :data="list">
      <template slot-scope="{ row }" slot="type">{{row.type | type}}</template>
      <template slot-scope="{ row }" slot="status">
        <Tag :color="statusList[row.status].color">{{statusList[row.status].label}}</Tag>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button type="info" size="small" style="margin-right: 5px" @click="goDetail(row.id)">详情</Button>
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row, 1)">处理</Button>
        <Button type="warning" size="small" style="margin-right: 5px" @click="edit(row, 2)">关闭</Button>
        <Button type="error" size="small" style="margin-right: 5px" @click="edit(row, type)">删除</Button>
      </template>
    </Table>

    <Page
      :total="total"
      show-elevator
      show-total
      style="text-align:center;margin-top:20px;"
      @on-change="getData"
    />

    <Modal
        v-model="isModal"
        title="反馈详情">
        <detail :form="form" :key="form.id || 0"/>
    </Modal>
  </div>
</template>

<script>
import { saveFeedback, getFeedbackPage } from "@/api/systemHelp";
import detail from "./detail"

const type = [
  {
    label: "建议",
    value: 0
  },
  {
    label: "问题",
    value: 1
  }
];
export default {
  filters: {
    type(val) {
      return type[val].label;
    }
  },
  data() {
    return {
      loading: false,
      query: {
        page: 1,
        size: 10
      },
      columns: [
        {
          type: "selection",
          align: "center",
          width: 50
        },
        {
          title: "类型",
          slot: "type",
          align: "center",
          filters: type,
          width: 80,
          filterMultiple: false,
          filterMethod(value, row) {
            return row.type === value;
          }
        },
        {
          title: "反馈时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "内容详情",
          key: "content",
          align: "center",
          tooltip: true
        },
        {
          title: "当前状态",
          slot: "status",
          align: "center"
        },
        {
          title: "所属用户",
          key: "userId",
          align: "center"
        },
        {
          title: "所属租户",
          key: "companyId",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          minWidth: 30,
          align: "center"
        }
      ],
      list: [],
      total: 0,
      typeList: type,
      // 0 未处理  1已处理 2已关闭
      statusList: [
        {
          value: 0,
          label: '未处理',
          color: 'default'
        },
        {
          value: 1,
          label: '已处理',
          color: 'success'
        },
        {
          value: 2,
          label: '已关闭',
          color: 'error'
        },
      ],
      isModal: true,
      form: {},
      type: 0
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(page) {
      page && (this.query.page = page);
      this.loading = true;
      getFeedbackPage(this.query).then(res => {
        console.log("FeedbackPage: ", res);
        this.loading = false;
        this.list = res.list;
        this.total = res.total;
      });
    },
    goDetail(id) {
    },
    edit(data, type) {
      data.status = type
        saveFeedback(data).then((res) => {
          
        })
      if (type === 1) {
      } else {
        
      }
    }
  }
};
</script>
<style lang="less" scoped>
.img {
  width: 70px;
  height: 70px;
  margin: 2px 5px 2px 0;
}
</style>
