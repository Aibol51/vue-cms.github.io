<template>
  <div class="flex justify-between items-center h-full bg-indigo-500 px-[3%]">
    <h1 class="font-bold text-2xl text-light-50">Stroy Kad后台管理系统</h1>
    <el-button type="danger" @click="logOut">登出</el-button>
  </div>
</template>
<script setup>
function logOut(){
    localStorage.clear()
    location.reload()
}
</script>