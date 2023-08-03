<template>
    <div class="container">
        <div class="header">
            <header>Chatbot
            </header>
            <div class="btns">
                <div class="temp-btn">随机性(0~1): <input type="text" class="temp-btn-input" @blur="setTemp"
                        v-model="tempBtnInput" ref="tempBtnInputElement" placeholder="0.7"></div>
                <div class="count-btn">回复数：1</div>
            </div>
        </div>
        <div class="message-area" ref="messageArea">
            <div class="message-content" v-for="item in messages">
                <MessageContent :message="item"></MessageContent>
            </div>
        </div>
        <div class="bottom-area">
            <textarea type="text" v-model="currentMessage" @keydown.enter="send" :placeholder="wordHolder"
                ref="textArea"></textarea>
            <div class="max-btn" @click="maxInput">{{ maxBtnVal }}</div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
interface Message {
    content: string;
    role: string
}
let tempBtnInput = ref('');
let tempBtnInputElement = ref<HTMLInputElement>();
let temperature = ref(0.7);
let generateCount = ref(1);
let wordHolder = ref('输入内容，按enter回车发送');
let messageArea = ref<HTMLDivElement>();
const messages = ref<Message[]>([]);
const maxBtnVal = ref('最大化输入框');
let maxInput = () => {
    if (maxBtnVal.value === '最大化输入框') {
        maxBtnVal.value = '最小化输入框';
        textArea.value!.style.height = "70rem";
    } else {
        textArea.value!.style.height = "2.5rem";
        maxBtnVal.value = '最大化输入框';
    }
}
const currentMessage = ref('');
const textArea = ref<HTMLTextAreaElement>();
let send = async () => {
    messages.value.push(
        { content: currentMessage.value, role: 'user' }
    );
    textArea.value?.blur();
    currentMessage.value = '';

    wordHolder.value = '等待中...'; messageArea.value!.scrollTop = messageArea.value!.scrollHeight + 100;
    if (maxBtnVal.value === '最小化输入框') maxInput();
    let assistantMessage: Message[] | null;
    const { data } = await useFetch('/api/chat', {
        method: "POST",
        headers: {
            "Authorization": `Basic 1313131313131==`,
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            "messages": messages.value,
            "temperature": temperature.value,
            "n": generateCount.value,
            "model": "gpt-3.5-turbo"
        })
    })
    assistantMessage = data.value;
    console.log(assistantMessage);
    messages.value.push(assistantMessage[0]);
    wordHolder.value = '输入内容，按enter回车发送';
    messageArea.value!.scrollTop =
        messageArea.value!.scrollHeight + 100;
}
let setTemp = () => {
    if (tempBtnInput.value === '') {
        temperature.value = 0.7;
    } else {
        temperature.value = parseFloat(tempBtnInput.value);
    }
    tempBtnInputElement.value!.readOnly = true;
}

// set title: 
useHead({
    title: "Chat-bot"
})
</script>
<style lang='scss' scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    align-items: center;
    overflow: hidden;
}

.message-area {
    height: 80%;
    width: 100%;
    overflow-y: auto;
    margin: 0 2rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

.header {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 10%;
    padding: 1rem;
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    header {
        font-size: 2rem;

        &::before {
            content: "🐑";

        }

        @media screen and (min-width: 500px) {
            font-size: 1.5rem;
        }
    }

    .btns {
        position: fixed;
        right: 2rem;

        .temp-btn-input {
            width: 2rem;
        }

        @media screen and (min-width: 500px) {
            font-size: 0.4rem;
        }
    }
}

.bottom-area {
    width: 100%;
    display: flex;
    height: 10%;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 0 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
}

textarea {
    font-size: 1.5rem;
    /* textarea height 设置为 font-size + padding * 2 */
    resize: none;
    height: 2.5rem;
    width: 80%;
    color: white;
    border-radius: 0.5rem;
    overflow: hidden;
    padding: 0.5rem;
    word-break: break-word;
    z-index: 999;

    /* hide the scroll but I could still scroll */
    /* line-height用于块内的居中 */
    &:focus {
        outline: none;
    }

    &::placeholder {
        font-size: 1rem;
        text-align: center;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.5);
    }

}

.max-btn {
    background-color: dodgerblue;
    color: white;
    padding: 0.5rem;
    border-radius: 0.5rem;
    width: 10rem;
    cursor: pointer;
    text-align: center;
}
</style>