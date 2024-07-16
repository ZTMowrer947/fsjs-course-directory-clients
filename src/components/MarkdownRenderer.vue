<template>
  <div v-html="markdown.render(source)"></div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt();

defineProps<{ source: string }>();
</script>
