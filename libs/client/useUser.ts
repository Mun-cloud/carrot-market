import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { User } from "@prisma/client";

interface Idata {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const { data, error } = useSWR<Idata>("/api/users/me", (url: string) =>
    fetch(url).then((res) => res.json())
  );
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok && router.pathname !== "/enter") {
      router.replace("/enter");
    }
    if (data && data.ok && router.pathname === "/enter") {
      router.replace("/");
    }
  }, [data, router]);
  return { user: data?.profile, isLoading: !data && !error };
}
