<template>
  <div class="common-layout">
    <el-container>
      <el-header class="p-0">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px"><Aside @change="e=>handleMenuChange(e)"></Aside></el-aside>
        <el-main><Order v-if="index===1"></Order></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Header from '~/components/container/header.vue';
import Aside from '~/components/container/leftMenu.vue';
import Order from '~/components/container/order.vue';
import { ref } from 'vue';
const index = ref(0)

function handleMenuChange(idx){
    index.value = idx
    console.log(idx);
}
</script>