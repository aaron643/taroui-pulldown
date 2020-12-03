import { Component } from '@vue/runtime-core'
import AtComponent from './base'

export interface AtFlexItemProps extends AtComponent {
  isAuto: boolean
  isWrap: boolean
  align: 'top' | 'bottom' | 'center'
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  offset: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

export declare const AtFlexItem: Component<AtFlexItemProps>

export interface AtFlexProps extends AtComponent {
  wrap: 'no-wrap' | 'wrap' | 'wrap-reverse'
  align: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
  justify: 'start' | 'end' | 'center' | 'between' | 'around'
  direction: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  alignContent: 'start' | 'end' | 'center' | 'stretch' | 'between' | 'around'
}

export declare const AtFlex: Component<AtFlexProps>