import { BASE_URL } from '../../../baseUrl/data/baseUrls';
import { store } from '../../../store/store';



export const askQuestionApi = async (bookId, question) => {
    const token = store.getState().auth.token;

    const response = await fetch(`${BASE_URL}/api/ai/ask/${bookId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ question }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'AI request failed');
    }

    return await response.json();
};
