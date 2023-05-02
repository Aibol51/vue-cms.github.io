<template>
  <el-row class="min-h-screen bg-indigo-500">
    <el-col :lg="16" :md="12" class="flex items-center justify-center">
      <div>
        <div class="font-bold text-5xl text-light-50 mb-4">
          Stroy Kad后台管理系统
        </div>
        <div class="text-gray-200 text-lg">Stroy Kad后台管理系统</div>
      </div>
    </el-col>
    <el-col
      :lg="8"
      :md="12"
      class="bg-light-50 flex items-center justify-center flex-col"
    >
      <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
      <div
        class="flex items-center justify-center my-5 text-gray-300 space-x-2"
      >
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <span>账号密码登录</span>
        <span class="h-[1px] w-16 bg-gray-200"></span>
      </div>
      <el-form :model="form" ref="formRef" class="w-[250px]" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon class="el-input__icon"><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            show-password
          >
            <template #prefix>
              <el-icon class="el-input__icon"><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="w-[250px]"
            round
            color="#626aef"
            type="primary"
            @click="() => signInWithUsername(form.username, form.password)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
// 在<script setup>标签内的其他导入下方
import { createClient } from "@supabase/supabase-js";
import { login } from "~/auth.js";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const supabaseUrl = "https://vnswcmkocaomjscnsdsl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuc3djbWtvY2FvbWpzY25zZHNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1NDExNTMsImV4cCI6MTk5NzExNzE1M30.mWRgT9fQ-dULZH9X4f9UfYlLRTvw07eHI3u-Ch0fLjs";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const form = reactive({
  username: "",
  password: "",
});
const rules = {
  username: [
    { required: true, message: "请输入有效用户名", trigger: "blur" },
    { min: 3, max: 15, message: "长度在3-5个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入有效密码", trigger: "blur" },
    { min: 6, max: 15, message: "长度在6-10个字符", trigger: "blur" },
  ],
};

const formRef = ref(null);

async function signInWithUsername(username, password) {
  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("password_hash")
      .eq("username", username)
      .single();

    if (error) {
      console.error("登录失败: ", error.message);
      return false;
    }

    if (!users) {
      console.error("用户不存在");
      return false;
    }

    const isPasswordCorrect = password === users.password_hash;

    if (!isPasswordCorrect) {
      ElMessage.error("密码错误");
      console.error("密码错误");
      return false;
    }
    ElMessage({
      message: "登录成功.",
      type: "success",
    });
    console.log("登录成功");
    login(); // 更新 isAuthenticated 状态
    location.reload();

    return true;
  } catch (error) {
    console.error("登录异常: ", error.message);
    return false;
  }
}
</script>
