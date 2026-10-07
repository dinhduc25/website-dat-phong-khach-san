/**
 * ==========================================================================
 * DỰ ÁN: LOTTE HOTEL HANOI & ĐẶT PHÒNG KHÁCH SẠN PHONG CÁCH TRAVELOKA
 * PHẦN 2: PHÒNG & THÔNG TIN KHÁCH SẠN
 * PHỤ TRÁCH: THÀNH VIÊN 2
 * DANH SÁCH ĐẦU VIỆC THỰC HIỆN:
 * - STT 11: Xây dựng cơ sở dữ liệu & thông tin giới thiệu Lotte Hotel Hanoi
 * - STT 12: Xây dựng trang / khu vực Thông tin chi tiết khách sạn
 * - STT 13: Xây dựng khu vực hình ảnh khách sạn (Thumbnails & Gallery)
 * - STT 14: Xây dựng khu vực tiện ích khách sạn (Amenities 5 sao chuẩn quốc tế)
 * - STT 15: Xây dựng lưới danh sách phòng & khách sạn tại Hà Nội
 * - STT 16: Thiết kế Card phòng phong cách Traveloka (Hotel Item Card)
 * - STT 17: Hiển thị thông tin cơ bản của từng phòng (Điểm, đánh giá, vị trí, giá)
 * - STT 18: Xây dựng Modal / Khung Chi tiết phòng & các hạng phòng
 * - STT 19: Thiết kế khu vực hình ảnh và tiện nghi phòng chi tiết
 * - STT 20: Quản lý danh sách khách sạn yêu thích (Wishlist) & Tương thích di động
 * ==========================================================================
 */

// STT 11 & 12: DANH SÁCH HẠNG PHÒNG DUY NHẤT - LOTTE HOTEL HANOI
const HANOI_HOTELS_DATA = [
  {
    id: "lotte-deluxe",
    name: "Deluxe", hotelName: "Lotte Hotel Hanoi", roomClass: "Deluxe", stars: 5, category: "deluxe",
    district: "Ba Đình", address: "54 Liễu Giai, Phường Cống Vị, Quận Ba Đình, Hà Nội",
    score: 9.6, scoreText: "Xuất sắc", reviews: 3240, price: 2750000, oldPrice: 3200000,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=650&q=80",
    tag: "DELUXE • 5 SAO", isLotte: true, maxGuests: 2, area: "42m²",
    description: "Hạng phòng Deluxe rộng 42m², tiêu chuẩn 5 sao, phù hợp tối đa 2 khách. Quý khách có thể chọn nhiều hướng nhìn tùy tình trạng phòng.",
    amenities: ["42m²", "5 sao", "Tối đa 2 khách"],
    roomTypes: [
      { name: "Deluxe City View", extraPrice: 0, desc: "42m² • 5 sao • Tối đa 2 khách • View thành phố" },
      { name: "Deluxe Lake View", extraPrice: 250000, desc: "42m² • 5 sao • Tối đa 2 khách • View Hồ Tây" },
      { name: "Deluxe High Floor", extraPrice: 350000, desc: "42m² • 5 sao • Tối đa 2 khách • Tầng cao" }
    ]
  },
  {
    id: "lotte-premier",
    name: "Premier", hotelName: "Lotte Hotel Hanoi", roomClass: "Premier", stars: 5, category: "premier",
    district: "Ba Đình", address: "54 Liễu Giai, Phường Cống Vị, Quận Ba Đình, Hà Nội",
    score: 9.7, scoreText: "Tuyệt hảo", reviews: 2810, price: 3200000, oldPrice: 3900000,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=650&q=80",
    tag: "PREMIER • 5 SAO", isLotte: true, maxGuests: 3, area: "48m²",
    description: "Hạng phòng Premier rộng 48m², tiêu chuẩn 5 sao, phù hợp tối đa 3 khách với nhiều lựa chọn tầm nhìn.",
    amenities: ["48m²", "5 sao", "Tối đa 3 khách"],
    roomTypes: [
      { name: "Premier City View", extraPrice: 0, desc: "48m² • 5 sao • Tối đa 3 khách • View thành phố" },
      { name: "Premier Lake View", extraPrice: 350000, desc: "48m² • 5 sao • Tối đa 3 khách • View Hồ Tây" },
      { name: "Premier Panorama", extraPrice: 500000, desc: "48m² • 5 sao • Tối đa 3 khách • View panorama" }
    ]
  },
  {
    id: "lotte-junior-suite",
    name: "Junior Suite", hotelName: "Lotte Hotel Hanoi", roomClass: "Junior Suite", stars: 5, category: "junior-suite",
    district: "Ba Đình", address: "54 Liễu Giai, Phường Cống Vị, Quận Ba Đình, Hà Nội",
    score: 9.8, scoreText: "Đặc quyền", reviews: 1960, price: 3850000, oldPrice: 4600000,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=650&q=80",
    tag: "JUNIOR SUITE • 5 SAO", isLotte: true, maxGuests: 3, area: "65m²",
    description: "Hạng phòng Junior Suite rộng 65m², tiêu chuẩn 5 sao, phù hợp tối đa 3 khách và có nhiều lựa chọn view cùng đặc quyền Club.",
    amenities: ["65m²", "5 sao", "Tối đa 3 khách"],
    roomTypes: [
      { name: "Junior Suite City View", extraPrice: 0, desc: "65m² • 5 sao • Tối đa 3 khách • View thành phố" },
      { name: "Junior Suite Lake View", extraPrice: 450000, desc: "65m² • 5 sao • Tối đa 3 khách • View Hồ Tây" },
      { name: "Junior Suite Club View", extraPrice: 650000, desc: "65m² • 5 sao • Tối đa 3 khách • Club Lounge" }
    ]
  },
  {
    id: "lotte-presidential-suite",
    name: "Presidential Suite", hotelName: "Lotte Hotel Hanoi", roomClass: "Presidential Suite", stars: 5, category: "presidential-suite",
    district: "Ba Đình", address: "54 Liễu Giai, Phường Cống Vị, Quận Ba Đình, Hà Nội",
    score: 9.9, scoreText: "Đẳng cấp thượng hạng", reviews: 860, price: 5950000, oldPrice: 7200000,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=650&q=80",
    tag: "PRESIDENTIAL • SIGNATURE", isLotte: true, maxGuests: 4, area: "140m²",
    description: "Hạng phòng Presidential Suite rộng 140m², tiêu chuẩn 5 sao, phù hợp tối đa 4 khách với các lựa chọn view Signature cao cấp.",
    amenities: ["140m²", "5 sao", "Tối đa 4 khách"],
    roomTypes: [
      { name: "Presidential City View", extraPrice: 0, desc: "140m² • 5 sao • Tối đa 4 khách • View thành phố" },
      { name: "Presidential Lake View", extraPrice: 800000, desc: "140m² • 5 sao • Tối đa 4 khách • View Hồ Tây" },
      { name: "Presidential Signature View", extraPrice: 1200000, desc: "140m² • 5 sao • Tối đa 4 khách • Tầm nhìn toàn cảnh" }
    ]
  }
];

// Hàm tìm kiếm khách sạn theo ID
function getHotelById(hotelId) {
  return HANOI_HOTELS_DATA.find(h => h.id === hotelId) || null;
}

// STT 15, 16 & 17: RENDER LƯỚI KHÁCH SẠN VÀ THIẾT KẾ CARD PHÒNG TIÊU CHUẨN
function renderHotelsGrid(hotels) {
  const container = document.getElementById("hotel-grid-container");
  if (!container) return;

  if (!hotels || hotels.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:50px 20px;background:#fff;border-radius:16px;border:1px dashed #cbd5e1;">
        <h4 style="font-size:1.2rem;font-weight:800;color:#1c2430;margin-bottom:6px;">Không tìm thấy hạng phòng phù hợp</h4>
        <p style="font-size:.9rem;color:#718096;margin-bottom:16px;">Vui lòng chọn lại hạng phòng hoặc điều chỉnh số lượng khách.</p>
        <button type="button" class="btn btn-primary" onclick="resetHotelFilters()">Xem tất cả hạng phòng</button>
      </div>`;
    return;
  }

  const wishlist = typeof getUserWishlist === 'function' ? getUserWishlist() : [];
  container.innerHTML = hotels.map(hotel => {
    const isSaved = wishlist.includes(hotel.id);
    const starIcons = Array(hotel.stars).fill(`<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`).join('');
    const viewOptions = hotel.roomTypes.map(rt => rt.name.replace(hotel.roomClass, '').replace('View','').trim()).filter(Boolean).slice(0,3).join(' • ');
    return `
      <article class="hotel-item-card" data-id="${hotel.id}" data-category="${hotel.category}">
        <div class="hotel-thumb-box" onclick="openHotelDetailModal('${hotel.id}')" title="Xem các lựa chọn phòng và view">
          <img src="${hotel.image}" alt="${hotel.roomClass} - Lotte Hotel Hanoi" class="hotel-thumb" loading="lazy">
          <span class="hotel-status-tag lotte-tag">${hotel.tag}</span>
          <button type="button" class="btn-wishlist ${isSaved ? 'active' : ''}" data-id="${hotel.id}" title="${isSaved ? 'Đã lưu' : 'Lưu hạng phòng'}" onclick="handleWishlistClick('${hotel.id}', event)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
        <div class="hotel-body">
          <div class="hotel-stars">${starIcons}</div>
          <h3 class="hotel-name" title="${hotel.roomClass}" onclick="openHotelDetailModal('${hotel.id}')">${hotel.roomClass}</h3>
          <div class="room-class-badge">Lotte Hotel Hanoi • Hạng ${hotel.roomClass}</div>
          <div class="hotel-highlights" style="margin-top:12px;">
            <div class="highlight-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M3 10h18"></path></svg>${hotel.area} • Tiêu chuẩn 5 sao</div>
            <div class="highlight-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3"></circle><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 11c2.8.4 5 2.8 5 5.7V20"></path></svg>Tối đa ${hotel.maxGuests} khách</div>
            <div class="highlight-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 20l6-6 4 4 8-9"></path></svg>${viewOptions}</div>
          </div>
          <div class="hotel-pricing-box">
            <div class="pricing-left">
              <span class="old-price">${typeof formatVND === 'function' ? formatVND(hotel.oldPrice) : hotel.oldPrice + '₫'}</span>
              <div class="main-price">${typeof formatVND === 'function' ? formatVND(hotel.price) : hotel.price + '₫'} <span>/đêm</span></div>
              <span class="tax-included-note">Đã bao gồm thuế & phí</span>
            </div>
            <div class="card-actions-row">
              <button type="button" class="btn-view-detail" onclick="openHotelDetailModal('${hotel.id}')">Xem các view</button>
              <button type="button" class="btn-book-quick" onclick="handleBookHotelClick('${hotel.id}')">Đặt Ngay</button>
            </div>
          </div>
        </div>
      </article>`;
  }).join('');
}

// STT 18 & 19: XÂY DỰNG MODAL CHI TIẾT PHÒNG & HÌNH ẢNH, TIỆN NGHI PHÒNG
function openHotelDetailModal(hotelId) {
  const hotel = getHotelById(hotelId);
  if (!hotel) return;

  let modal = document.getElementById("hotel-detail-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "hotel-detail-modal";
    modal.className = "modal-overlay";
    document.body.appendChild(modal);
  }

  const starIcons = Array(hotel.stars).fill(`<svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`).join('');

  modal.innerHTML = `
    <div class="modal-dialog large">
      <div class="modal-header">
        <div>
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
            ${starIcons}
            <span style="font-size: 0.75rem; font-weight: 800; color: #c5a059;">LOTTE HOTEL HANOI • 5 SAO</span>
          </div>
          <h3 class="modal-title">${hotel.name}</h3>
        </div>
        <button type="button" class="btn-close-modal" onclick="closeModal('hotel-detail-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <!-- Khu vực ảnh lớn & Tag -->
        <div class="detail-gallery-box">
          <img src="${hotel.image}" alt="${hotel.name}" class="detail-gallery-img">
          <div class="detail-gallery-badge">
            ⭐ Đánh giá: <strong>${hotel.score}/10</strong> • ${hotel.area} • tối đa ${hotel.maxGuests} khách
          </div>
        </div>

        <p style="font-size: 0.92rem; color: #4a5568; line-height: 1.6; margin-bottom: 16px;">
          ${hotel.description || 'Khách sạn cung cấp chỗ ở sang trọng với đầy đủ trang thiết bị tiện nghi 5 sao và dịch vụ phục vụ đẳng cấp.'}
        </p>

        <div style="font-size: 0.85rem; color: #718096; margin-bottom: 8px;">
          📍 <strong>Địa chỉ:</strong> ${hotel.address}
        </div>

        <!-- STT 14 & 19: Tiện ích & tiện nghi phòng -->
        <h4 style="font-size: 1rem; font-weight: 800; color: #1c2430; margin-top: 18px;">Thông tin hạng phòng</h4>
        <div class="detail-amenities-grid">
          ${hotel.amenities.map(a => `
            <div class="detail-amenity-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${a}</span>
            </div>
          `).join('')}
        </div>

        <!-- Danh sách các hạng phòng lựa chọn -->
        <h4 style="font-size: 1rem; font-weight: 800; color: #1c2430; margin-top: 20px;">Các lựa chọn view trong hạng phòng ${hotel.roomClass}</h4>
        <div class="detail-room-tier-list">
          ${hotel.roomTypes.map(rt => `
            <div class="detail-room-tier-card">
              <div>
                <div style="font-weight: 800; font-size: 0.95rem; color: #1c2430;">${rt.name}</div>
                <div style="font-size: 0.8rem; color: #718096; margin-top: 3px;">${rt.desc || 'Phòng nghỉ tiện nghi cao cấp'}</div>
              </div>
              <div style="text-align: right;">
                <div style="font-weight: 800; color: #ff5e1f; font-size: 1.05rem;">
                  ${typeof formatVND === 'function' ? formatVND(hotel.price + (rt.extraPrice || 0)) : (hotel.price + (rt.extraPrice || 0)) + '₫'}
                </div>
                <button type="button" class="btn btn-primary" style="padding: 5px 12px; font-size: 0.8rem; margin-top: 4px;" onclick="closeModal('hotel-detail-modal'); handleBookHotelClick('${hotel.id}');">
                  Chọn phòng này
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

// STT 20: XỬ LÝ LƯU / BỎ LƯU KHÁCH SẠN YÊU THÍCH (WISHLIST)
function handleWishlistClick(hotelId, event) {
  if (event) event.stopPropagation();

  if (typeof toggleUserWishlist !== 'function') return;

  const result = toggleUserWishlist(hotelId);
  const btn = document.querySelector(`.btn-wishlist[data-id="${hotelId}"]`);

  if (btn) {
    if (result.added) {
      btn.classList.add("active");
      btn.title = "Đã lưu";
    } else {
      btn.classList.remove("active");
      btn.title = "Lưu hạng phòng";
    }
  }

  if (typeof updateBadges === 'function') updateBadges();
  if (typeof showToast === 'function') showToast(result.message);

  // Cập nhật lại giao diện modal wishlist nếu đang mở
  const wishlistModal = document.getElementById("wishlist-modal");
  if (wishlistModal && wishlistModal.classList.contains("active")) {
    openWishlistModal();
  }
}

// MỞ MODAL XEM CÁC HẠNG PHÒNG ĐÃ LƯU
function openWishlistModal() {
  const modal = document.getElementById("wishlist-modal");
  const listContainer = document.getElementById("wishlist-hotels-list");
  if (!modal || !listContainer) return;

  const wishlistIds = typeof getUserWishlist === 'function' ? getUserWishlist() : [];
  const savedHotels = HANOI_HOTELS_DATA.filter(h => wishlistIds.includes(h.id));

  if (savedHotels.length === 0) {
    listContainer.innerHTML = `
      <div class="wishlist-empty-box">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" stroke-width="1.8" style="margin: 0 auto 12px;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        <h4 style="font-size: 1.1rem; font-weight: 800; color: #1c2430; margin-bottom: 6px;">Chưa có hạng phòng nào được lưu</h4>
        <p style="font-size: 0.88rem; color: #718096; margin-bottom: 16px;">Hãy bấm biểu tượng trái tim trên các hạng phòng để lưu lại và xem lại bất cứ khi nào!</p>
        <button type="button" class="btn btn-primary" onclick="closeModal('wishlist-modal');">Khám phá hạng phòng ngay</button>
      </div>
    `;
  } else {
    listContainer.innerHTML = savedHotels.map(hotel => `
      <div class="my-booking-card">
        <img src="${hotel.image}" alt="${hotel.name}" class="my-booking-img">
        <div class="my-booking-details">
          <div class="my-booking-header">
            <h4 style="font-size: 1.05rem; font-weight: 800; color: #1c2430;">${hotel.name}</h4>
            <span class="booking-status-tag" style="background: #eff6ff; color: #0194f3;">⭐ ${hotel.score} / 10</span>
          </div>
          <div class="my-booking-dates">📍 ${hotel.address}</div>
          <div class="my-booking-price">${typeof formatVND === 'function' ? formatVND(hotel.price) : hotel.price + '₫'} <span>/đêm</span></div>
          <div style="display: flex; gap: 8px; margin-top: 10px;">
            <button type="button" class="btn btn-primary" style="padding: 6px 14px; font-size: 0.82rem;" onclick="closeModal('wishlist-modal'); handleBookHotelClick('${hotel.id}');">
              Đặt Ngay
            </button>
            <button type="button" class="btn btn-outline" style="padding: 6px 14px; font-size: 0.82rem;" onclick="openHotelDetailModal('${hotel.id}')">
              Chi Tiết
            </button>
            <button type="button" class="btn-cancel-booking" style="margin-top: 0;" onclick="handleWishlistClick('${hotel.id}', event)">
              Bỏ lưu
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  modal.classList.add("active");
}

// KHỞI CHẠY TẤT CẢ CÁC ĐẦU VIỆC CỦA THÀNH VIÊN 2
function initPart2Rooms() {
  console.log("✓ [Thành viên 2] Khởi chạy Phòng & Hạng phòng Lotte Hotel Hanoi (STT 11-20)");
  renderHotelsGrid(HANOI_HOTELS_DATA);
}
