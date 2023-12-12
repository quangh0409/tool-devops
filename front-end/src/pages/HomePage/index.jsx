import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE } from "../../constants/router";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto pt-10 ">
      <div className="">
        <p>
          Build, test, and deploy your code. Make code reviews, branch
          management, and issue triaging work the way you want. Select a
          workflow to get started.
        </p>
        <p>
          Skip this and{" "}
          <Link
            to={ROUTE.TEMPLATE.replace(":id", "workflow")}
            className="underline hover:underline hover:text-green-500 text-green-300"
          >
            set up a workflow{" "}
          </Link>
          or{" "}
          <Link
            to={ROUTE.TEMPLATE.replace(":id", "pipeline")}
            className="underline hover:underline hover:text-blue-500 text-blue-300"
          >
            set up a pipeline
          </Link>{" "}
          yourself
        </p>
      </div>
      <div className="flex justify-around pt-24">
        <div
          className="rounded  w-[476px] h-[285px] border border-[#38A2DD] cursor-pointer flex justify-center items-center text-3xl font-bold hover:bg-[#AECAF3] shadow-lg"
          onClick={() => navigate(ROUTE.TEMPLATE.replace(":id", "pipeline"))}
        >
          Pipeline
        </div>
        <div
          className="rounded border w-[476px] h-[285px] border-[#4AE13D] cursor-pointer flex hover:bg-[#D2F2D1] justify-center items-center text-3xl font-bold shadow-lg"
          onClick={() => navigate(ROUTE.TEMPLATE.replace(":id", "workflow"))}
        >
          Workflow
        </div>
      </div>
    </div>
  );
}
