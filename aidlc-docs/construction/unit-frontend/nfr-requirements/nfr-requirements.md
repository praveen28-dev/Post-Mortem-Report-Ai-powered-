# NFR Requirements - Frontend App Unit

## Tech Stack Selection

| Component | Choice | Rationale |
|---|---|---|
| Framework | React 18.x | Industry standard, component-based |
| Build Tool | Vite 5.x | Fast HMR, modern tooling |
| Styling | Tailwind CSS 3.x | Utility-first, responsive, beginner-friendly |
| HTTP Client | Axios 1.x | Promise-based, interceptors for auth |
| Routing | React Router DOM 6.x | Standard React routing |
| State | React Context API | Sufficient for this scope, no Redux needed |
| Icons | Lucide React | Clean, consistent icon set |

## Security Requirements

### SEC-01: Token Storage
- JWT stored in localStorage (acceptable for portfolio/student project)
- Token cleared on logout

### SEC-02: Protected Routes
- ProtectedRoute component redirects unauthenticated users to /login
- Auth state checked on app load

### SEC-03: API Error Handling
- 401 responses trigger automatic logout
- Error messages displayed to user (not raw server errors)

## UX Requirements

### UX-01: Responsive Design
- Mobile-first Tailwind classes
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Navigation collapses on mobile

### UX-02: Loading States
- Loading spinner during API calls
- Buttons disabled during submission

### UX-03: Feedback
- Success/error toast or inline messages
- Confirmation before task deletion
