import axios from "axios";
import { addfullname } from "../redux/reducer/adminSlide";
import { store } from "../redux/store";
import { message } from "antd";
const axiosInfo = () => {
  const axiosTemp = axios.create({
    baseURL: "http://35.213.168.72:8000",
  });

  axiosTemp.defaults.headers.common["token"] = localStorage.getItem("token");

  return axiosTemp;
};

export async function getTemplateByType(type) {
  const uri = `/api/v1/templates/types?type=${type}`;

  try {
    const res = await axiosInfo().get(uri);

    if (res.status !== 200) {
      return [];
    }

    return res.data;
  } catch (error) {
    console.log(error);
    alert("Hết phiên đăng nhập. Vui lòng đăng nhập lại!")
  }
}

export async function getContentFile(fileId) {
  const uri = `/api/v1/files/content/${fileId}`;
  try {
    const res = await axiosInfo().get(uri);

    if (res.status !== 200) {
      return "";
    }

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function login(email, password) {
  const res = await axiosInfo().post("/api/v1/auth/login", {
    email: email,
    password: password,
  });

  if (!res) {
    alert("server has error");
  }
  store.dispatch(addfullname({ fullname: res.data.fullname }));
  localStorage.setItem("token", res.data.accessToken);
  localStorage.setItem("roles", res.data.roles[0]);
  localStorage.setItem("userId", res.data.id);
  localStorage.setItem("fullname", res.data.fullname);
}

axiosInfo().interceptors.request.use(async (config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInfo().interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },

  (error) => {
    if (!error.response) {
      console.error("Unknown error:", error.message);
      return;
    }

    const { status, data } = error.response;
    if (status >= 500) {
      // TODO: Show server error message
    } else if (400 <= status && status < 500) {
      // throw new CustomError(data);
      // message.error("Hết phiên đăng nhập")
    }
  }
);
export default axiosInfo;
