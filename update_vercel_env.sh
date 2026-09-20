echo "postgresql://postgres:postgres@localhost:5432/spectrum" | npx vercel env add DATABASE_URL production,preview,development
echo "postgresql://postgres:postgres@localhost:5432/spectrum" | npx vercel env add DIRECT_URL production,preview,development
echo "sspectrumm0112@gmail.com" | npx vercel env add ADMIN_NOTIFICATION_EMAIL production,preview,development
echo "Spectrum <sspectrumm0112@gmail.com>" | npx vercel env add EMAIL_FROM production,preview,development
echo "sspectrumm0112@gmail.com" | npx vercel env add GMAIL_USER production,preview,development
echo "lvni wuee pzux qyxn" | npx vercel env add GMAIL_APP_PASSWORD production,preview,development
echo "pk_test_YmVsb3ZlZC1mZWxpbmUtOTg4NC5jbGVyay5hY2NvdW50cy5kZXYk" | npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production,preview,development
echo "sk_test_Ev5zOpeMHrJJQOd7C29tvRkoXGWig6N20HhZhj5d9i" | npx vercel env add CLERK_SECRET_KEY production,preview,development
echo "/sign-in" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL production,preview,development
echo "/sign-up" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_URL production,preview,development
echo "/" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL production,preview,development
echo "/" | npx vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL production,preview,development
