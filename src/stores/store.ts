import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Messages, SendMessArr, Users } from './interface'
import { Status } from './interface'

export const useDataStore = defineStore('data', () => {
	const messages = reactive<Messages[]>([
		{
			id: 0,
			userId: 0,
			messageText: 'Привет, как дела?',
			messageTime: Date.now(),
		},
		{
			id: 1,
			userId: 1,
			messageText: 'Хорошо, а у тебя?',
			messageTime: Date.now(),
		},
	])

	const users = reactive<Users[]>([
		{
			id: 0,
			name: 'Александр',
			avatar: 'public/images/alexAvatar.png',
			status: Status.online,
		},
		{
			id: 1,
			name: 'Евгений',
			avatar: 'public/images/evgenyAvatar.png',
			status: Status.online,
		},
	])

	function sendMessage(data: SendMessArr): void {
		const newMessage: Messages = {
			id: messages.length + 1,
			userId: data.userId,
			messageText: data.messageText,
			messageTime: Date.now(),
			imgUrl: data.imgUrl,
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
		users,
		updateTypingStatus,
		sendMessage,
	}
})
