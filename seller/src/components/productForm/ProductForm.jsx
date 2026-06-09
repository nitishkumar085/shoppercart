import './productForm.css';
export default function ProductForm(){
    return(
        <div class="product-details-container">
  <h2 class="form-title">Product Details</h2>
  
  <form class="product-form">
    
    <div class="form-column">
      
      <fieldset class="form-section">
        <legend class="section-title">General Information</legend>
        
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title" value="pen"/>
        </div>
        
        <div class="form-group">
          <label for="brand">Brand</label>
          <input type="text" id="brand" value="demo brand"/>
        </div>
        
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" rows="4">bring the heat</textarea>
        </div>
      </fieldset>
      
      <fieldset class="form-section">
        <legend class="section-title">Product Media</legend>
        <div class="media-grid">
          <div class="media-item active">
            <div class="media-box">
              <svg viewBox="0 0 24 24" class="media-icon"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
              <span class="media-badge">Thumbnail</span>
            </div>
            <span class="media-label">thumbnail link</span>
          </div>
          
          <div class="media-item">
            <div class="media-box">
              <svg viewBox="0 0 24 24" class="media-icon"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            </div>
            <span class="media-label">Photo Link 1</span>
          </div>
          
          <div class="media-item">
            <div class="media-box">
              <svg viewBox="0 0 24 24" class="media-icon"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            </div>
            <span class="media-label">Photo Link 2</span>
          </div>
          
          <div class="media-item">
            <div class="media-box">
              <svg viewBox="0 0 24 24" class="media-icon"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            </div>
            <span class="media-label">Photo Link 3</span>
          </div>
        </div>
      </fieldset>
    </div>
    
    <div class="form-column">
      <fieldset class="form-section">
        <legend class="section-title">IDs & Meta</legend>
        
        <div class="form-group">
          <label for="product-id">Product ID</label>
          <div class="disabled-input-wrapper">
            <input type="text" id="product-id" value="45689" disabled/>
            <span class="input-badge">ID</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="sku">SKU</label>
          <input type="text" id="sku" value="raibjhnj"/>
        </div>
        
        <div class="form-group">
          <label for="meta-app-id">Meta App ID</label>
          <input type="text" id="meta-app-id" value="31 (from meta.app)" disabled class="bg-gray-light"/>
        </div>
        
        <div class="form-group">
          <label for="app-id">App ID</label>
          <input type="text" id="app-id"/>
        </div>
      </fieldset>
    </div>
    
    <div class="form-column">
      <fieldset class="form-section">
        <legend class="section-title">Pricing & Inventory</legend>
        
        <div class="form-group">
          <label for="price">Price</label>
          <input type="text" id="price" value="$586.00"/>
        </div>
        
        <div class="form-group">
          <label for="discount">Discount Percentage</label>
          <input type="text" id="discount" value="30%"/>
        </div>
        
        <div class="form-group">
          <label for="stock">Stock</label>
          <input type="number" id="stock" value="52"/>
        </div>
        
        <div class="form-group">
          <label for="availability">Availability Status</label>
          <select id="availability">
            <option value="available" selected>available</option>
            <option value="out-of-stock">out of stock</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="return-policy">Return Policy</label>
          <textarea id="return-policy" rows="2">seldhdenkmll</textarea>
        </div>
        
        <div class="form-group">
          <label for="warranty">Warranty Information</label>
          <input type="text" id="warranty" value="45 dat"/>
        </div>
        
        <div class="form-group">
          <label>Dimensions</label>
          <div class="dimensions-row">
            <div>
              <span class="dim-label">Length</span>
              <input type="text" placeholder="{}"/>
            </div>
            <div>
              <span class="dim-label">Width</span>
              <input type="text" placeholder="{}"/>
            </div>
            <div>
              <span class="dim-label">Height</span>
              <input type="text" placeholder="{}"/>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
    
    <div class="form-column">
      <fieldset class="form-section">
        <legend class="section-title">Attributes & Policy</legend>
        
        <div class="form-group">
          <label for="category">Category</label>
          <div class="custom-select-list" id="category">
            <div class="select-option">mens <span class="check-icon">✓</span></div>
            <div class="select-option selected">beauty <span class="check-icon">✓</span></div>
            <div class="select-option">shoes <span class="check-icon">✓</span></div>
          </div>
        </div>
        
        <div class="form-group">
          <label>Tags</label>
          <div class="tags-container">
            <span class="tag-badge"><span class="dot"></span>1</span>
            <span class="tag-badge"><span class="dot"></span>2</span>
            <span class="tag-badge"><span class="dot"></span>3</span>
            <span class="tag-badge"><span class="dot"></span>4</span>
            <span class="tag-badge"><span class="dot"></span>5</span>
            <span class="tag-badge"><span class="dot"></span>5</span>
          </div>
          <span class="input-subtext">Product Tags</span>
        </div>
      </fieldset>
      
      <fieldset class="form-section">
        <legend class="section-title">Quality Control</legend>
        
        <div class="form-group rating-group">
          <label>Rating</label>
          <div class="rating-stars-wrapper">
            <div class="stars">
              <span class="star filled">★</span>
              <span class="star filled">★</span>
              <span class="star filled">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
            </div>
            <span class="rating-value">3.0</span>
          </div>
        </div>
        
        <div class="form-group">
          <label>Reviews</label>
          <div class="reviews-list">
            <div class="review-item">
              <span>1.</span>
              <svg viewBox="0 0 24 24" class="msg-icon"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
              <div class="review-bar bar-1"></div>
            </div>
            <div class="review-item">
              <span>2.</span>
              <svg viewBox="0 0 24 24" class="msg-icon"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
              <div class="review-bar bar-2"></div>
            </div>
            <div class="review-item">
              <span>3.</span>
              <svg viewBox="0 0 24 24" class="msg-icon"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
              <div class="review-bar bar-3"></div>
            </div>
            <div class="review-item">
              <span>4.</span>
              <svg viewBox="0 0 24 24" class="msg-icon"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
              <div class="review-bar bar-4"></div>
            </div>
          </div>
          <span class="input-subtext">Review IDs</span>
        </div>
      </fieldset>
    </div>
    
    <div class="form-actions">
      <button type="submit" class="btn-save">
        <svg viewBox="0 0 24 24" class="btn-icon"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
        Save Changes
      </button>
      <button type="button" class="btn-delete">
        <svg viewBox="0 0 24 24" class="btn-icon"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        Delete Product
      </button>
    </div>

  </form>
</div>
    )
}

