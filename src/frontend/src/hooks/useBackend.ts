import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { createActor } from "../backend";
import type { backendInterface } from "../backend";

export interface BackendHook {
  actor: backendInterface | null;
  isAuthenticated: boolean;
  principal: Principal | null;
  loginStatus: string;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

export function useBackend(): BackendHook {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { actor, isFetching } = useActor(createActor);

  const isAuthenticated = loginStatus === "success" && !!identity;
  const principal = identity?.getPrincipal() ?? null;

  return {
    actor: actor as backendInterface | null,
    isAuthenticated,
    principal,
    loginStatus,
    login,
    logout: clear,
    isLoading: isFetching || loginStatus === "logging-in",
  };
}
