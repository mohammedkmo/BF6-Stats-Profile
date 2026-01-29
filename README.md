# Battlefield 6 Stats Viewer

A modern, minimalist player statistics viewer for Battlefield 6. View player stats by visiting their subdomain (e.g., `moeka9.bf6.me`).

## Features

- 🎮 **Subdomain Routing**: Access player stats via subdomain (e.g., `playername.bf6.me`)
- 📊 **Comprehensive Stats**: Display overview, combat, and featured statistics
- 🎨 **EA-Inspired Design**: Modern, minimalist UI with dark theme
- ⚡ **Fast & Cached**: Server-side rendering with 5-minute cache
- 🧩 **Component-Based**: Built with shadcn/ui components

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **EA Drop API** - Player statistics

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the homepage.

### Testing Subdomain Routing Locally

For local development, you can test subdomain routing in two ways:

1. **Using Query Parameter**: Visit `http://localhost:3000?player=moeka9`
2. **Using Hosts File**: Add entries to your `/etc/hosts` file:
   ```
   127.0.0.1 moeka9.localhost
   ```
   Then visit `http://moeka9.localhost:3000`

### Production Deployment

For production, configure your DNS to point subdomains to your server:

- `*.bf6.me` → Your server IP
- `bf6.me` → Your server IP

The middleware will automatically route subdomains to the player stats page.

## Project Structure

```
├── app/
│   ├── api/player/[playertag]/  # API route for fetching stats
│   ├── player/[playertag]/       # Player stats page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── player-profile.tsx        # Main player profile component
│   ├── stat-card.tsx             # Stat card component
│   └── featured-stat-card.tsx    # Featured stat card component
├── types/
│   └── player-stats.ts           # TypeScript types for API response
└── middleware.ts                 # Subdomain routing middleware
```

## API

The app fetches player statistics from EA's Drop API:

```
GET https://drop-api.ea.com/player/{playertag}/stats?gameSlug=battlefield-6&eventName=BF6_S1B3_9a2cS6p05Z&locale=en&source=web_search
```

## Environment Variables

No environment variables are required for basic functionality. The API is public.

## License

MIT
# BF6-Stats-Profile
