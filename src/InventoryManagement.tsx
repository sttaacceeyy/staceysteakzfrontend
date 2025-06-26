import React, { useEffect, useState } from 'react';

const INVENTORY_KEY = 'sharedInventory';
const initialInventory = [
  { id: 1, name: 'Ribeye Steak', quantity: 20, unit: 'kg', threshold: 5 },
  { id: 2, name: 'Caesar Salad', quantity: 30, unit: 'servings', threshold: 10 },
  { id: 3, name: 'Chocolate Lava Cake', quantity: 15, unit: 'servings', threshold: 5 },
  { id: 4, name: 'Lemonade', quantity: 40, unit: 'liters', threshold: 10 },
  { id: 5, name: 'Grilled Salmon', quantity: 12, unit: 'kg', threshold: 3 },
  { id: 6, name: 'French Fries', quantity: 50, unit: 'servings', threshold: 10 },
  { id: 7, name: 'Garden Salad', quantity: 25, unit: 'servings', threshold: 8 },
  { id: 8, name: 'Iced Tea', quantity: 35, unit: 'liters', threshold: 10 },
  { id: 9, name: 'Tiramisu', quantity: 10, unit: 'servings', threshold: 3 },
  { id: 10, name: 'Chicken Wings', quantity: 30, unit: 'servings', threshold: 8 }
];
type InventoryItem = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  threshold: number;
};
function getInventory(): InventoryItem[] {
  const data = localStorage.getItem(INVENTORY_KEY);
  return data ? JSON.parse(data) : initialInventory;
}
function setInventoryData(data: InventoryItem[]) {
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(data));
}

const InventoryManagement: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(getInventory());
  const [newItem, setNewItem] = useState({ name: '', quantity: '', unit: '', threshold: '' });

  useEffect(() => {
    const sync = () => setInventory(getInventory());
    window.addEventListener('storage', sync);
    const interval = setInterval(sync, 1000);
    // On mount, update sharedInventory if missing new items
    const current = getInventory();
    // Only update if missing any menu items
    const menuItemNames = [
      'Ribeye Steak',
      'Caesar Salad',
      'Chocolate Lava Cake',
      'Lemonade',
      'Grilled Salmon',
      'French Fries',
      'Garden Salad',
      'Iced Tea',
      'Tiramisu',
      'Chicken Wings',
    ];
    const missing = menuItemNames.filter(name => !current.some(i => i.name === name));
    if (missing.length > 0) {
      // Merge current with missing items
      const nextId = current.length > 0 ? Math.max(...current.map(i => i.id)) + 1 : 1;
      const missingItems = initialInventory.filter(i => missing.includes(i.name)).map((i, idx) => ({ ...i, id: nextId + idx }));
      const updated = [...current, ...missingItems];
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(updated));
      setInventory(updated);
    }
    return () => {
      window.removeEventListener('storage', sync);
      clearInterval(interval);
    };
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.quantity || !newItem.unit || !newItem.threshold) return;
    const updated: InventoryItem[] = [
      ...inventory,
      { id: Date.now(), name: newItem.name, quantity: Number(newItem.quantity), unit: newItem.unit, threshold: Number(newItem.threshold) }
    ];
    setInventory(updated);
    setInventoryData(updated);
    setNewItem({ name: '', quantity: '', unit: '', threshold: '' });
  };

  const handleDelete = (id: number) => {
    const updated = inventory.filter((item: InventoryItem) => item.id !== id);
    setInventory(updated);
    setInventoryData(updated);
  };

  const handleUpdate = (id: number, field: string, value: string) => {
    const updated = inventory.map((item: InventoryItem) =>
      item.id === id ? { ...item, [field]: field === 'name' || field === 'unit' ? value : Number(value) } : item
    );
    setInventory(updated);
    setInventoryData(updated);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-2 mb-6 items-end">
        <input className="border p-2 rounded flex-1" placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
        <input className="border p-2 rounded flex-1" placeholder="Quantity" type="number" value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: e.target.value })} />
        <input className="border p-2 rounded flex-1" placeholder="Unit" value={newItem.unit} onChange={e => setNewItem({ ...newItem, unit: e.target.value })} />
        <input className="border p-2 rounded flex-1" placeholder="Threshold" type="number" value={newItem.threshold} onChange={e => setNewItem({ ...newItem, threshold: e.target.value })} />
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Add Item</button>
      </form>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Unit</th>
            <th className="p-2">Threshold</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item: InventoryItem) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">
                <input className="border p-1 rounded w-full" value={item.name} onChange={e => handleUpdate(item.id, 'name', e.target.value)} />
              </td>
              <td className="p-2">
                <input className="border p-1 rounded w-20" type="number" value={item.quantity} onChange={e => handleUpdate(item.id, 'quantity', e.target.value)} />
              </td>
              <td className="p-2">
                <input className="border p-1 rounded w-20" value={item.unit} onChange={e => handleUpdate(item.id, 'unit', e.target.value)} />
              </td>
              <td className="p-2">
                <input className="border p-1 rounded w-20" type="number" value={item.threshold} onChange={e => handleUpdate(item.id, 'threshold', e.target.value)} />
              </td>
              <td className="p-2">
                {item.quantity <= item.threshold ? (
                  <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs">Low</span>
                ) : (
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">OK</span>
                )}
              </td>
              <td className="p-2">
                <button className="bg-red-500 text-white px-2 py-1 rounded text-xs" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManagement;
