# Security Guidelines

## ⚠️ IMPORTANT: Google Cloud Credentials

Your Google Cloud service account JSON file contains **sensitive credentials** that should **NEVER** be committed to git or shared publicly.

## What Was Fixed

✅ Removed `text-to-speech-for-video-app-d10d2fa62487.json` from git history
✅ Updated `.gitignore` to prevent future commits
✅ Successfully pushed cleaned repository to GitHub

## 🔐 Security Best Practices

### 1. Rotate Your Credentials

Since your credentials were exposed (even briefly), you should **rotate them immediately**:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **IAM & Admin > Service Accounts**
3. Find your service account
4. Delete the old key
5. Create a new key and download it
6. Update your local `.env.local` file

### 2. Keep Credentials Local

Your credentials should **ONLY** exist:
- ✅ On your local machine (in project root)
- ✅ In your deployment environment (Vercel/production env vars)
- ❌ **NEVER** in git
- ❌ **NEVER** on GitHub/public repositories
- ❌ **NEVER** in screenshots or documentation

### 3. Use Environment Variables

For production deployments (Vercel, etc.):

```bash
# Set as environment variables, NOT files:
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CLOUD_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
```

### 4. Current .gitignore Setup

Your `.gitignore` now blocks all JSON files except necessary ones:

```gitignore
# Google Cloud credentials - NEVER commit these files!
*.json
!package.json
!package-lock.json
!tsconfig.json
!components.json
!next.config.json
```

## 📝 For Deployment

### Vercel Deployment (Recommended)

1. **Push code to GitHub** (credentials are NOT in repo now ✅)
2. **Go to Vercel Dashboard**
3. **Import your repository**
4. **Add environment variables**:
   - Either upload the JSON file as a secret
   - Or add individual environment variables (project ID, private key, client email)

### Example Vercel Environment Variables:

```
GOOGLE_APPLICATION_CREDENTIALS=/var/task/credentials.json
```

Or use the parsed JSON values:

```
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GOOGLE_CLOUD_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
```

## 🔍 How to Check for Exposed Credentials

If you think credentials might be exposed:

1. **Rotate them immediately** (create new key, delete old)
2. **Check Google Cloud audit logs** for unauthorized usage
3. **Monitor your billing** for unexpected charges

## ✅ Current Status

- ✅ Repository is clean (no credentials in git history)
- ✅ `.gitignore` configured correctly
- ✅ Credentials file is local only
- ⚠️ **TODO**: Rotate your Google Cloud service account key for safety

## Need Help?

- [Google Cloud Security Best Practices](https://cloud.google.com/security/best-practices)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning)
