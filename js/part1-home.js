/**
 * ==========================================================================
 * DỰ ÁN: LOTTE HOTEL HANOI & ĐẶT PHÒNG KHÁCH SẠN PHONG CÁCH TRAVELOKA
 * PHẦN 1: TRANG CHỦ & GIAO DIỆN CHUNG
 * PHỤ TRÁCH: THÀNH VIÊN 1
 * DANH SÁCH ĐẦU VIỆC THỰC HIỆN:
 * - STT 1: Phân tích bố cục tổng thể website & Định dạng tiền tệ/ngày tháng chung
 * - STT 2: Thiết kế Header & Xử lý hiệu ứng dính (Sticky Header)
 * - STT 3: Thiết kế Menu điều hướng & Chuyển đổi linh hoạt Tab Subnav
 * - STT 4: Thiết kế Footer & Tương tác liên kết hỗ trợ
 * - STT 5: Xây dựng giao diện Trang chủ & Khung chứa nội dung
 * - STT 6: Thiết kế Banner / Slider Hero trang chủ
 * - STT 7: Thiết kế khu vực giới thiệu nổi bật & Tính năng sao chép mã khuyến mãi
 * - STT 8: Thiết kế khu vực phòng nổi bật trên Trang chủ
 * - STT 9: Thiết kế giao diện Responsive cho Header/Footer/Trang chủ
 * - STT 10: Kiểm tra và thống nhất giao diện chung, Hệ thống Toast & Quản lý User Bar
 * ==========================================================================
 */

// STT 1: CÁC HÀM TIỆN ÍCH DÙNG CHUNG TOÀN HỆ THỐNG
function formatVND(num) {
  if (typeof num !== 'number') num = Number(num) || 0;
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

// STT 10: THỐNG NHẤT GIAO DIỆN - HỆ THỐNG TOAST THÔNG BÁO TỨC THÌ
function showToast(message) {
  let toast = document.getElementById("toast-box");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-box";
    toast.className = "toast-msg";
    document.body.appendChild(toast);
  }
  
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;
  
  toast.classList.add("show");
  
  if (window.toastTimeout) clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// STT 7: HIỂN THỊ ĐỘNG CÁC MÃ VOUCHER ĐANG HOẠT ĐỘNG TỪ LOCALSTORAGE
function renderClientPromotions() {
  const container = document.querySelector(".promo-grid");
  if (!container) return;

  let promos = [];
  try {
    const raw = localStorage.getItem("traveloka_hotel_promos");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        promos = parsed;
      }
    }
  } catch (e) {}

  if (promos.length === 0) {
    promos = [
      { id: "prm_01", code: "LOTTE500", discountType: "fixed", discountValue: 500000, minSpend: 2000000, maxDiscount: 500000, expiryDate: "2026-12-31", usageCount: 56, isActive: true },
      { id: "prm_02", code: "HANOI30", discountType: "percent", discountValue: 30, minSpend: 3000000, maxDiscount: 1000000, expiryDate: "2026-12-31", usageCount: 88, isActive: true },
      { id: "prm_03", code: "WEEKEND15", discountType: "percent", discountValue: 15, minSpend: 1500000, maxDiscount: 500000, expiryDate: "2026-12-31", usageCount: 34, isActive: true }
    ];
    try {
      localStorage.setItem("traveloka_hotel_promos", JSON.stringify(promos));
    } catch (e) {}
  }

  // Lọc chỉ lấy các voucher còn hạn và isActive !== false
  const todayStr = new Date().toISOString().split("T")[0];
  const activePromos = promos.filter(p => {
    if (p.isActive === false) return false;
    if (p.expiryDate && p.expiryDate < todayStr) return false;
    return true;
  });

  if (activePromos.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); color: #64748b;">
        <div style="font-size: 2.2rem; margin-bottom: 10px;">🎟️</div>
        <p style="font-weight: 600; font-size: 1.05rem; margin-bottom: 4px;">Hiện chưa có mã giảm giá mới</p>
        <p style="font-size: 0.88rem; color: #94a3b8;">Vui lòng quay lại sau để nhận thêm ưu đãi đặt phòng hấp dẫn!</p>
      </div>
    `;
    return;
  }

  const bgClasses = ["gold-bg", "", "blue-bg", "purple-bg"];

  container.innerHTML = activePromos.map((p, idx) => {
    const bgClass = bgClasses[idx % bgClasses.length];
    
    // Format hiển thị huy hiệu bên trái
    let displayPercent = "";
    let displayType = "";
    if (p.discountType === "percent") {
      displayPercent = `${p.discountValue}%`;
      displayType = p.discountValue >= 25 ? "VIP Club" : "Ưu đãi";
    } else {
      displayPercent = p.discountValue >= 1000000 ? `${p.discountValue / 1000000}TR` : `${Math.round(p.discountValue / 1000)}K`;
      displayType = "Trực tiếp";
    }

    // Tiêu đề khuyến mãi
    const discountText = p.discountType === "percent"
      ? `Giảm ${p.discountValue}% (Tối đa ${p.maxDiscount ? p.maxDiscount.toLocaleString('vi-VN') + '₫' : 'không giới hạn'})`
      : `Giảm ${p.discountValue.toLocaleString('vi-VN')}₫ cho đơn đặt phòng`;

    // Điều kiện áp dụng
    let conditionText = "";
    if (p.minSpend && p.minSpend > 0) {
      conditionText = `Đơn tối thiểu ${p.minSpend.toLocaleString('vi-VN')}₫`;
    } else {
      conditionText = "Áp dụng cho mọi đơn phòng";
    }
    if (p.expiryDate) {
      conditionText += ` • HSD: ${p.expiryDate}`;
    }

    return `
      <div class="promo-ticket" data-code="${p.code}">
        <div class="promo-left ${bgClass}">
          <div class="promo-percent">${displayPercent}</div>
          <div class="promo-type">${displayType}</div>
        </div>
        <div class="promo-right">
          <div>
            <h3 class="promo-title">${discountText}</h3>
            <p class="promo-condition">${conditionText}</p>
          </div>
          <div class="promo-bottom-bar">
            <span class="coupon-code">${p.code}</span>
            <div style="display: flex; gap: 6px;">
              <button type="button" class="btn-copy-coupon" data-code="${p.code}" title="Sao chép mã vào bộ nhớ tạm">
                Sao chép mã
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// STT 7: KHỞI TẠO TÍNH NĂNG SAO CHÉP MÃ KHUYẾN MÃI (PROMO VOUCHERS)
function initPromoCopy() {
  const copyBtns = document.querySelectorAll(".btn-copy-coupon");
  copyBtns.forEach(btn => {
    btn.onclick = function() {
      const code = btn.getAttribute("data-code");
      if (code) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code).then(() => {
            showToast(`Đã sao chép mã ưu đãi "${code}"! Hãy dán vào ô Voucher khi đặt phòng.`);
          }).catch(() => {
            showToast(`Mã ưu đãi của bạn: ${code}`);
          });
        } else {
          showToast(`Đã chọn mã ưu đãi: ${code}`);
        }

        // Tự động điền vào ô mã voucher trong modal đặt phòng nếu modal đang mở hoặc khi mở
        const couponInput = document.getElementById("bm-coupon-input");
        if (couponInput) {
          couponInput.value = code;
        }
      }
    };
  });
}

// STT 2 & 10: QUẢN LÝ HIỂN THỊ ĐĂNG NHẬP / HỒ SƠ NGƯỜI DÙNG TRÊN HEADER
function initAuthUI() {
  const guestActions = document.getElementById("auth-guest-actions");
  const userMenu = document.getElementById("auth-user-menu");
  const displayName = document.getElementById("user-display-name");
  const displayAvatar = document.getElementById("user-display-avatar");
  const displayEmail = document.getElementById("user-display-email");
  const dropdownName = document.getElementById("dropdown-user-name");
  const trigger = document.getElementById("user-profile-trigger");
  const dropdown = document.getElementById("user-profile-dropdown");
  const logoutBtn = document.getElementById("btn-header-logout");

  // Các nút quản trị Admin - chỉ Admin mới được nhìn thấy
  const adminNavLinks = document.querySelectorAll("#admin-nav-link");
  const adminDropdownLinks = document.querySelectorAll("#admin-dropdown-link");
  const floatingAdminButtons = document.querySelectorAll("#floating-admin-btn");

  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  const isAdmin = currentUser && typeof isAdminUser === 'function' && isAdminUser(currentUser);

  // Mặc định ẩn toàn bộ phần Admin
  adminNavLinks.forEach(el => { el.style.display = "none"; });
  adminDropdownLinks.forEach(el => { el.style.display = "none"; });
  floatingAdminButtons.forEach(el => { el.style.display = "none"; });

  // Chỉ tài khoản Admin mới được hiện phần quản trị
  if (isAdmin) {
    adminNavLinks.forEach(el => { el.style.display = "inline-flex"; });
    adminDropdownLinks.forEach(el => { el.style.display = "flex"; });
    floatingAdminButtons.forEach(el => { el.style.display = "flex"; });
  }

  if (!guestActions || !userMenu) return;

  if (currentUser) {
    guestActions.style.display = "none";
    userMenu.style.display = "block";

    const name = currentUser.name || currentUser.fullName || "Khách Hàng";
    if (displayName) displayName.textContent = name;
    if (displayAvatar) displayAvatar.textContent = name.charAt(0).toUpperCase();
    if (displayEmail) displayEmail.textContent = currentUser.email || "";
    if (dropdownName) dropdownName.textContent = name;
  } else {
    guestActions.style.display = "flex";
    userMenu.style.display = "none";
  }

  if (trigger && dropdown) {
    trigger.onclick = function(e) {
      e.stopPropagation();
      dropdown.classList.toggle("show");
    };
  }

  if (logoutBtn) {
    logoutBtn.onclick = function() {
      if (typeof logoutUser === 'function') logoutUser();
      if (dropdown) dropdown.classList.remove("show");
      initAuthUI();
      if (typeof updateBadges === 'function') updateBadges();
      if (typeof showToast === 'function') showToast("Đã đăng xuất khỏi tài khoản!");
    };
  }
}

// STT 3: CẬP NHẬT BADGE ĐẶT CHỖ & WISHLIST TRÊN MENU ĐIỀU HƯỚNG
function updateBadges() {
  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  const bookingsCountEl = document.getElementById("nav-bookings-count");
  const wishlistCountEl = document.getElementById("nav-wishlist-count");

  if (bookingsCountEl) {
    const bCount = (currentUser && currentUser.bookings) ? currentUser.bookings.length : 0;
    if (bCount > 0) {
      bookingsCountEl.style.display = "inline-flex";
      bookingsCountEl.textContent = bCount;
    } else {
      bookingsCountEl.style.display = "none";
    }
  }

  if (wishlistCountEl) {
    const wishlist = typeof getUserWishlist === 'function' ? getUserWishlist() : [];
    if (wishlist && wishlist.length > 0) {
      wishlistCountEl.style.display = "inline-flex";
      wishlistCountEl.textContent = wishlist.length;
    } else {
      wishlistCountEl.style.display = "none";
    }
  }
}

// STT 2 & 10: XỬ LÝ MỞ MODAL ĐĂNG NHẬP / ĐĂNG KÝ
function openAuthModal(mode = "login", isPromptFromBooking = false) {
  const modal = document.getElementById("auth-modal");
  const loginTab = document.getElementById("auth-tab-login");
  const regTab = document.getElementById("auth-tab-register");
  const loginForm = document.getElementById("modal-login-form");
  const regForm = document.getElementById("modal-reg-form");
  const alertBox = document.getElementById("auth-booking-alert");

  if (!modal) return;

  if (alertBox) {
    alertBox.style.display = isPromptFromBooking ? "block" : "none";
  }

  if (mode === "login") {
    if (loginTab) loginTab.classList.add("active");
    if (regTab) regTab.classList.remove("active");
    if (loginForm) loginForm.style.display = "block";
    if (regForm) regForm.style.display = "none";
  } else {
    if (loginTab) loginTab.classList.remove("active");
    if (regTab) regTab.classList.add("active");
    if (loginForm) loginForm.style.display = "none";
    if (regForm) regForm.style.display = "block";
  }

  modal.classList.add("active");
}

// STT 2: HIỆU ỨNG CUỘN TRANG HEADER (STICKY HEADER SCROLL EFFECT)
function initHeaderScrollEffect() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.04)";
    }
  });
}

// KHỞI CHẠY TẤT CẢ CÁC ĐẦU VIỆC CỦA THÀNH VIÊN 1
function initPart1Home() {
  console.log("✓ [Thành viên 1] Khởi chạy Trang chủ & Giao diện chung (STT 1-10)");
  initHeaderScrollEffect();
  renderClientPromotions();
  initPromoCopy();
  initAuthUI();
  updateBadges();
}
