/**
 * ==========================================================================
 * DỰ ÁN: LOTTE HOTEL HANOI & ĐẶT PHÒNG KHÁCH SẠN PHONG CÁCH TRAVELOKA
 * FILE ĐIỀU PHỐI CHÍNH (MASTER SCRIPT) TÍCH HỢP 4 THÀNH VIÊN
 * ==========================================================================
 * DỰ ÁN ĐÃ ĐƯỢC CHIA TÁCH THÀNH CÁC FILE CHUYÊN BIỆT THEO 4 THÀNH VIÊN:
 * 
 * 1. THÀNH VIÊN 1: js/part1-home.js
 *    - STT 1 - 10: Trang chủ & Giao diện chung (Header, Subnav, Hero, Promos, Footer, Toast, User Auth UI)
 * 
 * 2. THÀNH VIÊN 2: js/part2-rooms.js
 *    - STT 11 - 20: Phòng & Thông tin khách sạn (Dữ liệu khách sạn, Render card phòng, Modal chi tiết phòng, Wishlist)
 * 
 * 3. THÀNH VIÊN 3: js/part3-booking.js
 *    - STT 21 - 30: Tìm kiếm & Đặt phòng (Chọn ngày, Số khách, Lọc & sắp xếp, Form đặt phòng, Tính giá & Coupon)
 * 
 * 4. THÀNH VIÊN 4: js/part4-contact.js
 *    - STT 31 - 40: Liên hệ, Kiểm thử & Tích hợp (Form liên hệ & validation, Bộ kiểm thử tự động Test Suite, Đồng bộ)
 * ==========================================================================
 */

// KHỞI CHẠY TỔNG HỢP KHI TÀI NGUYÊN DOM ĐÃ SẴN SÀNG
document.addEventListener("DOMContentLoaded", () => {
  console.log("------------------------------------------------------------");
  console.log("🏨 LOTTE HOTEL HANOI - TRAVELOKA HOTEL SYSTEM STARTED");
  console.log("------------------------------------------------------------");

  if (typeof initApplicationIntegration === 'function') {
    initApplicationIntegration();
  } else {
    // Dự phòng khởi chạy tuần tự nếu nạp độc lập
    if (typeof initPart1Home === 'function') initPart1Home();
    if (typeof initPart2Rooms === 'function') initPart2Rooms();
    if (typeof initPart3Booking === 'function') initPart3Booking();
    if (typeof initContactForm === 'function') initContactForm();
    if (typeof initSharedModals === 'function') initSharedModals();
  }
});
