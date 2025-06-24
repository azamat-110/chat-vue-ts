import type { Messages } from '@/stores/storeTypes'
import type { Users } from '@/stores/storeTypes'

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
