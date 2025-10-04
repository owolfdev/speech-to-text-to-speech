# HTTPS Setup for Mobile Testing

Mobile browsers (especially iOS Safari) require HTTPS for microphone access due to security restrictions. Here are several ways to test your app on mobile devices:

## Option 1: ngrok (Easiest - Recommended)

ngrok creates a secure HTTPS tunnel to your localhost.

### Steps:

1. **Install ngrok**:

   ```bash
   # Using Homebrew on macOS
   brew install ngrok

   # Or download from https://ngrok.com/download
   ```

2. **Start your Next.js dev server**:

   ```bash
   npm run dev
   ```

3. **In a new terminal, create tunnel**:

   ```bash
   ngrok http 3000
   ```

4. **Use the HTTPS URL** provided by ngrok (e.g., `https://abc123.ngrok.io`) on your mobile device

### Advantages:

- ✅ No configuration needed
- ✅ Works immediately
- ✅ Free tier available
- ✅ Can share link with others

## Option 2: Local Network with Self-Signed Certificate

### Steps:

1. **Install mkcert** (creates trusted local SSL certificates):

   ```bash
   brew install mkcert
   mkcert -install
   ```

2. **Generate certificates**:

   ```bash
   cd /Users/wolf/Documents/Development/Education/google-tts-stt
   mkcert localhost 192.168.1.* 127.0.0.1 ::1
   ```

3. **Update your Next.js dev server**:
   Create a `server.js` file:

   ```javascript
   const { createServer } = require("https");
   const { parse } = require("url");
   const next = require("next");
   const fs = require("fs");

   const dev = process.env.NODE_ENV !== "production";
   const app = next({ dev });
   const handle = app.getRequestHandler();

   const httpsOptions = {
     key: fs.readFileSync("./localhost-key.pem"),
     cert: fs.readFileSync("./localhost.pem"),
   };

   app.prepare().then(() => {
     createServer(httpsOptions, (req, res) => {
       const parsedUrl = parse(req.url, true);
       handle(req, res, parsedUrl);
     }).listen(3000, (err) => {
       if (err) throw err;
       console.log("> Ready on https://localhost:3000");
     });
   });
   ```

4. **Update package.json**:

   ```json
   "scripts": {
     "dev": "next dev",
     "dev:https": "node server.js"
   }
   ```

5. **Run with HTTPS**:
   ```bash
   npm run dev:https
   ```

## Option 3: Cloudflare Tunnel (Free)

### Steps:

1. **Install cloudflared**:

   ```bash
   brew install cloudflare/cloudflare/cloudflared
   ```

2. **Start tunnel**:

   ```bash
   npm run dev
   cloudflared tunnel --url http://localhost:3000
   ```

3. **Use the provided HTTPS URL** on your mobile device

## Option 4: Deploy to Vercel (Production Testing)

### Steps:

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Add French pronunciation app"
   git push
   ```

2. **Deploy to Vercel**:

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables (GOOGLE_APPLICATION_CREDENTIALS)
   - Deploy!

3. **Access via HTTPS** URL provided by Vercel

## Testing on Mobile Device

### iOS Safari:

1. Open the HTTPS URL
2. Tap the microphone button
3. Allow microphone access when prompted
4. If it doesn't work, go to: **Settings > Safari > Microphone** and enable

### Android Chrome:

1. Open the HTTPS URL
2. Tap the microphone button
3. Allow microphone access when prompted
4. If it doesn't work, go to: **Settings > Site settings > Microphone**

## Troubleshooting

### "Microphone not accessible"

- ✅ Make sure you're using HTTPS
- ✅ Check browser microphone permissions
- ✅ Try a different browser (Chrome/Safari)
- ✅ Restart the browser
- ✅ Check if another app is using the microphone

### "NET::ERR_CERT_INVALID" (Self-signed certificates)

- On iOS: Download and trust the mkcert root certificate
- On Android: Accept the certificate warning (development only)

### ngrok connection issues

- Free tier may have connection limits
- Tunnel URL changes each time you restart ngrok
- Consider ngrok pro for persistent URLs

## Recommended Solution

For quick testing: **Use ngrok** (Option 1)

- Fast setup
- Works immediately
- No certificate issues
- Easy to share with others

Just run:

```bash
npm run dev
ngrok http 3000
```

Then open the ngrok HTTPS URL on your mobile device!
