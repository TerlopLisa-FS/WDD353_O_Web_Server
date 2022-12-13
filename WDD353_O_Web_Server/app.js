const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

// Creating the server
http.createServer(function (req, res) {

    let parsed = url.parse(req.url);
    let filename = path.parse(parsed.pathname)

    let filen = filename.name === "" ? "index" : filename.name;
    let ext = filename.ext === "" ? ".html" : filename.ext;
    let dir = filename.dir === "/" ? "" : filename.dir;
    let page = filename.name === "" ? "index.html" : filename.name;

    let f = (dir + '/' + filen + ext).replace("/", ""); // removing the / and replacing with a blank

    //create object for all file types
    const mimetypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml'
    }

    if (f) {
        fs.readFile(f, function (err, data) {
            if (page) {
                if (mimetypes.hasOwnProperty(ext)) {
                    res.writeHead(200, {
                        'Content-Type': mimetypes[ext]
                    })

                    if (ext === '.html') { // If the extension is .html then we will as a onload event to add styling.
                        res.write(`
                            <script>
                                window.addEventListener('load', (event) => {
                                  document.querySelector('#active-link').style.color = 'yellow';
                                });
                            </script>
                        `);
                    }
                    res.end(data, 'utf-8')
                }
            }
        })
    }
}).listen("8080", () => {
    console.log("info", "Server is on port : " + 8080)
})