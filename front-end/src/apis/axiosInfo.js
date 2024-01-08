import axios from "axios";

const axiosInfo = () => {
  const axiosTemp = axios.create({
    baseURL: "http://35.213.168.72:8000",
  });

  axiosTemp.defaults.headers.common["token"] = localStorage.getItem("token");

  return axiosTemp;
};

export async function getTemplateByType(type) {
  const uri = `/api/v1/templates/types?type=${type}`;

  const res = await axiosInfo().get(uri);

  if (res.status !== 200) {
    return [];
  }

  return res.data;
}

export async function login(email, password) {
  const res = await axiosInfo().post("/api/v1/auth/login", {
    email: email,
    password: password,
  });

  if (!res) {
    alert("server has error");
  }
  localStorage.setItem("token", res.data.accessToken);
  localStorage.setItem("roles", res.data.roles[0]);
  localStorage.setItem("userId", res.data.id);
}

export default axiosInfo;
