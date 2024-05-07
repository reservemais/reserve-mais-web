"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/hooks";
import { Loading } from "@/components";

const PrivateRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(pathname || "/");
    } else {
      router.replace("/");
    }
  }, [isAuthenticated, router, pathname]);

  if (!isAuthenticated) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

export default PrivateRouteWrapper;
