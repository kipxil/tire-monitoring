import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

const Setting = () => {
  const [selectedType, setSelectedType] = useState("airCondition");
  const [data, setData] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({});

  // Initialize data from API response
  useEffect(() => {
    fetch("https://primatyre-prismaexpress-production.up.railway.app/dropdown")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Failed to fetch dropdown data:", err));
  }, []);

  const typeConfig = {
    airCondition: { label: "Air Condition", fields: ["name"] },
    removePurpose: { label: "Remove Purpose", fields: ["name"] },
    removeReason: { label: "Remove Reason", fields: ["description"] },
    roleUser: { label: "Role User", fields: ["name"] },
    site: { label: "Site", fields: ["name"] },
    tyreSize: { label: "Tyre Size", fields: ["size"] },
    merk: { label: "Merk", fields: ["name"] },
  };

  const handleCreate = () => {
    setIsCreating(true);
    const fields = typeConfig[selectedType].fields;
    const newFormData = {};
    fields.forEach((field) => {
      newFormData[field] = "";
    });
    setFormData(newFormData);
  };

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setFormData({ ...item });
  };

  const handleSave = () => {
    const isEmpty = Object.values(formData).some(
      (val) => val === null || val.trim?.() === ""
    );
    if (isEmpty) {
      alert("All fields must be filled in.");
      return;
    }
    if (isCreating) {
      console.log("Posting to:", selectedType);
      console.log("Payload:", formData);

      fetch(
        `https://primatyre-prismaexpress-production.up.railway.app/dropdown/${selectedType}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      )
        .then((res) => res.json())
        .then((newItem) => {
          setData((prev) => ({
            ...prev,
            [selectedType]: [...prev[selectedType], newItem],
          }));
        })
        .catch((err) => console.error("Failed to create item:", err));
      setIsCreating(false);
    } else {
      fetch(
        `https://primatyre-prismaexpress-production.up.railway.app/dropdown/${selectedType}/${editingItem}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      )
        .then((res) => res.json())
        .then((updated) => {
          setData((prev) => ({
            ...prev,
            [selectedType]: prev[selectedType].map((item) =>
              item.id === editingItem ? updated : item
            ),
          }));
        })
        .catch((err) => console.error("Failed to update item:", err));
      setEditingItem(null);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      fetch(
        `https://primatyre-prismaexpress-production.up.railway.app/dropdown/${selectedType}/${id}`,
        {
          method: "DELETE",
        }
      )
        .then(() => {
          setData((prev) => ({
            ...prev,
            [selectedType]: prev[selectedType].filter((item) => item.id !== id),
          }));
        })
        .catch((err) => console.error("Failed to delete item:", err));
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingItem(null);
    setFormData({});
  };

  const renderTableHeader = () => {
    const fields = typeConfig[selectedType].fields;
    return (
      <tr className="bg-gray-50">
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          ID
        </th>
        {fields.map((field) => (
          <th
            key={field}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </th>
        ))}
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    );
  };

  const renderTableRow = (item) => {
    const fields = typeConfig[selectedType].fields;
    const isEditing = editingItem === item.id;

    return (
      <tr key={item.id} className="bg-white border-b">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {item.id}
        </td>
        {fields.map((field) => (
          <td
            key={field}
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
          >
            {isEditing ? (
              <input
                type="text"
                value={formData[field] || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                  }))
                }
                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              item[field]
            )}
          </td>
        ))}
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          {isEditing ? (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="text-green-600 hover:text-green-900"
              >
                <Save size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="text-gray-600 hover:text-gray-900"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-600 hover:text-blue-900"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:text-red-900"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </td>
      </tr>
    );
  };

  const renderCreateRow = () => {
    const fields = typeConfig[selectedType].fields;

    return (
      <tr className="bg-blue-50 border-b">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          Auto
        </td>
        {fields.map((field) => (
          <td
            key={field}
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
          >
            <input
              type="text"
              value={formData[field] || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [field]: e.target.value,
                }))
              }
              placeholder={`Enter ${field}`}
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </td>
        ))}
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-900"
            >
              <Save size={16} />
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-900"
            >
              <X size={16} />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Settings Management
        </h1>

        {/* Type Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Data Type:
          </label>
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setEditingItem(null);
              setIsCreating(false);
              setFormData({});
            }}
            className="block w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.entries(typeConfig).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>
        </div>

        {/* Add Button */}
        <button
          onClick={handleCreate}
          disabled={isCreating || editingItem}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={16} className="mr-2" />
          Add New {typeConfig[selectedType].label}
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>{renderTableHeader()}</thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isCreating && renderCreateRow()}
            {data[selectedType]?.map((item) => renderTableRow(item))}
          </tbody>
        </table>
      </div>

      {/* API Console */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          API Calls Log:
        </h3>
        <p className="text-xs text-gray-600">
          Check the browser console for API call logs (F12 → Console)
        </p>
        <div className="mt-2 text-xs text-gray-500">
          <p>• POST /{selectedType} - Create new item</p>
          <p>• PUT /{selectedType}/:id - Update existing item</p>
          <p>• DELETE /{selectedType}/:id - Delete item</p>
        </div>
      </div>
    </div>
  );
};

export default Setting;
