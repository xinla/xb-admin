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
      @on-query-change="queryChange"
      @on-change="selectChange"
    >
      <Option
        v-for="(option, index) in list"
        :value="JSON.stringify(option)"
        :key="index"
        :disabled="Boolean(option.relation)"
      >{{option.name}}</Option>
    </Select>
    <Button
      v-show="query.name && !list.length && isMatch"
      class="search-btn"
      size="small"
      type="primary"
      ghost
      @click="goSearch"
    >去匹配</Button>
  </div>
</template>

<script>
import { getLesseePage, getLesseePageByJB, crawlCompanyList, saveCrawlCompany } from "@/api/lessee";
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
      },
      isCrawl: false,
      isMatch: true
    };
  },
  // mounted() {
  //   // console.log(this.val + 8);
  //   if (this.val) {
  //     Promise.resolve()
  //       .then(() => {
  //         this.query.name = this.val;
  //         if (this.type === "agency") {
  //           return getLesseePageByJB(this.query);
  //         } else if (this.type === "insurance") {
  //           this.query.type = 0;
  //           return getLesseePageByJB(this.query);
  //         } else if (this.type === "brand") {
  //           return getSupplierPage(this.query);
  //         } else if (this.type === "lessee") {
  //           return getLesseePage(this.query);
  //         }
  //       })
  //       .then(({ list }) => {
  //         // FIX: 结果出现同名或包含该名字保险公司，这里取第一条数据
  //         // console.log('LesseePageByJB: ', list)
  //         list && list.length && this.$emit("change", list[0]);
  //       });
  //   }
  // },
  methods: {
    search(query) {
      // console.log(query + 2)
      // console.log(this.val + 1);
      this.query.name = query;
      this.loading = true;
          this.isMatch = true
      Promise.resolve()
        .then(() => {
          if (this.type === "agency") {
            return getLesseePageByJB(this.query);
          } else if (this.type === "insurance") {
            this.query.type = 0;
            return getLesseePageByJB(this.query);
          } else if (this.type === "brand") {
            return getSupplierPage(this.query);
          } else if (this.type === "lessee") {
            return getLesseePage(this.query);
          }
        })
        .then(data => {
          // console.log('data', data)
          this.loading = false;
          this.isCrawl = false
          this.list = data.list;
          if (!data.list.length) {
          }
        });
    },
    queryChange(query) {
      // console.log(query)
      if (!query) {
        this.$refs.select.clearSingleSelect();
      }
    },
    goSearch() {
      this.isCrawl = true
      this.loading = true;
      crawlCompanyList(this.query.name).then(res => {
        if (res.length) {
          for (const iterator of res) {
            iterator.name = iterator.companyName
          }
          this.list = res
          this.loading = false;
          this.$Message.success('匹配成功，点击输入框可查看列表')
        } else {
          this.$Message.warning('未匹配的相关结果')
        }
      })
    },
    selectChange(option) {
      // console.log('selectChange: ', option)
      option = JSON.parse(option || '{}')
      if (this.isCrawl) {
        saveCrawlCompany(option.detailHref).then(res => {
          this.isMatch = false
          this.$emit('change', {name: option.name, id: res.id})
          // console.log(res)
          // console.log({name: option.name, id: res.id})
        })
      } else {
        this.$emit('change', option)
      }
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
