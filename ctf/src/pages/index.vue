<template>
  <div>
    <button v-on:click="getALL">点击查看</button>
    <button v-on:click="logout">退出</button>
  </div>

</template>

<script>
    export default {
        name: "index",
      methods: {
        getALL: function () {
          console.log(this.$store.getters.getsToken)
          this.$http.get('/yii/home/index/test', {}).then(res => {
            console.log(res.data)
            alert('注册成功')
          }).catch(function (error) {
            console.log(error)
          })
        },
        logout:function () {
          this.$store.dispatch('logout')
          this.$store.dispatch('slogout')
          this.$router.push({path:'/login'})
          alert("退出成功")
      //     this.$http.post('/yii/home/index/logout',{
      //       username:this.loginForm.username,
      //     }).then(res=>{
      //       console.log(res.data)
      //       var message = res.data.message
      //       this.$store.dispatch('login',res.data.data)
      //       this.$store.dispatch('slogin',res.data.data)
      //       alert(message)
      //       this.$router.push({path:'/'})
      //       console.log(this.$store.getters.getsToken)
      //       // console.log(localStorage.getItem("Token"))
      //     }).catch(function (error) {
      //       console.log(error)
      //     })
        }
      }
    }
</script>

<style scoped>

</style>
