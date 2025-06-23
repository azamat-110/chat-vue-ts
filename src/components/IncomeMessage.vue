<script setup lang="ts">
interface Props {
	messageData: object
	userId: number
}
const props = defineProps<Props>()
</script>

<template>
	<div class="send-message" :class="messageData.userId === userId ? 'end' : ''">
		<div v-if="messageData.userId === userId" class="message-time">
			{{ messageData.messageTime }}
		</div>
		<div
			class="message-text"
			:class="
				messageData.userId === userId ? 'outcome-message' : 'income-message'
			"
		>
			<img v-if="messageData.imgUrl" :src="messageData.imgUrl" alt="img" />
			<p :class="messageData.imgUrl ? 'with-img' : 'without-img'">
				{{ messageData.messageText }}
			</p>
		</div>
		<div v-if="messageData.userId !== userId" class="message-time">
			{{ messageData.messageTime }}
		</div>
	</div>
</template>

<style></style>
