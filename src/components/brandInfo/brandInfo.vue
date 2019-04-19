<template>
  <div>

    <div class="title-row">基本信息
      <div class="fr">
        <Button size="small" type="primary" @click="edit">编辑</Button>
        <Button size="small" type="primary" @click="save">保存</Button>
      </div>
    </div>
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
</template>

<script>
export default {
  name: 'brandInfo',
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
    edit() {
      this.disabled = false
    },
    save() {
      this.disabled = true
    },
    zoom(index) {
      this.zoomIndex = index
    }
  }
}
</script>

<style lang='less' scoped>
  @import url('./index.less');
</style>

