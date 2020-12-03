<template>
  <page header-title="下拉刷新上拉加载组件">
    <panel
      no-padding
      title="基本用法"
    >
      <example-item>
        <pullDown :on-refresh="onDownRefresh" :on-pull="onPullRefresh">
          <at-list v-for="(item,index) in itemList">
            <at-list-item
              :title="index"
            />
          </at-list>
        </pullDown>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs  } from "vue"
import Taro from "@tarojs/taro"
import AtList from "@/components/list"
import AtListItem from "@/components/list/item"
import { Page, Panel, ExampleItem } from "../demo-page"
import pullDown from '../pullDown/pullDown.vue'
export default defineComponent({
  name: "ListDemo",
  components: {
    Page,
    pullDown,
    Panel,
    ExampleItem,
    AtList,
    AtListItem,
  },

  setup() {
    const state = reactive<PageFormState>({
      itemList:[{"title":"第一条"},{"title":"第二条"},{"title":"第三条"},{"title":"第四条"}],
      itemList1:[{"title":"第五条"},{"title":"第二条"},{"title":"第三条"},{"title":"第四条"}]
    })
    function onDownRefresh(){
      state.itemList1.map(item =>{
        state.itemList.push(item)
      })
    }
    function onPullRefresh(){
      state.itemList1.map(item =>{
        state.itemList.push(item)
      })
    }
    return {
      ...toRefs(state),
      onDownRefresh,
      onPullRefresh
    }
  }
})
</script>
