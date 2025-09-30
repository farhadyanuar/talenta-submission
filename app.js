// server.js
const app = require("./api/index");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Local server running at http://localhost:${PORT}`);
});
