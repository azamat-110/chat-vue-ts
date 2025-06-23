import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export interface Messages {
	id: number
	userId: number
	messageText: string
	messageTime: string
	imgUrl?: string
}

export interface Users {
	id: number
	name: string
	avatar: string
	isTyping: boolean
	messageInput: string
}

export const useDataStore = defineStore('data', () => {
	let currentUserId = ref<number>(0)

	const messages = reactive<Messages[]>([
		{
			id: 0,
			userId: 0,
			messageText: 'Привет, как дела?',
			messageTime: new Date().toLocaleTimeString(),
			imgUrl: '',
		},
		{
			id: 1,
			userId: 1,
			messageText: 'Хорошо, а у тебя?',
			messageTime: new Date().toLocaleTimeString(),
			imgUrl: '',
		},
	])

	const users = reactive<Array<Users>>([
		{
			id: 0,
			name: 'Александр',
			avatar: 'public/images/alexAvatar.png',
			isTyping: false,
			messageInput: '',
		},
		{
			id: 1,
			name: 'Евгений',
			avatar: 'public/images/evgenyAvatar.png',
			isTyping: false,
			messageInput: '',
		},
	])

	function sendMessage(
		userId: number,
		messageInput: string,
		imgUrl: string = '',
		comment: string = ''
	): void {
		const time: string = new Date().toLocaleTimeString().slice(0, 5)
		const newMessage: Messages = {
			id: messages.length + 1,
			userId: userId,
			messageText: comment || users[userId].messageInput,
			messageTime: time,
			imgUrl: imgUrl || '',
		}
		messages.push(newMessage)
	}

	function updateTypingStatus(userId: number, isTyping: boolean): void {
		const find = users.find(a => a.id == userId)
		if (!find) return
		find.isTyping = isTyping
	}

	return { messages, currentUserId, users, updateTypingStatus, sendMessage }
})
