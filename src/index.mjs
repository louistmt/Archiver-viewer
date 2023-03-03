import { request } from "https"
import express from "express"

const PORT = 9090
const app = express()
const staticFilesPath = import.meta.url.replace("file:///", "").replace("src/index.mjs", "static/")

app.set("title", "Archive Viewer")
app.use("/static", express.static(staticFilesPath))

app.get("/viewer/:channelId/:fileId/:fileName", (req, res) => {
    res.sendFile("viewer.html", {root: staticFilesPath})
})

app.get("/api/:channelId/:fileId/:fileName", (req, res) => {
    const {channelId, fileId, fileName} = req.params;
    const cdnReq = request(`https://cdn.discordapp.com/attachments/${channelId}/${fileId}/${fileName}`);
    cdnReq.on("response", (cdnRes) => {
        if (cdnRes.statusCode !== 200) {
            res.status("404")
            res.end()
            cdnRes.destroy()
            return
        }
        res.type("application/json")
        cdnRes.pipe(res)
    });
    cdnReq.end()
})

app.listen(PORT, () => {
    console.log(`App is up at port ${PORT}`)
    console.log(`Root path is ${staticFilesPath}`);
})