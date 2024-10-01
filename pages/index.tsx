import { Analytics } from "@vercel/analytics/react";
import MapRotation from "@/components/MapRotation";

export default function Home() {
  return (
    <>
      <Analytics />
      <div className="w-full mx-auto mb-8 flex justify-center">
        <MapRotation />
      </div>
    </>
  );
}
