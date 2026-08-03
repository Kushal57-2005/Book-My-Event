import { ApiResponse } from "../../utils/api-response.js";
import { asyncHandler } from "../../utils/async-handler.js";

const healthCheckService = asyncHandler(async (req, res) => {
  const message = "Everything is working fine";
  return res.status(200).json(new ApiResponse(200, message));
});

export default healthCheckService;
