<script setup lang="ts">
import IncomeMessage from '@/components/IncomeMessage.vue'
import SendImageModal from '@/components/SendImageModal.vue'
import { useDataStore } from '@/stores/store'
import { ref } from 'vue'
import type { Messages } from '@/stores/store'

interface Props {
	user: object
}

const dataStore = useDataStore()
const props = defineProps<Props>()
const showModal = ref<boolean>(false)

const photoButton = new URL('@/assets/images/photoButton.png', import.meta.url)
const sendButton = new URL('@/assets/images/sendButton.png', import.meta.url)

function toggleModal(): void {
	showModal.value = !showModal.value
	dataStore.currentUserId = props.user.id
}

function sendCurrentMessage(): void {
	props.user.messageInput
		? dataStore.sendMessage(props.user.id, props.user.messageInput)
		: toggleModal(props.user.id)
	props.user.messageInput = ''
}
let timeout: ReturnType<typeof setTimeout>
function input(): void {
	if (timeout) {
		clearTimeout(timeout)
		timeout = undefined
	}
	const find: object = dataStore.users.find(a => a.id != props.user.id)
	if (!find) return
	if (!find.isTyping) dataStore.updateTypingStatus(find.id, true)
	timeout = setTimeout(() => {
		dataStore.updateTypingStatus(find.id, false)
	}, 2000)
}

// SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU
// https://github.com/azamat-110/chat-vue-ts
</script>

<template>
	<div class="chat-screen">
		<header class="header">
			<img :src="user.avatar" alt="person avatar" class="avatar" />
			<div class="userinfo">
				<h1 class="username">{{ user.name }}</h1>
				<p class="status">
					{{ user.isTyping ? 'Печатает...' : 'Онлайн' }}
				</p>
			</div>
		</header>
		<div class="messages">
			<IncomeMessage
				v-for="message in dataStore.messages"
				:key="message.id"
				:messageData="message"
				:userId="user.id"
			/>
		</div>

		<form class="footer" @submit.prevent="sendCurrentMessage">
			<input
				type="text"
				class="message-input"
				id="messageInput"
				placeholder="Написать сообщение..."
				v-model="user.messageInput"
				@input="input"
			/>

			<button class="send-button" type="submit">
				<img
					:src="user.messageInput ? sendButton : photoButton"
					alt="send-button"
					class="send-icon"
				/>
			</button>
			<SendImageModal
				v-if="showModal"
				@toggleModal="toggleModal"
				:userId="user.id"
			/>
		</form>
	</div>
</template>

<style></style>
