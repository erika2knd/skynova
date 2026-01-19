import { Suspense } from "react";
import MarketplaceClient from "./MarketplaceClient";

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#222326] pt-28" />}>
      <MarketplaceClient />
    </Suspense>
  );
}


