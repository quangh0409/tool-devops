import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import axiosClient from "../../apis/axiosClient";
import MarkdownIt from "markdown-it";

export default function TemplateDetailPage() {
  const name = useParams().tab;
  const mdParser = new MarkdownIt({
    html: true,
  });
  const [description, setDescription] = useState();
  const descript = async () => {
    const res = await axiosClient.post("/v1/in/tool-checks/trivy", {
      content: "vutrongquang/mail",
    });
    if (res) {
      setDescription(res.data.description);
    }
  };
  useEffect(() => {
    descript();
  }, []);
  return (
    <div className="max-w-7xl mx-auto pt-10 w-full">
      <div className="flex justify-between mb-6">
        <Button size="large" className="border rounded-xl ">
          {name === "pipeline" ? "Dockerfile" : "ci.yaml"}
        </Button>
        <Button size="large" className="bg-[#39AC6D]  text-white">
          {" "}
          Download
        </Button>
      </div>
      <div className="rounded-lg border p-4">
        <div>
          <button className="text-white px-5 py-2 border rounded-lg bg-black">
            Edit
          </button>
          <button className="ml-5 px-5 py-2 border rounded-lg">Preview</button>
        </div>
        <div className="grid grid-cols-3 mt-3  gap-7">
          <div className="col-span-2 border rounded-lg">
            <div
              dangerouslySetInnerHTML={{
                __html: mdParser.render(description),
              }}
            />
          </div>
          <div className="col-span-1 border rounded-lg "></div>
        </div>
      </div>
    </div>
  );
}
