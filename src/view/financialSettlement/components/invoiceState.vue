<template>
  <div v-show="value">

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
  components:{},
  props:{
    value: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      
    }
  },
  computed:{},
  watch:{
    
  },
  created(){},
  mounted(){},
  methods:{
    close() {
      this.$emit('input', false)
    },
    
  }
}
</script>
<style lang="less" scoped>
</style>
