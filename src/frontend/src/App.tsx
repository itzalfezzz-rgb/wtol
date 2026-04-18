import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { useBackend } from "./hooks/useBackend";
import Login from "./pages/Login";

const MapPage = lazy(() => import("./pages/MapPage"));
const WorkoutsPage = lazy(() => import("./pages/WorkoutsPage"));
const CoachPage = lazy(() => import("./pages/CoachPage"));
const FeedPage = lazy(() => import("./pages/FeedPage"));
const CompetitionPage = lazy(() => import("./pages/CompetitionPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function PageLoader() {
  return (
    <div className="flex-1 p-4 space-y-3">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, loginStatus } = useBackend();

  if (
    isLoading ||
    loginStatus === "logging-in" ||
    loginStatus === "initializing"
  ) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold">
              W
            </span>
          </div>
          <div className="w-5 h-5 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return <>{children}</>;
}

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Login route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

// Auth layout route
const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth",
  component: () => (
    <AuthWrapper>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </AuthWrapper>
  ),
});

const mapRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/",
  component: () => <MapPage />,
});

const workoutsRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/workouts",
  component: () => <WorkoutsPage />,
});

const coachRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/coach",
  component: () => <CoachPage />,
});

const feedRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/feed",
  component: () => <FeedPage />,
});

const competitionRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/competition",
  component: () => <CompetitionPage />,
});

const profileRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/profile",
  component: () => <ProfilePage />,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  authLayoutRoute.addChildren([
    mapRoute,
    workoutsRoute,
    coachRoute,
    feedRoute,
    competitionRoute,
    profileRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
