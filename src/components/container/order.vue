<template>
  <el-card class="box-card">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="用户名" width="180" />
      <el-table-column prop="phone" label="手机号" width="180" />
      <el-table-column prop="order_name" label="商品名称" />
      <el-table-column prop="order_tons" label="商品重量" />
      <el-table-column prop="order_total" label="商品总价" />
      <el-table-column prop="order_img" label="商品预览图">
        <template #default="{ row }">
          <img :src="row.order_img" class="w-[60px]" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="control" label="操作">
        <template #default="{ $index, row }">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete($index, row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script setup>
import { createClient } from "@supabase/supabase-js";
import { ref, onMounted } from "vue";

const supabaseUrl = "https://vnswcmkocaomjscnsdsl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuc3djbWtvY2FvbWpzY25zZHNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1NDExNTMsImV4cCI6MTk5NzExNzE1M30.mWRgT9fQ-dULZH9X4f9UfYlLRTvw07eHI3u-Ch0fLjs";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const tableData = ref([]);

onMounted(async () => {
  await fetchData();
});

async function fetchData() {
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("*");

  if (ordersError) {
    console.error("Error fetching orders data:", ordersError);
    return;
  }

  const { data: users, error: usersError } = await supabase
    .from("user_info")
    .select("*");

  if (usersError) {
    console.error("Error fetching users data:", usersError);
    return;
  }

  tableData.value = orders.map((order) => {
    const userInfo = users.find((user) => user.user_id === order.user_id);
    return {
      id: order.id, // 添加订单 ID
      name: userInfo.name,
      phone: userInfo.phone,
      order_name: order.product_title,
      order_tons: order.tons + "吨",
      order_total: order.total_price + "тг",
      order_img: `~/assets/${order.product_image}`,
    };
  });
}

async function handleDelete(index, row) {
  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", row.id);

  if (error) {
    console.error("Error deleting order:", error);
    return;
  }

  await fetchData();
}

</script>
