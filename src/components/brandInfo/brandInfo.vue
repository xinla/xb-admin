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
          <Input type="text" :disabled="disabled" v-model="form.xbCompany.name"/>
        </td>
        <th>公司简称</th>
        <td>
          <Input type="text" :disabled="disabled" v-model="form.xbCompany.companyForShort"/>
        </td>
        <th>公司类型</th>
        <td>
          <Input type="text" :disabled="disabled" v-model="form.xbCompany.comapnyType"/>
        </td>
      </tr>
      <tr>
        <th>英文名称</th>
        <td>
          <Input type="text" :disabled="disabled" v-model="form.xbCompany.englishName"/>
        </td>
        <th>英文简称</th>
        <td>
          <Input type="text" :disabled="disabled" v-model="form.xbCompany.englishNameForShort"/>
        </td>
        <th>注册地</th>
        <td>
          <Input type="text" :disabled="disabled" v-model="form.xbCompany.headquartersAddress"/>
        </td>
      </tr>
      <tr>
        <th>总部地址</th>
        <td>
          <Input type="text" :disabled="disabled" v-model="form.xbCompany.headquartersAddress"/>
        </td>
        <th>注册日期</th>
        <td>
          <DatePicker v-model="form.xbCompany.registrationDate" type="datetime" format="yyyy-MM-dd HH:mm"  placeholder="注册日期" :disabled="disabled"></DatePicker>
        </td>
        <th>实际周年日</th>
        <td>
          <DatePicker v-model="form.xbCompany.actualAnniversary" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="实际周年日" :disabled="disabled"></DatePicker>
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
    :rows="3"
    v-model="form.xbCompany.companyContent" />

    <Divider />

    <div class="title-row">公司荣誉
    </div>
    <Table 
    border
    :columns="columns"
    :data="form.honor">
      <template slot-scope="{ row, index }" slot="action">
        <img :src="row.url" alt="" @click="zoom(index)">
        <img class="zoom" v-if="zoomIndex === index" :src="row.url" alt="">
      </template>
    </Table>

    <Divider />

    <div class="title-row">公司足迹
    </div>
    <Timeline>
        <TimelineItem v-for="(item, index) in form.bigEvents" :key="index">
          
            <p class="time">{{item.time}}</p>
            <p class="content">{{item.bigEvents}}</p>
        </TimelineItem>
    </Timeline>

  </div>
</template>

<script>
import { getLesseeBrandInfoById, updateLessee, editLessee } from "@/api/lessee"
import { formatDate } from "@/libs/tools"

export default {
  name: 'brandInfo',
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      disabled: true,
      zoomIndex: undefined,
      form: {
        xbCompany: {
          name: '',
          companyForShort: '',
          comapnyType: '',
          englishName: '',
          englishNameForShort: '',
          registerArea: '',
          headquartersAddress: '',
          registrationDate: '',
          actualAnniversary: '',
          companyContent: ''
        },
        honor: [],
        bigEvents: []
      },
      columns: [
        {
            title: '颁发机构',
            key: 'certificationAuthority',
        },
        {
            title: '荣誉名称',
            key: 'honorName',
        },
        {
            title: '获奖时间',
            key: 'prizeTime',
        },
        {
            title: '图片/附件',
            slot: 'action',
        },
      ],
      
    }
  },
  watch: {
    'form.xbCompany.registrationDate'(data) {
      this.form.xbCompany.registrationDate = formatDate(data)
      // console.log(this.form.xbCompany.registrationDate)
    },
    'form.xbCompany.actualAnniversary'(data) {
      this.form.xbCompany.actualAnniversary = formatDate(data)
      // console.log(this.form.xbCompany.actualAnniversary)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() { 
      getLesseeBrandInfoById(this.id).then(data => {
        this.form = data
        // this.company = data.xbCompany
        // this.listHonor = data.honor
        // this.listEvents = data.bigEvents
        console.log('data5:',data)
        // debugger
      })
    },
    edit() {
      this.disabled = false
    },
    save() {
      console.log(this.form.xbCompany)
      updateLessee(this.form.xbCompany).then(data => {
        this.$Message.success('修改成功')
        this.disabled = true
      })
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

