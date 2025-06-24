export interface SendMessArr {
	userId: number
	messageText: string
	imgUrl?: string
}

export interface Messages extends SendMessArr {
	id: number
	messageTime: number
}

export interface Users {
	id: number
	name: string
	avatar: string
	status: Status
}

export enum Status {
	online = 'online',
	typing = 'typing',
}
