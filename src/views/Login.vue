<template>
  <div class="container">
    <!-- 输入框部分 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名:">
        <el-input v-model="form.username" class="val_input" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input
          v-model="form.password"
          value="123"
          type="password"
          class="val_input"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <!-- 按钮部分 -->
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="removeInput">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '10086',
        password: '123'
      }
    }
  },
  methods: {
    removeInput() {
      this.form = {
        username: '',
        password: ''
      }
    },
    login() {
      if (!this.form.username || !this.form.password) {
        this.$message.error('请输入完整信息')
        return
      } else {
        this.$axios({
          url: '/login',
          method: 'post',
          data: this.form
        }).then(res => {
          console.log(res.data)
          this.$message.success('登录成功')
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.data.user))
          console.log('chenggong')

          this.$router.push('/index')
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: pink;
  // background-image: url('../assets/02.png');
  // background-repeat: no-repeat;
  // background-size: cover;

  .val_input {
    width: 200px;
  }

}
</style>