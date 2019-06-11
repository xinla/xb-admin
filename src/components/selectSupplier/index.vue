<template>
  <div>
    <Select
      ref="select"
      filterable
      remote
      clearable
      :remote-method="search"
      :loading="loading"
      :disabled="disabled"
      :placeholder="val || '请输入后选择'"
      @on-clear="clear"
      @on-query-change="queryChange"
      @blur.native="blur"
    >
      <Option
        v-for="(option, index) in list"
        :value="option.name"
        :key="index"
        @click.native="$emit('change', option)"
      >{{option.name}}</Option>
    </Select>
    <Button
      v-show="query.name && !list.length"
      class="search-btn"
      size="small"
      type="primary"
      ghost
      @click="goSearch"
    >去匹配</Button>
  </div>
</template>

<script>
import { getLesseePageByJB } from "@/api/lessee";
import { getSupplierPage } from "@/api/supplier";

export default {
  name: "selectSupplier",
  props: {
    val: "",
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "agency"
    },
    defaultValue: ""
  },
  data() {
    return {
      loading: false,
      list: [],
      query: {
        page: 1,
        size: 10,
        type: 1,
        name: ""
      }
    };
  },
  mounted() {
    // console.log(this.val + 8);
    if (this.val) {
      new Promise((resolve, reject) => {
        resolve();
      })
        .then(() => {
          this.query.name = this.val;
          if (this.type === "agency") {
            return getLesseePageByJB(this.query);
          } else if (this.type === "insurance") {
            this.query.type = 0;
            return getLesseePageByJB(this.query);
          } else if (this.type === "brand") {
            return getSupplierPage(this.query);
          }
        })
        .then(({ list }) => {
          // FIX: 结果出现同名保险公司，这里取第一条数据
          // console.log(list)
          list && this.$emit("change", list[0]);
        });
    }
  },
  methods: {
    search(query) {
      // console.log(query + 2)
      // console.log(this.val + 1);
      this.query.name = query;
      this.loading = true;
      new Promise((resolve, reject) => {
        resolve();
      })
        .then(() => {
          if (this.type === "agency") {
            return getLesseePageByJB(this.query);
          } else if (this.type === "insurance") {
            this.query.type = 0;
            return getLesseePageByJB(this.query);
          } else if (this.type === "brand") {
            return getSupplierPage(this.query);
          }
        })
        .then(data => {
          // console.log('data', data)
          this.loading = false;
          this.list = data.list;
          if (!data.list.length) {
          }
        });
    },
    clear() {
      // console.log(1);
      this.val = "";
      // this.$refs.select.clearSingleSelect()
      // this.$refs.select.setQuery()
    },
    queryChange(query) {
      // console.log(query)
      if (!query) {
        this.$refs.select.clearSingleSelect();
      }
    },
    goSearch() {
      console.log(1);
    }
    // change(data) {
    //   console.log(data + 3)
    // },
  }
};
</script>
<style lang="less" scoped>
.search-btn {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
