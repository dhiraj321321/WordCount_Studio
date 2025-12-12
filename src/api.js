import axios from "axios";

const API_BASE = "http://localhost:8080/api/wordcount";

export async function submitText(content, theme) {
    const response = await axios.post(API_BASE, { content, theme });
    return response.data;
}

export async function fetchHistory() {
    const response = await axios.get(`${API_BASE}/history`);
    return response.data;
}
