import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export enum Status {
	online = 'online',
	typing = 'typing',
}

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
	status: Status
	messageInput: string
}

export const useDataStore = defineStore('data', () => {
	let currentUserId = ref<number>(0)

	const messages = reactive<Messages[]>([
		{
			id: 0,
			userId: 0,
			messageText: 'Привет, как дела?',
			messageTime: new Date().toLocaleTimeString().slice(0, 5),
		},
		{
			id: 1,
			userId: 1,
			messageText: 'Хорошо, а у тебя?',
			messageTime: new Date().toLocaleTimeString().slice(0, 5),
		},
	])

	const users = reactive<Users[]>([
		{
			id: 0,
			name: 'Александр',
			avatar: 'public/images/alexAvatar.png',
			status: Status.online,
			messageInput: '',
		},
		{
			id: 1,
			name: 'Евгений',
			avatar: 'public/images/evgenyAvatar.png',
			status: Status.online,
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
			messageText: comment || messageInput,
			messageTime: time,
			imgUrl: imgUrl || '',
		}
		messages.push(newMessage)
	}

	function updateTypingStatus(userId: number, userStatus: Status): void {
		const find = users.find(a => a.id == userId)
		if (!find) return
		find.status = userStatus
	}

	return {
		messages,
		currentUserId,
		users,
		updateTypingStatus,
		sendMessage,
	}
})
