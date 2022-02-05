<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  id: String
})

console.log(props.id, 'setup')
</script>

<template>
<h1>About === {{ id }}</h1>
</template>

<style scoped>
a {
    color: #42b983;
}

label {
    margin: 0 0.5em;
    font-weight: bold;
}

code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
}
</style>
