const TEXT_WEBHOOK_URL = process.env.NEXT_PUBLIC_TEXT_WEBHOOK_URL || 'https://navbharatwater.one/webhook/hr-query';
const AUDIO_WEBHOOK_URL = process.env.NEXT_PUBLIC_AUDIO_WEBHOOK_URL || 'https://navbharatwater.one/webhook/hr-query-audio';
const AUTH_USERNAME = process.env.NEXT_PUBLIC_N8N_AUTH_USERNAME || 'Ikargos';
const AUTH_PASSWORD = process.env.NEXT_PUBLIC_N8N_AUTH_PASSWORD || 'Jayshreeram!';

function getAuthHeaders(): Record<string, string> {
  const credentials = btoa(`${AUTH_USERNAME}:${AUTH_PASSWORD}`);
  return {
    'Authorization': `Basic ${credentials}`,
  };
}

export async function sendTextQuery(query: string): Promise<any> {
  try {
    const response = await fetch(TEXT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Text query error:', error);
    throw error;
  }
}

export async function sendAudioQuery(audioBlob: Blob): Promise<Blob> {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');

    const response = await fetch(AUDIO_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseBlob = await response.blob();
    return responseBlob;
  } catch (error) {
    console.error('Audio query error:', error);
    throw error;
  }
}
