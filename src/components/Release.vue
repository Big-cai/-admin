<template>
  <div>
    <div class="content">
      <!-- 标题 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <div class="TextEditing">
          <div class="left"><span>内容</span></div>
          <div class="rig"><VueEditor></VueEditor></div>
        </div>

        <el-form-item label="类型">
          <el-radio-group v-model="form.resource">
            <el-radio label="文章"></el-radio>
            <el-radio label="视频"></el-radio>
          </el-radio-group>
        </el-form-item>


        <el-form-item label="栏目">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="热点" name="type"></el-checkbox>
            <el-checkbox label="娱乐" name="type"></el-checkbox>
            <el-checkbox label="体育" name="type"></el-checkbox>
            <el-checkbox label="汽车" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        
        <!-- 上传图片 -->
    <Upload/>

        <el-form-item>
          <el-button type="primary" label-position="left">立即创建</el-button>
          
        </el-form-item>
      </el-form>
    </div>
    
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
// 上传图片组件
import Upload from '../components/Upload'
export default {
  components: {
    VueEditor,
    Upload
  },
  data() {
    return {
      form: {
        name: '',
        delivery: false,
        type: [],
    
      },
      methods:{
      
      }
    }
  }
}
</script>
<style lang="less" scoped>
// 利用触发BFC的特性 不让富文本 盖住其他元素
.TextEditing{
  width: 861px;
  overflow: hidden; //给父盒子设置 溢出/隐藏
  margin-bottom: 20px;
  .left{
    float: left;   //子盒子设置浮动
    width: 80px;
    height: 40px;
    text-align: right;
    padding-right: 11px;
  }
  .rig{
    overflow: hidden;   
  }
}
</style>