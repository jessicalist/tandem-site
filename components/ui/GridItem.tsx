import React from "react";
interface GridItemProps {
  size?: "large";
  title?: string;
  desc?: string;
}

export default function GridItem({ size, title, desc }: GridItemProps) {


  return (
    <div
      className={`beige-block flex flex-col w-full h-full ${size === "large" ? "col-span-2" : ""}`}>
      <h2 className="text-xl font-bold my-2">{title}</h2>
      <p className="text-md">{desc}</p>
    </div>
  );
}
