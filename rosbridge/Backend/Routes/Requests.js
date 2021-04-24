const express = require('express');
const router = express.Router();

const { validateRequest, rejectRequest, getRegisterRequests } = require("../Controllers/Requests");

router.route("/validaterequest").post(validateRequest);

router.route("/rejectrequest").post(rejectRequest);

router.route("/getregisterrequests").post(getRegisterRequests);

module.exports = router;