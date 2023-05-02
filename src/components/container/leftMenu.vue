<template>
  <el-menu
    class="el-menu-vertical-demo h-[100vh]"
  >
    <el-menu-item :index="String(index)" v-for="(menu,index) in menuList" @click="$emit('change',menu.id)">
      <span>{{ menu.name }}</span>
    </el-menu-item>

  </el-menu>
</template>
<script setup>

const menuList = [
    {
        name:"订单",
        id:1
    },
    {
        name:"地址",
        id:2
    },
]
</script>
