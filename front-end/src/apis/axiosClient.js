import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://35.213.179.183:6807",
});

export async function checkHadolint(content) {
  const res = await axiosClient.post(
    `/api/v1/in/tool-checks/hadolint`,
    content
  );
  if (res.status !== 200) {
    return [];
  }
  return res.data;
}

export async function checkTrivy(content) {
  const res = await axiosClient.post(`/api/v1/in/tool-checks/trivy`, content);
  if (res.status !== 200) {
    return undefined;
  }
  return res.data.description;
}

export default axiosClient;
