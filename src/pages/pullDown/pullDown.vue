<template>
  <View>
          <View className='dragUpdataPage'>
              <View className='downDragBox'>
                  <AtActivityIndicator></AtActivityIndicator>
                  <Text className='downText'>{{downText}}</Text>
              </View>
              <ScrollView
                  :style="dargStyle"
                  @touchMove="touchmove"
                  @touchEnd="touchEnd"
                  @touchStart="touchStart"
                 @srollToUpper="ScrollToUpper"
                 @srollToLower="ScrollToLower"
                  className='dragUpdata'
                  :scrollY="scrollY"
                  scrollWithAnimation>
                  <slot>
                  </slot>
              </ScrollView>
              <View className='upDragBox' :style="upDragStyle">
                  <AtActivityIndicator></AtActivityIndicator>
                  <Text className='downText'>{{pullText}}</Text>
              </View>
          </View>
    </View>
</template>
<script lang="ts">
import { watch, defineComponent,ref, computed, reactive, toRefs } from 'vue'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import  { AtNavBar,AtCard ,AtSwitch, AtActivityIndicator, AtInput,AtButton ,AtForm } from "@/components/index"
import './pullDown.scss'
export default defineComponent({
  name: "Login",
  props:{
    onRefresh: {
      type: Function,
      default: () => () => { }
    },
    onPull: {
      type: Function,
      default: () => () => { }
    },
  },
  components: {
    AtActivityIndicator,
    Text,
    ScrollView,
    View
  },
  setup(props: AtAccordionProps) {
    const state = reactive<PageFormState>({
      pullText:"",
      dargStyle: {//下拉框的样式
          top: 0 + 'px'
      },
      downDragStyle: {//下拉图标的样式
          height: 0 + 'px'
      },
      downText: '下拉刷新',
      upDragStyle: {//上拉图标样式
          height: 0 + 'px'
      },
      pullText: '上拉加载更多',
      start_p: {},
      scrollY:true,
      dargState: 0//刷新状态 0不做操作 1刷新 -1加载更多
    })
   function touchStart(e) {
      state.start_p = e.touches[0]
    }
    function touchmove(e) {
        let move_p = e.touches[0],//移动时的位置
            deviationX = 0.30,//左右偏移量(超过这个偏移量不执行下拉操作)
            deviationY = 30,//拉动长度（低于这个值的时候不执行）
            maxY = 100;//拉动的最大高度

        let start_x = state.start_p.clientX,
            start_y = state.start_p.clientY,
            move_x = move_p.clientX,
            move_y = move_p.clientY;


        //得到偏移数值
        let dev = Math.abs(move_x - start_x) / Math.abs(move_y - start_y);
        if (dev < deviationX) {//当偏移数值大于设置的偏移数值时则不执行操作
            let pY = Math.abs(move_y - start_y) / 3.5;//拖动倍率（使拖动的时候有粘滞的感觉--试了很多次 这个倍率刚好）
			if (move_y - start_y > 0) {//下拉操作
				if (pY >= deviationY) {
          state.dargState =  1; state.downText =  '释放刷新'
				} else {
          state.dargState=  0; state.downText=  '下拉刷新'
				}
				if (pY >= maxY) {
					pY = maxY
				}
        state.dargStyle =  {
          top: pY + 'px',
        };
        state.downDragStyle= {
          height: pY + 'px'
        };
        state.scrollY=false//拖动的时候禁用
			}
			if (start_y - move_y > 0) {//上拉操作
				console.log('上拉操作')
				if (pY >= deviationY) {
					// setState({ dargState: -1, pullText: '释放加载更多' })
          state.dargState = -1;
          state.pullText = '释放加载更多'
				} else {
					// setState({ dargState: 0, pullText: '上拉加载更多' })
          state.dargState = 0;
          state.pullText = '上拉加载更多'
				}
				if (pY >= maxY) {
					pY = maxY
				}
        state.dargStyle = {
          top: -pY + 'px',
        }
        state.upDragStyle = {
          height: pY + 'px'
        }
        state.scrollY = false//拖动的时候禁用
			}

        }
    }
    function reduction() {//还原初始设置
        const time = 0.5;
        // setState({
          state.upDragStyle = {//上拉图标样式
                height: 0 + 'px',
                transition: `all ${time}s`
            }
            state.dargState = 0
            state.dargStyle = {
                top: 0 + 'px',
                transition: `all ${time}s`
            }
            state.downDragStyle = {
                height: 0 + 'px',
                transition: `all ${time}s`
            }
            state.scrollY = true
        // })
        setTimeout(() => {
            // setState({
              state.dargStyle = {
                    top: 0 + 'px',
                }
                state.upDragStyle = {//上拉图标样式
                    height: 0 + 'px'
                }
                state.pullText = '上拉加载更多'
                state.downText = '下拉刷新'
            // })
        }, time * 1000);
    }
    function  pull() {//上拉
      // props.onRefresh();
        // props.onPull()
        props.onPull();
    }
    function down() {//下拉
      props.onRefresh();
        // props.onDown()
    }
    function ScrollToUpper() { //滚动到顶部事件
	console.log('滚动到顶部事件')
        // props.Upper()
    }
    function ScrollToLower() { //滚动到底部事件
	console.log('滚动到底部事件')
        // props.Lower()
    }
    function touchEnd(e) {
        if (state.dargState === 1) {
            down()
        } else if (state.dargState === -1) {
            pull()
        }
        reduction()
    }
    return {
      ...toRefs(state),
      touchmove,
      touchEnd,
      touchStart,
      ScrollToUpper,
      ScrollToLower,
      reduction,
      pull,
      down,
      ScrollToLower,
      touchEnd
    }
  }

})
</script>
