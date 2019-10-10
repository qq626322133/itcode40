<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>

  .el-header, .el-footer {
    background-color: #fff;
    color: #333;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 60px;
  }

  .el-main {
    background-color: #2c3e50;
    color: #333;
  }
</style>
