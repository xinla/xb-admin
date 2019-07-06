<template>
  <div>
    <tree-table
      :expand-type="false"
      :columns="columns"
      :selectable="false"
      :show-row-hover="false"
      children-prop="districts"
      :data="list"
      :empty-text="load"
    >
      <template slot="postcode" slot-scope="scope">
        <div v-if="scope.row.level === 'province'" :key="1">--</div>
        <div v-else-if="scope.row.postcode" :key="2">{{scope.row.postcode}}</div>
        <Button
          v-else
          class="cp"
          size="small"
          type="primary"
          @click="getCode(scope.row)"
          :key="3"
        >获取邮编</Button>

        <Button
          v-if="scope.row.level === 'district'"
          size="small"
          type="info"
          style="margin-left: 5px;"
          @click="getArea(scope.row)"
          :key="4"
        >查看下级</Button>
      </template>
    </tree-table>

    <dialogBox v-model="dialogShow">
      <tree-table
        :expand-type="false"
        :columns="columns"
        :selectable="false"
        :show-row-hover="false"
        children-prop="districts"
        :data="list2"
      >
        <template slot="postcode" slot-scope="scope">
          <div v-if="scope.row.level === 'province'" :key="1">--</div>
          <div v-else-if="scope.row.postcode" :key="2">{{scope.row.postcode}}</div>
          <Button
            v-else
            class="cp"
            size="small"
            type="primary"
            @click="getCode(scope.row)"
            :key="3"
          >获取邮编</Button>
        </template>
      </tree-table>
    </dialogBox>
  </div>
</template>

<script>
import { getDistrict } from "@/api/common";
import { getPostcode } from "@/api/rulesSet/nationality";
import dialogBox from "@/components/dialogBox";

export default {
  components: { dialogBox },
  filters: {
    async postcode(val) {
      return await getPostcode(val);
    }
  },
  data() {
    return {
      columns: [
        {
          title: "行政区划代码",
          key: "adcode",
          minWidth: "130px"
        },
        {
          title: "行政区划名称",
          key: "name",
          headerAlign: "center",
          align: "center"
        },
        {
          title: "邮编",
          key: "postcode",
          type: "template",
          template: "postcode",
          headerAlign: "center",
          align: "center"
        }
        // {
        //   title: '操作',
        //   key: 'action',
        //   minWidth: '150px',
        //   type: 'template',
        //   template: 'action',
        //   headerAlign: 'center',
        //   align: 'center'
        // },
      ],
      list: [],
      list2: [],
      load: "",
      dialogShow: false
    };
  },
  mounted() {
    this.load = "正在加载...";
    getDistrict(3).then(data => {
      this.list = data;
      this.load = "";
      // console.log(data);
    });
  },
  methods: {
    getCode(data) {
      // console.log(data);
      this.$Spin.show();
      getPostcode(data.name).then(res => {
        // iterator.postcode = data
        console.log(res);
        this.$Spin.hide();
        this.$set(data, "postcode", res);
        // console.log(iterator)
        // console.log(row)
      });
    },
    getArea(row) {
      this.list2 = [];
      if (row.level === "district") {
        this.$Spin.show();
        getDistrict(1, row.name).then(res => {
          this.dialogShow = true;
          // row.districts = data;
          this.$Spin.hide();
          this.list2 = res;
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.dialog {
  max-width: 620px;
}
</style>
