export function saveAuth(obj){
  if(obj?.token) localStorage.setItem('token', obj.token);
  if(obj?.user) localStorage.setItem('user', JSON.stringify(obj.user));
}
export function getCurrentUser(){
  try{ return JSON.parse(localStorage.getItem('user')); } catch { return null; }
}
export function logout(){
  localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href = '/login';
}
