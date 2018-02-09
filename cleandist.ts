const path = require("path");
const fs = require("fs");
const distPath = './dist';

async function cleanup(dirPath: string) {
  const files = fs.readdirSync(dirPath);
  if (files.length > 0)
    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(dirPath, files[i]);
      if (fs.statSync(filePath).isFile())
        fs.unlinkSync(filePath);
      else
        cleanup(filePath);
    }
}


if (fs.existsSync(distPath)) {
  cleanup("./dist");
  console.log("previous dist cleaned");
}

