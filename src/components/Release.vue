<template>
  <div>
    <div class="container">
      <!-- 标题 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <!-- 富文本编辑器 -->
        <el-form-item label="内容">
          <!-- :useCustomImageHandler="true" 意思是 是否使用自定义属图片处理器 -->

          <!-- @image-added="imgUpload" 这是添加图片后触发的函数 -->
          <VueEditor v-model="form.content" :useCustomImageHandler="true" @image-added="imgUpload"></VueEditor>
        </el-form-item>

        <el-form-item label="类型">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="栏目">
          <el-checkbox-group v-model="checkList">
            <el-checkbox
            v-for="item in categoriesList"
            :key="item.id"
             :label="item.id"
              >
              {{item.name}}
              </el-checkbox>
           
          </el-checkbox-group>
        </el-form-item>

        <!-- 上传图片 -->
        <el-form-item label="封面">
          <el-upload
            :action="$axios.defaults.baseURL + '/upload'"
            :headers="{
              Authorization: 'Bearer ' + token
            }"
            :on-success="coverSuccess"
            :on-remove="coverRemove"
            list-type="picture-card"
            :file-list="form.cover"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit" >发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
// 上传图片组件
// import Upload from '../components/Upload'
export default {
  components: {
    VueEditor
    // Upload
  },
  data() {
    return {
      token:localStorage.getItem('token'),
      checkList:[],
      categoriesList:[],
      
      form: {
        title: '',
        content: '',
        type:1,
        categories: [],
        cover: []
      }
    }
  },
  watch:{
    checkList(){
      this.form.categories=this.checkList.map(el=>{
        return{
          id:el
        }
      })
    }
  },
  created(){
    this.loadCategory();
    if(this.$route.query.id){
      this.loadPost()
    }
  },
  methods: { 
    loadCategory(){
      this.$axios({
        url:'/category'
      }).then(res=>{
        console.log(res.data);
        // 获取到的栏目数据赋值到data
        // 使用数组过滤器 filter 
        this.categoriesList=res.data.data.filter(el=>{  
           return el.id != 0 && el.id !=999
        })
           console.log(this.form.categories); 
      })
    },
    loadPost(){
      this.$axios({
        url:'/post/' + this.$route.query.id,
      }).then(res=>{
        console.log(res.data);
      
      // 获取数据的时候处理 checkList 
        this.checkList=res.data.data.categories.map(el=>{
          return el.id
        })  
        // 处理旧文章的封面图片显示问题
        // 数据里面 cover 地址需要添加基准地址
       const newCover = res.data.data.cover.map(img=>{
          const newImg={...img}
          if(newImg.url.indexOf('http') == -1){
            newImg.url = this.$axios.defaults.baseURL + newImg.url
          }
          return newImg
        })
        res.data.data.cover = newCover

        // 兼容旧数据
        res.data.data.content = res.data.data.content.replace(/div/g, 'p')

          this.form=res.data.data
      })
       
    },
    coverSuccess(res,file){
      console.log('上传封面成功');
      file.id=res.data.id;
      this.form.cover.push(file)
    },
    // 删除图片 
    coverRemove(file,fileList){
      this.form.cover=fileList
    },
    // 选择图片触发的函数 ,要传4个参数
    // file(选中的图片)、Editor(当前编辑器实例对象)、cursorLocation(当前光标所在位置)
    // resetUploader(这是上传完图片来重新1初始化上传功能的函数)
    // 实现功能:实现在富文本编辑器里面上传图片
    // 步骤:
    // 1.上传图片，ajax配合FormData
    // var formdata = new FormData();
    // formData.append('file',file)
    // 然后data 里面直接传 formData
    // 2.拿到图片地址放入富文本框
    imgUpload(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData()
      formData.append('file', file)
      this.$axios({
        url: '/upload',
        method: 'post',
        data: formData
      }).then(res => {
        console.log(res.data.data.url)
        // 往编辑器插入内容，
        Editor.insertEmbed(
          cursorLocation,
          'image',
          this.$axios.defaults.baseURL + res.data.data.url
        )
        // 将图片插入到富文本框
        resetUploader()
      })
    },
    submit(){
      console.log(this.form);
      this.$axios({
        url:'/post',
        method:'POST',
        data:this.form
      }).then(res=>{
        console.log(res.data);
        
      })
    }
  },
 
}
</script>
<style lang="less" scoped>
// 利用触发BFC的特性 不让富文本 盖住其他元素
// .TextEditing {
//   width: 861px;
//   overflow: hidden; //给父盒子设置 溢出/隐藏
//   margin-bottom: 20px;
//   .left {
//     float: left; //子盒子设置浮动
//     width: 80px;
//     height: 40px;
//     text-align: right;
//     padding-right: 11px;
//   }
//   .rig {
//     overflow: hidden;
//   }
// }
</style>