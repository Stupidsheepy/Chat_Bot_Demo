<template>
    <div>
        <!-- message structure -->
        <div class="role" v-if="message.role === 'user'">
            <div class="user message-bubble">{{ message.content }}</div>
            <div class="user-avatar-ball">
                <div class="timeBlock">{{ createTimeBlock() }}</div>
            </div>
        </div>
        <div class="role" v-else>
            <div class="bot-avatar-ball">
                <div class="timeBlock">{{ createTimeBlock() }}</div>
            </div>
            <div class="assistant message-bubble">{{ message.content }}</div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import createTimeBlock from '@/utils/timeBlock'
const { message } = defineProps(['message'])
// create send or receive time 


</script>
<style lang='scss' scoped>
$message-color : #272727;

.role {
    /* why there is max-width */
    width: 100%;
    display: flex;
    gap: 1rem;
    align-items: center;
}


.user-avatar-ball,
.bot-avatar-ball {
    align-self: flex-end;
    position: relative;
    width: 50px;
    height: 50px;
    border: 1px solid white;
    border-radius: 100%;
    background: url("/images/bot.png") center center / cover no-repeat $message-color ;

}

.user-avatar-ball {
    background: url("/images/user.png") center center / cover no-repeat $message-color ;
}

div.user {
    background-color: $message-color;
    margin-left: auto;
    margin-right: 0;
}

div.assistant {
    background-color: $message-color ;
    color: white;
}

.message-bubble {
    /* TODO changed by js roles user or assistant */
    border-radius: 1rem;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 1rem;
    color: white;
    position: relative;
    max-width: 50%;
    // 设置宽度后换行
    word-break: break-all;
}

.user-avatar-ball .timeBlock,
.bot-avatar-ball .timeBlock {
    /* content: var(--current-time); */
    /* content: "nihao"; */
    position: absolute;
    bottom: -50%;
    text-align: right;
    right: 0;
    width: 10rem;
    height: auto;
    color: gray;
}

.bot-avatar-ball .timeBlock {
    text-align: left;
    left: 0;
}



.message-bubble::after,
.message-bubble::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -0.5rem;
    width: 1rem;
    height: 1rem;
    background-color: $message-color ;
    transform: translateY(0%) translateX(-20%) rotate(60deg);
}

.message-bubble.assistant::after {
    left: -0.5rem;
    background-color: $message-color;
    transform: translateY(0%) translateX(20%) rotate(-60deg);
}

@media screen and (max-width:600px) {
    .message-bubble {
        max-width: 80%;
    }
}
</style>