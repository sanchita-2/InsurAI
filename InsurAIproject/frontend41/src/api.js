import axios from "axios";
import { getToken } from "./auth";

const BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ================= GENERIC HELPERS ================= */
export const apiGet = async (path, params = {}) =>
  (await api.get(path, { params })).data;

export const apiPost = async (path, body) =>
  (await api.post(path, body)).data;

export const apiPut = async (path, body) =>
  (await api.put(path, body)).data;

export const apiDelete = async (path) =>
  (await api.delete(path)).data;

/* ================= AUTH ================= */
export const loginUser = (data) =>
  apiPost("/auth/login", data);

export const registerUser = (data) =>
  apiPost("/auth/register", data);

/* ================= ADMIN ================= */
export const adminGetUsers = () =>
  apiGet("/admin/users");

export const adminGetAgents = () =>
  apiGet("/admin/agents");

export const adminApproveAgent = (agentId, approved) =>
  apiPut(`/admin/agents/${agentId}/approve`, { approved });

export const adminGetAppointments = () =>
  apiGet("/admin/appointments");


/* ================= ADMIN → POLICY CRUD ================= */
export const adminGetPolicies = () =>
  apiGet("/admin/policies");

export const adminCreatePolicy = (policy) =>
  apiPost("/admin/policies", policy);

export const adminUpdatePolicy = (id, policy) =>
  apiPut(`/admin/policies/${id}`, policy);

export const adminDeletePolicy = (id) =>
  apiDelete(`/admin/policies/${id}`);

export const adminGetPurchasedPolicies = () =>
 apiGet("/user-policies/admin/all");
/* ================= PUBLIC POLICIES ================= */
export const getPolicies = () =>
  apiGet("/policies");

/* ================= USER POLICIES (BUY FLOW) ================= */
// BUY POLICY
export async function buyPolicy(userId, policyId) {
  return apiPost(`/user-policies/buy?userId=${userId}&policyId=${policyId}`);
}

export async function getUserPolicies(userId) {
  return apiGet(`/user-policies/user/${userId}`);
}



export async function cancelUserPolicy(userPolicyId) {
  return apiPut(`/user-policies/${userPolicyId}/cancel`);
}

export async function renewUserPolicy(userPolicyId) {
  return apiPut(`/user-policies/${userPolicyId}/renew`);
}

/* ================= USER ================= */
export const getMyAppointments = (userId) =>
  apiGet(`/appointments/user/${userId}`);

export const bookAppointment = (data) =>
  apiPost("/appointments", data);

export const getUserNotifications = (userId) =>
  apiGet(`/notifications/user/${userId}`);

export const markNotificationSeen = (id) =>
  apiPut(`/notifications/seen/${id}`);

export const markAllUserNotificationsSeen = (userId) =>
  apiPut(`/notifications/user/${userId}/seen-all`);

/* ================= AGENT ================= */
export const getAgentAppointments = (agentId) =>
  apiGet(`/appointments/agent/${agentId}`);

export const getAgentNotifications = (agentId) =>
  apiGet(`/notifications/agent/${agentId}`);

export const markAllAgentNotificationsSeen = (agentId) =>
  apiPut(`/notifications/agent/${agentId}/seen-all`);

export const updateAppointmentStatus = (id, status) =>
  api.put(`/appointments/${id}/status`, null, {
    params: { status },
  }).then(res => res.data);

/* ================= AGENTS (PUBLIC) ================= */
export const getApprovedAgents = () =>
  apiGet("/agents/approved");
