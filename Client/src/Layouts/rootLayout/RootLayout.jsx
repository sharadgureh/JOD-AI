import "./RootLayout.css";
import { Link, Outlet } from "react-router-dom";
import {ClerkProvider,SignedIn,UserButton,} from "@clerk/clerk-react";
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const queryClient = new QueryClient()
function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
       <QueryClientProvider client={queryClient}>
      <div className="rootLayout">
        <header>
          <Link to="/" className="logo">
            <img src="/logo.png" alt="" />
            <span>JOD AI</span>
          </Link>
          {/* user clerk component */}
          <div className="user">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default RootLayout;
