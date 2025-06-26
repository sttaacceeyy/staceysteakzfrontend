import React, { useState } from 'react';

const initialUsers = [
  { id: 1, username: 'admin', role: 'ADMIN', active: true },
  { id: 2, username: 'manager1', role: 'MANAGER', active: true },
  { id: 3, username: 'chef1', role: 'CHEF', active: true },
  { id: 4, username: 'cashier1', role: 'CASHIER', active: false },
];

const roles = ['ADMIN', 'MANAGER', 'CHEF', 'CASHIER', 'HQMANAGER', 'CUSTOMER'];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'CUSTOMER' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.username || !newUser.password) return;
    setUsers([
      ...users,
      { id: Date.now(), username: newUser.username, role: newUser.role, active: true }
    ]);
    setNewUser({ username: '', password: '', role: 'CUSTOMER' });
  };

  const handleRemove = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleRoleChange = (id: number, role: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, role } : u));
  };

  const handleToggleActive = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-2 mb-6 items-end">
        <input className="border p-2 rounded flex-1" placeholder="Username" value={newUser.username} onChange={e => setNewUser({ ...newUser, username: e.target.value })} />
        <input className="border p-2 rounded flex-1" placeholder="Password" type="password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
        <select className="border p-2 rounded" value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Add User</button>
      </form>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Username</th>
            <th className="p-2">Role</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.username}</td>
              <td className="p-2">
                <select value={user.role} onChange={e => handleRoleChange(user.id, e.target.value)} className="border p-1 rounded">
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </td>
              <td className="p-2">
                <button className={`px-2 py-1 rounded text-xs ${user.active ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`} onClick={() => handleToggleActive(user.id)}>
                  {user.active ? 'Active' : 'Inactive'}
                </button>
              </td>
              <td className="p-2">
                <button className="bg-red-500 text-white px-2 py-1 rounded text-xs" onClick={() => handleRemove(user.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
