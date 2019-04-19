<template>
  <div>
    <xNav/>
    <!-- <Tabs size="small">
        <TabPane label="工商信息" @on-click="goPage('businessInfo')"></TabPane>
        <TabPane label="品牌信息" @on-click="goPage('brandInfo')"></TabPane>
        <TabPane label="组织架构" @on-click="goPage('organizationalStructure')"></TabPane>
        <TabPane label="产品列表" @on-click="goPage('productList')"></TabPane>
        <TabPane label="新闻资讯" @on-click="goPage('news')"></TabPane>
        <TabPane label="职业代码表" @on-click="goPage('ascoCode')"></TabPane>
        <TabPane label="投保规则" @on-click="goPage('insuranceRules')"></TabPane>
    </Tabs> -->

    <div>

    <div class="title-row">基本信息</div>
    <table>
      <tr>
        <th>公司名称</th>
        <td>
          <Input type="text" :disabled="disabled" v-model="company.fullName"/>
        </td>
        <th>公司名称</th>
        <td>
          <Input type="text" :disabled="disabled" v-model="company.fullName"/>
        </td>
        <th>公司名称</th>
        <td>
          <Input type="text" :disabled="disabled" v-model="company.fullName"/>
        </td>
      </tr>
      <tr>
        <th>公司名称</th>
        <td>
          <Input type="text" :disabled="disabled" v-model="company.fullName"/>
        </td>
        <th>公司名称</th>
        <td>
          <Input type="text" :disabled="disabled" v-model="company.fullName"/>
        </td>
        <th>公司名称</th>
        <td>
          <Input type="text" :disabled="disabled" v-model="company.fullName"/>
        </td>
      </tr>
      <tr>
        <th>公司名称</th>
        <td>
          <Input type="text" :disabled="disabled" v-model="company.fullName"/>
        </td>
        <th>公司名称</th>
        <td>
          <Input type="text" :disabled="disabled" v-model="company.fullName"/>
        </td>
        <th>公司名称</th>
        <td>
          <Input type="text" :disabled="disabled" v-model="company.fullName"/>
        </td>
      </tr>
    </table>

    <Divider />

    <div class="title-row">公司简介
    </div>
    <Input 
    type="textarea" 
    placeholder="公司介绍"
    :autosize="true"
    :disabled="disabled"
    v-model="company.introduction" />

    <Divider />

    <div class="title-row">公司荣誉
    </div>
    <Table 
    border
    :columns="columns"
    :data="list">
      <template slot-scope="{ row, index }" slot="action">
        <img :src="row.img" alt="" @click="zoom(index)">
        <img class="zoom" v-if="zoomIndex === index" :src="row.img" alt="">
      </template>
    </Table>

    <Divider />

    <div class="title-row">公司足迹
    </div>
    <Timeline>
        <TimelineItem>
            <p class="time">1976年</p>
            <p class="content">Apple I 问世</p>
        </TimelineItem>
        <TimelineItem>
            <p class="time">1984年</p>
            <p class="content">发布 Macintosh</p>
        </TimelineItem>
        <TimelineItem>
            <p class="time">2007年</p>
            <p class="content">发布 iPhone</p>
        </TimelineItem>
        <TimelineItem>
            <p class="time">2010年</p>
            <p class="content">发布 iPad</p>
        </TimelineItem>
        <TimelineItem>
            <p class="time">2011年10月5日</p>
            <p class="content">史蒂夫·乔布斯去世</p>
        </TimelineItem>
    </Timeline>

  </div>
  </div>
</template>

<script>
import { getLesseePageByName, getLesseePageByJB } from '@/api/lessee'
import xNav from '@/view/components/nav'
export default {
  components: {
    xNav
  },
  data() {
    return {
      disabled: true,
      zoomIndex: undefined,
      company: {
        fullName: '',
        shortName: '',
        englishFullName: '',
        englishShortName: '',
        registerArea: '',
        site: '',
        registerDate: '',
        realDate: '',
        introduction: '安徽据说牛信息科技有限公司是一家致力于企业客户营销升级的综合创新服务公司。总部位于安徽省合肥市高新区国家大学科技园。公司成立于2018年10月9日，汇聚了来自北上广有着丰富经验的工程师们与营销团队。在短短2个月的时间内，公司就申请了数项发明专利与30余项软件著作权。公司秉着“拥抱变化，赋能创新”的核心价值观，专注于各类企业的营销升级与推广，为企业客户带来价值，重塑大数据营销领域新气象！'
      },
      columns: [
        {
            title: '颁发机构',
            key: 'name',
        },
        {
            title: '荣誉名称',
            key: 'name',
        },
        {
            title: '获奖时间',
            key: 'name',
        },
        {
            title: '图片/附件',
            slot: 'action',
            key: 'name',
        },
      ],
      list: []
    }
  },
  methods: {
    goPage(name) {
      console.log(1)
      this.$router.push({name})
    },
    zoom(index) {
      this.zoomIndex = index
    },
    test(){
      console.log(1)
    }
  }
}
</script>

<style lang="less" scoped>
@import url(./index.less);
  .title{
    padding: 0px 0px 20px 10px;
    font-size: 20px;
  }
</style>
