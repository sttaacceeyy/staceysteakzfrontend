import React, { useState, useEffect } from 'react';

const MENU_KEY = 'sharedMenu';
const initialMenu = [
  { id: 1, name: 'Ribeye Steak', category: 'Mains', available: true, price: 32 },
  { id: 2, name: 'Caesar Salad', category: 'Appetizers', available: true, price: 12 },
  { id: 3, name: 'Chocolate Lava Cake', category: 'Desserts', available: false, price: 10 },
];
function getMenu() {
  const data = localStorage.getItem(MENU_KEY);
  return data ? JSON.parse(data) : initialMenu;
}
function setMenuData(data: any[]) {
  localStorage.setItem(MENU_KEY, JSON.stringify(data));
}

const categories = ['Appetizers', 'Mains', 'Desserts', 'Drinks'];

const MenuManagement: React.FC = () => {
  const [menu, setMenu] = useState<any[]>(getMenu());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [newItem, setNewItem] = useState({ name: '', category: categories[0], price: '', available: true });

  useEffect(() => {
    const sync = () => setMenu(getMenu());
    window.addEventListener('storage', sync);
    const interval = setInterval(sync, 1000);
    return () => {
      window.removeEventListener('storage', sync);
      clearInterval(interval);
    };
  }, []);

  const handleDelete = (id: number) => {
    const updated = menu.filter((item: any) => item.id !== id);
    setMenu(updated);
    setMenuData(updated);
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setEditItem({ ...item });
  };

  const handleEditSave = () => {
    const updated = menu.map((item: any) => item.id === editingId ? { ...editItem, price: Number(editItem.price) } : item);
    setMenu(updated);
    setMenuData(updated);
    setEditingId(null);
    setEditItem(null);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.category || !newItem.price) return;
    const updated = [
      ...menu,
      { id: Date.now(), name: newItem.name, category: newItem.category, price: Number(newItem.price), available: newItem.available }
    ];
    setMenu(updated);
    setMenuData(updated);
    setNewItem({ name: '', category: categories[0], price: '', available: true });
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Menu Management (Admin)</h1>
      <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-2 mb-6 items-end">
        <input className="border p-2 rounded flex-1" placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
        <select className="border p-2 rounded" value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input className="border p-2 rounded flex-1" placeholder="Price" type="number" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={newItem.available} onChange={e => setNewItem({ ...newItem, available: e.target.checked })} />
          Available
        </label>
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Add Menu Item</button>
      </form>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Price</th>
            <th className="p-2">Available</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menu.map(item => (
            <tr key={item.id} className="border-t">
              {editingId === item.id ? (
                <>
                  <td className="p-2"><input className="border p-1 rounded w-full" value={editItem.name} onChange={e => setEditItem({ ...editItem, name: e.target.value })} /></td>
                  <td className="p-2">
                    <select className="border p-1 rounded" value={editItem.category} onChange={e => setEditItem({ ...editItem, category: e.target.value })}>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td className="p-2"><input className="border p-1 rounded w-20" type="number" value={editItem.price} onChange={e => setEditItem({ ...editItem, price: e.target.value })} /></td>
                  <td className="p-2">
                    <input type="checkbox" checked={editItem.available} onChange={e => setEditItem({ ...editItem, available: !editItem.available })} />
                  </td>
                  <td className="p-2 flex gap-2">
                    <button className="bg-green-600 text-white px-2 py-1 rounded text-xs" type="button" onClick={handleEditSave}>Save</button>
                    <button className="bg-gray-400 text-white px-2 py-1 rounded text-xs" type="button" onClick={() => setEditingId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.category}</td>
                  <td className="p-2">${item.price}</td>
                  <td className="p-2">{item.available ? 'Yes' : 'No'}</td>
                  <td className="p-2 flex gap-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs" type="button" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded text-xs" type="button" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuManagement;
