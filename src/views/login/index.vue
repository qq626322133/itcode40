<template>
  <!-- 登录页面 -->
  <div class="login">
    <div class="login-warp">
      <!-- logo区域 -->
      <div class="loginlogo">
        <img src="./logo_index.png" alt>
      </div>
      <!-- el-form:管理所有表单元素的父容器 ref:vue 中提供的操作 dom的方法 model:表单元素的数据源 -->
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="mobile">
          <!-- el-from-item:表单域 lobel:当前选项的描述文字 -->
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 一行 -->
          <el-col :span="14">
            <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="8" :offset="2">
            <!-- timer: 2 (定时器的标识) 定时器开启 timer:null定时器关闭 -->
            <el-button :disabled="!!timer" class="colBtn" @click="getCode">
              {{timer ? `${codeTime}秒后获取`:'获取验证码'}}
            </el-button>
          </el-col>
        </el-form-item>
        <el-form-item prop="read">
          <el-checkbox v-model="form.read" name="type">
            我已阅读并同意
            <a href="#">用户协议</a>和
            <a href="#">隐私条款</a>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="loginbtn" @click="login" :loading="loginloading" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 导入 axios
import axios from 'axios'
import { setInterval, clearTimeout } from 'timers'
export default {
  data () {
    return {
      // 表单的参数
      form: {
        mobile: '13911111111',
        code: '246810',
        read: false

      },
      // 控制菊花的显示
      loginloading: false,
      // 定义规则
      rules: {
        mobile: [
          // 必填
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          // 限制长度
          { min: 11, max: 11, message: '长度必须为11', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度必须为6', trigger: 'blur' }
        ],
        read: [
          { required: true, message: '请先阅读用户协议', trigger: 'change' },
          // 限制结果为 true 正则
          // pattern:设置一个正则规则
          // pattern: /true/只能匹配到结果为true
          { pattern: /true/, message: '请先阅读用户协议', trigger: 'change' }
        ]
      },
      // 倒计时的时间
      codeTime: 10,
      // 设置一个定时器
      timer: null
    }
  },
  methods: {
    // 用户的登录
    login () {
      // 得到 el-form 元素
      // this.$refs['form']
      this.$refs['form'].validate(valid => {
        // 如果valid 为true 说明验证通过
        // 如果valid 为false 说明验证不通过
        if (valid) {
          // 将数据提交到服务器
          this.submitData()
        } else {
          // 结束当前方法
        }
      })
    },
    // 数据的提交
    submitData () {
      // 将加载状态设置为 true
      this.loginloading = true
      // 发送请求到服务器
      axios({
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        method: 'POST',
        data: this.form
      })
        .then(res => {
          // res 中有一个属性叫做 data在 data 中有两个属性后面我们会用上: token, refresh_token
          // 得到用户信息
          let userInfo = res.data.data
          // 将用户的信息保存到 localstorage 中
          window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
          // 只要进入到这个方法中说明登录成功

          this.$message({
            message: '登录成功',
            type: 'success'
          })
          // 将加载状态设置为 false
          this.loginloading = false
          // 跳转到主页
          this.$router.push('./')
        })
        .catch(err => {
          console.log(err)
          this.$message.error('手机号或者验证码错误')
        })
    },
    getCode () {
      // 获取 form 表单
    // validateField(field,callback)
    // field: 要验证的字段
    // callback:验证后的回调函数
    // errMsg 验证不通过时提示的文本
      this.$refs['form'].validateField('mobile', errMsg => {
        if (errMsg.trim().length > 0) {
        // 说明验证不通过
          return
        }
        // 验证通过:开启倒计时
        this.timer = setInterval(() => {
          // 时间需要减少
          this.codeTime--
          // 当时间为 0时，需要定时器消除
          if (this.codeTime <= 0) {
            clearTimeout(this.timer)
            // 重置倒计时
            this.codeTime = 10
            // 将定时器重置为 null
            this.timer = null
          }
        }, 1000)
      })
    }
  }
}
</script>

<style lang="less" scope>
.login {
  height: 100%;
  // flex 布局
  display: flex;
  // 主轴居中: 默认 水平
  justify-content: center;
  // 侧轴居中: 默认 垂直
  align-items: center;
  background-color: #ccc;
  .login-warp {
    background-color: #fff;
    padding: 30px;
    min-width: 300px;
    .loginlogo {
      text-align: center;
      img {
        width: 170px;
        margin-bottom: 20px;
      }
    }
    .loginbtn {
      width: 100%;
    }
    .colBtn {
      width: 100%;
    }
  }
}
</style>
