const db = require('../../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (name, phoneNumber) => {
  const result = await db.User.create({name, phoneNumber});
  return result;
}

const sendOtp = async (phoneNumber) => {
  const result = await db.User.findOne({ where: { phoneNumber } });
  if(!result) {
    throw new Error('User not found');
  } 
  const otp = Math.floor(1000 + Math.random() * 9000);
  const hashedOtp = await bcrypt.hash(otp.toString(), 10);
  redisClient.set(phoneNumber, otp, 'EX', 600);
  return otp;
}

const loginUser = async (phoneNumber, otp) => {
  const result = await db.User.findOne({ where: { phoneNumber } });
 
  if(!result) {
    throw new Error('User not found');
  }
  const payload = {
    id: result.id,
    name: result.name,
  };
  const hashedOtp = await redisClient.get(phoneNumber);
  const otpResult = bcrypt.compare(otp.toString(), hashedOtp);
  if(!otpResult) {
    throw new Error('Invalid OTP');
  }
  
  const jwtToken = jwt.sign(payload, 'secret', { expiresIn: '1h' });
  return jwtToken;
}

module.exports = {
  createUser,
  sendOtp,
  loginUser
};