import {
  Button,
  Empty,
  Form,
  Input,
  Skeleton,
  Space,
  Table,
  Tooltip,
} from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import { checkTrivy } from "../../apis/axiosClient";

export default function ScanPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [form] = Form.useForm();
  const onFinish = async (val) => {
    try {
      setLoading(true);
      const res = await checkTrivy({ content: val.scan });
      if (res) {
        setLoading(false);
        setData(res);
        setResults(res.Results);
        form.resetFields();
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const severity = {
    UNKNOWN: <span className="text-yellow-300">{`UNKNOWN`}</span>,
    CRITICAL: <span className="text-red-700 font-bold">{`CRITICAL`}</span>,
    HIGH: <span className="text-orange-700">{`HIGH`}</span>,
    MEDIUM: <span className="text-orange-300">{`MEDIUM`}</span>,
    LOW: <span className="text-green-400">{`LOW`}</span>,
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
    },
    {
      title: "Library",
      dataIndex: "library",
    },
    {
      title: "Vulnerability",
      dataIndex: "vulnerabilityID",
    },
    {
      title: "Severity",
      dataIndex: "severity",
      render: (text) => severity[text],
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "InstalledVersion",
      dataIndex: "installedVersion",
    },
    {
      title: "FixedVersion",
      dataIndex: "fixedVersion",
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (text) => {
        const content = text.content.split("\n");
        return (
          <>
            <Tooltip title={text.description} overlayClassName="h-24 w-22">
              <p>{content[0]}</p>{" "}
              <a href={content[1]} className="text-blue-300">
                {content[1]}
              </a>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <div className="p-12">
      <div className="text-center">
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="scan"
            rules={[{ required: true, message: "Không được để trống!" }]}
          >
            <Space.Compact
              style={{
                width: "30%",
              }}
            >
              <Input placeholder="Scan Image" />
              <Button loading={loading} htmlType="submit">
                Scan
              </Button>
            </Space.Compact>
          </Form.Item>
        </Form>
      </div>
      <div className="grid grid-cols-5 gap-5 p-5">
        {(data.length === 0) & (loading === false) ? (
          <div className="col-span-2 border rounded-lg flex justify-center items-center">
            <Empty />
          </div>
        ) : loading ? (
          <Skeleton.Input
            active={true}
            size={"large"}
            block={true}
            className="!h-52 col-span-2"
          />
        ) : (
          <div className="col-span-2 border rounded-lg p-5">
            <div className="grid grid-cols-4 gap-3 items-center">
              <p className="col-span-1 text-xl font-semibold">DockerImage</p>
              <span className="col-span-3 ">{data.ArtifactName}</span>
            </div>
            <div className="grid grid-cols-4 gap-3 items-center">
              <p className="col-span-1 text-xl font-semibold">Type:</p>
              <span className="col-span-3">{data.ArtifactType}</span>
            </div>
            <div className="grid grid-cols-4 gap-3 items-center">
              <p className="col-span-1 text-xl font-semibold">CreatedAt:</p>
              <span className="col-span-3">
                {dayjs(data.Metadata.ImageConfig.created).format(
                  "HH:mm, DD-MM-YYYY"
                )}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3 items-center">
              <p className="col-span-1 text-xl font-semibold">OS:</p>
              <span className="col-span-3">{`${data.Metadata.ImageConfig.os}/${data.Metadata.ImageConfig.architecture}`}</span>
            </div>
            <div className="grid grid-cols-4 gap-3 ">
              <p className="col-span-1 text-xl font-semibold">Layers:</p>
              <span className="col-span-3 overflow-auto">
                {data.Metadata.ImageConfig.rootfs.diff_ids.map((id) => {
                  return (
                    <>
                      <span className="col-span-2">{`${id}`}</span>
                      <br />
                    </>
                  );
                })}
              </span>
            </div>
          </div>
        )}
        <div className="col-span-3 border rounded-lg p-5">
          {results.map((val) => (
            <>
              <div>
                {val.Target} ({val.Class})
              </div>
              <span>{`Total: ${val.Vulnerabilities.length} `}</span>
              <span>{`( `}</span>
              <span className="text-yellow-300">{`UNKNOWN`}</span>
              <span>
                {`: ${
                  val.Vulnerabilities.filter((v) => v.Severity === "UNKNOWN")
                    .length
                }, `}
              </span>
              <span className="text-green-400">{`LOW`}</span>
              <span>
                {`:
                ${
                  val.Vulnerabilities.filter((v) => v.Severity === "LOW").length
                } `}
              </span>
              <span className="text-orange-300">{`MEDIUM`}</span>
              <span>
                {`: 
                ${
                  val.Vulnerabilities.filter((v) => v.Severity === "MEDIUM")
                    .length
                }, `}
              </span>
              <span className="text-orange-700">{`HIGH`}</span>
              <span>
                {`: 
                ${
                  val.Vulnerabilities.filter((v) => v.Severity === "HIGH")
                    .length
                }, `}
              </span>
              <span className="text-red-700 font-bold">{`CRITICAL`}</span>
              <span>
                {`:
                ${
                  val.Vulnerabilities.filter((v) => v.Severity === "CRITICAL")
                    .length
                })`}
              </span>
              <Table
                scroll={{ x: 500 }}
                pagination={false}
                className="col-span-3"
                loading={loading}
                bordered
                columns={columns}
                dataSource={val?.Vulnerabilities?.map((val, index) => {
                  return {
                    key: index + 1,
                    library: val.PkgName,
                    vulnerabilityID: val.VulnerabilityID,
                    severity: val.Severity,
                    status: val.Status,
                    installedVersion: val.InstalledVersion,
                    fixedVersion: val.FixedVersion,
                    title: {
                      content: `${val.Title}\n${val.PrimaryURL}`,
                      description: val.Description,
                    },
                  };
                })}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
