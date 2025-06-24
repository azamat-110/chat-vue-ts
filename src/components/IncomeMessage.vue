<script setup lang="ts">
import type { Props } from './IncomeMessageProps.vue'
const props = defineProps<Props>()
const messageTextClass =
	props.messageData.userId == props.userId
		? 'outcome-message'
		: 'income-message'
const sendMessageClass = props.messageData.userId == props.userId ? 'end' : ''
const messageImageClass = props.messageData.imgUrl ? 'with-img' : 'without-img'

let mins: number = Math.round(props.messageData.messageTime / 60000)
let hours: number = Math.floor(mins / 60)
mins %= 60
hours %= 24
const solveMessageTime = hours + 5 + ':' + mins
</script>

<template>
	<div class="send-message" :class="sendMessageClass">
		<div v-if="messageData.userId == userId" class="message-time">
			{{ solveMessageTime }}
		</div>
		<div class="message-text" :class="messageTextClass">
			<img v-if="messageData.imgUrl" :src="messageData.imgUrl" alt="img" />
			<p :class="messageImageClass">
				{{ messageData.messageText }}
			</p>
		</div>
		<div v-if="messageData.userId != userId" class="message-time">
			{{ solveMessageTime }}
		</div>
	</div>
</template>

<style></style>
