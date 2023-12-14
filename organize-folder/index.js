const fs = require("fs");
const path = require("path");

const folderPath = process.argv[3];

const dirs = [
  {
    name: "pictures",
    extensions: [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"],
  },
  { name: "videos", extensions: [".mp4", ".mkv"] },
  { name: "audio", extensions: [".mp3"] },
  { name: "documnets", extensions: [".pdf", ".pptx", ".docx", ".csv"] },
  { name: "text", extensions: [".txt"] },
  { name: "applications", extensions: [".exe", ""] },
  { name: "compressed", extensions: [".zip", ".rar"] },
];
const files = fs.readdirSync(folderPath);

createDirs(); // Create the categorized folders.

// Organzie all the already existing files
files.forEach((file) => moveFile(file));

console.log("Finished 🤩");

/**
 * Moves the file to its categorized directory.
 * @param {string} file
 */
function moveFile(file) {
  try {
    if (!fs.statSync(path.join(folderPath, file)).isFile()) return;
    const extension = path.extname(file).toLowerCase();
    const dest = getDest(extension);
    fs.renameSync(
      path.join(folderPath, file),
      path.join(folderPath, dest, file)
    );
  } catch {}
}

/**
 * Creates the categorized directories (pictures, viedos, documents...). *(If directories does not exist)*
 */
function createDirs() {
  dirs.forEach((dir) => {
    if (!fs.existsSync(path.join(folderPath, dir.name)))
      fs.mkdirSync(path.join(folderPath, dir.name));
  });
}

/**
 * Returns the categorized directory to store this extension in.
 * @param {string} extension
 * @returns {string | undefined}
 */
function getDest(extension) {
  let dest;
  dirs.forEach((dir) => {
    if (dir.extensions.includes(extension)) dest = dir.name;
  });
  return dest;
}
