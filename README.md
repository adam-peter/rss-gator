# RSS Gator

A command-line RSS aggregator that lets you track, follow, and browse RSS feeds with multi-user support.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or your preferred package manager

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your database migrations:
   ```bash
   npm run generate
   npm run migrate
   ```

## Configuration

Create a `.gatorconfig.json` file in your home directory:

```json
{
  "db_url": "postgres://username:password@localhost:5432/gator?sslmode=disable",
  "current_user_name": ""
}
```

Replace the `db_url` with your PostgreSQL connection string. The `current_user_name` will be set automatically when you log in.

## Usage

Run the CLI with:
```bash
npm start <command> [arguments]
```

### Available Commands

**User Management:**
- `register <username>` - Create a new user account
- `login <username>` - Log in as an existing user
- `users` - List all registered users
- `reset` - Reset the database (removes all users and feeds)

**Feed Management:**
- `addfeed <name> <url>` - Add a new RSS feed and automatically follow it
- `feeds` - List all available feeds
- `follow <url>` - Follow an existing feed
- `following` - List feeds you're following
- `unfollow <url>` - Unfollow a feed

**Content:**
- `agg <duration>` - Start the feed aggregator (e.g., `agg 1m`, `agg 30s`)
- `browse [limit]` - Browse recent posts from your followed feeds

### Example Workflow

```bash
# Create a new user
npm start register john

# Add and follow a feed
npm start addfeed "Tech News" "https://example.com/rss"

# Start collecting feeds every 5 minutes
npm start agg 5m

# In another terminal, browse latest posts
npm start browse 10
```

## Development

- `npm run check-types` - Type check the codebase
- `npm run generate` - Generate database migrations
- `npm run migrate` - Apply database migrations

## License

ISC