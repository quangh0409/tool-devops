import React, { useEffect, useState } from "react";
import CardComponent from "../../components/Card";
import { useParams } from "react-router-dom";
import { Title } from "../../constants/constants";

export default function TemplatePage() {
  const [title, setTitle] = useState();
  const path = useParams().id;
  useEffect(() => {
    setTitle(path);
  }, [path]);
  return (
    <div className="max-w-7xl mx-auto pt-10 w-full">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-bold">{Title[title]}</p>
        <img alt="#" src="/images/image1.svg" />
      </div>
      <div className="grid grid-cols-3 gap-9 justify-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <CardComponent
            key={index}
            bg={title === "pipeline" ? "bg-[#AECAF3]" : "bg-[#D2F2D1]"}
            color={title === "pipeline" ? "bg-blue-400" : "bg-green-400"}
            url={title + "/" + index}
          />
        ))}
      </div>
    </div>
  );
}
