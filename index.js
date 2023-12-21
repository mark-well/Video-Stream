let express = require("express");
let fs = require("fs");
let app = express();
let PORT = 8080;

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.send(__dirname + "/index.html");
	res.send("Its working");
	res.status(200);
	res.end();
});

//Video stream
app.get("/video/:id", (req, res) => {
	let { id } = req.params;
	let path = `${id}.mp4`;
	let fileSize = fs.statSync(path).size;
	let range = req.headers.range;
	let chunkSize = 10**6; //1MB
	if(!range) {
		res.status(400).send("Range header required");
	}
	
	let start = Number(range.replace(/\D/g, ""));
	let end = Math.min(start + chunkSize, fileSize - 1);
	let contentLength = end - start + 1;
	let stream = fs.createReadStream(path, {start, end});
	let head = {
		"Content-Range": `bytes ${start}-${end}/${fileSize}`,
		"Accept-Range": "bytes",
		"Content-Length": contentLength,
		"Content-Type": "video/mp4",
	}
	
	res.writeHead(206, head);
	stream.pipe(res);
});

app.listen(PORT, ()=> {
	console.log(`Server is running on port ${PORT}`);
});