"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Loader2, 
  X,
  Image as ImageIcon,
  ChevronUp,
  Layers,
  ChevronDown
} from "lucide-react";
import { toast } from "react-toastify";
import ImageUpload from "@/components/admin/ImageUpload";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import { normalizeArray } from "@/utils/normalizeArray";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Deletion state
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    image: ""
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (res.ok) {
        setCategories(normalizeArray(data, "categories"));
      } else {
        toast.error(data.error || "Failed to fetch categories");
      }
    } catch (error) {
      toast.error("An error occurred while fetching categories");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        id: category.id,
        image: category.image || ""
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", id: "", image: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingCategory 
        ? `/api/categories/${editingCategory._id}` 
        : "/api/categories";
      
      const method = editingCategory ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(editingCategory ? "Category updated!" : "Category added!");
        setIsModalOpen(false);
        fetchCategories();
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to save category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    setDeleteTargetId(id);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/categories/${deleteTargetId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Category deleted");
        setDeleteTargetId(null);
        fetchCategories();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete category");
      }
    } catch (error) {
      toast.error("Error deleting category");
    } finally {
      setIsDeleting(false);
    }
  };

  const safeCategories = Array.isArray(categories) ? categories : [];

  const filteredCategories = safeCategories.filter(c => 
    c?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
          <p className="text-zinc-400">Manage your menu categories here.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-orange-500 hover:bg-orange-600 justify-center text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="px-6 py-5 text-sm font-semibold text-zinc-400 uppercase tracking-wider">Image</th>
                <th className="px-6 py-5 text-sm font-semibold text-zinc-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-5 text-sm font-semibold text-zinc-400 uppercase tracking-wider">Slug (ID)</th>
                <th className="px-6 py-5 text-sm font-semibold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-orange-500 mx-auto mb-4" />
                    <p className="text-zinc-500">Loading categories...</p>
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center">
                    <Layers className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
                    <p className="text-zinc-500">No categories found.</p>
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category._id} className="hover:bg-zinc-800/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                        {category.image ? (
                          <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="text-zinc-600" size={20} />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">{category.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-zinc-500 font-mono text-sm">{category.id}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(category)}
                          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(category._id)}
                          className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-500 hover:text-white p-2"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Category Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  placeholder="e.g. Burgers, Pizza, Drinks"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Category ID (Slug)</label>
                <input
                  type="text"
                  required
                  disabled={!!editingCategory}
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="e.g. burgers"
                />
                <p className="text-xs text-zinc-500 mt-2">This is used for URL and filtering. Cannot be changed later.</p>
              </div>

              <div>
                <ImageUpload 
                  value={formData.image} 
                  onChange={(url) => setFormData({ ...formData, image: url })} 
                  label="Category Image"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : editingCategory ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Category?"
        message="Are you sure you want to permanently delete this category? Foods in this category will become uncategorized."
        confirmText="Confirm Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
