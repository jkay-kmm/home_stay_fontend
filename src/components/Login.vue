<script setup>
import axios from 'axios'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const message = ref('')

const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: email.value,
      password: password.value
    })
    message.value = '✅ Đăng nhập thành công!'
    console.log(res.data)
  } catch (err) {
    message.value = '❌ Đăng nhập thất bại!'
    console.error(err)
  }
}
</script>

<template>
  <div style="margin: 40px">
    <h2>Đăng nhập</h2>
    <input v-model="email" placeholder="Email" style="display:block; margin:10px 0" />
    <input v-model="password" type="password" placeholder="Mật khẩu" style="display:block; margin:10px 0" />
    <button @click="handleLogin">Đăng nhập</button>
    <p>{{ message }}</p>
  </div>
</template>
