# Subdomain Setup Checklist

## ✅ Code Setup (DONE)

- [x] `middleware.ts` exists in root directory
- [x] Middleware properly detects subdomains
- [x] Root domain shows homepage
- [x] Subdomains rewrite to `/player/[playertag]`
- [x] Debug endpoint created at `/api/debug-host`

## 🔧 Vercel Configuration

### Step 1: Add Domain to Vercel
- [ ] Go to Vercel Dashboard → Your Project → Settings → Domains
- [ ] Add `bf6.me` (root domain)
- [ ] Wait for DNS verification

### Step 2: Configure DNS Records

**IMPORTANT**: You MUST add a wildcard record for subdomains to work!

#### Option A: Using Your DNS Provider (Cloudflare, Namecheap, etc.)

**For Cloudflare:**
```
Type: A
Name: @
Content: 76.76.21.21
Proxy: OFF (Gray cloud - DNS only!)

Type: CNAME
Name: *
Target: cname.vercel-dns.com
Proxy: OFF (Gray cloud - DNS only!)
```

**For Namecheap/GoDaddy:**
```
Type: A
Host: @
Value: 76.76.21.21

Type: A
Host: *
Value: 76.76.21.21
```

#### Option B: Using Vercel Nameservers (Easiest)
1. In Vercel: Settings → Domains → bf6.me → Configure
2. Select "Use Vercel Nameservers"
3. Copy nameservers (e.g., `ns1.vercel-dns.com`)
4. Update nameservers at your domain registrar
5. Vercel handles everything automatically

## 🧪 Testing Steps

### 1. Test DNS Configuration
Visit: https://www.whatsmydns.net
- Check `bf6.me` → Should resolve to Vercel IP
- Check `*.bf6.me` → Should resolve to Vercel IP

### 2. Test Debug Endpoint
After deploying:
- Visit: `https://bf6.me/api/debug-host`
- Visit: `https://moeka9.bf6.me/api/debug-host`
- Check the JSON response to see what hostname Vercel receives

### 3. Test Subdomain Routing
- `https://bf6.me` → Should show homepage ✅
- `https://moeka9.bf6.me` → Should show player stats ✅
- `https://anyname.bf6.me` → Should show player stats ✅

## 🐛 Troubleshooting

### Issue: Subdomain shows 404
**Check:**
1. DNS wildcard record (`*`) is configured
2. DNS propagation completed (can take up to 48 hours)
3. Cloudflare proxy is OFF (if using Cloudflare)
4. Vercel domain is properly configured

### Issue: Subdomain shows homepage instead of player
**Check:**
1. Visit `/api/debug-host` on subdomain
2. Verify `hasSubdomain: true` in response
3. Check middleware is deployed (check Vercel logs)

### Issue: Root domain shows 404
**Check:**
1. Root domain DNS record (`@`) is configured
2. Domain is added in Vercel
3. SSL certificate is provisioned

## 📝 Quick Verification

Run these commands to verify:

```bash
# Check if middleware.ts exists
ls middleware.ts

# Check DNS (replace with your domain)
dig bf6.me
dig moeka9.bf6.me
```

## 🚀 Deployment Checklist

- [ ] Code pushed to repository
- [ ] Vercel deployment successful
- [ ] Domain added in Vercel
- [ ] DNS records configured
- [ ] DNS propagation complete
- [ ] SSL certificate active
- [ ] Test root domain works
- [ ] Test subdomain works
- [ ] Debug endpoint shows correct hostname
