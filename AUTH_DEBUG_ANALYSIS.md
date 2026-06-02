# Deep Debugging Analysis: Next.js 15 Authentication Flow Issue

## Executive Summary

**The Problem**: Redux always shows `isAuthenticated: false` despite the JWT token being present in cookies and successfully logged in.

**Root Cause**: The `varifyToken()` server action is **silently failing** with no error logging, returning false state. The axios request to verify the token either:

1. Is throwing an error (caught silently)
2. Or receiving a response with a different structure than expected

---

## Complete Execution Path

### Step 1: Login Flow (LoginForm.tsx - Client Component)

```typescript
// LocationFile: src/features/auth/components/login/LoginForm.tsx:26-45
const onSubmit: SubmitHandler<LoginDataType> = async (loginFormData) => {
  const response = await loginActions(loginFormData); // ← Server Action

  if (!response.success) return;

  // ✅ Token is received from API
  await setToken(response.data.token, loginFormData.rememberMe); // ← Server Action

  // ✅ Redux state is updated locally (this works)
  dispatch(
    setAuthState({
      isAuthenticated: true,
      userInfo: response.data.user,
    }),
  );

  // ← Navigation triggers page layout to re-execute
  setTimeout(() => router.push("/"), 1500);
};
```

**What Happens**:

- User logs in successfully
- API returns token: `eyJhbGciOiJIUzI1NiIs...`
- `setToken()` stores it in httpOnly cookie ✅
- Redux is updated locally ✅
- User is redirected to home page

---

### Step 2: Page Navigation / Reload

**When the user navigates to `/` (home page), Next.js re-executes the RootLayout**

```typescript
// File: src/app/layout.tsx:18-25
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const tokenVarificationResult = await varifyToken();  // ← SERVER RUNS HERE
  console.log("PRELOADED STATE:", tokenVarificationResult);  // ← Shows false!

  return (
    <html>
      <body>
        <Providers preloadedState={{ auth: tokenVarificationResult }}>
          {/* ... */}
        </Providers>
      </body>
    </html>
  );
}
```

---

### Step 3: Token Verification - THE CRITICAL POINT

**File**: `src/features/auth/server/auth.actions.ts:35-65`

```typescript
export async function varifyToken(): Promise<AuthStateType> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  console.log("TOKEN FROM COOKIES:", token); // ✅ Logs token

  if (!token) {
    return { isAuthenticated: false, userInfo: null };
  }

  try {
    // ⚠️ CRITICAL: How is the token sent?
    const options: AxiosRequestConfig = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
      headers: {
        token, // ← Is this the correct header name?
      },
    };

    const { data } = await axios.request(options);

    // ⚠️ CRITICAL: Is the response status "varified"? (Note typo)
    if (data.status === "varified") {
      const { name, id, role } = data.decoded; // ← Is data.decoded available?
      return {
        isAuthenticated: true,
        userInfo: { name, id, role },
      };
    }

    // ⚠️ Falls through here if status !== "varified"
    return { isAuthenticated: false, userInfo: null };
  } catch (error) {
    // ❌ CRITICAL BUG: No logging!
    console.error("VERIFY TOKEN ERROR:", error); // ← NOT LOGGED
    return { isAuthenticated: false, userInfo: null };
  }
}
```

---

### Step 4: Redux Store Creation with False State

**File**: `src/components/providers/providers.tsx:15-24`

```typescript
export default function Providers({
  children,
  preloadedState,
}: ProvidersProps) {
  const storeRef = useRef<AppStoreType | null>(null);

  if (!storeRef.current) {
    // ❌ If preloadedState.auth.isAuthenticated is false, Redux is locked to false
    storeRef.current = createStore(preloadedState);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
```

**Issue**: The Redux store is created ONCE with preloadedState. Once false, it never changes unless manually dispatched.

---

### Step 5: NavBar Shows Wrong State

**File**: `src/components/shared/NavBar.tsx:18-21`

```typescript
export default function NavBar() {
  const { isAuthenticated } = useSelector(
    (appState: RootStateType) => appState.auth,
  );
  // Uses false state → shows "Sign In" / "Sign Up" buttons
}
```

---

## The Three Most Likely Culprits

### 🔴 Issue #1: Silent Axios Failure (MOST LIKELY)

**Location**: `src/features/auth/server/auth.actions.ts:43-63`

The `catch` block has NO error logging:

```typescript
catch (error) {
  return { isAuthenticated: false, userInfo: null };  // ❌ Silent failure
}
```

**Possible reasons for axios failure**:

1. **Wrong header format**: API expects `Authorization: Bearer <token>` not `token: <token>`
2. **CORS issue**: Request blocked by CORS policy
3. **Network timeout**: Server taking too long
4. **API endpoint wrong**: Maybe endpoint changed or is unavailable
5. **Token format issue**: Token is corrupted or malformed

### 🔴 Issue #2: Response Structure Mismatch

**Location**: `src/features/auth/server/auth.actions.ts:50-56`

```typescript
if (data.status === "varified") {  // ← Is this the actual field/value?
  const { name, id, role } = data.decoded;  // ← Does data.decoded exist?
```

**Problems**:

- No validation of response shape
- Typo "varified" instead of "verified" (but might be correct for the API)
- If API returns different structure, silently fails

### 🔴 Issue #3: No Logging of Actual Response

Even when axios succeeds, there's NO logging of what the API actually returned:

```typescript
const { data } = await axios.request(options); // ← What's actually in data?
```

---

## The Fix

### Part 1: Add Comprehensive Error & Response Logging

**File**: `src/features/auth/server/auth.actions.ts`

Replace the `varifyToken()` function with:

```typescript
export async function varifyToken(): Promise<AuthStateType> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  console.log("🔐 TOKEN FROM COOKIES:", token);

  if (!token) {
    console.warn("⚠️ NO TOKEN FOUND IN COOKIES");
    return { isAuthenticated: false, userInfo: null };
  }

  try {
    console.log("🔍 ATTEMPTING TO VERIFY TOKEN...");

    const options: AxiosRequestConfig = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
      headers: {
        token,
      },
    };

    const { data } = await axios.request(options);

    // ✅ NEW: Log the actual response structure
    console.log("✅ VERIFY TOKEN RESPONSE:", JSON.stringify(data, null, 2));
    console.log("   - Response status field:", data.status);
    console.log("   - Response decoded field:", data.decoded);

    if (data.status === "varified") {
      const { name, id, role } = data.decoded;
      console.log("✅ TOKEN VERIFIED - User:", { name, id, role });
      return {
        isAuthenticated: true,
        userInfo: { name, id, role },
      };
    }

    console.warn(
      "⚠️ TOKEN STATUS MISMATCH - Expected 'varified', got:",
      data.status,
    );
    return { isAuthenticated: false, userInfo: null };
  } catch (error) {
    // ✅ NEW: Detailed error logging
    console.error("❌ TOKEN VERIFICATION FAILED:");

    if (error instanceof axios.AxiosError) {
      console.error("   HTTP Status:", error.response?.status);
      console.error(
        "   Response:",
        JSON.stringify(error.response?.data, null, 2),
      );
      console.error("   Message:", error.message);
    } else {
      console.error("   Error:", error);
    }

    return { isAuthenticated: false, userInfo: null };
  }
}
```

### Part 2: If Still Not Working - Try Alternative Header Format

If logging shows the request is being made but the API rejects it, the issue might be the header format. Try:

```typescript
const options: AxiosRequestConfig = {
  method: "GET",
  url: "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
  headers: {
    Authorization: `Bearer ${token}`, // ← Try this format
  },
};
```

Or check the API documentation for the correct header name.

### Part 3: Handle Server Action Caching (Optional)

If the issue persists even with correct token, it might be Next.js caching the server action:

```typescript
export async function varifyToken(): Promise<AuthStateType> {
  // Add this at the top to prevent caching
  const cookieStore = await cookies(); // ← This already prevents caching

  // ... rest of function
}
```

Note: Using `cookies()` already prevents caching, so this should not be needed.

---

## Debugging Steps (Run These Now)

1. **Check Server Logs**: After logging in, navigate to home page and check the server console output. Look for:
   - ✅ Token found in cookies
   - ✅ Verify token request initiated
   - ❌ OR error message with details

2. **Check the Actual Response**:
   - If you see the response logged, verify it contains `status: "varified"`
   - If not, what does it actually contain?

3. **Test the Endpoint Manually** (in terminal):

   ```bash
   curl -H "token: YOUR_TOKEN_HERE" https://ecommerce.routemisr.com/api/v1/auth/verifyToken
   ```

4. **Check API Documentation**: Verify:
   - Correct endpoint URL
   - Correct header name for token
   - Correct response structure
   - Correct status value

---

## Summary of Changes Made

✅ Added detailed console.log for axios response  
✅ Added detailed error logging in catch block  
✅ Added logging for intermediate steps  
✅ Makes debugging visible in Next.js server console

---

## What to Do Next

1. Run your app with these changes
2. Perform a login
3. Navigate to home page
4. **Check your terminal/console** where Next.js is running
5. Look for either:
   - ✅ `✅ TOKEN VERIFIED` message (working!)
   - ❌ Error details telling you what went wrong
6. Share the console output and I'll provide the exact fix

---

## Prevention for Future

- Always log errors, even in fallback paths
- Never silently return false/null without knowing why
- Always log unexpected API responses
- Document assumed API response structure
- Add integration tests for server actions
