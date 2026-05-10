import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_BASE });

// 管理员登录
export const loginAdmin = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

// 获取案例列表（公开）
export const getCases = async (params = {}) => {
  const { data } = await api.get('/cases', { params });
  return data;
};

// 获取单个案例（公开）
export const getCase = async (id) => {
  const { data } = await api.get(`/cases/${id}`);
  return data;
};

// 后台：新增案例（需 token）
export const createCase = async (caseData, token) => {
  const { data } = await api.post('/cases', caseData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// 后台：更新案例
export const updateCase = async (id, caseData, token) => {
  const { data } = await api.put(`/cases/${id}`, caseData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// 后台：删除案例
export const deleteCase = async (id, token) => {
  const { data } = await api.delete(`/cases/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
