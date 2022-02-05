<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    props: {
        msg: {
            type: String,
            required: true
        }
    },
    setup(props) {
        console.log('test.vue setup props', props.msg)
        const count = ref(0);
        const add = () => count.value++;

        return {
            count,
            add
        }
    }
})
</script>

<template>
    <hr />
    <h1>Test.vue</h1>
    <h1>{{ msg }}</h1>

    <button type="button" @click="add">count is: {{ count }}</button>
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
