<template>
  <div class="home">
    <el-dialog v-model="show" title="请先输入姓名">
      <el-input v-model="name"></el-input>
      <template #footer>
        <el-button @click="show = false">推出</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </template>
    </el-dialog>
    <div class="file-list">
      <div class="item" v-for="name in files" :key="name">
        <el-link @click="toFile(name)">{{name}}</el-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, ref, onMounted } from 'vue'
import { useRouter} from 'vue-router'
import { useUser } from '@/store/user'
import { files } from '@/config/config'

const { name } = toRefs(useUser())
const show = ref(false)
const router = useRouter()

onMounted(() => { 
  if (!name.value) { 
    show.value = true
  }
})

function submit() { 
  localStorage.setItem('name', name.value)
  show.value = false
}

function toFile(name: string) { 
  
  console.log(router)

  router.push({
    path: `/file/${name}`
  })
}
</script>
