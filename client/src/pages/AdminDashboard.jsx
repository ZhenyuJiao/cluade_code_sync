import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { isLoggedIn, admin, logout } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <h2>后台管理</h2>
          <div className="admin-info">
            <span>管理员：{admin?.email || '未知'}</span>
            <button onClick={logout} className="btn-logout">退出登录</button>
          </div>
        </div>
        <p className="section-desc">案例管理功能开发中，敬请期待…</p>
      </div>
    </div>
  );
}
