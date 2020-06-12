<template>
  <div class="h-full">
    <header class="bg-gray-100 fixed w-full h-16 shadow-md z-50">
      <a-row class="p-5">
        <a-col :span="4">
          <h1 class="font-sans text-xl">Logo</h1>
        </a-col>
        <a-col :span="20">
          <!--          Some additional contents here..-->
        </a-col>
      </a-row>
    </header>
    <a-layout class="h-full pt-16">
      <a-layout-sider class="h-full shadow-xl">
        <a-menu
          mode="vertical"
          class="h-full w-full"
          @select="switchRoute"
          :default-selected-keys="[$options.ROUTE_LINKED_LIST]"
        >
          <a-sub-menu
            v-for="subMenu in $options.NAV_MENU_LIST"
            :key="subMenu.key">
            <span class="font-medium" slot="title"><a-icon :type="subMenu.icon"/>
              {{subMenu.title}}
            </span>
            <a-menu-item v-for="menuItem in subMenu.menuItems" :key="menuItem.key">
              <a-icon v-show="menuItem.icon" :type="menuItem.icon"/>
              {{menuItem.title}}
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <router-view/>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
  import {ROUTE_LINKED_LIST} from "@/router/route-constants";
  import {NAV_MENU_LIST} from "@/router/nav-menu-items";

  export default {
    name: 'root-dashboard',
    components: {},
    methods: {
      switchRoute({key}) {
        this.$router.push({name: key});
      }
    },
    NAV_MENU_LIST: NAV_MENU_LIST,
    ROUTE_LINKED_LIST: ROUTE_LINKED_LIST
  }
</script>

<style>

</style>
