const jwt = require('jsonwebtoken');
const gymServices = require('../services/gymService');

const createSession = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const validatedResult = jwt.verify(token, 'secret');
    if(!validatedResult) {
      throw new Error('Invalid token');
    }
    req.user = validatedResult;
    const { userId } = req.body;
    const result = await gymServices.createSession(userId);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getSessions = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const validatedResult = jwt.verify(token, 'secret');
    if(!validatedResult) {
      throw new Error('Invalid token');
    }
    req.user = validatedResult;
    const userId = req.query.userId;
    const result = await gymServices.getSessions(userId);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const completeSession = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const validatedResult = jwt.verify(token, 'secret');
    if(!validatedResult) {
      throw new Error('Invalid token');
    }
    req.user = validatedResult;
    const userId = req.body.userId;
    const { id } = req.params;
    const result = await gymServices.completeSession(id, userId);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const addFeedback = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const validatedResult = jwt.verify(token, 'secret');
    if(!validatedResult) {
      throw new Error('Invalid token');
    }
    req.user = validatedResult;
    const {userId, review} = req.body;
    const { id } = req.params;
    const result = await gymServices.addFeedback(id, userId, review);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getCompletedSessions = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const validatedResult = jwt.verify(token, 'secret');
    if(!validatedResult) {
      throw new Error('Invalid token');
    }
    req.user = validatedResult;
    const userId = req.params.id;
    const result = await gymServices.getCompletedSessions(userId);
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createSession,
  getSessions,
  completeSession,
  addFeedback,
  getCompletedSessions
};