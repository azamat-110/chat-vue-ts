<script setup lang="ts">
import IncomeMessage from '@/components/IncomeMessage.vue'
import SendImageModal from '@/components/SendImageModal.vue'
import { Status, type SendMessArr } from '@/stores/interface'
import { useDataStore } from '@/stores/store'
import { computed, ref } from 'vue'
import type { ChatScreenProps } from './interface'

const dataStore = useDataStore()
const props = defineProps<ChatScreenProps>()
const showModal = ref<boolean>(false)
let timeout: any
let userMessageInput = ref<string>('')
const userStatus = computed<string>(() =>
	props.user.status == Status.typing ? 'Печатает...' : 'Онлайн'
)

const sendButtonImg = computed(() =>
	userMessageInput.value
		? 'public/images/sendButton.png'
		: 'public/images/photoButton.png'
)

function toggleModal(): void {
	showModal.value = !showModal.value
}

function sendCurrentMessage(): void {
	const data: SendMessArr = {
		userId: props.user.id,
		messageText: userMessageInput.value,
	}
	userMessageInput.value ? dataStore.sendMessage(data) : toggleModal()
	userMessageInput.value = ''
}

function input(): void {
	if (timeout) {
		clearTimeout(timeout)
		timeout = undefined
	}
	const find: any = dataStore.users.find(a => a.id != props.user.id)
	if (!find) return
	if (find.status == Status.online)
		dataStore.updateTypingStatus(find.id, Status.typing)
	timeout = setTimeout(() => {
		dataStore.updateTypingStatus(find.id, Status.online)
	}, 2_000)
}
</script>

<template>
	<div class="chat-screen">
		<header class="header">
			<img :src="user.avatar" alt="person avatar" class="avatar" />
			<div class="userinfo">
				<h1 class="username">{{ user.name }}</h1>
				<p class="status">
					{{ userStatus }}
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
				placeholder="Написать сообщение..."
				v-model="userMessageInput"
				@input="input"
			/>
			<button class="send-button" type="submit">
				<img :src="sendButtonImg" alt="send-button" class="send-icon" />
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
