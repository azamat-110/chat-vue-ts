<script setup lang="ts">
import { useDataStore } from '@/stores/store'
import type { Props } from './SendImageModalProps.vue'
import type { Emits } from './SendImageModalEmits.vue'
import { ref } from 'vue'
import type { SendMessArr } from '@/stores/storeTypes'

const dataStore = useDataStore()
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const imgUrl = ref('')
const comment = ref('')

function toggleModal() {
	emit('toggleModal')
}

function sendModalMessage() {
	const data: SendMessArr = {
		userId: props.userId,
		messageText: comment.value,
		imgUrl: imgUrl.value,
	}
	dataStore.sendMessage(data)
	emit('toggleModal')
}
</script>

<template>
	<div class="modal">
		<form class="modal__content">
			<h2 class="modal__content-title">Отправить картинку</h2>
			<label class="modal__content-input">
				<span>URL</span>
				<input type="text" placeholder="URL" v-model="imgUrl" required />
			</label>
			<label class="modal__content-input">
				<span>Комментарий</span>
				<input
					ref="commentInput"
					v-model="comment"
					type="text"
					placeholder="Комментарий"
				/>
			</label>
			<div class="modal__buttons">
				<button class="modal__buttons-cancel" @click="toggleModal">
					Отмена
				</button>
				<button
					type="submit"
					class="modal__buttons-send"
					@click="sendModalMessage"
				>
					Отправить
				</button>
			</div>
		</form>
	</div>
</template>

<style></style>
