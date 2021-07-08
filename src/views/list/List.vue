<!-- 列表页 -->
<template>
  <div class="List">
    <haha-Hello>123</haha-Hello>
    <SwitchTabVue :tab-list="tabList" @tabChange="tabChange" />

    <section v-show="activeKey === 'hot'">
      <div>选择了热门车型</div>
      <div class="center-part">
        <ul class="list-wrap">
          <li class="list-item" v-for="item in numList">
            <p class="text">{{ item }}</p>
          </li>
        </ul>
        <div class="ad" v-show="showAD">广告</div>
      </div>
    </section>
    <section v-show="activeKey === 'installment'">选择了分期购车</section>

    <button @click="adShowChange">{{ showAD ? '删除广告' : '添加广告' }}</button>
  </div>
</template>

<script lang='ts'>
import SwitchTabVue from "@/components/SwitchTab.vue";
import { getCurrentInstance, watchEffect, reactive, ref, h, toRef, toRefs } from 'vue'
export default {
  name: 'List',
  /**
   * 请不要解构 props 对象，因为它会失去响应式
   */
  setup(props: any) {
    console.log("🚀  setup ~ props", props)
    const numList = ['00', '11', '22', '33', '44', '55', '66', '77', '88', '99',]
    let showAD = ref(true)

    const adShowChange = () => {
      showAD.value = !showAD.value
    }

    // 获取全局变量
    const instance = getCurrentInstance()
    console.log("🚀  instance", instance?.appContext.config.globalProperties.$foo)


    watchEffect(() => {
      console.log(`name is: ` + props.name)
    })

    // 切换车源tab
    let activeKey = ref('hot')
    const tabList = ref([{ name: "热门", key: "hot" }, { name: "分期购车", key: "installment" }])
    const tabChange = (key: string) => {
      activeKey.value = key
    }

    // 响应式 API
    // 1、toRef 可以用来为源响应式对象上的某个 property 新创建一个 ref。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。
    const state = reactive({
      foo: 1,
      bar: 2
    })
    const fooRef = toRef(state, 'foo')
    fooRef.value++
    console.log(state.foo) // 2
    state.foo++
    console.log(fooRef.value) // 3

    // 2、toRefs 将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 ref
    const state2 = reactive({
      foo: 1,
      bar: 2
    })

    const stateAsRefs = toRefs(state2)
    /*
    stateAsRefs 的类型:

    {
      foo: Ref<number>,
      bar: Ref<number>
    }
    */
    // ref 和原始 property 已经“链接”起来了
    state.foo++
    console.log(stateAsRefs.foo.value) // 2

    stateAsRefs.foo.value++
    console.log(state.foo) // 3


    return {
      activeKey,
      tabList,
      tabChange,
      numList,
      showAD,
      adShowChange
    };



    // 渲染函数/JSX 的方法
    // const count = ref(0)
    // const object = reactive({ foo: 'bar' })
    // return () => h('div', [count.value, object.foo])
  },
  components: { SwitchTabVue }
};
</script>
<style lang='scss' scoped>
.center-part {
  background: pink;
  display: flex;
  width: 600px;
  .list-wrap {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .list-item {
      width: 100px;
      padding: 5px 10px;
      .text {
        background: #f10;
        height: 100px;
      }
    }
  }
  .ad {
    width: 100px;
    height: 200px;
    background: yellow;
    margin-right: 10px;
  }
}
</style>
