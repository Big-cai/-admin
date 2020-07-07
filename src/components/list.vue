<template>
  <div>
    <!-- 列表部分 -->
    <el-table
      :data="postList"
      style="width: 100%"
      :cell-style="rowClass"
      :header-cell-style="headClass">
      <el-table-column prop="id" label="ID" width="80px"> 
      </el-table-column>
        <el-table-column label="略缩图"width="234px">
            <template slot-scope="scope">
              <img v-if="scope.row.cover[0]" :src="scope.row.cover[0].url" alt="" class="list_img">
              <img v-else src="../assets/wuwu.jpg" alt="">
            </template>
        </el-table-column>
      <el-table-column prop="title" label="类型" width="250">
      </el-table-column>
      <el-table-column prop="user.nickname" label="姓名" width="150">
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页部分 -->
    <el-pagination
      @current-change="handleCurrentChange"
      @sizi-change="sizeChange"
      :page-sizes="[2,5,8,10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex:1,
      pageSize: 5,
      total: 0,
      postList:[],
    }
  },
  created(){
    this.loadPage()
   
  },
  methods: {
    loadPage(){
         this.$axios({
      url:'/post',
      params:{
        // 当前页码
        pageIndex:this.pageIndex,
        // 页数
        pageSize:this.pageSize
      }
    }).then(res=>{
      console.log(res.data);
      this.postList=res.data.data
      this.total=res.data.total
    })
    },
    headClass() {
      return 'text-align:center;'
    },
    rowClass() {
      return 'text-align:center;'
    },
       handleCurrentChange(pageIndex){
         console.log(pageIndex);
         
        //点击按钮 获取当前页码;
        this.pageIndex = pageIndex
        // 在请求数据
        this.loadPage();
    },
    sizeChange(pageSize){
      this.pageSize = pageSize
      this.loadPage()
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 30px;
}
div {
  text-align: center;
}
.list_img{
  width: 100%;
  height: 146px;
  object-fit: cover;
}
</style>