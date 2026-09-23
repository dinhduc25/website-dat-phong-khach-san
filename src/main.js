import './style.css'
import heroImg from './assets/hero.png'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Traveloka - Đặt phòng khách sạn giá rẻ, uy tín & ưu đãi tốt nhất</title>
  <meta name="description" content="Tìm và đặt phòng khách sạn giá rẻ tại Traveloka. Hơn 500.000 khách sạn, resort, biệt thự và homestay với giá cuối cùng minh bạch, không phí ẩn.">
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏨</text></svg>">
</head>
<body>

  <!-- HEADER -->
  <header class="site-header">
    <div class="container">
      <div class="header-top">
        <a href="#" class="brand-logo">
          <div class="brand-badge-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 10V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"></path>
              <path d="M21 15v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5"></path>
              <path d="M2 13h20"></path>
              <circle cx="7" cy="8" r="1.5"></circle>
              <path d="M12 8h6"></path>
            </svg>
          </div>
          <div class="brand-title">
            <span class="brand-main">Lotte<span>hotel</span></span>
            <span class="brand-sub">Đặt phòng khách sạn</span>
          </div>
        </a>

        <nav class="header-nav">
          <a href="#promotions-section" class="nav-link has-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
            Khuyến mãi khách sạn
            <span class="nav-tag-badge">HOT</span>
          </a>
          <a href="#" class="nav-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <polyline points="17 11 19 13 23 9"></polyline>
            </svg>
            Hợp tác khách sạn
          </a>
          <a href="#" class="nav-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            Đã lưu
          </a>
          <a href="#" class="nav-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Đặt chỗ của tôi
          </a>
        </nav>

        <div class="header-actions">
          <button class="btn btn-outline" type="button">Đăng nhập</button>
          <button class="btn btn-primary" type="button">Đăng ký</button>
        </div>
      </div>
    </div>

    <!-- Category Subnav -->
    <div class="subnav-bar">
      <div class="container">
        <ul class="subnav-list">
          <li class="subnav-item active">
            <a href="#featured-hotels-section">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"></path>
              </svg>
              Khách sạn
            </a>
          </li>
          <li class="subnav-item">
            <a href="#featured-hotels-section">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="4" y="2" width="16" height="20" rx="2"></rect>
                <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"></path>
              </svg>
              Căn hộ dịch vụ
            </a>
          </li>
          <li class="subnav-item">
            <a href="#featured-hotels-section">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Biệt thự & Resort
            </a>
          </li>
          <li class="subnav-item">
            <a href="#featured-hotels-section">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              Homestay & Khách sạn mini
            </a>
          </li>
          <li class="subnav-item">
            <a href="#promotions-section">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              Ưu đãi chớp nhoáng
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>

  <!-- HERO -->
  <section class="hero-wrapper">
    <div class="hero-pattern"></div>
    <div class="container">
      <div class="hero-header">
        <div class="hero-chip">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          Cam kết giá tốt nhất - Giá cuối cùng minh bạch
        </div>
        <h1 class="hero-title">Tìm & Đặt phòng khách sạn lý tưởng</h1>
        <p class="hero-subtitle">Khám phá hơn 500.000 khách sạn, khu nghỉ dưỡng và căn hộ sang trọng với ưu đãi tiết kiệm tới 40%</p>
      </div>
    </div>
  </section>

  <!-- SEARCH WIDGET -->
  <section class="search-widget-container">
    <div class="container">
      <div class="search-card">
        <div class="search-category-tabs">
          <button type="button" class="cat-tab-btn active">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11"></path>
            </svg>
            Khách sạn & Khu nghỉ dưỡng
          </button>
          <button type="button" class="cat-tab-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="4" y="2" width="16" height="20" rx="2"></rect>
              <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01"></path>
            </svg>
            Căn hộ & Biệt thự
          </button>
          <button type="button" class="cat-tab-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Khách sạn đã xem gần đây
          </button>
        </div>

        <form class="search-form-grid" onsubmit="return false;">
          <!-- 1. Destination -->
          <div class="search-field-box" id="destination-box">
            <div class="field-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Thành phố, địa điểm hoặc tên khách sạn
            </div>
            <div class="field-value-line">
              <input type="text" id="destination-input" class="field-input" placeholder="Bạn muốn nghỉ ngơi ở đâu?" value="Đà Lạt, Lâm Đồng" autocomplete="off">
            </div>
            <div class="field-subtext">Hơn 1.500 chỗ nghỉ có sẵn</div>

            <!-- Destination Suggestions Popup -->
            <div class="dest-suggestions-popup" id="dest-suggestions-popup">
              <div class="popup-heading">Điểm đến thịnh hành</div>
              <div class="suggestion-item" data-city="Đà Lạt, Lâm Đồng">
                <div class="sugg-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div class="sugg-text">
                  <h5>Đà Lạt</h5>
                  <p>Lâm Đồng, Việt Nam &bull; 1.520 khách sạn</p>
                </div>
              </div>
              <div class="suggestion-item" data-city="Vũng Tàu, Bà Rịa - Vũng Tàu">
                <div class="sugg-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div class="sugg-text">
                  <h5>Vũng Tàu</h5>
                  <p>Bà Rịa - Vũng Tàu, Việt Nam &bull; 980 khách sạn</p>
                </div>
              </div>
              <div class="suggestion-item" data-city="Đà Nẵng">
                <div class="sugg-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div class="sugg-text">
                  <h5>Đà Nẵng</h5>
                  <p>Miền Trung, Việt Nam &bull; 2.100 khách sạn</p>
                </div>
              </div>
              <div class="suggestion-item" data-city="Phú Quốc, Kiên Giang">
                <div class="sugg-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div class="sugg-text">
                  <h5>Phú Quốc</h5>
                  <p>Kiên Giang, Việt Nam &bull; 850 resort & khách sạn</p>
                </div>
              </div>
              <div class="suggestion-item" data-city="Nha Trang, Khánh Hòa">
                <div class="sugg-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div class="sugg-text">
                  <h5>Nha Trang</h5>
                  <p>Khánh Hòa, Việt Nam &bull; 1.340 khách sạn</p>
                </div>
              </div>
              <div class="suggestion-item" data-city="Sa Pa, Lào Cai">
                <div class="sugg-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div class="sugg-text">
                  <h5>Sa Pa</h5>
                  <p>Lào Cai, Việt Nam &bull; 680 khách sạn & homestay</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Date Selection -->
          <div class="search-field-box">
            <div class="field-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Nhận phòng &bull; Trả phòng
            </div>
            <div class="field-value-line" style="gap: 8px;">
              <input type="date" id="checkin-date" class="field-input" style="width: 48%; cursor: pointer;">
              <input type="date" id="checkout-date" class="field-input" style="width: 48%; cursor: pointer;">
            </div>
            <div class="field-subtext" style="display: flex; justify-content: space-between; align-items: center;">
              <span>Khoảng thời gian nghỉ</span>
              <span class="nights-badge" id="nights-count">2 đêm</span>
            </div>
          </div>

          <!-- 3. Guest & Room Selector -->
          <div class="search-field-box" id="guest-field-box">
            <div class="field-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Số khách và Phòng
            </div>
            <div class="field-value-line">
              <div class="field-input" id="guest-summary-text" style="cursor: pointer;">2 người lớn, 0 trẻ em, 1 phòng</div>
            </div>
            <div class="field-subtext">Nhấn để thay đổi số lượng</div>

            <div class="guest-popup" id="guest-popup">
              <div class="guest-row">
                <div class="guest-info">
                  <h4>Người lớn</h4>
                  <p>Từ 12 tuổi trở lên</p>
                </div>
                <div class="counter-btns">
                  <button type="button" class="btn-round" id="btn-minus-adults">&minus;</button>
                  <span class="counter-count" id="val-adults">2</span>
                  <button type="button" class="btn-round" id="btn-plus-adults">&plus;</button>
                </div>
              </div>

              <div class="guest-row">
                <div class="guest-info">
                  <h4>Trẻ em</h4>
                  <p>Dưới 12 tuổi</p>
                </div>
                <div class="counter-btns">
                  <button type="button" class="btn-round" id="btn-minus-children">&minus;</button>
                  <span class="counter-count" id="val-children">0</span>
                  <button type="button" class="btn-round" id="btn-plus-children">&plus;</button>
                </div>
              </div>

              <div class="guest-row">
                <div class="guest-info">
                  <h4>Số phòng</h4>
                  <p>Số phòng cần đặt</p>
                </div>
                <div class="counter-btns">
                  <button type="button" class="btn-round" id="btn-minus-rooms">&minus;</button>
                  <span class="counter-count" id="val-rooms">1</span>
                  <button type="button" class="btn-round" id="btn-plus-rooms">&plus;</button>
                </div>
              </div>

              <div class="guest-popup-footer">
                <button type="button" class="btn btn-primary" id="btn-apply-guests" style="padding: 6px 16px; font-size: 0.85rem;">Xong</button>
              </div>
            </div>
          </div>

          <!-- 4. Submit Button -->
          <button type="button" class="btn-search-main" id="btn-search-hotels">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Tìm khách sạn</span>
          </button>
        </form>

        <div class="search-bottom-options">
          <div class="filter-checks">
            <label class="filter-checkbox">
              <input type="checkbox" id="work-trip">
              <span>Tôi đi công tác</span>
            </label>
            <label class="filter-checkbox">
              <input type="checkbox" id="pay-at-hotel">
              <span>Thanh toán tại khách sạn</span>
            </label>
            <label class="filter-checkbox">
              <input type="checkbox" id="free-cancel">
              <span>Miễn phí hủy phòng</span>
            </label>
          </div>

          <div class="quick-search-tags">
            <span class="quick-label">Điểm đến gợi ý:</span>
            <button type="button" class="city-pill">Đà Lạt</button>
            <button type="button" class="city-pill">Vũng Tàu</button>
            <button type="button" class="city-pill">Đà Nẵng</button>
            <button type="button" class="city-pill">Phú Quốc</button>
            <button type="button" class="city-pill">Nha Trang</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 1: PROMOTIONS & VOUCHERS -->
  <section class="section" id="promotions-section">
    <div class="container">
      <div class="section-top">
        <div>
          <span class="section-tag">Ưu đãi độc quyền</span>
          <h2 class="section-title">Mã giảm giá & Khuyến mãi khách sạn hot</h2>
          <p class="section-desc">Áp dụng mã voucher tại bước thanh toán để nhận thêm chiết khấu giá phòng cực hời</p>
        </div>
        <a href="#promotions-section" class="link-all">
          Xem tất cả khuyến mãi
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </a>
      </div>

      <div class="promo-grid">
        <div class="promo-ticket">
          <div class="promo-left">
            <div class="promo-percent">300K</div>
            <div class="promo-type">Giảm giá</div>
          </div>
          <div class="promo-right">
            <div>
              <h3 class="promo-title">Giảm 10% tối đa 300.000 VND</h3>
              <p class="promo-condition">Áp dụng đơn đặt phòng từ 1.800.000 VND</p>
            </div>
            <div class="promo-bottom-bar">
              <span class="coupon-code">TVLKHOTEL300</span>
              <button type="button" class="btn-copy-coupon" data-code="TVLKHOTEL300">Sao chép mã</button>
            </div>
          </div>
        </div>

        <div class="promo-ticket">
          <div class="promo-left blue-bg">
            <div class="promo-percent">20%</div>
            <div class="promo-type">Cuối tuần</div>
          </div>
          <div class="promo-right">
            <div>
              <h3 class="promo-title">Nghỉ dưỡng cuối tuần Staycation</h3>
              <p class="promo-condition">Giảm 20% cho đơn đặt thứ Sáu đến Chủ Nhật</p>
            </div>
            <div class="promo-bottom-bar">
              <span class="coupon-code">WEEKENDHOTEL</span>
              <button type="button" class="btn-copy-coupon" data-code="WEEKENDHOTEL">Sao chép mã</button>
            </div>
          </div>
        </div>

        <div class="promo-ticket">
          <div class="promo-left purple-bg">
            <div class="promo-percent">15%</div>
            <div class="promo-type">VIP Deal</div>
          </div>
          <div class="promo-right">
            <div>
              <h3 class="promo-title">Khách sạn 5 sao & Resort cao cấp</h3>
              <p class="promo-condition">Chiết khấu trực tiếp không giới hạn giá trị</p>
            </div>
            <div class="promo-bottom-bar">
              <span class="coupon-code">LUXURYSTAY15</span>
              <button type="button" class="btn-copy-coupon" data-code="LUXURYSTAY15">Sao chép mã</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 2: POPULAR DESTINATIONS -->
  <section class="section" style="padding-top: 10px;">
    <div class="container">
      <div class="section-top">
        <div>
          <span class="section-tag">Địa điểm yêu thích</span>
          <h2 class="section-title">Điểm đến hàng đầu tại Việt Nam</h2>
          <p class="section-desc">Lựa chọn các điểm dừng chân lý tưởng được hàng triệu du khách yêu thích</p>
        </div>
        <a href="#featured-hotels-section" class="link-all">
          Xem thêm điểm đến
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </a>
      </div>

      <div class="dest-grid">
        <div class="dest-card">
          <img src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=700&q=80" alt="Khách sạn Đà Lạt" class="dest-card-img" loading="lazy">
          <div class="dest-card-overlay">
            <div class="dest-badge">Xu hướng 2026</div>
            <div class="dest-card-info">
              <h3>Đà Lạt</h3>
              <p class="dest-card-accommodations">1.520 chỗ ở</p>
              <div class="dest-card-price">Giá chỉ từ 320.000 VND/đêm</div>
            </div>
          </div>
        </div>

        <div class="dest-card">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80" alt="Khách sạn Vũng Tàu" class="dest-card-img" loading="lazy">
          <div class="dest-card-overlay">
            <div class="dest-badge">Biển gần TP.HCM</div>
            <div class="dest-card-info">
              <h3>Vũng Tàu</h3>
              <p class="dest-card-accommodations">980 chỗ ở</p>
              <div class="dest-card-price">Giá chỉ từ 280.000 VND/đêm</div>
            </div>
          </div>
        </div>

        <div class="dest-card">
          <img src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=700&q=80" alt="Khách sạn Đà Nẵng" class="dest-card-img" loading="lazy">
          <div class="dest-card-overlay">
            <div class="dest-badge">Thành phố đáng sống</div>
            <div class="dest-card-info">
              <h3>Đà Nẵng</h3>
              <p class="dest-card-accommodations">2.100 chỗ ở</p>
              <div class="dest-card-price">Giá chỉ từ 390.000 VND/đêm</div>
            </div>
          </div>
        </div>

        <div class="dest-card">
          <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=80" alt="Resort Phú Quốc" class="dest-card-img" loading="lazy">
          <div class="dest-card-overlay">
            <div class="dest-badge">Thiên đường đảo ngọc</div>
            <div class="dest-card-info">
              <h3>Phú Quốc</h3>
              <p class="dest-card-accommodations">850 chỗ ở</p>
              <div class="dest-card-price">Giá chỉ từ 550.000 VND/đêm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 3: FEATURED HOTELS -->
  <section class="section" id="featured-hotels-section">
    <div class="container">
      <div class="section-top">
        <div>
          <span class="section-tag">Khách sạn nổi bật</span>
          <h2 class="section-title">Khách sạn được đặt nhiều nhất</h2>
          <p class="section-desc">Đánh giá thực tế từ khách đã lưu trú, dịch vụ hoàn hảo và vị trí đắc địa</p>
        </div>
        <a href="#featured-hotels-section" class="link-all">
          Xem tất cả 5.000+ khách sạn
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </a>
      </div>

      <div class="hotel-filter-tabs">
        <button type="button" class="filter-tab active" data-filter="all">Tất cả đề xuất</button>
        <button type="button" class="filter-tab" data-filter="5star">Khách sạn 5 sao cao cấp</button>
        <button type="button" class="filter-tab" data-filter="beach">Gần biển & Hồ bơi</button>
        <button type="button" class="filter-tab" data-filter="flashdeal">Ưu đãi chớp nhoáng (-30%)</button>
      </div>

      <div class="hotel-grid">
        <!-- Hotel 1 -->
        <article class="hotel-item-card" data-category="5star beach flashdeal">
          <div class="hotel-thumb-box">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" alt="Vinpearl Resort & Spa Phú Quốc" class="hotel-thumb" loading="lazy">
            <span class="hotel-status-tag">Giảm 25%</span>
            <button type="button" class="btn-wishlist" title="Lưu khách sạn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
          <div class="hotel-body">
            <h3 class="hotel-name">Vinpearl Resort & Spa Phú Quốc</h3>
            <div class="stars-rating">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <div class="hotel-geo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Bãi Dài, Gành Dầu, Phú Quốc
            </div>
            <div class="hotel-score-wrap">
              <span class="score-badge">9.4</span>
              <span class="score-desc">Ấn tượng</span>
              <span class="score-total">(1.840 đánh giá)</span>
            </div>
            <div class="hotel-highlights">
              <div class="highlight-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Bao gồm bữa sáng buffet quốc tế
              </div>
              <div class="highlight-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Miễn phí hủy phòng trước 48h
              </div>
            </div>
            <div class="hotel-pricing-box">
              <div class="pricing-left">
                <span class="old-price">2.850.000 VND</span>
                <div class="main-price">2.150.000 <span>VND/đêm</span></div>
                <span class="tax-included-note">Đã bao gồm thuế & phí</span>
              </div>
              <button type="button" class="btn-book-quick">Chọn phòng</button>
            </div>
          </div>
        </article>

        <!-- Hotel 2 -->
        <article class="hotel-item-card" data-category="beach flashdeal">
          <div class="hotel-thumb-box">
            <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80" alt="Dalat Wonder Resort" class="hotel-thumb" loading="lazy">
            <span class="hotel-status-tag">Bán chạy nhất</span>
            <button type="button" class="btn-wishlist" title="Lưu khách sạn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
          <div class="hotel-body">
            <h3 class="hotel-name">Dalat Wonder Resort</h3>
            <div class="stars-rating">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <div class="hotel-geo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Hồ Tuyền Lâm, Phường 4, Đà Lạt
            </div>
            <div class="hotel-score-wrap">
              <span class="score-badge">9.1</span>
              <span class="score-desc">Tuyệt vời</span>
              <span class="score-total">(1.310 đánh giá)</span>
            </div>
            <div class="hotel-highlights">
              <div class="highlight-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                View hồ Tuyền Lâm cực chill
              </div>
              <div class="highlight-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Hồ bơi vô cực nước ấm
              </div>
            </div>
            <div class="hotel-pricing-box">
              <div class="pricing-left">
                <span class="old-price">1.600.000 VND</span>
                <div class="main-price">1.250.000 <span>VND/đêm</span></div>
                <span class="tax-included-note">Đã bao gồm thuế & phí</span>
              </div>
              <button type="button" class="btn-book-quick">Chọn phòng</button>
            </div>
          </div>
        </article>

        <!-- Hotel 3 -->
        <article class="hotel-item-card" data-category="5star beach">
          <div class="hotel-thumb-box">
            <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80" alt="TMS Hotel Da Nang Beach" class="hotel-thumb" loading="lazy">
            <span class="hotel-status-tag">Khuyên dùng</span>
            <button type="button" class="btn-wishlist" title="Lưu khách sạn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
          <div class="hotel-body">
            <h3 class="hotel-name">TMS Hotel Da Nang Beach</h3>
            <div class="stars-rating">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <div class="hotel-geo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Võ Nguyên Giáp, Mỹ Khê, Đà Nẵng
            </div>
            <div class="hotel-score-wrap">
              <span class="score-badge">9.3</span>
              <span class="score-desc">Ấn tượng</span>
              <span class="score-total">(2.420 đánh giá)</span>
            </div>
            <div class="hotel-highlights">
              <div class="highlight-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Đối diện bãi biển Mỹ Khê 50m
              </div>
              <div class="highlight-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Hồ bơi chân mây tầng thượng
              </div>
            </div>
            <div class="hotel-pricing-box">
              <div class="pricing-left">
                <span class="old-price">1.950.000 VND</span>
                <div class="main-price">1.580.000 <span>VND/đêm</span></div>
                <span class="tax-included-note">Đã bao gồm thuế & phí</span>
              </div>
              <button type="button" class="btn-book-quick">Chọn phòng</button>
            </div>
          </div>
        </article>

        <!-- Hotel 4 -->
        <article class="hotel-item-card" data-category="5star beach flashdeal">
          <div class="hotel-thumb-box">
            <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80" alt="Marina Bay Vung Tau Resort & Spa" class="hotel-thumb" loading="lazy">
            <span class="hotel-status-tag">Giảm 20%</span>
            <button type="button" class="btn-wishlist" title="Lưu khách sạn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
          <div class="hotel-body">
            <h3 class="hotel-name">Marina Bay Vung Tau Resort & Spa</h3>
            <div class="stars-rating">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <div class="hotel-geo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Đường Trần Phú, Phường 5, Vũng Tàu
            </div>
            <div class="hotel-score-wrap">
              <span class="score-badge">8.9</span>
              <span class="score-desc">Rất tốt</span>
              <span class="score-total">(980 đánh giá)</span>
            </div>
            <div class="hotel-highlights">
              <div class="highlight-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Không gian sát biển ngắm hoàng hôn
              </div>
              <div class="highlight-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Bao gồm bữa sáng & spa ưu đãi
              </div>
            </div>
            <div class="hotel-pricing-box">
              <div class="pricing-left">
                <span class="old-price">2.250.000 VND</span>
                <div class="main-price">1.820.000 <span>VND/đêm</span></div>
                <span class="tax-included-note">Đã bao gồm thuế & phí</span>
              </div>
              <button type="button" class="btn-book-quick">Chọn phòng</button>
            </div>
          </div>
        </article>

        <!-- Hotel 5 -->
        <article class="hotel-item-card" data-category="5star">
          <div class="hotel-thumb-box">
            <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80" alt="Silk Path Grand Resort & Spa Sapa" class="hotel-thumb" loading="lazy">
            <span class="hotel-status-tag">Cao cấp nhất</span>
            <button type="button" class="btn-wishlist" title="Lưu khách sạn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
          <div class="hotel-body">
            <h3 class="hotel-name">Silk Path Grand Resort & Spa Sapa</h3>
            <div class="stars-rating">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <div class="hotel-geo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              Đồi Quan 6, Thị xã Sa Pa, Lào Cai
            </div>
            <div class="hotel-score-wrap">
              <span class="score-badge">9.5</span>
              <span class="score-desc">Xuất sắc</span>
              <span class="score-total">(1.450 đánh giá)</span>
            </div>
            <div class="hotel-highlights">
              <div class="highlight-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Toàn cảnh thung lũng Mường Hoa
              </div>
              <div class="highlight-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Không gian kiến trúc Đông Dương sang trọng
              </div>
            </div>
            <div class="hotel-pricing-box">
              <div class="pricing-left">
                <span class="old-price">2.980.000 VND</span>
                <div class="main-price">2.450.000 <span>VND/đêm</span></div>
                <span class="tax-included-note">Đã bao gồm thuế & phí</span>
              </div>
              <button type="button" class="btn-book-quick">Chọn phòng</button>
            </div>
          </div>
        </article>

        <!-- Hotel 6 -->
        <article class="hotel-item-card" data-category="5star beach">
          <div class="hotel-thumb-box">
            <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80" alt="InterContinental Nha Trang" class="hotel-thumb" loading="lazy">
            <span class="hotel-status-tag">Sang trọng</span>
            <button type="button" class="btn-wishlist" title="Lưu khách sạn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
          <div class="hotel-body">
            <h3 class="hotel-name">InterContinental Nha Trang</h3>
            <div class="stars-rating">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <div class="hotel-geo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              32-34 Trần Phú, Lộc Thọ, Nha Trang
            </div>
            <div class="hotel-score-wrap">
              <span class="score-badge">9.4</span>
              <span class="score-desc">Ấn tượng</span>
              <span class="score-total">(1.720 đánh giá)</span>
            </div>
            <div class="hotel-highlights">
              <div class="highlight-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Tầm nhìn trực diện vịnh Nha Trang
              </div>
              <div class="highlight-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Dịch vụ tiêu chuẩn quốc tế IHG
              </div>
            </div>
            <div class="hotel-pricing-box">
              <div class="pricing-left">
                <span class="old-price">3.400.000 VND</span>
                <div class="main-price">2.890.000 <span>VND/đêm</span></div>
                <span class="tax-included-note">Đã bao gồm thuế & phí</span>
              </div>
              <button type="button" class="btn-book-quick">Chọn phòng</button>
            </div>
          </div>
        </article>

        <!-- Hotel 7 -->
        <article class="hotel-item-card" data-category="flashdeal">
          <div class="hotel-thumb-box">
            <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80" alt="La Siesta Classic Ma May Hanoi" class="hotel-thumb" loading="lazy">
            <span class="hotel-status-tag">Phố Cổ</span>
            <button type="button" class="btn-wishlist" title="Lưu khách sạn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
          <div class="hotel-body">
            <h3 class="hotel-name">La Siesta Classic Ma May Hotel</h3>
            <div class="stars-rating">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <div class="hotel-geo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              94 Mã Mây, Hàng Buồm, Hoàn Kiếm, Hà Nội
            </div>
            <div class="hotel-score-wrap">
              <span class="score-badge">9.6</span>
              <span class="score-desc">Xuất sắc</span>
              <span class="score-total">(2.890 đánh giá)</span>
            </div>
            <div class="hotel-highlights">
              <div class="highlight-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Đi bộ đến Hồ Hoàn Kiếm 5 phút
              </div>
              <div class="highlight-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Bữa sáng món ăn truyền thống Hà Nội
              </div>
            </div>
            <div class="hotel-pricing-box">
              <div class="pricing-left">
                <span class="old-price">1.800.000 VND</span>
                <div class="main-price">1.450.000 <span>VND/đêm</span></div>
                <span class="tax-included-note">Đã bao gồm thuế & phí</span>
              </div>
              <button type="button" class="btn-book-quick">Chọn phòng</button>
            </div>
          </div>
        </article>

        <!-- Hotel 8 -->
        <article class="hotel-item-card" data-category="5star">
          <div class="hotel-thumb-box">
            <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80" alt="The Reverie Saigon" class="hotel-thumb" loading="lazy">
            <span class="hotel-status-tag">Đẳng cấp hoàng gia</span>
            <button type="button" class="btn-wishlist" title="Lưu khách sạn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
          <div class="hotel-body">
            <h3 class="hotel-name">The Reverie Saigon Hotel</h3>
            <div class="stars-rating">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <div class="hotel-geo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              22-36 Nguyễn Huệ, Bến Nghé, Quận 1, TP. HCM
            </div>
            <div class="hotel-score-wrap">
              <span class="score-badge">9.7</span>
              <span class="score-desc">Xuất sắc</span>
              <span class="score-total">(1.980 đánh giá)</span>
            </div>
            <div class="hotel-highlights">
              <div class="highlight-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Phố đi bộ Nguyễn Huệ & sông Sài Gòn
              </div>
              <div class="highlight-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Nội thất thiết kế Ý sang trọng bậc nhất
              </div>
            </div>
            <div class="hotel-pricing-box">
              <div class="pricing-left">
                <span class="old-price">5.200.000 VND</span>
                <div class="main-price">4.200.000 <span>VND/đêm</span></div>
                <span class="tax-included-note">Đã bao gồm thuế & phí</span>
              </div>
              <button type="button" class="btn-book-quick">Chọn phòng</button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- SECTION 4: ACCOMMODATION TYPES -->
  <section class="section" style="padding-top: 10px;">
    <div class="container">
      <div class="section-top">
        <div>
          <span class="section-tag">Đa dạng lựa chọn</span>
          <h2 class="section-title">Khám phá theo loại hình chỗ ở</h2>
          <p class="section-desc">Từ căn hộ ấm cúng đến khu nghỉ dưỡng 5 sao sang trọng phục vụ mọi nhu cầu chuyến đi</p>
        </div>
      </div>

      <div class="types-grid">
        <div class="type-card">
          <div class="type-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"></path>
            </svg>
          </div>
          <h3>Khách sạn cao cấp</h3>
          <p>Hơn 120.000 khách sạn đầy đủ tiện nghi, vị trí trung tâm</p>
        </div>

        <div class="type-card">
          <div class="type-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
            </svg>
          </div>
          <h3>Resort nghỉ dưỡng</h3>
          <p>Khu nghỉ dưỡng ven biển & núi non có hồ bơi riêng biệt</p>
        </div>

        <div class="type-card">
          <div class="type-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="4" y="2" width="16" height="20" rx="2"></rect>
              <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"></path>
            </svg>
          </div>
          <h3>Căn hộ dịch vụ</h3>
          <p>Không gian rộng rãi, bếp nấu ăn, phù hợp gia đình dài ngày</p>
        </div>

        <div class="type-card">
          <div class="type-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <h3>Biệt thự & Homestay</h3>
          <p>Biệt thự nguyên căn riêng tư, homestay bản địa độc đáo</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 5: WHY US -->
  <section class="section why-us-section">
    <div class="container">
      <div class="section-top" style="text-align: center; display: block; margin-bottom: 40px;">
        <span class="section-tag">Ưu thế vượt trội</span>
        <h2 class="section-title">Tại sao nên đặt phòng tại Traveloka Hotel?</h2>
        <p class="section-desc">Mang đến trải nghiệm đặt phòng thuận tiện, an tâm và tiết kiệm nhất cho chuyến du lịch của bạn</p>
      </div>

      <div class="reasons-grid">
        <div class="reason-box">
          <div class="reason-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
          </div>
          <div class="reason-content">
            <h4>Giá minh bạch, không phí ẩn</h4>
            <p>Giá hiển thị luôn là giá thanh toán cuối cùng đã gồm mọi thuế phí, không phụ thu bất ngờ.</p>
          </div>
        </div>

        <div class="reason-box">
          <div class="reason-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
          </div>
          <div class="reason-content">
            <h4>Thanh toán an toàn, linh hoạt</h4>
            <p>Đa dạng hình thức: Thẻ Visa, VietQR, Ví MoMo, ZaloPay, hoặc trả tiền sau khi nhận phòng.</p>
          </div>
        </div>

        <div class="reason-box">
          <div class="reason-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div class="reason-content">
            <h4>Xác nhận phòng tức thì</h4>
            <p>Phiếu xác nhận điện tử được gửi ngay về email và SMS chỉ trong vòng 60 giây sau khi đặt.</p>
          </div>
        </div>

        <div class="reason-box">
          <div class="reason-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div class="reason-content">
            <h4>Chăm sóc khách hàng 24/7</h4>
            <p>Đội ngũ chuyên viên hỗ trợ người Việt trực tuyến 24/7 giải quyết mọi yêu cầu phát sinh.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 6: NEWSLETTER & APP BANNER -->
  <section class="container">
    <div class="newsletter-banner">
      <div class="banner-left">
        <h2 class="banner-title">Nhận ngay ưu đãi giảm 150.000 VND</h2>
        <p class="banner-desc">Đăng ký email để nhận mã giảm giá phòng độc quyền và các chương trình Flash Sale hàng tuần của Traveloka Hotel.</p>
        <form class="banner-form" onsubmit="event.preventDefault(); alert('Cảm ơn bạn đã đăng ký nhận bản tin khuyến mãi khách sạn!');">
          <input type="email" class="banner-input" placeholder="Nhập địa chỉ email của bạn..." required>
          <button type="submit" class="btn btn-accent" style="white-space: nowrap;">Đăng ký ngay</button>
        </form>
      </div>
      <div class="banner-right">
        <div class="qr-box">
          <div class="qr-placeholder">
            <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="#0070ba" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
              <path d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01"></path>
            </svg>
          </div>
          <div class="qr-text">Quét mã tải App</div>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-columns">
        <div class="footer-col footer-col-brand">
          <h3>traveloka<span>hotel</span></h3>
          <p>Nền tảng đặt phòng khách sạn trực tuyến hàng đầu, mang đến hàng trăm nghìn chỗ ở tuyệt vời với mức giá tối ưu và dịch vụ chăm sóc tận tâm.</p>
          <h4>Phương thức thanh toán an toàn</h4>
          <div class="payment-tags-wrap">
            <span class="pay-badge">Visa</span>
            <span class="pay-badge">Mastercard</span>
            <span class="pay-badge">JCB</span>
            <span class="pay-badge">VietQR</span>
            <span class="pay-badge">Ví MoMo</span>
            <span class="pay-badge">ZaloPay</span>
          </div>
        </div>

        <div class="footer-col">
          <h4>Về Traveloka Hotel</h4>
          <ul class="footer-links-list">
            <li><a href="#">Cách đặt chỗ</a></li>
            <li><a href="#">Liên hệ chúng tôi</a></li>
            <li><a href="#">Trung tâm trợ giúp 24/7</a></li>
            <li><a href="#">Tuyển dụng</a></li>
            <li><a href="#">Chính sách quyền riêng tư</a></li>
            <li><a href="#">Điều khoản sử dụng</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Dành cho đối tác</h4>
          <ul class="footer-links-list">
            <li><a href="#">Đăng ký khách sạn của bạn</a></li>
            <li><a href="#">Cổng quản lý đối tác (TERA)</a></li>
            <li><a href="#">Chương trình liên kết (Affiliate)</a></li>
            <li><a href="#">Quảng cáo trên Traveloka</a></li>
            <li><a href="#">Quy định dành cho chủ nhà</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Khách sạn theo địa danh</h4>
          <ul class="footer-links-list">
            <li><a href="#">Khách sạn Đà Lạt</a></li>
            <li><a href="#">Khách sạn Vũng Tàu</a></li>
            <li><a href="#">Khách sạn Đà Nẵng</a></li>
            <li><a href="#">Khách sạn Phú Quốc</a></li>
            <li><a href="#">Khách sạn Nha Trang</a></li>
            <li><a href="#">Khách sạn Hà Nội & TP.HCM</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-legal-bottom">
        <p>&copy; 2026 Traveloka Hotel Services Pte. Ltd. Giữ toàn bộ bản quyền.</p>
        <p>Giấy chứng nhận đăng ký kinh doanh & thương mại điện tử cấp bởi Bộ Công Thương.</p>
      </div>
    </div>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>

`

setupCounter(document.querySelector('#counter'))
