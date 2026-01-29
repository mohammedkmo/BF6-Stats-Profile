# Using Vercel DNS (Easiest Option)

Using Vercel's nameservers is the **easiest and recommended** way to set up subdomains. Vercel automatically handles everything, including wildcard subdomains.

## Step-by-Step Guide

### Step 1: Add Domain to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter your domain: `bf6.me`
6. Click **Add**

### Step 2: Configure Domain to Use Vercel Nameservers
1. In Vercel, click **Configure** next to your domain (`bf6.me`)
2. Select **"Use Vercel Nameservers"**
3. You'll see nameservers like:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
   (The actual nameservers may be different - use what Vercel shows you)

### Step 3: Update Nameservers at Your Domain Registrar
1. **Log into Namecheap** (or wherever you bought the domain)
2. Go to **Domain List** → Click **Manage** next to `bf6.me`
3. Go to **Nameservers** section
4. Select **Custom DNS** (instead of "Namecheap BasicDNS")
5. Enter the nameservers from Vercel:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
   (Use the exact nameservers Vercel provided)
6. Click **Save**

### Step 4: Wait for DNS Propagation
- Nameserver changes can take **15 minutes to 48 hours**
- Usually takes **1-2 hours** for most users
- Vercel will automatically configure:
  - Root domain (`bf6.me`)
  - Wildcard subdomains (`*.bf6.me`)
  - SSL certificates for all domains

### Step 5: Verify in Vercel
1. Go back to Vercel Dashboard → Settings → Domains
2. Wait for the domain status to show **"Valid Configuration"**
3. You'll see a green checkmark when it's ready

## Benefits of Using Vercel DNS

✅ **Automatic Configuration**: Vercel handles everything
✅ **Wildcard Subdomains**: Automatically configured
✅ **SSL Certificates**: Auto-provisioned for all subdomains
✅ **No Manual DNS Records**: No need to add A/CNAME records manually
✅ **Easy Management**: Everything managed in Vercel dashboard

## What Vercel Automatically Sets Up

When you use Vercel nameservers, Vercel automatically creates:
- A record for root domain (`bf6.me`)
- Wildcard record for subdomains (`*.bf6.me`)
- SSL certificates for all domains
- Proper DNS configuration

## After Setup

Once nameservers are updated and propagated:
- `https://bf6.me` → Homepage ✅
- `https://moeka9.bf6.me` → Player stats ✅
- `https://anyname.bf6.me` → Player stats ✅

All subdomains will work automatically - no additional configuration needed!

## Troubleshooting

### Issue: Domain shows "Pending" in Vercel
- Wait for nameserver propagation (can take up to 48 hours)
- Verify nameservers are correctly set at your registrar
- Check Vercel dashboard for any error messages

### Issue: Nameservers not updating
- Double-check you entered the correct nameservers from Vercel
- Make sure you saved the changes at your registrar
- Wait longer - nameserver changes take time

### Issue: Want to switch back to Namecheap DNS
- In Namecheap, change back to "Namecheap BasicDNS"
- You'll need to manually configure DNS records again

## Comparison: Vercel DNS vs Manual DNS

| Feature | Vercel DNS | Manual DNS (Namecheap) |
|---------|------------|------------------------|
| Setup Complexity | ⭐ Easy | ⭐⭐⭐ More steps |
| Wildcard Config | ✅ Automatic | ⚠️ Manual setup |
| SSL Certificates | ✅ Automatic | ✅ Automatic (via Vercel) |
| Management | Vercel Dashboard | Namecheap Dashboard |
| Best For | Most users | Advanced users |

## Recommendation

**Use Vercel DNS** - It's the easiest option and handles everything automatically!
