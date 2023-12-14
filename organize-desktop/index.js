const fs = require("fs");
const path = require("path");
const os = require("os");

const isTask = process.argv[2] === "--task";
const desktop = path.join(
  "C:",
  "Users",
  os.userInfo().username,
  "OneDrive",
  "Desktop"
);
const dirs = [
  { name: "pictures", extensions: [".jpg", ".jpeg", ".png", ".gif"] },
  { name: "videos", extensions: [".mp4", ".mkv"] },
  { name: "audio", extensions: [".mp3"] },
  { name: "documnets", extensions: [".pdf", ".pptx", ".docx"] },
  { name: "text", extensions: [".txt"] },
  { name: "applications", extensions: [".exe"] },
  { name: "compressed", extensions: [".zip", ".rar"] },
];
const files = fs.readdirSync(desktop);

createDirs(); // Create the categorized folders.

// Organzie all the already existing files
files.forEach((file) => moveFile(file));

console.log(isTask ? "Finished 🤩" : "🤩 Started...");

// Listen for any added files
if (!isTask)
  // Listens only if the script is run as a service
  fs.watch(desktop).on("change", (event, file) =>
    // Waits for 50 milliseconds then move the file to avoid crashs
    setTimeout(() => moveFile(file), 50)
  );

/**
 * Moves the file to its categorized directory.
 * @param {string} file
 */
function moveFile(file) {
  try {
    if (!fs.statSync(path.join(desktop, file)).isFile()) return;
    const extension = path.extname(file).toLowerCase();
    const dest = getDest(extension);
    fs.renameSync(path.join(desktop, file), path.join(desktop, dest, file));
  } catch {}
}

/**
 * Creates the categorized directories (pictures, viedos, documents...). *(If directories does not exist)*
 */
function createDirs() {
  dirs.forEach((dir) => {
    if (!fs.existsSync(path.join(desktop, dir.name)))
      fs.mkdirSync(path.join(desktop, dir.name));
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
