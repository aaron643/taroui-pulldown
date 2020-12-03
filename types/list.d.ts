import { Component } from '@vue/runtime-core'
import { CommonEventFunction } from '@tarojs/components/types/common'

import AtComponent, { AtIconBaseProps } from './base'

export interface AtListProps extends AtComponent {
  /**
   * 是否有边框
   * @default true
   */
  hasBorder?: boolean
}

export declare const AtList: Component<AtListProps>

export interface AtListItemProps extends AtComponent {
  /**
   * 是否有边框
   */
  hasBorder?: boolean
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 元素的描述信息
   */
  note?: string
  /**
   * 元素的标题
   */
  title?: string
  /**
   * 元素的主要缩略图
   */
  thumb?: string
  /**
   * 额外信息是否开关
   */
  isSwitch?: boolean
  /**
   * 额外信息的文本
   */
  extraText?: string
  /**
   * 额外信息的缩略图
   */
  extraThumb?: string
  /**
   * 额外信息开关的值
   */
  switchIsCheck?: boolean
  /**
   * 开关的颜色
   */
  switchColor?: string
  /**
   * icon 信息
   */
  iconInfo?: AtIconBaseProps
  /**
   * 箭头的方向
   */
  arrow?: 'up' | 'down' | 'right'
  /**
   * 用户点击元素触发的事件
   */
  onClick?: CommonEventFunction
  /**
   * 用户点击切换 Switch 时触发
   */
  onSwitchChange?: CommonEventFunction
}

export declare const AtListItem: Component<AtListItemProps>