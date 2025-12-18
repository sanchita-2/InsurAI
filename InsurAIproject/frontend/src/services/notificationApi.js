import axios from "./api";

// 🔔 Get notifications for USER
export const getUserNotifications = async (userId) => {
  const res = await axios.get(`/notifications/user/${userId}`);
  return res.data;
};

// 🔔 Get notifications for AGENT
export const getAgentNotifications = async (agentId) => {
  const res = await axios.get(`/notifications/agent/${agentId}`);
  return res.data;
};

// ✔ Mark one notification as seen
export const markNotificationSeen = async (id) => {
  await axios.put(`/notifications/seen/${id}`);
};

// ✔ Mark ALL notifications as seen (USER)
export const markAllUserSeen = async (userId) => {
  await axios.put(`/notifications/user/${userId}/seen-all`);
};

// ✔ Mark ALL notifications as seen (AGENT)
export const markAllAgentSeen = async (agentId) => {
  await axios.put(`/notifications/agent/${agentId}/seen-all`);
};
