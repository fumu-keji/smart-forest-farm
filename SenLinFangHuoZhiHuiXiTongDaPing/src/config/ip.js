// 域名的环境区分
let baseDomain = "";
if (import.meta.env.MODE == "development") {
  baseDomain = "https://localhost:22986/api";
} else if (import.meta.env.VITE_APP_CURRENTMODE == "test") {
  baseDomain = "";
} else if (import.meta.env.VITE_APP_CURRENTMODE == "production") {
  baseDomain = "https://localhost:22986/api";
}
export const BASE_SERVER_URL = `${baseDomain}`;

// 应用类型
export const APPLICATION_TYPE = "large";
export const PROJECT_KEY = "fmy-8325756297936931";
// 文件上传
export const BASE_FILE_UPLOAD_URL = `${BASE_SERVER_URL}/file/upload`;
// 文件预览
export const BASE_FILE_PREVIEW_URL = `${BASE_SERVER_URL}/file/preview`;
// 文件下载
export const BASE_FILE_DOWNLOAD_URL = `${BASE_SERVER_URL}/file/download`;

