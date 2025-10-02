import swaggerSpec from "../../swagger.js";

export default function handler(req, res) {
  res.status(200).json(swaggerSpec);
}
