/**
 * ==========================================================================
 * DỰ ÁN: LOTTE HOTEL HANOI & ĐẶT PHÒNG KHÁCH SẠN PHONG CÁCH TRAVELOKA
 * PHẦN 3: TÌM KIẾM & ĐẶT PHÒNG
 * PHỤ TRÁCH: THÀNH VIÊN 3
 * DANH SÁCH ĐẦU VIỆC THỰC HIỆN:
 * - STT 21: Phân tích quy trình tìm kiếm phòng & Luồng trạng thái tìm kiếm
 * - STT 22: Xây dựng Form tìm kiếm phòng & Gợi ý điểm đến Hà Nội
 * - STT 23: Xử lý ngày nhận phòng (Giới hạn ngày tối thiểu từ hôm nay)
 * - STT 24: Xử lý ngày trả phòng & Tự động tính toán số đêm lưu trú
 * - STT 25: Xử lý số lượng khách (Người lớn, trẻ em với điều kiện giới hạn)
 * - STT 26: Xử lý số lượng phòng cần đặt
 * - STT 27: Xây dựng logic lọc phòng (Theo sao, quận huyện, mức giá, sắp xếp)
 * - STT 28: Xây dựng giao diện lựa chọn phòng & Kích hoạt tìm kiếm
 * - STT 29: Xây dựng Form thông tin khách hàng đặt phòng (Booking Modal)
 * - STT 30: Xây dựng quy trình xác nhận đặt phòng, Bảng tính giá & Quản lý đơn đặt
 * ==========================================================================
 */

// STT 21: BIẾN TRẠNG THÁI TÌM KIẾM & ĐẶT PHÒNG TOÀN CỤC
let currentSearchState = {
  destination: "Tất cả hạng phòng",
  district: "",
  checkin: "",
  checkout: "",
  nights: 2,
  adults: 2,
  children: 0,
  rooms: 1,
  businessTrip: false,
  payAtHotel: false
};

let currentFilterCategory = "all";
let pendingHotelForBooking = null; // Lưu tạm hạng phòng cần đặt nếu cần đăng nhập trước

// STT 23 & 24: XỬ LÝ NGÀY NHẬN PHÒNG, NGÀY TRẢ PHÒNG & TÍNH SỐ ĐÊM
function initDateSelectors() {
  const checkinInput = document.getElementById("checkin-date");
  const checkoutInput = document.getElementById("checkout-date");
  const nightsBadge = document.getElementById("nights-count");

  if (!checkinInput || !checkoutInput) return;

  const today = new Date();
  const checkoutDay = new Date();
  checkoutDay.setDate(today.getDate() + 2); // Mặc định lưu trú 2 đêm

  const formatDateYMD = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  checkinInput.value = formatDateYMD(today);
  checkinInput.min = formatDateYMD(today);
  checkoutInput.value = formatDateYMD(checkoutDay);
  checkoutInput.min = formatDateYMD(today);

  function calculateNights() {
    const d1 = new Date(checkinInput.value);
    const d2 = new Date(checkoutInput.value);
    const diffTime = d2 - d1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      if (nightsBadge) nightsBadge.textContent = `${diffDays} đêm`;
      currentSearchState.nights = diffDays;
    } else {
      if (nightsBadge) nightsBadge.textContent = `1 đêm`;
      currentSearchState.nights = 1;
      const nextDay = new Date(d1);
      nextDay.setDate(d1.getDate() + 1);
      checkoutInput.value = formatDateYMD(nextDay);
    }
    currentSearchState.checkin = checkinInput.value;
    currentSearchState.checkout = checkoutInput.value;
  }

  checkinInput.addEventListener("change", () => {
    checkoutInput.min = checkinInput.value;
    calculateNights();
  });
  checkoutInput.addEventListener("change", calculateNights);
  calculateNights();
}

// STT 25 & 26: XỬ LÝ SỐ LƯỢNG KHÁCH (NGƯỜI LỚN, TRẺ EM) VÀ SỐ LƯỢNG PHÒNG
function initGuestCounter() {
  const triggerBox = document.getElementById("guest-field-box");
  const popup = document.getElementById("guest-popup");
  const applyBtn = document.getElementById("btn-apply-guests");
  const summaryDisplay = document.getElementById("guest-summary-text");

  if (!triggerBox || !popup) return;

  const adultVal = document.getElementById("val-adults");
  const childVal = document.getElementById("val-children");
  const roomVal = document.getElementById("val-rooms");

  const btnMinusAdult = document.getElementById("btn-minus-adults");
  const btnPlusAdult = document.getElementById("btn-plus-adults");
  const btnMinusChild = document.getElementById("btn-minus-children");
  const btnPlusChild = document.getElementById("btn-plus-children");
  const btnMinusRoom = document.getElementById("btn-minus-rooms");
  const btnPlusRoom = document.getElementById("btn-plus-rooms");

  function updateGuestUI() {
    if (adultVal) adultVal.textContent = currentSearchState.adults;
    if (childVal) childVal.textContent = currentSearchState.children;
    if (roomVal) roomVal.textContent = currentSearchState.rooms;

    if (btnMinusAdult) btnMinusAdult.disabled = currentSearchState.adults <= 1;
    if (btnMinusChild) btnMinusChild.disabled = currentSearchState.children <= 0;
    if (btnMinusRoom) btnMinusRoom.disabled = currentSearchState.rooms <= 1;

    if (summaryDisplay) {
      summaryDisplay.textContent = `${currentSearchState.adults} người lớn, ${currentSearchState.children} trẻ em, ${currentSearchState.rooms} phòng`;
    }
  }

  if (btnMinusAdult) {
    btnMinusAdult.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentSearchState.adults > 1) {
        currentSearchState.adults--;
        updateGuestUI();
      }
    });
  }

  if (btnPlusAdult) {
    btnPlusAdult.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentSearchState.adults < 10) {
        currentSearchState.adults++;
        updateGuestUI();
      }
    });
  }

  if (btnMinusChild) {
    btnMinusChild.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentSearchState.children > 0) {
        currentSearchState.children--;
        updateGuestUI();
      }
    });
  }

  if (btnPlusChild) {
    btnPlusChild.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentSearchState.children < 6) {
        currentSearchState.children++;
        updateGuestUI();
      }
    });
  }

  if (btnMinusRoom) {
    btnMinusRoom.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentSearchState.rooms > 1) {
        currentSearchState.rooms--;
        updateGuestUI();
      }
    });
  }

  if (btnPlusRoom) {
    btnPlusRoom.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentSearchState.rooms < 5) {
        currentSearchState.rooms++;
        updateGuestUI();
      }
    });
  }

  triggerBox.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = popup.classList.contains("show") || popup.classList.contains("open");
    closeAllPopups();
    if (!isOpen) {
      popup.classList.add("show");
      popup.classList.add("open");
    }
  });

  if (applyBtn) {
    applyBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      popup.classList.remove("show");
      popup.classList.remove("open");
    });
  }

  popup.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  updateGuestUI();
}

// STT 22: GỢI Ý HẠNG PHÒNG TẠI LOTTE HOTEL HANOI
function initDestinationSelector() {
  const destInput = document.getElementById("destination-input");
  const destBox = document.getElementById("destination-box");
  const destPopup = document.getElementById("dest-suggestions-popup");
  const areaChips = document.querySelectorAll(".area-chip");
  const suggItems = document.querySelectorAll(".suggestion-item");

  if (!destInput || !destBox) return;

  function openDestPopup() {
    closeAllPopups();
    if (destPopup) {
      destPopup.classList.add("show");
      destPopup.classList.add("open");
    }
    destInput.focus();
  }

  destBox.addEventListener("click", (e) => {
    e.stopPropagation();
    openDestPopup();
  });

  destInput.addEventListener("focus", (e) => {
    e.stopPropagation();
    openDestPopup();
  });

  suggItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      const place = item.getAttribute("data-place") || item.querySelector("h5").textContent.trim();
      const district = item.getAttribute("data-district") || "";
      destInput.value = place;
      currentSearchState.destination = place;
      currentSearchState.district = district;
      if (destPopup) {
        destPopup.classList.remove("show");
        destPopup.classList.remove("open");
      }
    });
  });

  areaChips.forEach((chip) => {
    chip.addEventListener("click", (e) => {
      e.preventDefault();
      const text = chip.textContent.trim();
      destInput.value = text;
      currentSearchState.destination = text;
      currentSearchState.district = chip.getAttribute("data-district") || "";
      triggerSearch();
    });
  });
}

function closeAllPopups() {
  document.querySelectorAll(".guest-popup, .dest-suggestions-popup, .user-dropdown").forEach((p) => {
    p.classList.remove("open");
    p.classList.remove("show");
  });
}

document.addEventListener("click", () => {
  closeAllPopups();
});

// STT 27: LOGIC LỌC PHÒNG & SẮP XẾP KẾT QUẢ
function initHotelFilterTabs() {
  const tabs = document.querySelectorAll(".filter-tab");
  const sortSelect = document.getElementById("sort-hotels-select");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentFilterCategory = tab.getAttribute("data-filter") || "all";
      applyFiltersAndSort();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", applyFiltersAndSort);
  }
}

function applyFiltersAndSort() {
  if (typeof HANOI_HOTELS_DATA === 'undefined') return;
  let filtered = [...HANOI_HOTELS_DATA];

  // 1. Lọc theo tab danh mục được chọn
  if (currentFilterCategory !== "all") {
    if (currentFilterCategory === "under1500") {
      filtered = filtered.filter(h => h.price <= 1500000);
    } else {
      filtered = filtered.filter(h =>
        (h.category && h.category.includes(currentFilterCategory)) ||
        (h.roomClass && h.roomClass.toLowerCase().replace(/\s+/g, "-") === currentFilterCategory)
      );
    }
  }

  // 2. Lọc theo hạng phòng được chọn
  const destInput = document.getElementById("destination-input");
  const destVal = destInput ? destInput.value.trim().toLowerCase() : "";
  if (destVal && !destVal.includes("toàn bộ") && !destVal.includes("tất cả")) {
    filtered = filtered.filter(h =>
      (h.roomClass && h.roomClass.toLowerCase().includes(destVal)) ||
      (h.name && h.name.toLowerCase().includes(destVal))
    );
  }

  // 3. Lọc theo số lượng khách
  if (currentSearchState.adults) {
    filtered = filtered.filter(h => h.maxGuests >= currentSearchState.adults);
  }

  // 4. Sắp xếp kết quả
  const sortSelect = document.getElementById("sort-hotels-select");
  const sortVal = sortSelect ? sortSelect.value : "featured";

  if (sortVal === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortVal === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortVal === "rating") {
    filtered.sort((a, b) => b.score - a.score);
  }

  if (typeof renderHotelsGrid === 'function') {
    renderHotelsGrid(filtered);
  }

  // Cập nhật banner thông báo kết quả tìm kiếm
  const resultsBanner = document.getElementById("search-results-banner");
  const resultsText = document.getElementById("search-results-text");
  if (resultsBanner && resultsText) {
    const locText = destInput && destInput.value ? destInput.value : "khu vực Hà Nội";
    resultsText.innerHTML = `Tìm thấy <strong>${filtered.length}</strong> hạng phòng phù hợp với lựa chọn <strong>${locText}</strong> cho <strong>${currentSearchState.adults} khách</strong> (${currentSearchState.nights} đêm)`;
    resultsBanner.style.display = "flex";
  }
}

function resetHotelFilters() {
  const destInput = document.getElementById("destination-input");
  if (destInput) destInput.value = "Tất cả hạng phòng";
  
  const tabs = document.querySelectorAll(".filter-tab");
  tabs.forEach(t => t.classList.remove("active"));
  const allTab = document.querySelector(".filter-tab[data-filter='all']");
  if (allTab) allTab.classList.add("active");

  currentFilterCategory = "all";
  currentSearchState.adults = 2;
  currentSearchState.rooms = 1;

  const resultsBanner = document.getElementById("search-results-banner");
  if (resultsBanner) resultsBanner.style.display = "none";

  if (typeof renderHotelsGrid === 'function') {
    renderHotelsGrid(HANOI_HOTELS_DATA);
  }
}

// STT 28: KÍCH HOẠT TÌM KIẾM
function initSearchSubmit() {
  const searchBtn = document.getElementById("btn-search-hotels");
  if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      triggerSearch();
    });
  }
}

function triggerSearch() {
  applyFiltersAndSort();
  if (typeof showToast === 'function') {
    showToast(`Đang tìm hạng phòng phù hợp tại Lotte Hotel Hanoi...`);
  }
  
  const targetSection = document.getElementById("featured-hotels-section");
  if (targetSection) {
    setTimeout(() => {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }, 250);
  }
  const starSelect = document.getElementById("search-room-stars");
  const selectedStars = starSelect ? starSelect.value : "all";
  if (selectedStars !== "all" && typeof HANOI_HOTELS_DATA !== "undefined") {
    const filtered = HANOI_HOTELS_DATA.filter(h => h.roomTypes.some(r => String(r.stars) === selectedStars));
    if (typeof renderHotelsGrid === "function") renderHotelsGrid(filtered);
  }
}

// STT 29: XÂY DỰNG FORM THÔNG TIN KHÁCH HÀNG & MỞ MODAL ĐẶT PHÒNG
function handleBookHotelClick(hotelId, preferredStars) {
  if (typeof HANOI_HOTELS_DATA === 'undefined') return;
  const hotel = HANOI_HOTELS_DATA.find(h => h.id === hotelId);
  if (!hotel) return;

  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

  // YÊU CẦU: KHI ĐẶT PHÒNG BẮT BUỘC ĐĂNG NHẬP ĐỂ LƯU ĐƠN
  if (!currentUser) {
    pendingHotelForBooking = hotel;
    if (typeof openAuthModal === 'function') {
      openAuthModal("login", true);
    }
    return;
  }

  // ĐÃ ĐĂNG NHẬP -> MỞ MODAL ĐẶT PHÒNG
  openBookingModal(hotel, preferredStars);
}

function openBookingModal(hotel, preferredStars) {
  const modal = document.getElementById("booking-modal");
  if (!modal) return;

  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : {};

  // Điền dữ liệu hạng phòng
  const thumbEl = document.getElementById("bm-hotel-thumb");
  const nameEl = document.getElementById("bm-hotel-name");
  const addressEl = document.getElementById("bm-hotel-address");
  if (thumbEl) thumbEl.src = hotel.image;
  if (nameEl) nameEl.textContent = hotel.name;
  if (addressEl) addressEl.textContent = hotel.address;

  // Xác định hạng sao mặc định khi mở modal
  const starSelect = document.getElementById("search-room-stars");
  const starVal = starSelect && starSelect.value !== "all" ? parseInt(starSelect.value) : null;
  const defaultIdx = (typeof preferredStars === 'number' && preferredStars >= 1 && preferredStars <= 5)
    ? (preferredStars - 1)
    : (starVal ? (starVal - 1) : 4);

  // Render các hạng dịch vụ (giữ nguyên số sao 1 - 5 sao, hiển thị dịch vụ theo số sao, số sao càng cao càng VIP)
  const roomTypesContainer = document.getElementById("bm-room-types");
  if (roomTypesContainer) {
    const servicesMap = (typeof STAR_SERVICES_DATA !== 'undefined' && STAR_SERVICES_DATA) ? STAR_SERVICES_DATA : (window.STAR_SERVICES_DATA || {});

    roomTypesContainer.innerHTML = hotel.roomTypes.map((r, idx) => {
      const stars = r.stars || (idx + 1);
      const tierData = servicesMap[stars] || {
        tierName: `${stars} sao`,
        badge: `${stars} sao`,
        badgeClass: "badge-standard",
        vipLevel: stars,
        summary: `Gói dịch vụ ${stars} sao`,
        services: []
      };
      const isSelected = (idx === defaultIdx);
      const formattedPrice = typeof formatVND === 'function' ? formatVND(hotel.price + r.extraPrice) : (hotel.price + r.extraPrice) + '₫';
      const starIcons = '★'.repeat(stars) + '☆'.repeat(5 - stars);

      return `
        <label class="room-option-card ${isSelected ? 'selected' : ''}" data-room-stars="${stars}" for="rt-option-${idx}">
          <div class="room-option-main-row">
            <div class="room-option-left">
              <input type="radio" id="rt-option-${idx}" name="selectedRoomType" value="${idx}" ${isSelected ? 'checked' : ''} onchange="updateBookingCalculation('${hotel.id}')" class="room-option-radio">
              <div class="room-option-info">
                <div class="room-option-title-row">
                  <span class="room-option-title">${r.name}</span>
                  <span class="service-star-icons" title="${stars} sao">${starIcons}</span>
                  <span class="service-tier-badge ${tierData.badgeClass}">${tierData.badge}</span>
                </div>
                <div class="service-tier-short-desc">${tierData.summary}</div>
              </div>
            </div>
            <div class="room-option-price-col">
              <div class="room-option-price">${formattedPrice} <span class="room-option-unit">/ đêm</span></div>
            </div>
          </div>

          <!-- Danh sách dịch vụ tương ứng với số sao (số sao càng cao dịch vụ càng VIP) -->
          <div class="service-tier-details ${isSelected ? 'open' : ''}" id="tier-details-${idx}">
            <div class="service-tier-details-header">
              <span class="tier-header-label">
                ✨ <strong>Dịch vụ & Đặc quyền Hạng ${stars} sao (${tierData.tierName}):</strong>
              </span>
              <span class="vip-level-pill ${stars >= 4 ? 'vip-high' : ''}">Cấp VIP: ${stars}/5 ${stars === 5 ? '👑' : ''}</span>
            </div>
            <div class="service-perks-grid">
              ${tierData.services.map(s => `
                <div class="service-perk-item ${s.isHighlight ? 'highlight' : ''} ${s.isBase ? 'base-perk' : ''}">
                  <span class="perk-bullet">${s.icon}</span>
                  <span class="perk-text">${s.name}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </label>
      `;
    }).join('');
  }

  // Điền thông tin khách
  const nameInput = document.getElementById("bm-guest-name");
  const emailInput = document.getElementById("bm-guest-email");
  const phoneInput = document.getElementById("bm-guest-phone");
  if (nameInput) nameInput.value = currentUser.fullName || currentUser.name || "";
  if (emailInput) emailInput.value = currentUser.email || "";
  if (phoneInput) phoneInput.value = currentUser.phone || "";

  // Điền ngày nhận/trả
  const checkinInput = document.getElementById("checkin-date");
  const checkoutInput = document.getElementById("checkout-date");
  const checkinDisp = document.getElementById("bm-checkin-display");
  const checkoutDisp = document.getElementById("bm-checkout-display");
  const nightsDisp = document.getElementById("bm-nights-display");
  const guestsDisp = document.getElementById("bm-guests-display");

  if (checkinDisp) checkinDisp.textContent = typeof formatDateDisplay === 'function' ? formatDateDisplay(checkinInput ? checkinInput.value : currentSearchState.checkin) : currentSearchState.checkin;
  if (checkoutDisp) checkoutDisp.textContent = typeof formatDateDisplay === 'function' ? formatDateDisplay(checkoutInput ? checkoutInput.value : currentSearchState.checkout) : currentSearchState.checkout;
  if (nightsDisp) nightsDisp.textContent = `${currentSearchState.nights} đêm`;
  if (guestsDisp) guestsDisp.textContent = `${currentSearchState.adults} người lớn, ${currentSearchState.rooms} phòng`;

  const bmIn = document.getElementById("bm-checkin-date"), bmOut = document.getElementById("bm-checkout-date"), bmRooms = document.getElementById("bm-rooms-count");
  if (bmIn) bmIn.value = (checkinInput && checkinInput.value) || currentSearchState.checkin;
  if (bmOut) bmOut.value = (checkoutInput && checkoutInput.value) || currentSearchState.checkout;
  if (bmRooms) bmRooms.value = currentSearchState.rooms || 1;
  const syncBookingInputs = () => {
    if (bmIn && bmOut && bmIn.value && bmOut.value) {
      const d1 = new Date(bmIn.value + 'T00:00:00'), d2 = new Date(bmOut.value + 'T00:00:00');
      const nights = Math.max(1, Math.round((d2-d1)/86400000));
      if (d2 <= d1) { d2.setDate(d1.getDate()+1); bmOut.value = `${d2.getFullYear()}-${String(d2.getMonth()+1).padStart(2,'0')}-${String(d2.getDate()).padStart(2,'0')}`; }
      currentSearchState.checkin = bmIn.value; currentSearchState.checkout = bmOut.value; currentSearchState.nights = nights;
    }
    currentSearchState.rooms = Math.max(1, Math.min(10, parseInt(bmRooms && bmRooms.value || '1',10)));
    const n1=document.getElementById('bm-checkin-display'), n2=document.getElementById('bm-checkout-display'), nn=document.getElementById('bm-nights-display'), gg=document.getElementById('bm-guests-display');
    if(n1) n1.textContent=formatDateDisplay(currentSearchState.checkin); if(n2) n2.textContent=formatDateDisplay(currentSearchState.checkout); if(nn) nn.textContent=`${currentSearchState.nights} đêm`; if(gg) gg.textContent=`${currentSearchState.adults} người lớn, ${currentSearchState.rooms} phòng`;
    updateBookingCalculation(hotel.id);
  };
  [bmIn,bmOut,bmRooms].forEach(el => { if(el) el.onchange=syncBookingInputs; });

  // Reset coupon input
  const couponInput = document.getElementById("bm-coupon-input");
  if (couponInput) couponInput.value = "";
  modal.setAttribute("data-applied-discount", "0");

  updateBookingCalculation(hotel.id);
  modal.classList.add("active");
}

// STT 30: BẢNG TÍNH GIÁ, ÁP DỤNG VOUCHER & XÁC NHẬN ĐẶT PHÒNG
function updateBookingCalculation(hotelId) {
  if (typeof HANOI_HOTELS_DATA === 'undefined') return;
  const hotel = HANOI_HOTELS_DATA.find(h => h.id === hotelId);
  if (!hotel) return;

  const modal = document.getElementById("booking-modal");
  const selectedRadio = document.querySelector("input[name='selectedRoomType']:checked");
  const roomIdx = selectedRadio ? parseInt(selectedRadio.value) : 0;
  const room = hotel.roomTypes[roomIdx] || hotel.roomTypes[0];

  // Đánh dấu lại class selected và toggle hiển thị danh sách dịch vụ của hạng sao tương ứng
  document.querySelectorAll(".room-option-card").forEach((card, idx) => {
    const isSelected = (idx === roomIdx);
    card.classList.toggle("selected", isSelected);
    const details = card.querySelector(".service-tier-details");
    if (details) {
      details.classList.toggle("open", isSelected);
    }
  });

  const basePricePerNight = hotel.price + (room ? room.extraPrice : 0);
  const nights = currentSearchState.nights || 1;
  const rooms = currentSearchState.rooms || 1;
  const subtotal = basePricePerNight * nights * rooms;

  const appliedDiscount = parseInt(modal.getAttribute("data-applied-discount") || "0");
  const finalTotal = Math.max(0, subtotal - appliedDiscount);

  const calcRoomPriceEl = document.getElementById("bm-calc-room-price");
  const calcSubtotalEl = document.getElementById("bm-calc-subtotal");
  const calcDiscountEl = document.getElementById("bm-calc-discount");
  const calcTotalEl = document.getElementById("bm-calc-total");

  if (calcRoomPriceEl) calcRoomPriceEl.textContent = `${typeof formatVND === 'function' ? formatVND(basePricePerNight) : basePricePerNight + '₫'} × ${nights} đêm × ${rooms} phòng`;
  if (calcSubtotalEl) calcSubtotalEl.textContent = typeof formatVND === 'function' ? formatVND(subtotal) : subtotal + '₫';
  if (calcDiscountEl) calcDiscountEl.textContent = appliedDiscount > 0 ? `-${typeof formatVND === 'function' ? formatVND(appliedDiscount) : appliedDiscount + '₫'}` : "0₫";
  if (calcTotalEl) calcTotalEl.textContent = typeof formatVND === 'function' ? formatVND(finalTotal) : finalTotal + '₫';

  modal.setAttribute("data-hotel-id", hotel.id);
  modal.setAttribute("data-final-total", finalTotal);
  modal.setAttribute("data-room-name", room ? room.name : "Deluxe Room");
  if (room && room.stars) {
    modal.setAttribute("data-service-stars", room.stars);
  }
}

function getClientPromosList() {
  const DEFAULT_PROMOS_FALLBACK = [
    { id: "prm_01", code: "LOTTE500", discountType: "fixed", discountValue: 500000, minSpend: 2000000, maxDiscount: 500000, expiryDate: "2026-12-31", usageCount: 56, isActive: true },
    { id: "prm_02", code: "HANOI30", discountType: "percent", discountValue: 30, minSpend: 3000000, maxDiscount: 1000000, expiryDate: "2026-12-31", usageCount: 88, isActive: true },
    { id: "prm_03", code: "WEEKEND15", discountType: "percent", discountValue: 15, minSpend: 1500000, maxDiscount: 500000, expiryDate: "2026-12-31", usageCount: 34, isActive: true },
    { id: "prm_04", code: "LOTTE2026", discountType: "percent", discountValue: 15, minSpend: 2000000, maxDiscount: 600000, expiryDate: "2026-12-31", usageCount: 42, isActive: true },
    { id: "prm_05", code: "TRAVELOKA300", discountType: "fixed", discountValue: 300000, minSpend: 2500000, maxDiscount: 300000, expiryDate: "2026-11-30", usageCount: 68, isActive: true },
    { id: "prm_06", code: "SUMMERVIP", discountType: "percent", discountValue: 20, minSpend: 4000000, maxDiscount: 1200000, expiryDate: "2026-10-31", usageCount: 19, isActive: true },
    { id: "prm_07", code: "WEEKEND10", discountType: "percent", discountValue: 10, minSpend: 1500000, maxDiscount: 400000, expiryDate: "2026-12-31", usageCount: 27, isActive: true }
  ];

  try {
    const raw = localStorage.getItem("traveloka_hotel_promos");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}

  try {
    localStorage.setItem("traveloka_hotel_promos", JSON.stringify(DEFAULT_PROMOS_FALLBACK));
  } catch (e) {}
  return DEFAULT_PROMOS_FALLBACK;
}

function applyCouponCode() {
  const couponInput = document.getElementById("bm-coupon-input");
  const modal = document.getElementById("booking-modal");
  const hotelId = modal ? modal.getAttribute("data-hotel-id") : null;
  if (!couponInput || !hotelId) return;

  const code = couponInput.value.trim().toUpperCase();
  if (!code) {
    if (typeof showToast === 'function') showToast("Vui lòng nhập mã ưu đãi hoặc mã voucher!");
    return;
  }

  // Lấy dữ liệu hạng phòng & giá tạm tính để kiểm tra điều kiện
  const hotel = typeof HANOI_HOTELS_DATA !== 'undefined' ? HANOI_HOTELS_DATA.find(h => h.id === hotelId) : null;
  if (!hotel) return;

  const selectedRadio = document.querySelector("input[name='selectedRoomType']:checked");
  const roomIdx = selectedRadio ? parseInt(selectedRadio.value) : 0;
  const room = hotel.roomTypes[roomIdx] || hotel.roomTypes[0];
  const basePricePerNight = hotel.price + (room ? room.extraPrice : 0);
  const nights = (typeof currentSearchState !== 'undefined' && currentSearchState.nights) ? currentSearchState.nights : 1;
  const rooms = (typeof currentSearchState !== 'undefined' && currentSearchState.rooms) ? currentSearchState.rooms : 1;
  const subtotal = basePricePerNight * nights * rooms;

  const promos = getClientPromosList();
  const promo = promos.find(p => p.code && p.code.toUpperCase() === code);

  if (!promo) {
    if (typeof showToast === 'function') showToast(`Mã giảm giá "${code}" không tồn tại trên hệ thống!`);
    return;
  }

  if (promo.isActive === false) {
    if (typeof showToast === 'function') showToast(`Mã ưu đãi "${code}" hiện đang tạm ngừng kích hoạt!`);
    return;
  }

  // Kiểm tra hạn sử dụng
  if (promo.expiryDate) {
    const today = new Date().toISOString().split("T")[0];
    if (promo.expiryDate < today) {
      if (typeof showToast === 'function') showToast(`Mã "${code}" đã hết hạn sử dụng vào ngày ${promo.expiryDate}!`);
      return;
    }
  }

  // Kiểm tra giá trị đơn tối thiểu
  if (promo.minSpend && subtotal < promo.minSpend) {
    const minText = typeof formatVND === 'function' ? formatVND(promo.minSpend) : promo.minSpend.toLocaleString('vi-VN') + "₫";
    if (typeof showToast === 'function') showToast(`Mã "${code}" chỉ áp dụng cho đơn phòng từ ${minText} trở lên!`);
    return;
  }

  // Tính số tiền giảm
  let discount = 0;
  if (promo.discountType === "percent") {
    discount = Math.round((subtotal * promo.discountValue) / 100);
    if (promo.maxDiscount && promo.maxDiscount > 0 && discount > promo.maxDiscount) {
      discount = promo.maxDiscount;
    }
  } else {
    discount = Math.min(subtotal, promo.discountValue);
  }

  modal.setAttribute("data-applied-discount", discount.toString());
  modal.setAttribute("data-applied-promo-code", promo.code);
  updateBookingCalculation(hotelId);

  const discountFormatted = typeof formatVND === 'function' ? formatVND(discount) : discount.toLocaleString('vi-VN') + "₫";
  if (typeof showToast === 'function') {
    showToast(`Áp dụng thành công mã "${promo.code}": Giảm ngay ${discountFormatted}!`);
  }
}

function submitBookingForm(e) {
  if (e) e.preventDefault();
  const modal = document.getElementById("booking-modal");
  const hotelId = modal.getAttribute("data-hotel-id");
  const hotel = typeof HANOI_HOTELS_DATA !== 'undefined' ? HANOI_HOTELS_DATA.find(h => h.id === hotelId) : null;
  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

  if (!hotel || !currentUser) {
    if (typeof showToast === 'function') showToast("Vui lòng đăng nhập lại để hoàn tất đặt phòng!");
    return;
  }

  const roomName = modal.getAttribute("data-room-name") || "Deluxe City View";
  const serviceStars = parseInt(modal.getAttribute("data-service-stars") || "5");
  const servicesMap = (typeof STAR_SERVICES_DATA !== 'undefined' && STAR_SERVICES_DATA) ? STAR_SERVICES_DATA : (window.STAR_SERVICES_DATA || {});
  const serviceTierName = (servicesMap[serviceStars] ? servicesMap[serviceStars].tierName : `${serviceStars} sao`);
  const finalTotal = parseInt(modal.getAttribute("data-final-total") || hotel.price);
  // Ở bước gửi yêu cầu, khách chưa chọn phương thức thanh toán và chưa chọn số phòng cụ thể.
  // Sau khi admin xác nhận còn phòng, khách sẽ chọn 100% online hoặc cọc 30% ở payment.html.
  const paymentPlan = "";
  const paymentMethod = "Chọn sau khi admin xác nhận còn phòng";
  const noteInput = document.getElementById("bm-special-requests");
  const guestNameInput = document.getElementById("bm-guest-name");
  const guestEmailInput = document.getElementById("bm-guest-email");
  const guestPhoneInput = document.getElementById("bm-guest-phone");

  const newBooking = {
    bookingId: "LT-HN-" + Math.floor(10000 + Math.random() * 90000),
    hotelId: hotel.id,
    hotelName: hotel.name,
    hotelImage: hotel.image,
    category: hotel.category,
    roomType: roomName,
    serviceStars: serviceStars,
    serviceTierName: serviceTierName,
    roomNumber: "",
    roomId: "",
    floor: undefined,
    checkin: currentSearchState.checkin,
    checkout: currentSearchState.checkout,
    nights: currentSearchState.nights,
    guests: `${currentSearchState.adults} người lớn, ${currentSearchState.children} trẻ em`,
    rooms: currentSearchState.rooms,
    totalPrice: typeof formatVND === 'function' ? formatVND(finalTotal) : finalTotal + '₫',
    status: "Chờ admin xác nhận",
    paymentMethod: paymentMethod,
    paymentPlan: paymentPlan,
    paymentStatus: "Chưa thanh toán",
    paymentSubmittedAt: null,
    depositAmount: 0,
    remainingAmount: 0,
    customerName: guestNameInput ? guestNameInput.value.trim() : (currentUser.fullName || currentUser.name || ""),
    guestName: guestNameInput ? guestNameInput.value.trim() : (currentUser.fullName || currentUser.name || ""),
    customerEmail: guestEmailInput ? guestEmailInput.value.trim() : currentUser.email,
    customerPhone: guestPhoneInput ? guestPhoneInput.value.trim() : currentUser.phone,
    rawAmount: finalTotal,
    identityNumber: (document.getElementById("bm-guest-id") || {}).value || "",
    note: noteInput ? noteInput.value.trim() : "",
    bookedAt: new Date().toISOString()
  };

  const success = typeof addBookingToCurrentUser === 'function' ? addBookingToCurrentUser(newBooking) : false;

  if (success) {
    // Tăng lượt sử dụng voucher nếu có áp dụng
    const usedCode = modal.getAttribute("data-applied-promo-code");
    if (usedCode) {
      try {
        const promos = getClientPromosList();
        const pIdx = promos.findIndex(p => p.code && p.code.toUpperCase() === usedCode.toUpperCase());
        if (pIdx !== -1) {
          promos[pIdx].usageCount = (promos[pIdx].usageCount || 0) + 1;
          localStorage.setItem("traveloka_hotel_promos", JSON.stringify(promos));
        }
      } catch (err) {}
    }

    closeModal("booking-modal");
    showBookingSuccessModal(newBooking);
    if (typeof updateBadges === 'function') updateBadges();
    console.log("=== ĐÃ LƯU ĐẶT PHÒNG THÀNH CÔNG VÀO MẢNG ===", newBooking);
  } else {
    if (typeof showToast === 'function') showToast("Có lỗi xảy ra khi lưu thông tin đặt phòng!");
  }
}

function showBookingSuccessModal(booking) {
  const modal = document.getElementById("booking-success-modal");
  if (!modal) return;

  const codeEl = document.getElementById("succ-booking-code");
  const hotelEl = document.getElementById("succ-hotel-name");
  const roomEl = document.getElementById("succ-room-type");
  const datesEl = document.getElementById("succ-dates");
  const totalEl = document.getElementById("succ-total");
  const paymentEl = document.getElementById("succ-payment");

  if (codeEl) codeEl.textContent = booking.bookingId;
  if (hotelEl) hotelEl.textContent = booking.hotelName;
  if (roomEl) roomEl.textContent = booking.roomType;
  if (datesEl) datesEl.textContent = `${typeof formatDateDisplay === 'function' ? formatDateDisplay(booking.checkin) : booking.checkin} - ${typeof formatDateDisplay === 'function' ? formatDateDisplay(booking.checkout) : booking.checkout} (${booking.nights} đêm)`;
  if (totalEl) totalEl.textContent = booking.totalPrice;
  if (paymentEl) paymentEl.textContent = booking.paymentMethod;

  modal.classList.add("active");
}

function openMyBookingsModal() {
  const modal = document.getElementById("my-bookings-modal");
  const listContainer = document.getElementById("my-bookings-list");
  if (!modal || !listContainer) return;

  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

  if (!currentUser) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" stroke-width="1.8" style="margin: 0 auto 12px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        <h4 style="font-size: 1.1rem; font-weight: 800; color: #1c2430; margin-bottom: 6px;">Vui lòng đăng nhập</h4>
        <p style="font-size: 0.88rem; color: #718096; margin-bottom: 16px;">Đăng nhập để xem danh sách các phòng quý khách đã đặt.</p>
        <button type="button" class="btn btn-primary" onclick="closeModal('my-bookings-modal'); openAuthModal('login');">Đăng Nhập Ngay</button>
      </div>
    `;
    modal.classList.add("active");
    return;
  }

  const bookings = currentUser.bookings || [];

  if (bookings.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" stroke-width="1.8" style="margin: 0 auto 12px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        <h4 style="font-size: 1.1rem; font-weight: 800; color: #1c2430; margin-bottom: 6px;">Bạn chưa có đặt chỗ nào</h4>
        <p style="font-size: 0.88rem; color: #718096; margin-bottom: 16px;">Tất cả các phòng bạn đặt tại Lotte Hotel và đối tác Hà Nội sẽ xuất hiện tại đây.</p>
        <button type="button" class="btn btn-primary" onclick="closeModal('my-bookings-modal');">Tìm phòng ngay</button>
      </div>
    `;
  } else {
    listContainer.innerHTML = bookings.map(b => `
      <div class="my-booking-card">
        <img src="${b.hotelImage}" alt="${b.hotelName}" class="my-booking-img">
        <div class="my-booking-details">
          <div class="my-booking-header">
            <span class="booking-code-badge">${b.bookingId}</span>
            <span class="booking-status-tag">${b.status}</span>
          </div>
          <h4 style="font-size: 1.05rem; font-weight: 800; color: #1c2430; margin: 4px 0 2px;">${b.hotelName}</h4>
          <div style="font-size: 0.85rem; font-weight: 700; color: #0194f3;">🛏️ ${b.roomType}</div>
          <div class="my-booking-dates">📅 ${typeof formatDateDisplay === 'function' ? formatDateDisplay(b.checkin) : b.checkin} - ${typeof formatDateDisplay === 'function' ? formatDateDisplay(b.checkout) : b.checkout} (${b.nights} đêm)</div>
          <div style="font-size: 0.78rem; color: #718096;">👥 ${b.guests || 'Theo yêu cầu'} &bull; 💳 ${getClientBookingPaymentLabel(b)}</div>
          <div class="my-booking-price">${b.totalPrice}</div>
          ${b.customerNotice ? `<div style="margin:8px 0;padding:10px 12px;border-radius:8px;background:${b.customerNotice.type === 'payment_confirmed' ? '#ecfdf5' : '#eff6ff'};border:1px solid ${b.customerNotice.type === 'payment_confirmed' ? '#a7f3d0' : '#bfdbfe'};color:#1e293b;font-size:.83rem;"><strong>${b.customerNotice.title || 'Thông báo từ khách sạn'}</strong><div style="margin-top:4px;line-height:1.5;">${b.customerNotice.message || ''}</div></div>` : ''}
          ${b.status === 'Chờ thanh toán' ? `<div style="margin:8px 0;padding:10px 12px;border-radius:8px;background:#fff7ed;color:#9a3412;font-size:.82rem;">${b.paymentSubmittedAt ? (b.paymentPlan === 'deposit_30_cash_at_hotel' ? 'Bạn đã gửi yêu cầu xác nhận cọc 30%. Vui lòng chờ admin đối chiếu khoản cọc.' : 'Bạn đã gửi yêu cầu thanh toán. Vui lòng chờ admin kiểm tra giao dịch.') : (b.paymentPlan === 'deposit_30_cash_at_hotel' || (!b.paymentPlan && String(b.paymentMethod || '').toLowerCase().includes('khách sạn')) ? 'Khách sạn đã xác nhận còn phòng. Bạn cần cọc 30% online trong vòng 24 giờ; 70% còn lại thanh toán tiền mặt tại quầy.' : 'Khách sạn đã xác nhận còn phòng. Bạn cần thanh toán trong vòng 24 giờ.')}</div>${b.paymentSubmittedAt ? '' : `<button type="button" class="btn btn-primary" style="margin:0 6px 8px 0;" onclick="openBookingPayment('${b.bookingId}')">${b.paymentPlan === 'deposit_30_cash_at_hotel' || (!b.paymentPlan && String(b.paymentMethod || '').toLowerCase().includes('khách sạn')) ? 'Thanh toán cọc 30% bằng QR' : 'Thanh toán online bằng QR'}</button>`}` : ''}
          ${b.status === 'Đã cọc 30% - chờ nhận phòng' && b.roomNumber ? `<div style="margin:8px 0;padding:10px 12px;border-radius:8px;background:#ccfbf1;color:#115e59;font-size:.85rem;"><strong>Đã xác nhận cọc 30%: ${typeof formatVND === 'function' ? formatVND(b.depositAmount || 0) : Number(b.depositAmount || 0).toLocaleString('vi-VN') + '₫'}</strong><br><strong>Phòng đã xếp: ${b.roomNumber}</strong> · Tầng ${b.floor || '—'}<br>Còn thanh toán tiền mặt tại quầy: <strong>${typeof formatVND === 'function' ? formatVND(b.remainingAmount || 0) : Number(b.remainingAmount || 0).toLocaleString('vi-VN') + '₫'}</strong></div>` : ''}
          ${b.status === 'Đã thanh toán - chờ nhận phòng' && b.roomNumber ? `<div style="margin:8px 0;padding:10px 12px;border-radius:8px;background:#ecfdf5;color:#065f46;font-size:.85rem;"><strong>Phòng đã xếp: ${b.roomNumber}</strong> · Tầng ${b.floor || '—'}${b.cashBalancePaidAt ? '<br>Đã thu đủ tiền phòng (cọc online + tiền mặt tại quầy).' : ''}</div>` : ''}
          <div class="my-booking-actions"><a class="my-booking-detail-btn" href="booking-detail.html?bookingId=${encodeURIComponent(b.bookingId)}"><span aria-hidden="true">▤</span> Xem chi tiết đặt phòng</a> <button type="button" class="btn-cancel-booking" onclick="handleCancelBooking('${b.bookingId}')">Hủy đặt phòng</button></div>
        </div>
      </div>
    `).join('');
  }

  modal.classList.add("active");
}

function openBookingPayment(bookingId) {
  const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  const booking = (user && Array.isArray(user.bookings) ? user.bookings : []).find(b => b.bookingId === bookingId);
  if (!booking) { alert('Không tìm thấy đơn đặt phòng trong tài khoản của bạn.'); return; }
  if (booking.status !== 'Chờ thanh toán') {
    alert('Bạn chỉ có thể thanh toán sau khi admin xác nhận còn phòng.');
    return;
  }
  localStorage.setItem('lotte_selected_payment_booking', JSON.stringify(booking));
  window.location.href = 'payment.html?bookingId=' + encodeURIComponent(bookingId);
}

// Khi admin cập nhật đơn từ tab khác, làm mới danh sách nếu modal đặt chỗ đang mở.
window.addEventListener('storage', function (event) {
  if (event.key === 'traveloka_hotel_users' || event.key === 'traveloka_all_bookings') {
    const modal = document.getElementById('my-bookings-modal');
    if (modal && modal.classList.contains('active')) openMyBookingsModal();
  }
});

function getClientBookingPaymentLabel(booking) {
  if (!booking) return "Chưa chọn";
  if (booking.paymentSubmittedType === "deposit_30_percent" || booking.paymentPlan === "deposit_30_cash_at_hotel") return "Cọc 30% online · 70% tại quầy";
  if (booking.paymentSubmittedType === "full_payment" || booking.paymentPlan === "full_online_qr") return "Thanh toán 100% online";
  const method = String(booking.paymentMethod || "").toLowerCase();
  if (method.includes("cọc 30%")) return "Cọc 30% online · 70% tại quầy";
  if (method.includes("100% online")) return "Thanh toán 100% online";
  return booking.status === "Chờ admin xác nhận" || booking.status === "Chờ thanh toán"
    ? "Chọn ở bước thanh toán" : (booking.paymentMethod || "Chưa chọn");
}

function showBookingDetails(bookingId) {
  window.location.href = "booking-detail.html?bookingId=" + encodeURIComponent(bookingId);
}

function handleCancelBooking(bookingId) {
  if (confirm(`Bạn có chắc chắn muốn hủy đặt phòng có mã ${bookingId}?`)) {
    if (typeof cancelUserBooking === 'function') {
      const res = cancelUserBooking(bookingId);
      if (typeof showToast === 'function') showToast(res.message);
      if (typeof updateBadges === 'function') updateBadges();
      openMyBookingsModal();
    }
  }
}

// KHỞI CHẠY TẤT CẢ CÁC ĐẦU VIỆC CỦA THÀNH VIÊN 3
function initPart3Booking() {
  console.log("✓ [Thành viên 3] Khởi chạy Tìm kiếm & Đặt phòng (STT 21-30)");
  initDateSelectors();
  initGuestCounter();
  initDestinationSelector();
  initHotelFilterTabs();
  initSearchSubmit();
}
