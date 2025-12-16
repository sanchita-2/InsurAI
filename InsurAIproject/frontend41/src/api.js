import axios from 'axios';
const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
const api = axios.create({ baseURL: BASE, headers: { 'Content-Type': 'application/json' }});
api.interceptors.request.use(config => {
  try { const token = localStorage.getItem('token'); if(token) config.headers.Authorization = `Bearer ${token}`; } catch(e){}
  return config;
}, err => Promise.reject(err));
api.interceptors.response.use(res => res, err => { if(err?.response) console.error('API ERROR', err.response.status, err.response.data); else console.error('API ERROR', err); return Promise.reject(err);});
export async function apiGet(path){ const r = await api.get(path); return r.data; }
export async function apiPost(path, body){ const r = await api.post(path, body); return r.data; }
export async function apiPut(path, body){ const r = await api.put(path, body||{}); return r.data; }
export async function apiDelete(path){ const r = await api.delete(path); return r.data; }

// Auth
export const loginUser = (body) => apiPost('/auth/login', body);
export const registerUser = (body) => apiPost('/auth/register', body);

// Agents / Users
export const getApprovedAgents = () => apiGet('/api/users/agents').catch(()=>apiGet('/api/agents/approved'));
export const adminGetAgents = () => apiGet('/admin/agents').catch(()=>apiGet('/api/agents'));
export const adminGetUsers = () => apiGet('/admin/users').catch(()=>apiGet('/api/users'));
export const adminGetAppointments = () => apiGet('/admin/appointments').catch(()=>apiGet('/api/appointments'));

// Admin actions
export const adminApproveAgent = (id, approved=1) => apiPut(`/api/agents/${id}/approve?approved=${approved}`).catch(()=>apiPut(`/admin/approve/${id}?approved=${approved}`));
export const adminDeleteUser = (id) => apiDelete(`/admin/user/${id}`).catch(()=>apiDelete(`/api/users/${id}`));
export const adminDeleteAgent = (id) => apiDelete(`/admin/agent/${id}`).catch(()=>apiDelete(`/api/agents/${id}`));

// Appointments
export const bookAppointment = (dto) => apiPost('/api/users/appointments', dto).catch(()=>apiPost('/api/appointments', dto));
export const getMyAppointments = (userId) => apiGet(`/api/users/appointments/${userId}`).catch(()=>apiGet(`/api/appointments/user/${userId}`));
export const getAgentAppointments = (agentId) => apiGet(`/api/appointments/agent/${agentId}`).catch(()=>apiGet(`/agent/appointments/${agentId}`));
export const updateAppointmentStatus = (appointmentId, status) => apiPut(`/api/appointments/${appointmentId}/status?status=${encodeURIComponent(status)}`);

// Notifications
export const getUserNotifications = (userId) => apiGet(`/notifications/user/${userId}`);
export const getAgentNotifications = (agentId) => apiGet(`/notifications/agent/${agentId}`);
export const markNotificationSeen = (id) => apiPut(`/notifications/seen/${id}`);
export const markAllUserSeen = (userId) => apiPut(`/notifications/user/${userId}/seen-all`);
export const markAllAgentSeen = (agentId) => apiPut(`/notifications/agent/${agentId}/seen-all`);

// Policies
export const getPolicies = () => apiGet('/api/policies').catch(()=>apiGet('/policies'));
export const createPolicy = (p) => apiPost('/admin/policies', p).catch(()=>apiPost('/api/policies', p));
export const updatePolicy = (id,p) => apiPut(`/api/policies/${id}`, p).catch(()=>apiPut(`/admin/policies/${id}`, p));
export const deletePolicy = (id) => apiDelete(`/api/policies/${id}`).catch(()=>apiPost(`/admin/policies/${id}/delete`));

export default api;
