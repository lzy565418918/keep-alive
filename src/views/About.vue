<template>
  <div class="about">
    <h1>This is an about page </h1>
    <button @click="$router.back()">返回</button>
    <button @click="back">返回时清空上一个页面得缓存</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  computed: {
    query () {
      return this.$route.query
    }
  },
  mounted () {
    console.log(this.query.a, ':', typeof this.query.a, ';', this.query.b, typeof this.query.b)
  },
  methods: {
    ...mapActions(['removeTargetRoute']),
    back () {
      this.removeTargetRoute('Home')
      this.$router.back()
    }
  }
}
</script>
