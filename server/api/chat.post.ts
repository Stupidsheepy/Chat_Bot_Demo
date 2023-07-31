export default defineEventHandler(async (event) => {
    interface Message {
        content: string;
        role: string
    }
    interface Choice {

        "index": number,
        "message": Message,
        "finish_reason": string
    }
    interface Response {
        "id": string,
        "object": string,
        "created": number,
        "model": string,
        "choices": Choice[],
    }
    const body = await readBody(event);
    const config = useRuntimeConfig();
    const url = config.apiUrl;
    const api_key = config.apiKey;
    const response: Response = await $fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + api_key,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    return response.choices.map((choice) => {
        return choice.message;
    })
})