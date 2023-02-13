const db = require('../../database/models');
const jwt = require('jsonwebtoken');

const createSession = async (userId) => {
  const data = {"isComplete": false, "trainer": "Rahul", "user_id": userId};
  const result = await db.Gym.create(data);
  if(!result) {
    throw new Error('Error in creating session');
  }
  return result;
}

const getSessions = async (userId) => {
  const result = await db.Gym.findAll({ where: { user_id: userId } });
  if(!result) {
    throw new Error('Error in getting sessions');
  }
  return result;
}

const completeSession = async (id, userId) => {
  const result = await db.Gym.update({ isComplete: true }, { where: { id, user_id: userId } });
  if(!result) {
    throw new Error('Error in completing session');
  }
  const updatedResult = await db.Gym.findOne({ where: { id, user_id: userId } });
  return updatedResult;
}

const addFeedback = async (id, userId, review) => {
  const result = await db.Gym.update({ review }, { where: { id, user_id: userId } });
  if(!result) {
    throw new Error('Error in adding feedback');
  }
  const updatedResult = await db.Gym.findOne({ where: { id, user_id: userId } });
  return updatedResult;
}

const getCompletedSessions = async (userId) => {
  const result = await db.Gym.findAll({ where: { user_id: userId, isComplete: true } });
  if(!result) {
    throw new Error('Error in getting completed sessions');
  }
  return result;
} 

module.exports = {
  createSession,
  getSessions,
  completeSession,
  addFeedback,
  getCompletedSessions,
};