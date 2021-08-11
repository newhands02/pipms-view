<template>
  <!-- 时间轴组件 -->
  <el-card shadow="hover" class="cardStyle">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :color="activity.color"
        :timestamp="activity.timestamp">
        {{activity.content}}
      </el-timeline-item>
    </el-timeline>
  </el-card>
</template>

<script>
export default {
  props:{
    activities:{
      type:Array,
      default:()=>[]
    }
  },
}
</script>

<style scoped>
.cardStyle{
  height: 400px;
  overflow-y: scroll;
}
</style>
