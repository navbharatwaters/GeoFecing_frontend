# iKargos Chat Application

AI-powered database query assistant with text and voice input capabilities.

## Features

✅ **Text Chat Interface** - Ask questions about your database using natural language
✅ **Voice Input** - Record voice queries (up to 3 minutes)
✅ **Audio Responses** - Auto-playing audio responses from Deepgram TTS
✅ **CSV Export** - Download database query results as CSV files
✅ **Welcome Message** - Friendly greeting on first load
✅ **Loading States** - Visual feedback during query processing
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Chat History** - Persistent storage using localStorage
✅ **iKargos Branding** - Orange (#ec973c) theme with Inter font

## Tech Stack

- **Next.js 16.1** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library
- **PapaParse** - CSV export functionality
- **MediaRecorder API** - Voice recording

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Inter font
│   ├── page.tsx            # Main chat page
│   └── globals.css         # Global styles and animations
├── components/
│   └── chat/
│       ├── ChatContainer.tsx   # Main chat logic and state
│       ├── ChatHeader.tsx      # Logo and title
│       ├── ChatMessages.tsx    # Message list with auto-scroll
│       ├── ChatMessage.tsx     # Individual message bubble
│       ├── ChatInput.tsx       # Text input and send button
│       ├── VoiceRecorder.tsx   # Voice recording button
│       ├── AudioPlayer.tsx     # Audio playback controls
│       └── CSVDownload.tsx     # CSV export button
├── lib/
│   ├── api.ts              # n8n webhook integration
│   ├── audio.ts            # AudioRecorder class
│   ├── csv.ts              # CSV export utilities
│   ├── storage.ts          # localStorage management
│   └── utils.ts            # Shared utilities
└── types/
    └── chat.ts             # TypeScript interfaces

```

## n8n Webhook Integration

### Configuration

The n8n webhook URLs are configured via environment variables. To change them:

1. Edit the `.env.local` file in the project root
2. Update the webhook URLs:
   ```env
   NEXT_PUBLIC_TEXT_WEBHOOK_URL=https://your-new-domain.com/webhook/hr-query
   NEXT_PUBLIC_AUDIO_WEBHOOK_URL=https://your-new-domain.com/webhook/hr-query-audio
   ```
3. Restart the development server: `npm run dev`

**For production deployment**, set these environment variables in your hosting platform (Vercel, Netlify, etc.)

### Text Queries
- **Default Endpoint**: `https://navbharatwater.one/webhook/hr-query`
- **Method**: POST
- **Body**: `{ "query": "your question" }`
- **Response**: JSON data (auto-detects CSV export capability)

### Audio Queries
- **Default Endpoint**: `https://navbharatwater.one/webhook/hr-query-audio`
- **Method**: POST
- **Body**: FormData with audio file
- **Response**: .wav audio file (auto-plays)

## Features Explained

### Chat Persistence
Messages are automatically saved to localStorage and restored on page reload.

### CSV Export
When the backend returns structured data (JSON objects or arrays), a "Download CSV" button appears automatically.

### Voice Recording
- Click the microphone button to start recording
- Red indicator shows recording is active
- Max duration: 3 minutes
- Click stop (square) to send the audio query

### Audio Playback
- Audio responses auto-play when received
- Play/pause and replay controls
- Visual progress bar

### Loading States
- Input is disabled during processing
- Spinner shows in message bubble
- "Processing..." placeholder in input field

## Customization

### Brand Colors
Edit `tailwind.config.ts` to change the primary color:

```typescript
colors: {
  ikargos: {
    orange: "#ec973c", // Change this
  },
}
```

### Welcome Message
Edit `components/chat/ChatContainer.tsx`:

```typescript
const WELCOME_MESSAGE: Message = {
  // ... customize content here
  content: 'Your custom welcome message',
}
```

## Future Enhancements (Planned)

- PostgreSQL integration via MCP server for database chat history
- Recharts for data visualization
- User authentication
- Enhanced error handling with retry logic
- Message editing and deletion
- Export complete chat history

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: Voice recording requires HTTPS in production or localhost in development.

## License

Private - iKargos Internal Use
