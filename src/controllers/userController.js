const userServices = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const result = await userServices.createUser(name, phoneNumber);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const result = await userServices.sendOtp(phoneNumber);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const loginUser = async (req, res) => {
  try {
    const otp = req.body.otp;
    const phoneNumber = req.body.phoneNumber;
    const result = await userServices.loginUser(phoneNumber, otp);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createUser,
  sendOtp,
  loginUser
};