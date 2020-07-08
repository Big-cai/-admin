<template>
  <el-container class="container">
    <el-aside width="200px">
      <div class="title">
        <h3><i class="iconfont iconnew"></i></h3>
      </div>

      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#72b5fa"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>文章管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="jumpList('/index/list')">文章列表</el-menu-item>
            <el-menu-item index="1-2" @click="jumpList('/index/release')">发布文章</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <div class="info">
          <div class="user">
            <span>爸爸</span>
          </div>
          <img src="../assets/cuai.jpg" alt />

          <el-row>
            
            <el-button 
            type="primary" 
            size="small"
            @click="logout"
            >退出登录</el-button>
          </el-row>
        </div>
      </el-header>

      <el-main>
        <Breadcrumbs />
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Breadcrumbs from '../components/breadcrumbs'
export default {
  components: {
    Breadcrumbs
  },
  data() {
    return {}
  },
  created(){

  },
  methods: {
    jumpList(path) {
      console.log(path)
      console.log(this.$route.path)

      if (this.$route.path != path) {
        this.$router.push(path)
      }
    },
    logout(){
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.el-header,
.el-footer {
  background-color: #ccffff;
  color: #333;
  line-height: 60px;
  .info {
    display: flex;
    align-items: center;
    justify-self: right;
    justify-content: flex-end;
    
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 40px;
      margin-right: 40px;
    }
    .user {
      span {
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
}
.el-aside {
  background-color: #b8a4ab;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #f3f3f3;
  color: #333;
  line-height: 40px;
 
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu-vertical-demo {
  width: 201px;
}

.title {
  background-color: #ccffff;
  h3 {
    height: 60px;
    line-height: 60px;
    font-weight: normal;
    i{
      font-size: 68px;
      color: #409eff;
    }
  }
}
</style>