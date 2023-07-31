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
const { message } = defineProps(['message'])
// create send or receive time 
let createTimeBlock = () => {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let monthStr = month.toString();
    let dateStr = date.toString();
    let hourStr = hour.toString();
    let minuteStr = minute.toString();
    if (month < 10) monthStr = '0' + month.toString();
    if (date < 10) dateStr = '0' + date.toString();
    if (hour < 10) hourStr = '0' + hour.toString();
    if (minute < 10) minuteStr = '0' + minute.toString();
    let current_time = `${year}/${monthStr}/${dateStr} ${hourStr}:${minuteStr}`;
    // console.log(current_time);
    return current_time;
}


</script>
<style lang='scss' scoped>
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
    background: url("/images/bot.png") center center / cover no-repeat dodgerblue;

}

.user-avatar-ball {
    background: url("/images/user.png") center center / cover no-repeat dodgerblue;
}

div.user {
    background-color: dodgerblue;
    margin-left: auto;
    margin-right: 0;
}

div.assistant {
    background-color: pink;
    color: black;
}

.message-bubble {
    /* TODO changed by js roles user or assistant */

    border-radius: 1rem;
    padding: 1rem;
    margin: 1rem 0;
    max-width: 50%;
    font-size: 1rem;
    color: white;
    position: relative;
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
    background-color: dodgerblue;
    transform: translateY(0%) translateX(-20%) rotate(60deg);
}

.message-bubble.assistant::after {
    left: -0.5rem;
    background-color: pink;
    transform: translateY(0%) translateX(20%) rotate(-60deg);
}

@media screen and (max-width:600px) {
    .message-bubble {
        max-width: 80%;
    }
}
</style>