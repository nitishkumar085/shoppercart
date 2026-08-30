import { useState } from "react";
import { Image as ImageIcon, Trash2, Check, Star, ChevronDown, Plus } from "lucide-react";

const INITIAL_CATEGORY_OPTIONS = ["mens", "beauty", "shoes", "collections", "womens", "kids"];
const INITIAL_TAGS = [
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
  { id: 4, label: "4" },
  { id: 5, label: "5" },
  { id: 6, label: "6" },
];
 import "./productForm.css"

export default function ProductDetails() {
  const [title, setTitle] = useState("pen");
  const [brand, setBrand] = useState("demo brand");
  const [description, setDescription] = useState("bring the heat");

  const [productId] = useState("45689");
  const [sku, setSku] = useState("raibjhjnj");
  const [metaAppId] = useState("31 (from meta.app)");
  const [appId, setAppId] = useState("");

  const [price, setPrice] = useState("586.00");
  const [discount, setDiscount] = useState("30");
  const [stock, setStock] = useState("52");
  const [availability, setAvailability] = useState("available");
  const [returnPolicy, setReturnPolicy] = useState("seldhdenkmll");
  const [warranty, setWarranty] = useState("45 dat");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [categoryOptions, setCategoryOptions] = useState(INITIAL_CATEGORY_OPTIONS);
  const [categories, setCategories] = useState(["mens", "beauty", "shoes"]);
  const [newCategory, setNewCategory] = useState("");

  const [tagOptions, setTagOptions] = useState(INITIAL_TAGS);
  const [selectedTags, setSelectedTags] = useState([1, 2, 3, 4, 5]);
  const [newTag, setNewTag] = useState("");

  const [rating, setRating] = useState(3);

  const [activeThumb, setActiveThumb] = useState(0);
  const media = ["Thumbnail", "Photo Link 1", "Photo Link 2", "Photo Link 3"];

  const toggleCategory = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleTag = (id) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const addCategory = () => {
    const value = newCategory.trim().toLowerCase();
    if (!value || categoryOptions.includes(value)) return;
    setCategoryOptions((prev) => [...prev, value]);
    setCategories((prev) => [...prev, value]);
    setNewCategory("");
  };

  const addTag = () => {
    const label = newTag.trim();
    if (!label) return;
    const nextId = tagOptions.length ? Math.max(...tagOptions.map((t) => t.id)) + 1 : 1;
    setTagOptions((prev) => [...prev, { id: nextId, label }]);
    setSelectedTags((prev) => [...prev, nextId]);
    setNewTag("");
  };

  const clearCategories = () => {
    setCategoryOptions([]);
    setCategories([]);
  };

  const clearTags = () => {
    setTagOptions([]);
    setSelectedTags([]);
  };

  const handleCategoryKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCategory();
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setSaved(false);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 700);
  };

  return (
    <div className="pd-root">
          <div className="pd-card">
        <h1 className="pd-title">Product Details</h1>

        <div className="pd-grid">
          {/* General Information */}
          <section>
            <h2 className="pd-section-heading">General Information</h2>
            <div className="pd-field">
              <label className="pd-label">Title</label>
              <input className="pd-input" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="pd-field">
              <label className="pd-label">Brand</label>
              <input className="pd-input" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div className="pd-field">
              <label className="pd-label">Description</label>
              <textarea className="pd-textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </section>

          {/* IDs & Meta */}
          <section>
            <h2 className="pd-section-heading">IDs &amp; Meta</h2>
            <div className="pd-field">
              <label className="pd-label">Product ID</label>
              <div className="pd-input-id-wrap">
                <input className="pd-input" value={productId} disabled />
                <span className="pd-id-badge">ID</span>
              </div>
            </div>
            <div className="pd-field">
              <label className="pd-label">SKU</label>
              <input className="pd-input" value={sku} onChange={(e) => setSku(e.target.value)} />
            </div>
            <div className="pd-field">
              <label className="pd-label">Meta App ID</label>
              <input className="pd-input" value={metaAppId} disabled />
            </div>
            <div className="pd-field">
              <label className="pd-label">App ID</label>
              <input className="pd-input" placeholder="—" value={appId} onChange={(e) => setAppId(e.target.value)} />
            </div>
          </section>

          {/* Pricing & Inventory */}
          <section>
            <h2 className="pd-section-heading">Pricing &amp; Inventory</h2>
            <div className="pd-field">
              <label className="pd-label">Price</label>
              <input className="pd-input" value={`$${price}`} onChange={(e) => setPrice(e.target.value.replace(/^\$/, ""))} />
            </div>
            <div className="pd-field">
              <label className="pd-label">Discount Percentage</label>
              <input className="pd-input" value={`${discount}%`} onChange={(e) => setDiscount(e.target.value.replace(/%$/, ""))} />
            </div>
            <div className="pd-field">
              <label className="pd-label">Stock</label>
              <input className="pd-input" value={stock} onChange={(e) => setStock(e.target.value)} />
            </div>
            <div className="pd-field">
              <label className="pd-label">Availability Status</label>
              <div className="pd-select-wrap">
                <select className="pd-select" value={availability} onChange={(e) => setAvailability(e.target.value)}>
                  <option value="available">available</option>
                  <option value="out of stock">out of stock</option>
                  <option value="preorder">preorder</option>
                  <option value="discontinued">discontinued</option>
                </select>
                <ChevronDown size={16} className="pd-select-chevron" />
              </div>
            </div>
            <div className="pd-field">
              <label className="pd-label">Return Policy</label>
              <input className="pd-input" value={returnPolicy} onChange={(e) => setReturnPolicy(e.target.value)} />
            </div>
            <div className="pd-field">
              <label className="pd-label">Warranty Information</label>
              <input className="pd-input" value={warranty} onChange={(e) => setWarranty(e.target.value)} />
            </div>
            <div className="pd-field">
              <label className="pd-label">Dimensions</label>
              <div className="pd-dims">
                <div>
                  <label className="pd-label pd-dims-label">Length</label>
                  <input className="pd-input" placeholder="{}" value={length} onChange={(e) => setLength(e.target.value)} />
                </div>
                <div>
                  <label className="pd-label pd-dims-label">Width</label>
                  <input className="pd-input" placeholder="{}" value={width} onChange={(e) => setWidth(e.target.value)} />
                </div>
                <div>
                  <label className="pd-label pd-dims-label">Height</label>
                  <input className="pd-input" placeholder="{}" value={height} onChange={(e) => setHeight(e.target.value)} />
                </div>
              </div>
            </div>
          </section>

          {/* Attributes & Policy */}
          <section>
            <h2 className="pd-section-heading">Attributes &amp; Policy</h2>
            <div className="pd-field">
              <div className="pd-label-row">
                <label className="pd-label">Category</label>
                {categoryOptions.length > 0 && (
                  <button type="button" className="pd-clear-btn" onClick={clearCategories}>
                    Clear all
                  </button>
                )}
              </div>
              <div className="pd-category-box">
                {categoryOptions.length === 0 && (
                  <div className="pd-empty-state">No categories yet — add one below</div>
                )}
                {categoryOptions.map((cat) => {
                  const checked = categories.includes(cat);
                  return (
                    <div
                      key={cat}
                      className={`pd-category-item${checked ? " checked" : ""}`}
                      onClick={() => toggleCategory(cat)}
                    >
                      <span>{cat}</span>
                      <span className="pd-check-icon">{checked && <Check size={11} strokeWidth={3} />}</span>
                    </div>
                  );
                })}
              </div>
              <div className="pd-add-row">
                <input
                  className="pd-add-input"
                  placeholder="Add category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={handleCategoryKeyDown}
                />
                <button type="button" className="pd-add-btn" onClick={addCategory} aria-label="Add category">
                  <Plus size={15} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className="pd-field pd-tags-heading">
              <div className="pd-label-row">
                <label className="pd-label">Tags</label>
                {tagOptions.length > 0 && (
                  <button type="button" className="pd-clear-btn" onClick={clearTags}>
                    Clear all
                  </button>
                )}
              </div>
              <div className="pd-tags-grid">
                {tagOptions.length === 0 && (
                  <div className="pd-empty-state">No tags yet — add one below</div>
                )}
                {tagOptions.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    className={`pd-tag-pill${selectedTags.includes(tag.id) ? " selected" : ""}`}
                    onClick={() => toggleTag(tag.id)}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
              <div className="pd-add-row">
                <input
                  className="pd-add-input"
                  placeholder="Add tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
                <button type="button" className="pd-add-btn" onClick={addTag} aria-label="Add tag">
                  <Plus size={15} strokeWidth={2.5} />
                </button>
              </div>
              <label className="pd-label" style={{ marginTop: 10 }}>Product Tags</label>
            </div>

            <div className="pd-field pd-qc-heading">
              <h2 className="pd-section-heading" style={{ marginBottom: 12 }}>Quality Control</h2>
              <label className="pd-label">Rating</label>
              <div className="pd-rating-row">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`pd-star-btn${n <= Math.round(rating) ? " filled" : ""}`}
                    onClick={() => setRating(n)}
                    aria-label={`Rate ${n} star`}
                  >
                    <Star size={18} fill={n <= Math.round(rating) ? "currentColor" : "none"} />
                  </button>
                ))}
                <span className="pd-rating-value">{rating.toFixed(1)}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Product Media */}
        <h2 className="pd-media-heading">Product Media</h2>
        <div className="pd-media-grid">
          {media.map((label, i) => (
            <div
              key={label}
              className={`pd-media-tile${activeThumb === i ? " active" : ""}`}
              onClick={() => setActiveThumb(i)}
            >
              <div className="pd-media-icon">
                <ImageIcon size={34} strokeWidth={1.4} />
              </div>
              <span className="pd-media-label">{i === 0 ? "Thumbnail" : label}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pd-footer">
          <button className="pd-btn pd-btn-save" onClick={handleSave} disabled={saving}>
            <ImageIcon size={17} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button className="pd-btn pd-btn-delete">
            <Trash2 size={16} />
            Delete Product
          </button>
        </div>

        <div className="pd-trust">
          <Check size={14} />
          Secure &amp; Trusted
        </div>
      </div>

      {saved && (
        <div className="pd-toast">
          <Check size={15} />
          Changes saved
        </div>
      )}
    </div>
  );
}
