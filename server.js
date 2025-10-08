const app = require("./api/index.js"); // adjust if your main file path differs

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
