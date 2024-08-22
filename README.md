# React Notes with Wordpress API

## Installation

Clone repository
```
git clone git@github.com:jiggsaw85/react-wp-notes.git
```

From the root of the project install dependencies
```
npm install
```

Install WordPress locally

Activate react-wp-posts plugin
```
1. Copy react-wp-posts to wp-content/plugins
2. Login to WP Admin and activate plugin from Plugins section
```

Set React environment file
```
cp .env.example .env
```

Add your WordPress domain in .env (REACT_APP_API_URL)

Run React project
```
npm start
```
