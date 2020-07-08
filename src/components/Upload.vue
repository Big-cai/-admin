<template>
<div>
    <el-form-item label="封面">
          <el-upload 
      :action="$axios.defaults.baseURL + '/upload'" 
      :headers="{
        Authorization:'Bearer ' + token
      }"
      list-type="picture-card" 
      >
      <i class="el-icon-plus"></i>
    </el-upload>
    </el-form-item>
</div>
</template>

<script>
export default {
  data() {
    return {
      token:localStorage.getItem('token'), 
       dialogImageUrl: '',
        dialogVisible: false,
      ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
    }
  },
  methods: {
    handleRemove() {}
  }
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  margin-bottom: 20px;
  span {
    text-align: right;
    width: 80px;
    height: 40px;
    color: #606266;
    padding-right: 11px;
    font-size: 14px;
  }
  
}
.article{
  display: flex;
  span{
    width: 50px;
  }
}

</style>