"use client";

import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  X,
  Image as ImageIcon,
  Star,
  ChevronDown,
  Filter,
  UtensilsCrossed,
} from "lucide-react";
import { toast } from "react-toastify";
import ImageUpload from "@/components/admin/ImageUpload";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import { normalizeArray } from "@/utils/normalizeArray";

import LazyImage from "@/components/LazyImage";

// Bulletproof Next.js Image compatible wrapper supporting local, remote, and base64 URLs
const FoodImage = ({ src, alt }) => {
  if (src) {
    return (
      <LazyImage 
        src={src} 
        alt={alt} 
        fill
        className="object-cover" 
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <ImageIcon className="text-zinc-700" size={24} />
    </div>
  );
};

// High performance skeleton loader for initial hydration
const FoodSkeletonRow = () => (
  <tr className="animate-pulse border-b border-zinc-850">
    <td className="px-6 py-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-zinc-800 rounded-xl flex-shrink-0" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-4 bg-zinc-800 rounded-full w-1/3" />
          <div className="h-3 bg-zinc-800 rounded-full w-1/2" />
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="h-6 bg-zinc-800 rounded-full w-20" />
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-zinc-800 rounded-full w-16" />
    </td>
    <td className="px-6 py-4">
      <div className="h-8 w-8 bg-zinc-800 rounded-xl" />
    </td>
    <td className="px-6 py-4 text-right">
      <div className="flex justify-end gap-2">
        <div className="h-8 w-8 bg-zinc-800 rounded-lg" />
        <div className="h-8 w-8 bg-zinc-800 rounded-lg" />
      </div>
    </td>
  </tr>
);

// Memoized individual table row preventing standard DOM repaints
const FoodRow = memo(({ food, categories, toggleFeatured, handleOpenModal, handleDelete }) => {
  const safeCategories = Array.isArray(categories) ? categories : [];
  return (
    <tr className="hover:bg-zinc-800/30 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700 flex-shrink-0 relative">
            <FoodImage src={food.image} alt={food.name} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white font-semibold truncate break-words">{food.name}</p>
            <p className="text-zinc-500 text-xs line-clamp-2 break-words">{food.description}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs border border-zinc-700">
          {safeCategories.find(c => c?.id === food?.categoryId)?.name || food?.categoryId}
        </span>
      </td>
      <td className="px-6 py-4">
        {food.pricing.type === "single" ? (
          <p className="text-orange-500 font-bold">Rs. {food.pricing.price}</p>
        ) : (
          <div className="space-y-1">
            {food.pricing.options.filter(o => o.price).map((opt, i) => (
              <p key={i} className="text-xs text-zinc-400">
                {opt.label}: <span className="text-orange-500 font-semibold">Rs. {opt.price}</span>
              </p>
            ))}
          </div>
        )}
      </td>
      <td className="px-6 py-4">
        <button 
          onClick={() => toggleFeatured(food)}
          className={`p-2 rounded-xl transition-all cursor-pointer touch-manipulation select-none active:scale-95 ${food.featured ? 'text-orange-500 bg-orange-500/10' : 'text-zinc-600 hover:text-zinc-400'}`}
        >
          <Star size={20} fill={food.featured ? "currentColor" : "none"} />
        </button>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => handleOpenModal(food)}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all cursor-pointer touch-manipulation select-none active:scale-95"
          >
            <Edit2 size={18} />
          </button>
          <button 
            onClick={() => handleDelete(food._id)}
            className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer touch-manipulation select-none active:scale-95"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
});

FoodRow.displayName = "FoodRow";

export default function FoodsPage() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingFood, setEditingFood] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(15);

  // Deletion Target States
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const safeFoods = Array.isArray(foods) ? foods : [];
  const safeCategories = Array.isArray(categories) ? categories : [];

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    image: "",
    imagePublicId: "",
    featured: false,
    pricing: {
      type: "single",
      price: "",
      options: [
        { label: "Small", price: "" },
        { label: "Medium", price: "" },
        { label: "Large", price: "" }
      ]
    }
  });

  const fetchRef = useRef(null);

  // Search input debouncer
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset slice display limit when filter or search changes
  useEffect(() => {
    setDisplayLimit(15);
  }, [debouncedSearchQuery, selectedCategory]);

  // Fetch foods and categories concurrently with proper state abort guards
  const fetchData = useCallback(async (silent = false) => {
    if (!silent) {
      setIsLoading(true);
      console.log("FOODS FETCH: Starting load (loading = true)");
    }
    
    if (fetchRef.current) fetchRef.current.abort();
    fetchRef.current = new AbortController();
    const currentSignal = fetchRef.current.signal;
    const timeoutId = setTimeout(() => {
      if (!currentSignal.aborted) fetchRef.current?.abort();
    }, 8000);

    try {
      const [foodsRes, catsRes] = await Promise.all([
        fetch("/api/foods", { signal: currentSignal }),
        fetch("/api/categories", { signal: currentSignal })
      ]);
      
      console.log("FOODS FETCH: API Response statuses:", foodsRes.status, catsRes.status);
      
      if (!foodsRes.ok || !catsRes.ok) {
        throw new Error("Failed to load food datasets");
      }
      
      const foodsData = await foodsRes.json();
      const catsData = await catsRes.json();

      console.log("FOODS FETCH: API Raw Data:", { foodsData, catsData });

      const parsedFoods = normalizeArray(foodsData, "foods");
      const parsedCats = normalizeArray(catsData, "categories");

      console.log("FOODS FETCH: Parsed arrays count:", { 
        foodsCount: parsedFoods.length, 
        categoriesCount: parsedCats.length 
      });

      setFoods(parsedFoods);
      setCategories(parsedCats);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("DATA FETCH EXCEPTION:", error);
        toast.error("Error loading dishes");
      } else {
        console.log("FOODS FETCH: Request aborted successfully.");
      }
    } finally {
      clearTimeout(timeoutId);
      if (currentSignal.aborted) {
        console.log("FOODS FETCH: Aborted signal detected. Bypassing isLoading = false toggle.");
      } else {
        setIsLoading(false);
        console.log("FOODS FETCH: Finished load (loading = false)");
      }
    }
  }, []);

  // Standard React mount fetch trigger
  useEffect(() => {
    fetchData();
    return () => {
      if (fetchRef.current) fetchRef.current.abort();
    };
  }, [fetchData]);

  const handleOpenModal = useCallback((food = null) => {
    if (food) {
      setEditingFood(food);
      setFormData({
        name: food.name,
        description: food.description || "",
        categoryId: food.categoryId,
        image: food.image || "",
        imagePublicId: food.imagePublicId || "",
        featured: food.featured || false,
        pricing: food.pricing || { type: "single", price: "", options: [] }
      });
    } else {
      setEditingFood(null);
      setFormData({
        name: "",
        description: "",
        categoryId: safeCategories[0]?.id || "",
        image: "",
        imagePublicId: "",
        featured: false,
        pricing: {
          type: "single",
          price: "",
          options: [
            { label: "Small", price: "" },
            { label: "Medium", price: "" },
            { label: "Large", price: "" }
          ]
        }
      });
    }
    setIsModalOpen(true);
  }, [categories]);

  const handlePricingTypeChange = useCallback((type) => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        type
      }
    }));
  }, []);

  const handleOptionChange = useCallback((index, field, value) => {
    setFormData(prev => {
      const newOptions = [...prev.pricing.options];
      newOptions[index] = { ...newOptions[index], [field]: value };
      return {
        ...prev,
        pricing: { ...prev.pricing, options: newOptions }
      };
    });
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.categoryId) {
      toast.error("Please select a category");
      setIsSubmitting(false);
      return;
    }

    try {
      const url = editingFood ? `/api/foods/${editingFood._id}` : "/api/foods";
      const method = editingFood ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingFood ? "Food updated!" : "Food added!");
        setIsModalOpen(false);
        fetchData(true);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to save");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, editingFood, fetchData]);

  const handleDelete = useCallback((id) => {
    setDeleteTargetId(id);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);

    // Optimistic UI update
    setFoods(prev => (Array.isArray(prev) ? prev.filter(f => f._id !== deleteTargetId) : []));

    try {
      const res = await fetch(`/api/foods/${deleteTargetId}`, { method: "DELETE" });
      const data = await res.json();
      console.log("FOOD DELETION LOG:", data);

      if (res.ok) {
        toast.success("Food item deleted successfully");
        setDeleteTargetId(null);
        fetchData(true); // Silent sync reload
      } else {
        throw new Error(data.error || "Failed to delete food");
      }
    } catch (error) {
      console.error("FOOD DELETE EXCEPTION:", error);
      toast.error(error.message || "Error deleting food");
      fetchData(true); // Rollback optimistic changes
    } finally {
      setIsDeleting(false);
    }
  }, [deleteTargetId, fetchData]);

  const toggleFeatured = useCallback(async (food) => {
    try {
      const res = await fetch(`/api/foods/${food._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !food.featured }),
      });
      if (res.ok) {
        setFoods(prevFoods => (Array.isArray(prevFoods) ? prevFoods.map(f => f._id === food._id ? { ...f, featured: !food.featured } : f) : []));
        toast.success(food.featured ? "Removed from featured" : "Added to featured");
      }
    } catch (error) {
      toast.error("Error updating featured status");
    }
  }, []);

  // Filter computations memoized O(N) linear filter
  const filteredFoods = useMemo(() => {
    return safeFoods.filter(f => {
      const matchesSearch = f?.name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || f?.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [safeFoods, debouncedSearchQuery, selectedCategory]);

  // Display slicing slice optimization reducing DOM weight for heavy catalogs
  const displayedFoods = useMemo(() => {
    return filteredFoods.slice(0, displayLimit);
  }, [filteredFoods, displayLimit]);

  return (
    <div className="space-y-8 w-full max-w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Food Management</h1>
          <p className="text-zinc-400">Add, edit, or remove dishes from your menu.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto justify-center bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20 cursor-pointer touch-manipulation select-none"
        >
          <Plus size={20} />
          Add Food Item
        </button>
      </div>

      {/* Filters */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col md:flex-row gap-4 min-w-0 w-full">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            placeholder="Search by food name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
          />
        </div>
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-zinc-500" />
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full pl-11 pr-10 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
          >
            <option value="all">All Categories</option>
            {safeCategories.map(cat => (
              <option key={cat?.id} value={cat?.id}>{cat?.name}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <ChevronDown className="h-5 w-5 text-zinc-500" />
          </div>
        </div>
      </div>

      {/* Food Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden max-w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 text-sm font-semibold">
                <th className="px-6 py-5 uppercase">Item</th>
                <th className="px-6 py-5 uppercase">Category</th>
                <th className="px-6 py-5 uppercase">Pricing</th>
                <th className="px-6 py-5 uppercase">Featured</th>
                <th className="px-6 py-5 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <FoodSkeletonRow key={i} />
                ))
              ) : displayedFoods.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <UtensilsCrossed className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
                    <p className="text-zinc-500">No food items found.</p>
                  </td>
                </tr>
              ) : (
                displayedFoods.map((food) => (
                  <FoodRow 
                    key={food._id}
                    food={food}
                    categories={safeCategories}
                    toggleFeatured={toggleFeatured}
                    handleOpenModal={handleOpenModal}
                    handleDelete={handleDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Sleek display limit expander preventing high rendering lag */}
        {filteredFoods.length > displayLimit && (
          <div className="p-4 border-t border-zinc-800 text-center bg-zinc-900/50">
            <button
              onClick={() => setDisplayLimit(prev => prev + 25)}
              className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl text-xs font-bold transition-all border border-zinc-700 active:scale-95 cursor-pointer select-none touch-manipulation"
            >
              Load More Items ({filteredFoods.length - displayLimit} remaining)
            </button>
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 z-[100] flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between flex-shrink-0">
              <h2 className="text-xl font-bold text-white">
                {editingFood ? "Edit Food Item" : "Add New Food Item"}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-500 hover:text-white p-2"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Food Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    placeholder="e.g. Classic Chicken Burger"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Category</label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  >
                    <option value="" disabled>Select Category</option>
                    {safeCategories.map(cat => (
                      <option key={cat?.id} value={cat?.id}>{cat?.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none"
                  placeholder="Tell us about this delicious dish..."
                />
              </div>

              <div>
                <ImageUpload 
                  value={formData.image} 
                  onChange={(url, publicId) => setFormData({ ...formData, image: url, imagePublicId: publicId || "" })} 
                  label="Food Image"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 accent-orange-500 rounded-md"
                />
                <label htmlFor="featured" className="text-sm font-medium text-zinc-300">Mark as Featured (Popular Pick)</label>
              </div>

              <div className="space-y-4 border-t border-zinc-800 pt-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-zinc-400">Pricing Strategy</label>
                  <div className="flex bg-zinc-800 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => handlePricingTypeChange("single")}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${formData.pricing.type === "single" ? 'bg-orange-500 text-white' : 'text-zinc-500'}`}
                    >
                      Single Price
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePricingTypeChange("multi")}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${formData.pricing.type === "multi" ? 'bg-orange-500 text-white' : 'text-zinc-500'}`}
                    >
                      Multi-Size
                    </button>
                  </div>
                </div>

                {formData.pricing.type === "single" ? (
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-2 uppercase ml-1">Price (Rs.)</label>
                    <input
                      type="number"
                      value={formData.pricing.price}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        pricing: { ...formData.pricing, price: e.target.value } 
                      })}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                      placeholder="e.g. 1200"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {formData.pricing.options.map((opt, index) => (
                      <div key={index} className="space-y-2">
                        <label className="block text-xs font-medium text-zinc-500 uppercase ml-1">{opt.label} Price</label>
                        <input
                          type="number"
                          value={opt.price}
                          onChange={(e) => handleOptionChange(index, "price", e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                          placeholder="0.00"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 sticky bottom-0 bg-zinc-900 mt-auto pb-2">
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
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : editingFood ? "Update Food" : "Save Food"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Reusable Confirmation Modal for Deletion */}
      <DeleteConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Food Item?"
        message="Are you sure you want to permanently delete this food item?."
        confirmText="Confirm Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
