import express from "express";

const PORT = 9090
const app = express();

app.use("/static", express.static("static"))

app.listen(PORT, () => {
    console.log(`App is up at port ${PORT}`);
})