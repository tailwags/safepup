<script setup lang="ts">
import { ApiReference } from '@scalar/api-reference';
import '@scalar/api-reference/style.css';
</script>
<template>
	<ApiReference
		:configuration="{
			url: 'http://localhost:3000/api/v1/openapi.json',
			hideClientButton: true,
			theme: 'deepSpace',
			telemetry: false,
		}"
	/>
</template>
