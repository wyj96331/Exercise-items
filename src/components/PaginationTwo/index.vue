<template>
  <div class="block" style="text-align: center">
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total"
      :pager-count="continues"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'PaginationTwo',
  props: ['pageSize', 'total', 'continues'],
  methods: {
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.$emit('getPageNo', val)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
