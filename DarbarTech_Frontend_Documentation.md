# DarbarTech LMS — Frontend System Documentation
### Feature Inventory, Role-Based Access Control & Security Implementation Plan

> Scope note: This document covers **frontend only** (Next.js 16 / React 19 / Tailwind v4 / Zustand), based on a full read-through of the uploaded codebase (`app/`, `store/`, `package.json`, config files). No backend/API/database code exists in this repo yet — everything currently runs on hardcoded mock data (`app/student/data.ts`, inline arrays in admin pages) with no real authentication.

---

## 1. Codebase Snapshot (as analyzed)

| Item | Detail |
|---|---|
| Framework | Next.js `16.3.1` (App Router), React `19.2.8`, TypeScript `5` |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`), CSS custom properties for theming (`--primary-bg-color`, `--bg-primary-dashboard`, etc.) |
| State | Zustand `5.0.15` with `persist` middleware (currently only `store/sidebarStore.ts`) |
| Icons | `lucide-react` |
| Charts | `chart.js` + `react-chartjs-2` |
| Auth files found | **None** — no `middleware.ts`, no auth context/provider, no `.env`, no session/cookie handling, no route guards |
| Data layer | **None** — no API routes, no fetch calls; all data is static/mocked in-file |
| Route groups | `app/(client)` — public marketing site; `app/admin` — admin dashboard; `app/student` — student dashboard |
| Missing role area | **`app/teacher` does not exist yet**, even though `"teacher"` is a defined role in `app/admin/users/page.tsx`. This is a gap — see §5. |

### 1.1 Route Map (as built)

```
/ (app/page.tsx)                     → Public landing page
/(client)/about                      → Public
/(client)/services                   → Public
/(client)/products                   → Public
/(client)/portfolio                  → Public
/(client)/login                      → Public auth form (UI only, no real submit handler — commented out)
/(client)/register                   → Public auth form (UI only, no real submit handler — commented out)

/admin                               → Admin dashboard (analytics)
/admin/users                         → User management (CRUD + role assignment)
/admin/courses                       → Course management
/admin/jobs                          → Careers/job listings management
/admin/cms/hero-management           → CMS: homepage hero content
/admin/cms/product-management        → CMS: product/service listings
/admin/notifications                 → Admin notifications
/admin/themes                        → Theme/appearance settings
/admin/security                      → Password change + 2FA toggle (UI only)
/admin/profile                       → Admin profile
/admin/ai-chat                       → AI assistant chat (UI only, mocked responses)

/student                             → Student dashboard
/student/profile                     → Student profile
/student/courses (+?status=)         → Active / Upcoming / Completed course list
/student/courses/[id]                → Single course detail
/student/schedule                    → Class schedule
/student/online-classes              → Live/recorded online classes
/student/assignments                 → Assignments list + submission UI
/student/notes                       → Personal notes (pin/archive)
/student/materials                   → Learning materials/downloads
/student/attendance                  → Attendance tracker
/student/results                     → Assessments & results
/student/notices                     → Notice board
/student/chat                        → Messaging/chat UI
/student/calendar                    → Calendar view
/student/certificates                → Certificates
/student/support                     → Support/help desk
/student/activity                    → Activity log
/student/notifications               → Notifications
```

---

## 2. Current Feature Inventory (What Already Exists)

### 2.1 Public Website (`app/(client)`)
- Landing page with hero, services, illustrations, enquiry section
- About, Services, Products, Portfolio pages
- Shared `Navbar` and `Footer` components
- **Login form**: email + password fields, client-side email regex validation, show/hide password toggle, "Remember me" checkbox, "Forgot password" link (non-functional href="#"), link to Register. Submit handler is fully commented out (no real auth call).
- **Register form**: full name, email, password, confirm password. Strong client-side password policy already enforced in UI validation (see §4.1). Submit handler also commented out.

### 2.2 Admin Panel (`app/admin`)
- **Analytics Dashboard** (`/admin`): stat cards (Courses, Revenue, etc.), time-range filter (Yearly/Semiyearly/Quarterly/Monthly), chart.js visualizations.
- **User Management** (`/admin/users`): full CRUD (add/edit/delete/view) on a mock user table; columns: name, email, phone, role, enrolled courses; **role filter** (`superadmin`/`teacher`/`student`) and course-count filter; per-row role change dropdown; "View Details" modal.
- **Course Management** (`/admin/courses`): course listing/management UI.
- **Jobs/Careers Management** (`/admin/jobs`): job listings CRUD with applicants tracking (`JobListing`, `Applicant` types), status pipeline, category icons.
- **CMS**:
  - Hero Management — edit homepage hero content.
  - Product Management — manage product/service catalog entries shown on the public site.
- **Notifications** (`/admin/notifications`): admin-facing notification feed.
- **Themes** (`/admin/themes`): appearance/theme configuration.
- **Security** (`/admin/security`): change-password form (client-side validation only, no backend call) + a **2FA enable/disable toggle** that is currently pure UI state (`useState`) with no real TOTP/SMS enrollment flow.
- **Profile** (`/admin/profile`): admin's own profile page.
- **AI Chat** (`/admin/ai-chat`): chat UI with a mocked assistant (canned/simulated responses, no real LLM API call wired in yet).
- **AdminNavbar**: collapsible sidebar with sections — Analytics, Jobs, Courses, CMS (Hero/Product), Users, Settings (Notifications/Themes/Security), AI & Chat.
- **TopBar**: global search across a fixed `searchIndex`, notifications dropdown, profile menu.

### 2.3 Student Portal (`app/student`)
- **Dashboard** (`/student`): overview of today's schedule, upcoming classes, course progress.
- **Profile**: personal + academic info (ID, program, batch, section, academic status).
- **My Courses**: Active / Upcoming / Completed tabs via query param, per-course progress %, attendance %, pending assignments.
- **Course Detail** (`/student/courses/[id]`): full course record (instructor, dates, lessons completed, next module, description).
- **Class Schedule** & **Calendar**: timetable views.
- **Online Classes**: Upcoming/Live/Completed sessions with platform (Zoom/Meet) and recordings.
- **Assignments**: status pipeline (Draft/Pending/Reviewed), marks, instructor feedback, submission instructions.
- **Notes**: create/pin/archive personal notes tagged by course/module/lesson.
- **Learning Materials**: downloadable resources by type (PDF/Video/PPT/ZIP).
- **Attendance**: per-course attendance % with present/absent/late breakdown.
- **Assessments & Results**: quiz/assignment scores, grades, feedback.
- **Notices**: institution notice board with priority (Important/Normal) and category tags.
- **Chat**: messaging UI with instructors/office (unread counts).
- **Certificates**: issued/in-progress certificate tracking with certificate IDs.
- **Support**: help desk / ticketing UI.
- **Activity**: chronological activity/audit feed of the student's own actions.
- **Notifications**: assignment/class/attendance alerts.
- **StudentSidebar / StudentTopBar**: collapsible nav (persisted via Zustand), mobile drawer support.

### 2.4 Shared/Cross-Cutting
- `store/sidebarStore.ts`: global collapsed/mobile sidebar state, persisted to `localStorage` via Zustand `persist`.
- CSS variable–based theming supporting light/dark or brand theme switching (`Assets/Color Theme.txt`, `/admin/themes`).
- `app/student/components/ui.tsx`: shared UI primitives for the student portal.

---

## 3. Feature Gaps Relevant to Your Ask ("more features")

These are things the current frontend does **not** yet have, needed before RBAC is meaningful:

1. **No Teacher/Instructor portal.** Role exists in data model (`"teacher"`) but there's no `app/teacher/*` route tree — no gradebook, no attendance-marking UI, no assignment-creation/review UI, no class roster.
2. **No real authentication state.** No `AuthContext`, no `useAuth()` hook, no persisted session/JWT/cookie, no "logged in as" concept anywhere in the frontend. `Logout` button just does `router.push("/login")`.
3. **No route protection.** Any user (authenticated or not) can navigate directly to `/admin/users` or `/student/results` — there is no `middleware.ts` and no per-page guard component.
4. **No permission model.** Roles (`superadmin`, `teacher`, `student`) exist only as a display/filter field in the admin Users table — nothing in the UI checks "can this actor edit that record."
5. **No account-level views for superadmin vs. admin distinction** — only one flat `/admin` area; if you want tiered admin (e.g., Super Admin vs. Branch Admin vs. Editor), that needs new nav/permission logic.
6. **No forgot-password / reset-password flow** (link is a dead `href="#"`).
7. **No audit trail UI** outside the student's own `/student/activity` (nothing on the admin side logging "who changed what role/record").
8. **Security page is decorative** — password change and 2FA toggle don't persist or validate against a real account.
9. **No file upload UI** validation/constraints defined yet (for materials, certificates, profile photos).
10. **No 403/Unauthorized or 404 custom pages** for blocked navigation.

---

## 4. Recommended Feature List to Build (Frontend Only)

### 4.1 Authentication & Session (Frontend Layer)
- Wire up `login`/`register` forms to real submit handlers (currently commented out) — keep existing client-side validation:
  - Email: `^[^\s@]+@[^\s@]+\.[^\s@]+$`
  - Password (register): ≥8 chars, ≤128 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character — **already implemented**, just needs to be connected to a real submit action.
- Add a global `AuthContext`/`useAuth()` hook (or a Zustand `authStore`, matching your existing pattern in `sidebarStore.ts`) holding: `user`, `role`, `isAuthenticated`, `token/session-expiry`.
- Add **"Forgot Password"** flow: request-reset page → reset-with-token page (frontend forms only; backend does the emailing/verification).
- Add **session expiry / idle timeout UI** (auto-logout warning modal).
- Persist only a minimal, non-sensitive session flag client-side (never store raw passwords or long-lived tokens in `localStorage`); prefer httpOnly cookies set by the backend, with the frontend only reading a "logged in" boolean/role claim.

### 4.2 Role-Based Access Control (RBAC) — Frontend Implementation
Recommended roles (extending what's already in `app/admin/users/page.tsx`):

| Role | Intended Scope |
|---|---|
| `superadmin` | Full system access: manage users/roles, CMS, security settings, all courses |
| `admin` *(new, optional tier)* | Operational admin: courses, jobs, CMS — no user-role changes, no security settings |
| `teacher` | Own courses only: attendance marking, assignment creation/grading, materials upload, class scheduling, messaging students |
| `student` | Own data only: view courses, submit assignments, view grades/attendance/certificates, messaging |

**Implementation pattern for the frontend:**
1. `middleware.ts` at project root — reads the auth/role cookie set by backend, redirects unauthenticated users hitting `/admin/*`, `/student/*`, or a future `/teacher/*` to `/login`.
2. Per-route-group **guard layouts**: extend `app/admin/layout.tsx` / `app/student/layout.tsx` (create `app/admin/layout.tsx` if not present) to check `role` from `AuthContext` and redirect to a `403` page if mismatched.
3. **Component-level permission checks** for granular UI elements (e.g., "Delete User" button only rendered for `superadmin`, "Change Role" dropdown only editable by `superadmin`), using a small `<Can role="superadmin">` wrapper or a `hasPermission(action, role)` utility.
4. **Nav-level filtering**: `AdminNavbar`/`StudentSidebar` menu arrays should be filtered by role before render (e.g., hide "Security"/"Users" links from non-superadmin admins).
5. Add a **Teacher portal** (`app/teacher/*`) mirroring the student portal's structure: dashboard, my classes, attendance-marking, assignment review/grading, gradebook, materials upload, messaging, profile, security.
6. Add a dedicated **`/unauthorized` (403)** page and wire redirects there instead of silently rendering blocked pages.

### 4.3 Security Features to Add on the Frontend
> These are **UI/UX responsibilities**; the actual verification, hashing, and token issuance must happen server-side. The frontend's job is to collect data correctly, never leak secrets, and enforce good UX around security state.

1. **Real Change-Password flow**: current password + new password + confirm, submitted to backend; on frontend, never log or persist password fields, clear state immediately after submit (already done for the happy path — extend to error cases too).
2. **Real Two-Factor Authentication (2FA) enrollment UI**: QR code display for TOTP apps, backup codes display (one-time reveal, "copy" with auto-clear from clipboard state), verification code entry step — replace the current boolean toggle with a proper enrollment wizard.
3. **Session/device management page**: list active sessions/devices with "Sign out" per device and "Sign out all other sessions."
4. **Role & permission audit log view** (admin-only): show who changed which user's role and when — surfaces backend audit data.
5. **Input sanitization on all forms**: continue enforcing client-side validation (as already done in login/register) but treat it as UX-only, never as the security boundary — real enforcement must be server-side.
6. **CSRF-aware form submission pattern**: if using cookie-based sessions, ensure forms/fetch calls include CSRF tokens supplied by the backend.
7. **Content Security Policy–friendly coding**: avoid `dangerouslySetInnerHTML`; if the CMS (Hero/Product Management) ever renders rich text from the database, sanitize on the client render path too, not just at write time.
8. **Password visibility toggle** — already implemented well in Login/Register (`Eye`/`EyeOff`), replicate consistently in the Security page (currently plain `type="password"` fields with no toggle).
9. **Rate-limit-aware UI feedback**: show clear lockout/cooldown messaging after repeated failed logins (backend enforces the limit; frontend just needs to display state e.g. "Too many attempts, try again in 4:32").
10. **Generic error messaging on auth failures**: don't reveal whether it was the email or password that was wrong (avoid user enumeration) — update the current `errors.email = result.message` pattern in the commented-out handler.

### 4.4 General UX/Feature Additions (Frontend)
- **Global toast/notification system** shared across admin and student (currently `/admin/security` has a local toast; generalize into a shared component/provider).
- **Skeleton loaders / empty states** for all list pages once real data fetching replaces mock arrays.
- **Pagination or virtualization** for Users/Jobs/Courses tables (currently rendering full mock arrays directly).
- **Bulk actions** in `/admin/users` (bulk role change, bulk delete) with confirmation modals.
- **Export** (CSV/PDF) for attendance, results, and user lists.
- **Dark mode** completion — theming infra (`--*` CSS vars, `/admin/themes`) is present; confirm full coverage across every page, including student portal.
- **Accessibility pass**: forms already use `htmlFor`/`id` pairing and `aria-label`s in places (good pattern seen in password toggles) — extend consistently to modals, dropdowns, and the sidebar toggle buttons.
- **Form-level optimistic UI + error rollback** once real async submit handlers replace the commented-out mock ones.

---

## 5. Suggested Frontend RBAC Architecture (Concrete Plan)

```
app/
  middleware.ts                     # NEW - route guard based on auth cookie + role claim
  (client)/...                      # unchanged - public
  admin/
    layout.tsx                      # NEW - wraps existing pages, checks role in {"superadmin","admin"}
    ...
  teacher/                          # NEW - mirrors student/ structure
    layout.tsx
    page.tsx                        # Teacher dashboard
    classes/page.tsx                # My classes/roster
    attendance/page.tsx             # Mark attendance
    assignments/page.tsx            # Create/grade assignments
    gradebook/page.tsx
    materials/page.tsx              # Upload materials
    schedule/page.tsx
    chat/page.tsx
    profile/page.tsx
    security/page.tsx
  student/
    layout.tsx                      # EXTEND - add role check for "student"
    ...
  unauthorized/page.tsx             # NEW - 403 page

lib/
  auth/
    AuthContext.tsx                 # NEW - or authStore.ts using zustand, matching sidebarStore pattern
    permissions.ts                  # NEW - hasPermission(role, action) map
    useRequireRole.ts               # NEW - hook used inside layouts
```

**Example permission map (`lib/auth/permissions.ts`):**

| Action | superadmin | admin | teacher | student |
|---|:---:|:---:|:---:|:---:|
| View all users | ✅ | ✅ (read-only) | ❌ | ❌ |
| Edit user role | ✅ | ❌ | ❌ | ❌ |
| Delete user | ✅ | ❌ | ❌ | ❌ |
| Manage CMS content | ✅ | ✅ | ❌ | ❌ |
| Manage own courses | ✅ | ✅ | ✅ | ❌ |
| Mark attendance | ✅ | ❌ | ✅ (own classes) | ❌ |
| Submit assignment | ❌ | ❌ | ❌ | ✅ (own) |
| Grade assignment | ✅ | ❌ | ✅ (own classes) | ❌ |
| View own grades/attendance | ❌ | ❌ | ❌ | ✅ |
| Change security settings | ✅ (self) | ✅ (self) | ✅ (self) | ✅ (self) |
| View audit log | ✅ | ❌ | ❌ | ❌ |

> This is a frontend-enforced UX map for hiding/disabling controls. **It is not a security boundary by itself** — the backend must independently enforce the same rules on every request, since any frontend check can be bypassed by a motivated user calling the API directly.

---

## 6. Summary of Immediate Next Steps

1. Introduce `AuthContext`/`authStore` + `middleware.ts` for real session/role awareness.
2. Build out the missing **Teacher portal** so all three roles have a real, distinct UI.
3. Replace decorative security controls (`/admin/security`) with functioning password-change and 2FA-enrollment flows wired to a backend (once available).
4. Add role-based nav filtering and a `403 Unauthorized` page.
5. Wire up the commented-out `login`/`register` submit handlers to real endpoints, keeping the strong client-side validation already in place.
6. Treat every frontend permission check as **UX sugar only** — final authorization must be enforced server-side once the backend is built.

---

*Document generated from a full line-by-line review of the uploaded `public.zip` frontend codebase (Next.js App Router, `app/(client)`, `app/admin`, `app/student`, `store/`). No backend code was found or assumed.*
