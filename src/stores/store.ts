import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('counter', () => {
	let currentUserId = ref<number>(0)

	interface Messages {
		id: number
		userId: number
		messageText: string
		messageTime: string
		imgUrl: string
	}

	const messages = reactive<Array<Messages>>([
		{
			id: 0,
			userId: 0,
			messageText: 'Привет, как дела?',
			messageTime: '00:00',
			imgUrl: '',
		},
		{
			id: 1,
			userId: 1,
			messageText: 'Хорошо, а у тебя?',
			messageTime: '00:01',
			imgUrl: '',
		},
	])

	interface Users {
		id: number
		name: string
		avatar: string
		isTyping: boolean
		messageInput: string
	}

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
		const hours: string = new Date().getHours().toString().padStart(2, '0')
		const minutes: string = new Date().getMinutes().toString().padStart(2, '0')

		const newMessage: Messages = {
			id: messages.length + 1,
			userId: userId,
			messageText: comment || users[userId].messageInput,
			messageTime: hours + ':' + minutes,
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
