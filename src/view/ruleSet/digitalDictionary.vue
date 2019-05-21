<template>
  <div>
    <Row style="padding-bottom: 10px;">
      <Col span="8">
        <Input v-model="query.name" placeholder="搜索公司" style="width:73%; margin-right: 10px;"/>
        <Button type="info" @click="search()">搜索</Button>
      </Col>
    </Row>
    <Tabs type="card">
        <TabPane label="标签一">
          
        </TabPane>
        <TabPane label="标签二">标签二的内容</TabPane>
    </Tabs> 
  </div>
</template>

<script>
import { getPolicyDictCategoryPage } from "@/api/rulesSet/policyDictCategory";

const defautlOrgForm = {
  name: "",
  type: "",
  des: "",
  site: "",
  call: ""
};
export default {
  components:{},
  props:{},
  data(){
    return {
      query: {
        page: 1,
        size: 10,
        name: ""
      },
      orgForm: Object.assign({}, defautlOrgForm),
      supplierColumns: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '类型名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        },
      ],
      supplierList: [],
      supplierType: '',
      productColumns: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '分类',
          key: 'name',
          align: 'center'
        },
        {
          title: '类型名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        },
      ],
      productList: [],
      productType: '',
      
      loading: false,
      list: [],
      total: 0
    }
  },
  watch:{},
  computed:{},
  created(){},
  mounted(){},
  methods:{
    getData(page) {
      this.loading = true;
      page && (this.query.page = page);
      getPolicyDictCategoryPage(this.query).then(data => {
        console.log(data);
        this.loading = false;
        this.list = data.list;
        this.total = data.total;
      });
    },
    search() {
      this.query.page = 1;
      this.query.size = 10;
      this.getData()
    },
  }
}
</script>
<style lang="less" scoped>
</style>
