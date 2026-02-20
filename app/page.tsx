"use client";
import Title from "@/components/ui/Title";
import Navigation from "@/components/ui/NavigationHeader";
import Grid from "@/components/ui/Grid";

export default function Home() {
  return (
    <div>
      <Navigation />
      <Grid />
      <footer className="flex flex-col font-sm p-4">
        <span className="font-sm">
          This work is supported in part by the National Science Foundation
          Grant DB&I 0542751.
        </span>
        <span className="font-sm">
          Any opinions, findings, and conclusions or recommendations expressed
          in this material are those of the author(s) and do not necessarily
          reflect the views of the National Science Foundation.
        </span>
      </footer>
    </div>
  );
}
