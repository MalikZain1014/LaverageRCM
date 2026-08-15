# LeverageRCM CMS - Setup & Deployment Guide

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account with project configured
- Environment variables properly set

## 🚀 Quick Start

### 1. Installation

```bash
# Install dependencies
npm install

# Verify installation
npm run typecheck
```

### 2. Environment Setup

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these values from your Supabase project settings.

### 3. Development Server

```bash
# Start development server
npm run dev

# In another terminal, watch for TypeScript errors
npm run typecheck
```

The app will be available at `http://localhost:5173`

## 🔧 Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript types |

## 📁 Project Structure

```
src/
├── admin/                          # Admin panel
│   ├── components/                 # Admin-specific components
│   │   ├── AdminLayout.tsx        # Main admin layout
│   │   ├── AnalyticsDashboard.tsx # Analytics component
│   │   ├── ErrorBoundary.tsx      # Error catching
│   │   └── ConnectionStatusIndicator.tsx
│   ├── contexts/                   # Context providers
│   │   ├── AuthContext.tsx        # Authentication
│   │   ├── ConnectionContext.tsx  # Connection status
│   │   └── ThemeContext.tsx       # Dark mode
│   ├── pages/                      # Admin pages
│   ├── services/                   # API services
│   │   ├── api.ts                 # Core API
│   │   ├── supabaseClient.ts      # Supabase config
│   │   ├── errorHandler.ts        # Error handling
│   │   ├── retryService.ts        # Retry logic
│   │   ├── queueService.ts        # Request queue
│   │   └── batchOperations.ts     # Bulk operations
│   ├── types/                      # TypeScript types
│   └── utils/                      # Helper functions
├── components/                     # Public site components
├── pages/                          # Public site pages
├── data/                          # Static data
└── App.tsx                        # Root component
```

## 🔐 Authentication Flow

1. User navigates to `/admin/login`
2. Enters email and password
3. Supabase validates credentials
4. On success, user is redirected to `/admin`
5. Auth state is persisted in localStorage
6. Session auto-refreshes via Supabase

## 🛡️ Error Handling

### Connection Errors
- Automatically retried with exponential backoff
- User sees connection quality indicator
- Offline content is queued for sync

### Server Errors (5xx)
- Retried up to 3 times
- Shows friendly error message
- Provides manual retry button

### Client Errors (4xx)
- Shown immediately
- No automatic retry
- Validation messages help user fix

### Application Crashes
- Caught by Error Boundary
- Shows error details
- Allows navigation to safety

## 📊 Monitoring & Debugging

### Browser Console
- Connection warnings
- API call logs
- Error stack traces

### Browser DevTools Network Tab
- API request/response details
- Request timing
- Cache behavior

### Activity Log (cms_activity table)
- All content changes
- User actions
- Timestamp for auditing

## 🧪 Testing Checklist

### Connection Tests
- [ ] Test offline mode (DevTools)
- [ ] Verify offline indicator shows
- [ ] Check reconnection handling
- [ ] Monitor retry logic in console

### Error Tests
- [ ] Trigger network error
- [ ] Trigger validation error
- [ ] Simulate timeout
- [ ] Test error boundary

### UI/UX Tests
- [ ] Check mobile responsiveness
- [ ] Test dark mode
- [ ] Verify accessibility
- [ ] Test animations

## 🚨 Troubleshooting

### Issue: "Cannot find module" errors
**Solution**: Run `npm install` and verify imports use `@/` alias

### Issue: Auth not persisting
**Solution**: Check browser storage is enabled and localStorage isn't cleared

### Issue: Slow dashboard load
**Solution**: Check connection quality indicator, verify API responses

### Issue: Batch operations fail
**Solution**: Check network connection, verify permissions, review error logs

## 📦 Deployment

### Build
```bash
npm run build
```

### Environment Variables (Production)
Set in deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to Netlify
```bash
npm run build
# Upload 'dist' folder to Netlify
```

## 🔒 Security Best Practices

1. **Never commit .env files**
   - Use `.env.example` for reference
   - Set env vars in deployment platform

2. **Keep Supabase keys secure**
   - Use anon key for frontend only
   - Use service role key only on backend

3. **Enable Row Level Security**
   - Supabase → Authentication → Policies
   - Set appropriate access rules

4. **Regular security audits**
   - Check dependency vulnerabilities: `npm audit`
   - Update packages regularly
   - Review access logs

## 📞 Support Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🐛 Reporting Issues

1. Check browser console for errors
2. Verify environment variables are set
3. Check network tab for API issues
4. Review error boundary messages
5. Check connection status indicator

## 📈 Performance Optimization Tips

1. **Lazy load admin pages**
   - Use React.lazy() for route components
   - Wrap with Suspense

2. **Memoize expensive components**
   - Use React.memo for list items
   - Use useMemo for computations

3. **Optimize images**
   - Use WebP format
   - Implement lazy loading
   - Use appropriate sizing

4. **Monitor bundle size**
   - Run: `npm build -- --analyze`
   - Identify large dependencies
   - Use code splitting

## 🎯 Next Steps

1. Customize branding and colors
2. Add team members and set roles
3. Configure site settings
4. Add initial content (services, blog, etc.)
5. Set up SEO settings
6. Configure email notifications
7. Test all user workflows
8. Deploy to production

## 📝 License

This project is proprietary to LeverageRCM.

---

Last Updated: 2026-08-13
