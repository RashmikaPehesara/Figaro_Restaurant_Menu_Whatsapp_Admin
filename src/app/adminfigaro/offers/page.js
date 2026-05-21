"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Loader2, 
  X,
  TicketPercent,
  Calendar,
  EyeOff
} from "lucide-react";
import { toast } from "react-toastify";
import ImageUpload from "@/components/admin/ImageUpload";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Deletion Target States
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    active: true,
    startDate: "",
    endDate: ""
  });

  const fetchRef = useRef(null);

  const fetchOffers = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    
    if (fetchRef.current) fetchRef.current.abort();
    fetchRef.current = new AbortController();
    const timeoutId = setTimeout(() => fetchRef.current?.abort(), 8000);

    try {
      const res = await fetch("/api/offers", { signal: fetchRef.current.signal });
      if (!res.ok) throw new Error("Failed to load offers dataset");
      
      const data = await res.json();
      setOffers(Array.isArray(data?.offers) ? data.offers : []);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("OFFERS GET EXCEPTION:", error);
        toast.error("Failed to load offers");
      }
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOffers();
    return () => {
      if (fetchRef.current) fetchRef.current.abort();
    };
  }, [fetchOffers]);

  const handleOpenModal = useCallback((offer = null) => {
    if (offer) {
      setEditingOffer(offer);
      setFormData({
        title: offer.title,
        description: offer.description || "",
        image: offer.image || "",
        active: offer.active !== undefined ? offer.active : true,
        startDate: offer.startDate || "",
        endDate: offer.endDate || ""
      });
    } else {
      setEditingOffer(null);
      setFormData({
        title: "",
        description: "",
        image: "",
        active: true,
        startDate: "",
        endDate: ""
      });
    }
    setIsModalOpen(true);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingOffer ? `/api/offers/${editingOffer._id}` : "/api/offers";
      const method = editingOffer ? "PUT" : "POST";

      // Optimistic UI updates
      if (editingOffer) {
        setOffers(prev => prev.map(o => o._id === editingOffer._id ? { ...o, ...formData } : o));
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("OFFER ACTION LOG:", data);

      if (res.ok) {
        toast.success(editingOffer ? "Offer updated!" : "Offer added!");
        setIsModalOpen(false);
        fetchOffers(true); // Silent sync reload
      } else {
        throw new Error(data.error || "Failed to save offer");
      }
    } catch (error) {
      console.error("OFFER POST/PUT EXCEPTION:", error);
      toast.error(error.message || "Failed to save offer");
      fetchOffers(true); // Revert optimistic changes
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, editingOffer, fetchOffers]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTargetId) return;
    setIsDeleting(true);

    // Optimistic deletion
    setOffers(prev => prev.filter(o => o._id !== deleteTargetId));

    try {
      const res = await fetch(`/api/offers/${deleteTargetId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log("OFFER DELETION LOG:", data);

      if (res.ok) {
        toast.success("Offer deleted successfully!");
        setDeleteTargetId(null);
        fetchOffers(true); // Silent sync reload
      } else {
        throw new Error(data.error || "Failed to delete offer");
      }
    } catch (error) {
      console.error("OFFER DELETE EXCEPTION:", error);
      toast.error(error.message || "Failed to delete offer");
      fetchOffers(true); // Revert optimistic changes
    } finally {
      setIsDeleting(false);
    }
  }, [deleteTargetId, fetchOffers]);

  const isPending = isSubmitting || isDeleting;

  return (
    <div className="space-y-8 w-full max-w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Offers</h1>
          <p className="text-zinc-400">Manage promotional banners and menus.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          disabled={isPending}
          className="w-full sm:w-auto justify-center bg-orange-500 hover:bg-orange-600 disabled:opacity-50 active:scale-95 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20 cursor-pointer select-none touch-manipulation"
        >
          <Plus size={20} />
          Add Offer
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-20 text-center">
            <Loader2 className="animate-spin text-orange-500 mx-auto" size={32} />
          </div>
        ) : (offers || []).length === 0 ? (
          <div className="col-span-full py-20 text-center bg-zinc-900 rounded-3xl border border-zinc-800">
            <TicketPercent className="mx-auto text-zinc-700 mb-4 animate-pulse" size={48} />
            <p className="text-zinc-500">No offers found.</p>
          </div>
        ) : (
          (offers || []).map(offer => (
            <div key={offer._id} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden group flex flex-col h-full hover:border-zinc-700 transition-all select-none">
              <div className="relative h-48 bg-zinc-800 shrink-0">
                {offer.image ? (
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-700">
                    <TicketPercent size={48} />
                  </div>
                )}
                
                {/* Active Status Ribbon */}
                {!offer.active && (
                  <span className="absolute top-4 left-4 px-2.5 py-1 bg-red-600/90 text-white text-[10px] font-bold uppercase rounded-lg shadow-md flex items-center gap-1">
                    <EyeOff size={10} />
                    Inactive
                  </span>
                )}

                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => handleOpenModal(offer)}
                    disabled={isPending}
                    className="p-2 bg-black/50 hover:bg-black disabled:opacity-50 text-white rounded-xl backdrop-blur-md active:scale-95 cursor-pointer touch-manipulation transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => setDeleteTargetId(offer._id)}
                    disabled={isPending}
                    className="p-2 bg-black/50 hover:bg-red-500 disabled:opacity-50 text-white rounded-xl backdrop-blur-md active:scale-95 cursor-pointer touch-manipulation transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-2 break-words leading-tight">{offer.title}</h3>
                <p className="text-zinc-400 text-sm line-clamp-3 break-words mb-4 flex-1">{offer.description}</p>
                
                {/* Validity Information */}
                {(offer.startDate || offer.endDate) && (
                  <div className="flex items-center gap-2 text-zinc-500 text-xs mt-auto pt-4 border-t border-zinc-800/80">
                    <Calendar size={12} />
                    <span>
                      {offer.startDate ? offer.startDate : "Starts Now"} — {offer.endDate ? offer.endDate : "Expires Never"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Main Save / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 z-[100] flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between flex-shrink-0">
              <h2 className="text-xl font-bold text-white">
                {editingOffer ? "Edit Offer" : "Add New Offer"}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                disabled={isSubmitting}
                className="text-zinc-500 hover:text-white p-2"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  disabled={isSubmitting}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  placeholder="e.g. 20% OFF Pizzas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  disabled={isSubmitting}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  rows="3"
                  placeholder="Tell customers about the deal details..."
                />
              </div>

              {/* Date Ranges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    disabled={isSubmitting}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    disabled={isSubmitting}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  />
                </div>
              </div>

              {/* Status Switch */}
              <div className="flex items-center justify-between p-4 bg-zinc-800/40 border border-zinc-800 rounded-2xl">
                <div className="space-y-0.5">
                  <span className="text-sm font-semibold text-white">Active Status</span>
                  <p className="text-xs text-zinc-500">Show this offer on the live customer menu.</p>
                </div>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setFormData(prev => ({ ...prev, active: !prev.active }))}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.active ? 'bg-orange-500' : 'bg-zinc-700'}`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.active ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
              </div>

              <div>
                <ImageUpload 
                  value={formData.image} 
                  onChange={(url) => setFormData(prev => ({ ...prev, image: url }))} 
                  label="Offer Banner"
                />
              </div>

              <div className="flex gap-3 pt-4 sticky bottom-0 bg-zinc-900 mt-auto pb-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Save Offer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reusable Confirmation Modal for Deletion */}
      <DeleteConfirmModal
        isOpen={!!deleteTargetId}
        title="Delete Offer?"
        message="Are you sure you want to permanently delete this offer?."
        confirmText="Confirm Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
