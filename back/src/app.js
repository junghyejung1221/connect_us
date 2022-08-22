import cors from "cors";
import express from "express";
import path from "path";
import { userAuthRouter } from "./routers/userRouter";
import { uploadRouter } from "./routers/uploadRouter";
import { postRouter } from "./routers/postRouter";
import { commentRouter } from "./routers/commentRouter";
import { projectRouter } from "./routers/projectRouter";
import { educationRouter } from "./routers/educationRouter";
import { certificateRouter } from "./routers/certificateRouter";
import { awardRouter } from "./routers/awardRouter";
import { chatRouter } from "./routers/chatRouter";
import { searchRouter } from "./routers/searchRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();
const websocket = require("./utils/socket");
const server = require("http").createServer(app);
websocket(server, app);
// CORS 에러 방지
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use("/uploads", express.static("uploads"));

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, Connect US 입니다.");
});

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use(userAuthRouter);
app.use(uploadRouter);
app.use(postRouter);
app.use(educationRouter);
app.use(projectRouter);
app.use(certificateRouter);
app.use(awardRouter);
app.use(commentRouter);
app.use(chatRouter);
app.use(searchRouter);

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

export { server };
