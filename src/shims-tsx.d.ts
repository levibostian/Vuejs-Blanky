/* eslint-disable */

/**
 * This file is given to us from Vuejs. We want to leave it alone so we are disabling eslint so it stays untouched. 
 */
import Vue, { VNode } from "vue"

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}