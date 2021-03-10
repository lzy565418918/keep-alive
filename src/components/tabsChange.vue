<template>
  <div class="tab-click" :class="className||''">
      <div
        class="tab-click-item"
        :class="item.active==true?'tab-click-item--active':''"
        v-for="(item,index) in tabListCopy"
        :key="index"
        @click="getItem(item)"
      >
        <i></i>
        <span>{{item.name}}</span>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    value: null,
    className: { type: String, default: '' },
    tabList: {
      type: Array,
      default: () => [{ name: '单笔交易', value: 1 }, { name: '多笔交易', value: 2 }]
    }
  },
  data () {
    return {
      tabListCopy: []
    }
  },
  created () {
    this.setData()
  },
  methods: {
    setData () {
      const list = JSON.parse(JSON.stringify(this.tabList))
      list.forEach(item => {
        if (item.value === this.value) {
          item.active = true
        } else item.active = false
      })
      this.tabListCopy = list
    },
    getItem (item) {
      if (this.$listeners && this.$listeners.tabClick) {
        if ('active' in item) delete item.active
        this.$listeners.tabClick(item)
      } else {
        if ('active' in item) delete item.active
        this.$emit('input', item.value)
        this.$emit('change', item)
      }
    },
    watch: {
      value: 'setData',
      tabList: 'setData'
    }
  }
}
</script>

<style lang="less">
.tab-click{
    height: 80px;
    background-color: #fff;
    display: flex;
    font-style: 30px;
    text-align: center;
    line-height: 80;
    &-item{
        flex: 1;
        height: 100%;
        position: relative;
        color: rgba(0, 0, 0, 0.45);
        transition: al .25s ease-in-out;
        i{
            position: absolute;
            bottom: 0;
            left: 50%;
            height: 5px;
            width: 34px;
            transform: translateX(-17px);
            background-color: #1f52f9;
            opacity: 0;
            transition: al .25s ease-in-out;
        }
        &--active{
            color: #1f52f9;
            i{
                opacity: 1;
            }
        }
    }
}
</style>
