import React, { useEffect, useState } from "react";
import CardComponent from "../../components/Card";
import { useParams } from "react-router-dom";
import { Title } from "../../constants/constants";
import axiosInfo, { getTemplateByType } from "../../apis/axiosInfo";

export default function TemplatePage() {
  const [title, setTitle] = useState();
  const [datas, setDatas] = useState([]);
  const path = useParams().id;
  useEffect(() => {
    const fetch = async () => {
      const res = await getTemplateByType("DOCKERFILE");

      setDatas(res);
    };

    fetch();

    setTitle(path);
  }, [path]);
  return (
    <div className="max-w-7xl mx-auto pt-10 w-full">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-bold">{Title[title]}</p>
        <img alt="#" src="/images/image1.svg" />
      </div>
      <div className="grid grid-cols-3 gap-9 justify-center">
        {datas.map((data, index) => (
          <CardComponent
            key={index}
            bg={title === "pipeline" ? "bg-[#AECAF3]" : "bg-[#D2F2D1]"}
            color={title === "pipeline" ? "bg-blue-400" : "bg-green-400"}
            url={title + "/" + index}
            data={data}
          />
        ))}
      </div>
    </div>
  );
}
