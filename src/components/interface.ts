import type { Messages } from '@/stores/interface'
import type { Users } from '@/stores/interface'

export interface ChatScreenProps {
	user: Users
}

export interface IncopmeMessageProps {
	messageData: Messages
	userId: number
}

export interface SendImageModalProps {
	userId: number
}

export interface SendImageModalEmits {
	(e: 'toggleModal'): void
}
