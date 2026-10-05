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

// STT 11 & 12: DANH SÁCH DỮ LIỆU KHÁCH SẠN QUANH KHU VỰC HÀ NỘI
const HANOI_HOTELS_DATA = [
  {
    id: "lotte-hotel-hanoi",
    name: "Lotte Hotel Hanoi (Khách sạn 5 sao cao cấp)",
    stars: 5,
    category: "5star badinh",
    district: "Ba Đình",
    address: "54 Liễu Giai, Phường Cống Vị, Quận Ba Đình, Hà Nội",
    score: 9.6,
    scoreText: "Xuất sắc",
    reviews: 3240,
    price: 2750000,
    oldPrice: 4200000,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=650&q=80",
    tag: "ĐẶC QUYỀN LOTTE",
    isLotte: true,
    maxGuests: 4,
    description: "Tọa lạc từ tầng 33 đến 64 của tòa nhà Lotte Center Hanoi danh tiếng, Lotte Hotel Hanoi là biểu tượng của sự sang trọng, đẳng cấp và lòng hiếu khách chuẩn Hàn Quốc kết hợp nét văn hóa truyền thống Việt Nam.",
    amenities: [
      "Tòa tháp Lotte Center 65 tầng view toàn cảnh Hà Nội",
      "Bao gồm buffet sáng chuẩn 5 sao quốc tế",
      "Hồ bơi bốn mùa trong nhà và ngoài trời",
      "Miễn phí hủy phòng trước 24h"
    ],
    roomTypes: [
      { name: "Deluxe King City View (Tầng 38-50)", extraPrice: 0, desc: "Diện tích 42m², Giường King, ngắm nhìn toàn cảnh thành phố" },
      { name: "Premier Lake View ngắm Hồ Tây (Tầng 51-60)", extraPrice: 450000, desc: "Diện tích 48m², cửa kính panorama trực diện Hồ Tây" },
      { name: "Club Junior Suite đặc quyền Lounge", extraPrice: 1100000, desc: "Diện tích 65m², bao gồm trà chiều và tiệc tối tại Club Lounge" },
      { name: "Presidential Luxury Suite 5 sao", extraPrice: 3200000, desc: "Diện tích 140m², quản gia riêng, nội thất vương giả cao cấp" }
    ]
  },
  {
    id: "pan-pacific-hanoi",
    name: "Pan Pacific Hanoi",
    stars: 5,
    category: "5star badinh tayho",
    district: "Ba Đình",
    address: "Số 1 Đường Thanh Niên, Quận Ba Đình, Hà Nội",
    score: 9.3,
    scoreText: "Tuyệt vời",
    reviews: 1890,
    price: 2190000,
    oldPrice: 3100000,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=650&q=80",
    tag: "VIEW HỒ TÂY",
    maxGuests: 3,
    description: "Khách sạn 5 sao có tầm nhìn ôm trọn Hồ Tây, Hồ Trúc Bạch và Sông Hồng, nằm ngay trên con đường Thanh Niên thơ mộng nhất thủ đô.",
    amenities: [
      "View panorama ôm trọn Hồ Tây và Hồ Trúc Bạch",
      "The Summit Bar tầng thượng sành điệu nhất Hà Nội",
      "Bể bơi mái vòm bốn mùa hiện đại",
      "Miễn phí bữa sáng cho 2 khách"
    ],
    roomTypes: [
      { name: "Deluxe Room", extraPrice: 0, desc: "Diện tích 35m², ban công ngắm phố phường" },
      { name: "Premier Lake View", extraPrice: 380000, desc: "Diện tích 40m², tầm nhìn bao quát Hồ Tây" },
      { name: "Pacific Club Suite", extraPrice: 900000, desc: "Diện tích 60m², quyền lợi phòng chờ cao cấp" }
    ]
  },
  {
    id: "intercon-westlake",
    name: "InterContinental Hanoi Westlake",
    stars: 5,
    category: "5star tayho",
    district: "Tây Hồ",
    address: "05 Từ Hoa, Phường Quảng An, Quận Tây Hồ, Hà Nội",
    score: 9.5,
    scoreText: "Ấn tượng",
    reviews: 2780,
    price: 3200000,
    oldPrice: 4500000,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=650&q=80",
    tag: "RESORT NƯỚC HỒ TÂY",
    maxGuests: 4,
    description: "Khu nghỉ dưỡng nổi độc đáo nằm ngay trên mặt nước Hồ Tây tĩnh lặng, đem lại cảm giác bình yên thư thái giữa lòng thủ đô tấp nập.",
    amenities: [
      "Khu nghỉ dưỡng pavilions xây hoàn toàn trên mặt nước",
      "Sunset Bar lãng mạn ngắm hoàng hôn đẹp nhất thủ đô",
      "Không gian thanh bình, tách biệt khỏi ồn ào phố thị",
      "Bao gồm buffet sáng cao cấp"
    ],
    roomTypes: [
      { name: "Classic Westlake View", extraPrice: 0, desc: "Diện tích 43m², sàn gỗ tự nhiên, ban công riêng" },
      { name: "Overwater Pavilion Suite", extraPrice: 650000, desc: "Diện tích 52m², phòng nổi trên mặt nước Hồ Tây" },
      { name: "Lotus Grand Lake Suite", extraPrice: 1500000, desc: "Diện tích 85m², phòng khách riêng biệt và bồn tắm sục" }
    ]
  },
  {
    id: "apricot-hotel-hanoi",
    name: "Apricot Hotel Hanoi",
    stars: 5,
    category: "5star boutique hoankiem",
    district: "Hoàn Kiếm",
    address: "136 Hàng Trống, Quận Hoàn Kiếm, Hà Nội",
    score: 9.4,
    scoreText: "Tuyệt hảo",
    reviews: 1520,
    price: 2650000,
    oldPrice: 3800000,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=650&q=80",
    tag: "TRỰC DIỆN HỒ GƯƠM",
    maxGuests: 3,
    description: "Khách sạn nghệ thuật 5 sao đầu tiên tại Việt Nam, nhìn thẳng ra Tháp Rùa và Hồ Hoàn Kiếm với bộ sưu tập hội họa bậc thầy.",
    amenities: [
      "Vị trí đắc địa nhất nhìn thẳng ra Tháp Rùa Hồ Hoàn Kiếm",
      "Trưng bày hơn 600 tác phẩm hội họa nguyên bản Việt Nam",
      "Hồ bơi vô cực trên tầng thượng ngắm Hồ Gươm",
      "Miễn phí hủy phòng trước 48h"
    ],
    roomTypes: [
      { name: "Sketch Room", extraPrice: 0, desc: "Diện tích 30m², phong cách tân cổ điển trang nhã" },
      { name: "Canvas Lake View", extraPrice: 500000, desc: "Diện tích 38m², cửa sổ trực diện Hồ Gươm tuyệt mỹ" },
      { name: "Masterpiece Suite", extraPrice: 1200000, desc: "Diện tích 68m², phòng tắm lát đá cẩm thạch sang trọng" }
    ]
  },
  {
    id: "la-siesta-classic-mamay",
    name: "La Siesta Classic Ma May",
    stars: 4,
    category: "boutique hoankiem",
    district: "Hoàn Kiếm",
    address: "94 Mã Mây, Phường Hàng Buồm, Quận Hoàn Kiếm, Hà Nội",
    score: 9.5,
    scoreText: "Tuyệt vời",
    reviews: 2120,
    price: 1620000,
    oldPrice: 2400000,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=650&q=80",
    tag: "TOP PHỐ CỔ",
    maxGuests: 3,
    description: "Khách sạn boutique đậm nét hoài cổ nằm ngay trong con phố Mã Mây cổ kính, nổi tiếng với dịch vụ tận tâm và nhà hàng Red Bean.",
    amenities: [
      "Nằm tại trái tim phố cổ 36 phố phường, gần chợ đêm",
      "Kiến trúc thuần Hà Nội xưa kết hợp tiện nghi cao cấp",
      "Dịch vụ ẩm thực Red Bean Restaurant nức tiếng",
      "Bao gồm buffet sáng truyền thống và phương Tây"
    ],
    roomTypes: [
      { name: "Deluxe Double", extraPrice: 0, desc: "Diện tích 28m², giường đệm cao su êm ái" },
      { name: "Junior Suite Balcony", extraPrice: 320000, desc: "Diện tích 35m², ban công ngắm nhìn phố cổ Hà Nội" },
      { name: "Family Duplex Room", extraPrice: 750000, desc: "Diện tích 50m², 2 tầng riêng biệt dành cho gia đình" }
    ]
  },
  {
    id: "the-chi-boutique",
    name: "The Chi Boutique Hotel",
    stars: 4,
    category: "boutique hoankiem",
    district: "Hoàn Kiếm",
    address: "61 Nhà Chung, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội",
    score: 9.1,
    scoreText: "Tuyệt vời",
    reviews: 980,
    price: 1150000,
    oldPrice: 1850000,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=650&q=80",
    tag: "CẠNH NHÀ THỜ LỚN",
    maxGuests: 2,
    description: "Khách sạn boutique phong cách phương Đông đương đại cách Nhà Thờ Lớn chỉ vài bước chân, xung quanh là vô số quán cà phê đẹp.",
    amenities: [
      "Cách Nhà Thờ Lớn Hà Nội chỉ 50 bước chân",
      "Phong cách thiết kế Á Đông đương đại ấm cúng",
      "Nhiều quán cafe phố cổ và ẩm thực vây quanh",
      "Miễn phí nước ngọt và bánh chào mừng"
    ],
    roomTypes: [
      { name: "Standard Queen", extraPrice: 0, desc: "Diện tích 25m², ấm cúng, thiết bị thông minh" },
      { name: "Superior Window View", extraPrice: 200000, desc: "Diện tích 28m², cửa sổ lớn đón ánh sáng tự nhiên" },
      { name: "Chi Signature Suite", extraPrice: 500000, desc: "Diện tích 42m², bồn tắm ngâm thảo mộc thư giãn" }
    ]
  },
  {
    id: "novotel-suites-hanoi",
    name: "Novotel Suites Hanoi",
    stars: 4,
    category: "apartment caugiay",
    district: "Cầu Giấy",
    address: "05 Duy Tân, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Hà Nội",
    score: 9.0,
    scoreText: "Tuyệt vời",
    reviews: 1100,
    price: 1480000,
    oldPrice: 2200000,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=650&q=80",
    tag: "CÔNG TÁC TIỆN NGHI",
    maxGuests: 4,
    description: "Mô hình khách sạn kết hợp căn hộ dịch vụ cao cấp tại trung tâm công nghệ Cầu Giấy, trang bị đầy đủ bếp và máy giặt tiện lợi.",
    amenities: [
      "Trung tâm khu công nghệ & tài chính Duy Tân - Cầu Giấy",
      "Căn hộ suite có khu vực bếp riêng, máy giặt tiện lợi",
      "Hồ bơi ngoài trời nước ấm, phòng gym 24/7",
      "Miễn phí hủy phòng trước 24h"
    ],
    roomTypes: [
      { name: "Studio Apartment King Bed", extraPrice: 0, desc: "Diện tích 38m², có bếp mini và máy giặt" },
      { name: "1-Bedroom Executive Suite", extraPrice: 400000, desc: "Diện tích 50m², phòng khách và phòng ngủ tách biệt" },
      { name: "2-Bedroom Family Suite", extraPrice: 950000, desc: "Diện tích 75m², 2 phòng ngủ, lý tưởng cho gia đình" }
    ]
  },
  {
    id: "melia-hanoi",
    name: "Melia Hanoi Hotel",
    stars: 5,
    category: "5star hoankiem",
    district: "Hoàn Kiếm",
    address: "44 Lý Thường Kiệt, Phường Trần Hưng Đạo, Quận Hoàn Kiếm, Hà Nội",
    score: 9.2,
    scoreText: "Ấn tượng",
    reviews: 1430,
    price: 2450000,
    oldPrice: 3600000,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=650&q=80",
    tag: "ĐẲNG CẤP NGOẠI GIAO",
    maxGuests: 3,
    description: "Khách sạn 5 sao mang đẳng cấp quốc tế tọa lạc ngay trung tâm ngoại giao Hà Nội, thường xuyên đón tiếp các đoàn nguyên thủ quốc gia.",
    amenities: [
      "Vị trí đắt giá gần các đại sứ quán và tòa nhà văn phòng",
      "Phòng tiệc và hội nghị tiêu chuẩn nguyên thủ quốc gia",
      "Hồ bơi ngoài trời view trung tâm thủ đô",
      "Bữa sáng tự chọn quốc tế phong phú"
    ],
    roomTypes: [
      { name: "Deluxe Double/Twin", extraPrice: 0, desc: "Diện tích 32m², tiêu chuẩn 5 sao tiện nghi" },
      { name: "The Level Grand City View", extraPrice: 600000, desc: "Diện tích 45m², đặc quyền The Level Lounge sang trọng" },
      { name: "Grand Suite Melia", extraPrice: 1400000, desc: "Diện tích 70m², phòng khách riêng biệt view toàn thành phố" }
    ]
  },
  {
    id: "amour-resort-bavi",
    name: "Amour Resort Bavi",
    stars: 4,
    category: "resort bavi",
    district: "Ba Vì",
    address: "Khu du lịch Vườn Quốc Gia Ba Vì, Huyện Ba Vì, Hà Nội",
    score: 9.3,
    scoreText: "Tuyệt hảo",
    reviews: 840,
    price: 1950000,
    oldPrice: 2900000,
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=650&q=80",
    tag: "NGHỈ DƯỠNG NÚI RỪNG",
    maxGuests: 4,
    description: "Ẩn mình giữa rừng thông bạt ngàn của Vườn Quốc Gia Ba Vì, Amour Resort là điểm đến nghỉ dưỡng hòa mình cùng thiên nhiên mát lành quanh năm.",
    amenities: [
      "Khí hậu trong lành mát mẻ quanh năm giữa rừng thông Ba Vì",
      "Bể bơi nước khoáng ấm bốn mùa giữa thiên nhiên",
      "Ẩm thực đặc sản núi rừng Tây Bắc tinh tế",
      "Miễn phí vé tham quan vườn quốc gia"
    ],
    roomTypes: [
      { name: "Alocasia Deluxe Forest View", extraPrice: 0, desc: "Diện tích 40m², view rừng thông thơ mộng" },
      { name: "Chalet Biệt Thự Gỗ Mây Ngàn", extraPrice: 650000, desc: "Diện tích 60m², nhà gỗ thông tự nhiên ấm áp" },
      { name: "Royal Villa Private Pool", extraPrice: 1800000, desc: "Diện tích 120m², biệt thự có hồ bơi nước ấm riêng" }
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
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: #fff; border-radius: 16px; border: 1px dashed #cbd5e1;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.8" style="margin: 0 auto 12px;"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
        <h4 style="font-size: 1.2rem; font-weight: 800; color: #1c2430; margin-bottom: 6px;">Không tìm thấy khách sạn phù hợp</h4>
        <p style="font-size: 0.9rem; color: #718096; margin-bottom: 16px;">Vui lòng thử điều chỉnh lại khu vực tìm kiếm hoặc số lượng khách.</p>
        <button type="button" class="btn btn-primary" onclick="if(typeof resetHotelFilters==='function') resetHotelFilters();">Xem tất cả khách sạn Hà Nội</button>
      </div>
    `;
    return;
  }

  const wishlist = typeof getUserWishlist === 'function' ? getUserWishlist() : [];

  container.innerHTML = hotels.map(hotel => {
    const isSaved = wishlist.includes(hotel.id);
    const starIcons = Array(hotel.stars).fill(`<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`).join('');
    const tagClass = hotel.isLotte ? "hotel-status-tag lotte-tag" : "hotel-status-tag";

    return `
      <article class="hotel-item-card" data-id="${hotel.id}" data-category="${hotel.category}">
        <div class="hotel-thumb-box" onclick="openHotelDetailModal('${hotel.id}')" title="Bấm để xem chi tiết phòng">
          <img src="${hotel.image}" alt="${hotel.name}" class="hotel-thumb" loading="lazy">
          <span class="${tagClass}">${hotel.tag}</span>
          <button type="button" class="btn-wishlist ${isSaved ? 'active' : ''}" data-id="${hotel.id}" title="${isSaved ? 'Đã lưu' : 'Lưu khách sạn'}" onclick="handleWishlistClick('${hotel.id}', event)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
        <div class="hotel-body">
          <div class="hotel-stars">
            ${starIcons}
          </div>
          <h3 class="hotel-name" title="${hotel.name}" onclick="openHotelDetailModal('${hotel.id}')">${hotel.name}</h3>
          <div class="hotel-geo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            ${hotel.address}
          </div>
          <div class="hotel-score-wrap">
            <span class="score-badge">${hotel.score}</span>
            <span class="score-desc">${hotel.scoreText}</span>
            <span class="score-total">(${hotel.reviews.toLocaleString()} đánh giá)</span>
          </div>
          <div class="hotel-highlights">
            ${hotel.amenities.slice(0, 2).map(amenity => `
              <div class="highlight-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ${amenity}
              </div>
            `).join('')}
          </div>
          <div class="hotel-pricing-box">
            <div class="pricing-left">
              <span class="old-price">${typeof formatVND === 'function' ? formatVND(hotel.oldPrice) : hotel.oldPrice + '₫'}</span>
              <div class="main-price">${typeof formatVND === 'function' ? formatVND(hotel.price) : hotel.price + '₫'} <span>/đêm</span></div>
              <span class="tax-included-note">Đã bao gồm thuế & phí</span>
            </div>
            <div class="card-actions-row">
              <button type="button" class="btn-view-detail" onclick="openHotelDetailModal('${hotel.id}')" title="Xem tiện nghi & các hạng phòng">Chi tiết</button>
              <button type="button" class="btn-book-quick" onclick="handleBookHotelClick('${hotel.id}')">Đặt Ngay</button>
            </div>
          </div>
        </div>
      </article>
    `;
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
            <span style="font-size: 0.75rem; font-weight: 800; color: #c5a059;">LOTTE VERIFIED</span>
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
            ⭐ Điểm đánh giá: <strong>${hotel.score}/10</strong> (${hotel.reviews.toLocaleString()} lượt khách xác nhận)
          </div>
        </div>

        <p style="font-size: 0.92rem; color: #4a5568; line-height: 1.6; margin-bottom: 16px;">
          ${hotel.description || 'Khách sạn cung cấp chỗ ở sang trọng với đầy đủ trang thiết bị tiện nghi 5 sao và dịch vụ phục vụ đẳng cấp.'}
        </p>

        <div style="font-size: 0.85rem; color: #718096; margin-bottom: 8px;">
          📍 <strong>Địa chỉ:</strong> ${hotel.address}
        </div>

        <!-- STT 14 & 19: Tiện ích & tiện nghi phòng -->
        <h4 style="font-size: 1rem; font-weight: 800; color: #1c2430; margin-top: 18px;">Tiện ích & Đặc quyền nổi bật</h4>
        <div class="detail-amenities-grid">
          ${hotel.amenities.map(a => `
            <div class="detail-amenity-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${a}</span>
            </div>
          `).join('')}
        </div>

        <!-- Danh sách các hạng phòng lựa chọn -->
        <h4 style="font-size: 1rem; font-weight: 800; color: #1c2430; margin-top: 20px;">Các Hạng Phòng Có Sẵn Tại Khách Sạn</h4>
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
                  Chọn Đặt Phòng
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
      btn.title = "Lưu khách sạn";
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

// MỞ MODAL XEM CÁC KHÁCH SẠN ĐÃ LƯU
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
        <h4 style="font-size: 1.1rem; font-weight: 800; color: #1c2430; margin-bottom: 6px;">Chưa có khách sạn nào được lưu</h4>
        <p style="font-size: 0.88rem; color: #718096; margin-bottom: 16px;">Hãy bấm biểu tượng trái tim trên các thẻ khách sạn để lưu lại và xem lại bất cứ khi nào!</p>
        <button type="button" class="btn btn-primary" onclick="closeModal('wishlist-modal');">Khám phá khách sạn ngay</button>
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
  console.log("✓ [Thành viên 2] Khởi chạy Phòng & Thông tin khách sạn (STT 11-20)");
  renderHotelsGrid(HANOI_HOTELS_DATA);
}
