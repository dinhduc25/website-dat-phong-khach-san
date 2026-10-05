/**
 * ========================================================
 * LOTTE HOTEL HANOI & TRAVELOKA - ADMIN PORTAL SCRIPT
 * Thuần JavaScript (Vanilla JS), không dùng thư viện ngoài
 * Quản trị: Phòng, Sơ đồ tầng, Đặt phòng, Doanh thu, Khách hàng
 * ========================================================
 */

// ========================================================
// 0. BẢO VỆ TRANG QUẢN TRỊ
// ========================================================
// Không cho tài khoản khách hàng hoặc người chưa đăng nhập mở admin.html,
// kể cả khi họ nhập trực tiếp URL.
(function protectAdminPage() {
  const isAuthorized =
    typeof checkCurrentAdminAuth === "function" &&
    checkCurrentAdminAuth();

  if (!isAuthorized) {
    window.location.replace("login.html?redirect=admin.html&msg=admin_required");
    return;
  }
})();

// ========================================================
// 1. DỮ LIỆU MẪU BAN ĐẦU (INITIAL MOCK DATA)
// ========================================================

const DEFAULT_HOTEL_ROOMS = [
  // LOTTE HOTEL HANOI
  {
    id: "rm-lotte-3801",
    roomNumber: "P.3801",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    roomType: "Deluxe King City View",
    floor: 38,
    price: 2750000,
    status: "available",
    capacity: 2,
    bed: "1 Giường King 2m",
    guestName: "",
    guestPhone: "",
    bookingId: "",
    checkin: "",
    checkout: "",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=650&q=80",
    amenities: ["View toàn cảnh Ba Đình", "Bồn tắm nằm", "Smart TV 65 inch", "Bàn làm việc", "Máy pha cafe"]
  },
  {
    id: "rm-lotte-3802",
    roomNumber: "P.3802",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    roomType: "Deluxe King City View",
    floor: 38,
    price: 2750000,
    status: "occupied",
    capacity: 2,
    bed: "1 Giường King 2m",
    guestName: "Đỗ Minh Tuấn",
    guestPhone: "0912445566",
    bookingId: "LT-HN-77210",
    checkin: "2026-09-27",
    checkout: "2026-09-29",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=650&q=80",
    amenities: ["View toàn cảnh Ba Đình", "Bồn tắm nằm", "Smart TV 65 inch"]
  },
  {
    id: "rm-lotte-3803",
    roomNumber: "P.3803",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    roomType: "Deluxe Twin City View",
    floor: 38,
    price: 2750000,
    status: "cleaning",
    capacity: 2,
    bed: "2 Giường Đơn Twin",
    guestName: "",
    guestPhone: "",
    bookingId: "",
    checkin: "",
    checkout: "",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=650&q=80",
    amenities: ["View toàn cảnh Ba Đình", "Bồn tắm nằm", "Smart TV 65 inch"]
  },
  {
    id: "rm-lotte-3804",
    roomNumber: "P.3804",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    roomType: "Deluxe King City View",
    floor: 38,
    price: 2750000,
    status: "available",
    capacity: 2,
    bed: "1 Giường King 2m",
    guestName: "",
    guestPhone: "",
    bookingId: "",
    checkin: "",
    checkout: "",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=650&q=80",
    amenities: ["View phố Liễu Giai", "Bồn tắm nằm", "Smart TV 65 inch"]
  },
  {
    id: "rm-lotte-4501",
    roomNumber: "P.4501",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    roomType: "Premier Lake View",
    floor: 45,
    price: 3200000,
    status: "available",
    capacity: 3,
    bed: "1 Giường King siêu lớn",
    guestName: "",
    guestPhone: "",
    bookingId: "",
    checkin: "",
    checkout: "",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=650&q=80",
    amenities: ["View ôm trọn Hồ Tây", "Bồn tắm kính panorama", "Nespresso Bar", "Đặc quyền bữa sáng"]
  },
  {
    id: "rm-lotte-4502",
    roomNumber: "P.4502",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    roomType: "Premier Lake View",
    floor: 45,
    price: 3200000,
    status: "occupied",
    capacity: 3,
    bed: "1 Giường King siêu lớn",
    guestName: "Phạm Hải Đăng",
    guestPhone: "0934889922",
    bookingId: "LT-HN-65421",
    checkin: "2026-09-26",
    checkout: "2026-09-29",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=650&q=80",
    amenities: ["View Hồ Tây", "Bồn tắm kính", "Nespresso Bar"]
  },
  {
    id: "rm-lotte-4503",
    roomNumber: "P.4503",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    roomType: "Premier Lake View",
    floor: 45,
    price: 3200000,
    status: "cleaning",
    capacity: 3,
    bed: "1 Giường King",
    guestName: "",
    guestPhone: "",
    bookingId: "",
    checkin: "",
    checkout: "",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=650&q=80",
    amenities: ["View Hồ Tây", "Bồn tắm kính"]
  },
  {
    id: "rm-lotte-5101",
    roomNumber: "P.5101",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    roomType: "Club Junior Suite",
    floor: 51,
    price: 3850000,
    status: "available",
    capacity: 3,
    bed: "1 Giường King Master",
    guestName: "",
    guestPhone: "",
    bookingId: "",
    checkin: "",
    checkout: "",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=650&q=80",
    amenities: ["Đặc quyền Club Lounge tầng 59", "Cocktail tối miễn phí", "Phòng khách riêng"]
  },
  {
    id: "rm-lotte-5102",
    roomNumber: "P.5102",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    roomType: "Club Junior Suite",
    floor: 51,
    price: 3850000,
    status: "occupied",
    capacity: 3,
    bed: "1 Giường King Master",
    guestName: "Nguyễn Hoàng Lotte",
    guestPhone: "0901234567",
    bookingId: "LT-HN-89234",
    checkin: "2026-09-28",
    checkout: "2026-09-30",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=650&q=80",
    amenities: ["Đặc quyền Club Lounge tầng 59", "Cocktail tối miễn phí", "Phòng khách riêng"]
  },
  {
    id: "rm-lotte-5103",
    roomNumber: "P.5103",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    roomType: "Club Junior Suite",
    floor: 51,
    price: 3850000,
    status: "maintenance",
    capacity: 3,
    bed: "1 Giường King Master",
    guestName: "",
    guestPhone: "",
    bookingId: "",
    checkin: "",
    checkout: "",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=650&q=80",
    amenities: ["Bảo trì định kỳ hệ thống điều hòa và vòi sen"]
  },
  {
    id: "rm-lotte-6001",
    roomNumber: "P.6001",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    roomType: "Executive Grand Suite",
    floor: 60,
    price: 4950000,
    status: "available",
    capacity: 4,
    bed: "1 Giường King + Sofa bed",
    guestName: "",
    guestPhone: "",
    bookingId: "",
    checkin: "",
    checkout: "",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=650&q=80",
    amenities: ["Tầng 60 ngắm mây trời", "Phòng họp mini", "Quầy bar rượu vang", "Bồn sục Jacuzzi"]
  },
  {
    id: "rm-lotte-6002",
    roomNumber: "P.6002",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    roomType: "Executive Grand Suite",
    floor: 60,
    price: 4950000,
    status: "occupied",
    capacity: 4,
    bed: "1 Giường King + Sofa bed",
    guestName: "Vũ Đình Trọng",
    guestPhone: "0977889900",
    bookingId: "LT-HN-94320",
    checkin: "2026-09-27",
    checkout: "2026-09-30",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=650&q=80",
    amenities: ["Tầng 60", "Bồn sục Jacuzzi", "Bar rượu"]
  },
  {
    id: "rm-lotte-6501",
    roomNumber: "P.6501",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    roomType: "Presidential Luxury Suite",
    floor: 65,
    price: 8900000,
    status: "available",
    capacity: 4,
    bed: "2 Giường King Hoàng Gia",
    guestName: "",
    guestPhone: "",
    bookingId: "",
    checkin: "",
    checkout: "",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=650&q=80",
    amenities: ["Tầng cao nhất 65", "Quản gia riêng 24/7", "Phòng ăn 8 người", "Bàn bi-a & Piano"]
  },

  // PAN PACIFIC HANOI
  {
    id: "rm-pan-1201",
    roomNumber: "P.1201",
    hotelId: "pan-pacific-hanoi",
    hotelName: "Pan Pacific Hanoi",
    roomType: "Deluxe Westlake View",
    floor: 12,
    price: 2190000,
    status: "available",
    capacity: 2,
    bed: "1 Giường King",
    guestName: "",
    guestPhone: "",
    bookingId: "",
    checkin: "",
    checkout: "",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=650&q=80",
    amenities: ["View ngắm Hồ Trúc Bạch", "Bể bơi mái vòm", "Buffet sáng"]
  },
  {
    id: "rm-pan-1202",
    roomNumber: "P.1202",
    hotelId: "pan-pacific-hanoi",
    hotelName: "Pan Pacific Hanoi",
    roomType: "Pacific Club Suite",
    floor: 12,
    price: 3090000,
    status: "occupied",
    capacity: 3,
    bed: "1 Giường King",
    guestName: "Lê Quốc Bảo",
    guestPhone: "0966554433",
    bookingId: "PP-HN-12490",
    checkin: "2026-09-28",
    checkout: "2026-10-01",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=650&q=80",
    amenities: ["The Summit Bar", "Club Lounge"]
  },

  // INTERCONTINENTAL HANOI WESTLAKE
  {
    id: "rm-inter-0301",
    roomNumber: "P.301",
    hotelId: "intercon-westlake",
    hotelName: "InterContinental Westlake",
    roomType: "Overwater Pavilion Suite",
    floor: 3,
    price: 3850000,
    status: "available",
    capacity: 3,
    bed: "1 Giường King Pavilion",
    guestName: "",
    guestPhone: "",
    bookingId: "",
    checkin: "",
    checkout: "",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=650&q=80",
    amenities: ["Xây trên mặt nước Hồ Tây", "Sunset Bar", "Ban công ngắm hoàng hôn"]
  },
  {
    id: "rm-inter-0302",
    roomNumber: "P.302",
    hotelId: "intercon-westlake",
    hotelName: "InterContinental Westlake",
    roomType: "Classic Westlake View",
    floor: 3,
    price: 3200000,
    status: "occupied",
    capacity: 2,
    bed: "1 Giường King",
    guestName: "Đặng Thu Thảo",
    guestPhone: "0944112233",
    bookingId: "IC-HN-33012",
    checkin: "2026-09-27",
    checkout: "2026-09-29",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=650&q=80",
    amenities: ["Ban công mặt hồ", "Bồn tắm sâu"]
  },

  // APRICOT HOTEL HANOI
  {
    id: "rm-apricot-0501",
    roomNumber: "P.501",
    hotelId: "apricot-hotel-hanoi",
    hotelName: "Apricot Hotel Hanoi",
    roomType: "Canvas Lake View Hồ Gươm",
    floor: 5,
    price: 3150000,
    status: "available",
    capacity: 2,
    bed: "1 Giường King Nghệ Thuật",
    guestName: "",
    guestPhone: "",
    bookingId: "",
    checkin: "",
    checkout: "",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=650&q=80",
    amenities: ["Trực diện Tháp Rùa Hồ Gươm", "Hồ bơi vô cực tầng thượng"]
  },

  // MELIA HANOI
  {
    id: "rm-melia-0801",
    roomNumber: "P.801",
    hotelId: "melia-hanoi",
    hotelName: "Melia Hanoi Hotel",
    roomType: "The Level Grand City View",
    floor: 8,
    price: 3050000,
    status: "available",
    capacity: 3,
    bed: "1 Giường King",
    guestName: "",
    guestPhone: "",
    bookingId: "",
    checkin: "",
    checkout: "",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=650&q=80",
    amenities: ["Tiêu chuẩn nguyên thủ quốc gia", "Trung tâm Lý Thường Kiệt"]
  }
];

const DEFAULT_ALL_BOOKINGS = [
  {
    bookingId: "LT-HN-89234",
    customerName: "Nguyễn Hoàng Lotte",
    customerPhone: "0901234567",
    customerEmail: "demo@lottehotel.vn",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi (5 Sao Đẳng Cấp)",
    roomNumber: "P.5102",
    roomType: "Premier Lake View ngắm Hồ Tây",
    checkin: "2026-09-28",
    checkout: "2026-09-30",
    nights: 2,
    guests: "2 người lớn",
    rooms: 1,
    totalPrice: "6.400.000₫",
    rawAmount: 6400000,
    status: "Đang lưu trú",
    paymentMethod: "Chuyển khoản QR",
    bookedAt: "2026-09-24T10:00:00Z",
    note: "Khách VIP Lotte Club Gold, cần dọn phòng trước 14h"
  },
  {
    bookingId: "LT-HN-77210",
    customerName: "Đỗ Minh Tuấn",
    customerPhone: "0912445566",
    customerEmail: "minhtuan.do@gmail.com",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi (5 Sao Đẳng Cấp)",
    roomNumber: "P.3802",
    roomType: "Deluxe King City View",
    checkin: "2026-09-27",
    checkout: "2026-09-29",
    nights: 2,
    guests: "2 người lớn",
    rooms: 1,
    totalPrice: "5.500.000₫",
    rawAmount: 5500000,
    status: "Đang lưu trú",
    paymentMethod: "Thẻ tín dụng qua POS",
    bookedAt: "2026-09-25T14:30:00Z",
    note: "Không hút thuốc, tầng cao"
  },
  {
    bookingId: "LT-HN-65421",
    customerName: "Phạm Hải Đăng",
    customerPhone: "0934889922",
    customerEmail: "haidang.pham@biz.vn",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi (5 Sao Đẳng Cấp)",
    roomNumber: "P.4502",
    roomType: "Premier Lake View",
    checkin: "2026-09-26",
    checkout: "2026-09-29",
    nights: 3,
    guests: "2 người lớn, 1 trẻ em",
    rooms: 1,
    totalPrice: "9.600.000₫",
    rawAmount: 9600000,
    status: "Đang lưu trú",
    paymentMethod: "Chuyển khoản QR",
    bookedAt: "2026-09-22T08:15:00Z",
    note: "Cần nôi cho em bé sơ sinh"
  },
  {
    bookingId: "LT-HN-94320",
    customerName: "Vũ Đình Trọng",
    customerPhone: "0977889900",
    customerEmail: "trongvu@lottecenter.vn",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi (5 Sao Đẳng Cấp)",
    roomNumber: "P.6002",
    roomType: "Executive Grand Suite",
    checkin: "2026-09-27",
    checkout: "2026-09-30",
    nights: 3,
    guests: "3 người lớn",
    rooms: 1,
    totalPrice: "14.850.000₫",
    rawAmount: 14850000,
    status: "Đang lưu trú",
    paymentMethod: "Thẻ tín dụng qua POS",
    bookedAt: "2026-09-20T11:00:00Z",
    note: "Đặt tiếp khách đối tác quốc tế"
  },
  {
    bookingId: "LT-HN-51203",
    customerName: "Hoàng Mai Linh",
    customerPhone: "0988776655",
    customerEmail: "mailinh.hoang@gmail.com",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi (5 Sao Đẳng Cấp)",
    roomNumber: "P.3801",
    roomType: "Deluxe King City View",
    checkin: "2026-10-02",
    checkout: "2026-10-04",
    nights: 2,
    guests: "2 người lớn",
    rooms: 1,
    totalPrice: "5.500.000₫",
    rawAmount: 5500000,
    status: "Đã xác nhận",
    paymentMethod: "Ví điện tử MoMo",
    bookedAt: "2026-09-26T16:20:00Z",
    note: "Kỷ niệm ngày cưới, setup hoa hồng"
  },
  {
    bookingId: "PP-HN-12490",
    customerName: "Lê Quốc Bảo",
    customerPhone: "0966554433",
    customerEmail: "quocbao.le@fpt.vn",
    hotelId: "pan-pacific-hanoi",
    hotelName: "Pan Pacific Hanoi",
    roomNumber: "P.1202",
    roomType: "Pacific Club Suite",
    checkin: "2026-09-28",
    checkout: "2026-10-01",
    nights: 3,
    guests: "2 người lớn",
    rooms: 1,
    totalPrice: "9.270.000₫",
    rawAmount: 9270000,
    status: "Đang lưu trú",
    paymentMethod: "Thanh toán tại khách sạn",
    bookedAt: "2026-09-25T18:40:00Z",
    note: ""
  },
  {
    bookingId: "IC-HN-33012",
    customerName: "Đặng Thu Thảo",
    customerPhone: "0944112233",
    customerEmail: "thuthao.dang@vietcombank.vn",
    hotelId: "intercon-westlake",
    hotelName: "InterContinental Westlake",
    roomNumber: "P.302",
    roomType: "Classic Westlake View",
    checkin: "2026-09-27",
    checkout: "2026-09-29",
    nights: 2,
    guests: "2 người lớn",
    rooms: 1,
    totalPrice: "6.400.000₫",
    rawAmount: 6400000,
    status: "Đang lưu trú",
    paymentMethod: "Chuyển khoản QR",
    bookedAt: "2026-09-23T09:20:00Z",
    note: ""
  },
  {
    bookingId: "AP-HN-88120",
    customerName: "Trần Anh Quân",
    customerPhone: "0918223344",
    customerEmail: "anhquan.tran@gmail.com",
    hotelId: "apricot-hotel-hanoi",
    hotelName: "Apricot Hotel Hanoi",
    roomNumber: "P.501",
    roomType: "Canvas Lake View Hồ Gươm",
    checkin: "2026-09-20",
    checkout: "2026-09-23",
    nights: 3,
    guests: "2 người lớn",
    rooms: 1,
    totalPrice: "9.450.000₫",
    rawAmount: 9450000,
    status: "Hoàn thành",
    paymentMethod: "Thẻ tín dụng qua POS",
    bookedAt: "2026-09-18T15:00:00Z",
    note: "Đã check-out đúng giờ, đánh giá 5 sao"
  },
  {
    bookingId: "LT-HN-32190",
    customerName: "Nguyễn Văn Tuấn",
    customerPhone: "0903445566",
    customerEmail: "tuannv@techcom.vn",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi (5 Sao Đẳng Cấp)",
    roomNumber: "P.3804",
    roomType: "Deluxe King City View",
    checkin: "2026-09-15",
    checkout: "2026-09-17",
    nights: 2,
    guests: "1 người lớn",
    rooms: 1,
    totalPrice: "5.500.000₫",
    rawAmount: 5500000,
    status: "Hoàn thành",
    paymentMethod: "Chuyển khoản QR",
    bookedAt: "2026-09-10T14:10:00Z",
    note: "Chuyến công tác"
  },
  {
    bookingId: "LT-HN-11029",
    customerName: "Lương Bích Hằng",
    customerPhone: "0982334455",
    customerEmail: "bichhang@vina.vn",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi (5 Sao Đẳng Cấp)",
    roomNumber: "P.4501",
    roomType: "Premier Lake View",
    checkin: "2026-09-12",
    checkout: "2026-09-14",
    nights: 2,
    guests: "2 người lớn",
    rooms: 1,
    totalPrice: "6.400.000₫",
    rawAmount: 6400000,
    status: "Đã hủy",
    paymentMethod: "Tiền mặt tại quầy",
    bookedAt: "2026-09-08T10:30:00Z",
    note: "Hủy do thay đổi lịch trình chuyến bay"
  }
];

const DEFAULT_PROMOS = [
  {
    id: "prm_01",
    code: "LOTTE500",
    discountType: "fixed",
    discountValue: 500000,
    minSpend: 2000000,
    maxDiscount: 500000,
    expiryDate: "2026-12-31",
    usageCount: 56,
    isActive: true
  },
  {
    id: "prm_02",
    code: "HANOI30",
    discountType: "percent",
    discountValue: 30,
    minSpend: 3000000,
    maxDiscount: 1000000,
    expiryDate: "2026-12-31",
    usageCount: 88,
    isActive: true
  },
  {
    id: "prm_03",
    code: "WEEKEND15",
    discountType: "percent",
    discountValue: 15,
    minSpend: 1500000,
    maxDiscount: 500000,
    expiryDate: "2026-12-31",
    usageCount: 34,
    isActive: true
  },
  {
    id: "prm_04",
    code: "LOTTE2026",
    discountType: "percent",
    discountValue: 15,
    minSpend: 2000000,
    maxDiscount: 600000,
    expiryDate: "2026-12-31",
    usageCount: 42,
    isActive: true
  },
  {
    id: "prm_05",
    code: "TRAVELOKA300",
    discountType: "fixed",
    discountValue: 300000,
    minSpend: 2500000,
    maxDiscount: 300000,
    expiryDate: "2026-11-30",
    usageCount: 68,
    isActive: true
  },
  {
    id: "prm_06",
    code: "SUMMERVIP",
    discountType: "percent",
    discountValue: 20,
    minSpend: 4000000,
    maxDiscount: 1200000,
    expiryDate: "2026-10-31",
    usageCount: 19,
    isActive: true
  },
  {
    id: "prm_07",
    code: "WEEKEND10",
    discountType: "percent",
    discountValue: 10,
    minSpend: 1500000,
    maxDiscount: 400000,
    expiryDate: "2026-12-31",
    usageCount: 27,
    isActive: true
  }
];

const DEFAULT_CONTACT_MESSAGES = [
  {
    id: "FB-1727680001",
    name: "Hoàng Minh Trí",
    email: "minhtri.hoang@gmail.com",
    phone: "0912345678",
    message: "Tôi muốn đặt 3 phòng Deluxe cho đoàn công tác vào cuối tuần này từ 05/10 đến 07/10. Khách sạn có hỗ trợ xuất hóa đơn VAT điện tử và dịch vụ đưa đón sân bay Nội Bài không?",
    sentAt: "30/09/2026, 14:15:30",
    status: "Chờ xử lý",
    replyNote: ""
  },
  {
    id: "FB-1727672102",
    name: "Trần Mai Anh",
    email: "maianh.tran@fpt.com.vn",
    phone: "0987654321",
    message: "Gia đình tôi có bé nhỏ 2 tuổi, muốn hỏi phòng Club Suite có hỗ trợ kê thêm nôi trẻ em miễn phí và view nhìn ra hồ Tây không ạ?",
    sentAt: "30/09/2026, 11:20:10",
    status: "Đã xử lý",
    replyNote: "Đã gọi điện xác nhận miễn phí nôi em bé và xếp phòng tầng 42 view hồ Tây"
  },
  {
    id: "FB-1727661503",
    name: "Nguyễn Tuấn Dũng",
    email: "tuandung.nguyen@vietinbank.vn",
    phone: "0904123889",
    message: "Dịch vụ phòng và ăn sáng tại nhà hàng Grill63 hôm qua rất tuyệt vời! Tôi muốn đăng ký thẻ hội viên VIP Lotte Club thì cần đáp ứng điều kiện gì?",
    sentAt: "29/09/2026, 18:45:00",
    status: "Đã xử lý",
    replyNote: "Đã gửi email hướng dẫn kích hoạt Lotte Club VIP"
  }
];

const DEFAULT_NOTIFICATIONS = [
  {
    id: "notif_01",
    title: "Phòng P.3803 vừa trả phòng",
    desc: "Cần bộ phận Buồng phòng dọn dẹp vệ sinh và thay ga gối",
    time: "10 phút trước",
    type: "cleaning",
    read: false
  },
  {
    id: "notif_02",
    title: "Đơn đặt phòng mới LT-HN-89234",
    desc: "Khách VIP Nguyễn Hoàng Lotte vừa đặt Premier Lake View",
    time: "25 phút trước",
    type: "booking",
    read: false
  },
  {
    id: "notif_03",
    title: "Bảo trì P.5103 hoàn thành 80%",
    desc: "Kỹ thuật viên đang kiểm tra lại hệ thống nước nóng",
    time: "1 giờ trước",
    type: "maintenance",
    read: false
  }
];

// ========================================================
// 2. GETTERS & SETTERS (LOCALSTORAGE)
// ========================================================

function getAdminRooms() {
  const data = localStorage.getItem("traveloka_hotel_rooms");
  if (!data) {
    saveAdminRooms(DEFAULT_HOTEL_ROOMS);
    return [...DEFAULT_HOTEL_ROOMS];
  }
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...DEFAULT_HOTEL_ROOMS];
  } catch (e) {
    return [...DEFAULT_HOTEL_ROOMS];
  }
}

function saveAdminRooms(rooms) {
  localStorage.setItem("traveloka_hotel_rooms", JSON.stringify(rooms));
}

function getAdminBookings() {
  const data = localStorage.getItem("traveloka_all_bookings");
  if (!data) {
    saveAdminBookings(DEFAULT_ALL_BOOKINGS);
    return [...DEFAULT_ALL_BOOKINGS];
  }
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...DEFAULT_ALL_BOOKINGS];
  } catch (e) {
    return [...DEFAULT_ALL_BOOKINGS];
  }
}

function saveAdminBookings(bookings) {
  localStorage.setItem("traveloka_all_bookings", JSON.stringify(bookings));
}

function getAdminPromos() {
  const data = localStorage.getItem("traveloka_hotel_promos");
  if (!data) {
    saveAdminPromos(DEFAULT_PROMOS);
    return [...DEFAULT_PROMOS];
  }
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...DEFAULT_PROMOS];
  } catch (e) {
    return [...DEFAULT_PROMOS];
  }
}

function saveAdminPromos(promos) {
  localStorage.setItem("traveloka_hotel_promos", JSON.stringify(promos));
}

function getAdminNotifications() {
  const data = localStorage.getItem("traveloka_admin_notifications");
  if (!data) {
    saveAdminNotifications(DEFAULT_NOTIFICATIONS);
    return [...DEFAULT_NOTIFICATIONS];
  }
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...DEFAULT_NOTIFICATIONS];
  } catch (e) {
    return [...DEFAULT_NOTIFICATIONS];
  }
}

function saveAdminNotifications(notifs) {
  localStorage.setItem("traveloka_admin_notifications", JSON.stringify(notifs));
}

function getAdminContacts() {
  const data = localStorage.getItem("LOTTE_CONTACT_MESSAGES");
  if (!data) {
    saveAdminContacts(DEFAULT_CONTACT_MESSAGES);
    return [...DEFAULT_CONTACT_MESSAGES];
  }
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...DEFAULT_CONTACT_MESSAGES];
  } catch (e) {
    return [...DEFAULT_CONTACT_MESSAGES];
  }
}

function saveAdminContacts(contacts) {
  localStorage.setItem("LOTTE_CONTACT_MESSAGES", JSON.stringify(contacts));
  updateContactsBadge();
}

function updateContactsBadge() {
  const badge = document.getElementById("badge-total-contacts");
  if (!badge) return;
  const contacts = getAdminContacts();
  const pendingCount = contacts.filter(c => c.status === "Chờ xử lý").length;
  badge.textContent = pendingCount;
  badge.style.display = pendingCount > 0 ? "inline-block" : "none";
}

// ========================================================
// 3. APP INITIALIZATION & NAVIGATION
// ========================================================

let currentActiveSection = "section-overview";
let currentRoomViewMode = "grid";
let currentFloorFilterStatus = "all";

document.addEventListener("DOMContentLoaded", () => {
  // Kiểm tra lại quyền một lần nữa trước khi khởi tạo Dashboard.
  // Đây là lớp bảo vệ thứ hai nếu trạng thái đăng nhập thay đổi.
  if (typeof checkCurrentAdminAuth !== "function" || !checkCurrentAdminAuth()) {
    window.location.replace("login.html?redirect=admin.html&msg=admin_required");
    return;
  }

  // Đảm bảo dữ liệu đã được nạp
  getAdminRooms();
  getAdminBookings();
  getAdminPromos();
  getAdminNotifications();

  // Khởi động giao diện
  initSidebarNavigation();
  initLiveClock();
  initTopSearch();
  initNotificationBell();
  initAuthSession();
  
  // Nạp toàn bộ dữ liệu lên Dashboard
  initDashboardData();
  updateContactsBadge();

  // Xử lý Hash URL nếu có (ví dụ #rooms, #status, #revenue...)
  handleHashNavigation();
});

// Điều hướng Tab
function initSidebarNavigation() {
  const navItems = document.querySelectorAll(".nav-item[data-section]");
  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      const targetSec = item.getAttribute("data-section");
      switchSection(targetSec);
    });
  });

  // Mobile sidebar toggle
  const toggleBtn = document.getElementById("btn-sidebar-toggle");
  const sidebar = document.getElementById("admin-sidebar");
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }
}

function switchSection(sectionId) {
  currentActiveSection = sectionId;
  
  // Cập nhật tab active
  document.querySelectorAll(".nav-item").forEach(item => {
    if (item.getAttribute("data-section") === sectionId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Cập nhật section hiển thị
  document.querySelectorAll(".admin-section").forEach(sec => {
    if (sec.id === sectionId) {
      sec.classList.add("active");
    } else {
      sec.classList.remove("active");
    }
  });

  // Đóng sidebar nếu đang mở trên mobile
  const sidebar = document.getElementById("admin-sidebar");
  if (sidebar && window.innerWidth <= 768) {
    sidebar.classList.remove("open");
  }

  // Tùy theo section kích hoạt việc render lại dữ liệu mới nhất
  if (sectionId === "section-overview") {
    initDashboardData();
  } else if (sectionId === "section-rooms") {
    filterRooms();
  } else if (sectionId === "section-status") {
    renderFloorMap();
  } else if (sectionId === "section-bookings") {
    filterBookings();
  } else if (sectionId === "section-revenue") {
    renderRevenueSection();
  } else if (sectionId === "section-customers") {
    renderCustomersTable();
  } else if (sectionId === "section-promos") {
    renderPromosTable();
  } else if (sectionId === "section-contacts") {
    renderContactsTable();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleHashNavigation() {
  const hash = window.location.hash.replace("#", "");
  const hashMap = {
    overview: "section-overview",
    rooms: "section-rooms",
    status: "section-status",
    bookings: "section-bookings",
    revenue: "section-revenue",
    customers: "section-customers",
    promos: "section-promos",
    contacts: "section-contacts",
    settings: "section-settings"
  };
  if (hash && hashMap[hash]) {
    switchSection(hashMap[hash]);
  }
}

// ========================================================
// 4. LIVE CLOCK & TOP SEARCH
// ========================================================

function initLiveClock() {
  const clockEl = document.getElementById("live-clock");
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const dateStr = now.toLocaleDateString("vi-VN", { weekday: "short", day: "2-digit", month: "2-digit" });
    clockEl.textContent = `Hà Nội: ${timeStr} (${dateStr})`;
  }
  update();
  setInterval(update, 1000);
}

function initTopSearch() {
  const input = document.getElementById("topbar-search-input");
  if (!input) return;

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const q = input.value.trim().toLowerCase();
      if (!q) return;

      // Tìm kiếm thông minh: nếu có P. hoặc phòng thì chuyển qua danh sách phòng
      if (q.startsWith("p.") || q.startsWith("p") || !isNaN(q)) {
        switchSection("section-rooms");
        const roomSearch = document.getElementById("filter-room-search");
        if (roomSearch) {
          roomSearch.value = q;
          filterRooms();
        }
      } else {
        // Mặc định chuyển sang tìm đơn đặt phòng
        switchSection("section-bookings");
        const bookingSearch = document.getElementById("filter-booking-search");
        if (bookingSearch) {
          bookingSearch.value = q;
          filterBookings();
        }
      }
    }
  });
}

function initNotificationBell() {
  const bellBtn = document.getElementById("notif-bell-btn");
  const dropdown = document.getElementById("notif-dropdown");
  if (!bellBtn || !dropdown) return;

  bellBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && e.target !== bellBtn) {
      dropdown.classList.remove("show");
    }
  });

  renderNotificationsList();
}

function renderNotificationsList() {
  const listEl = document.getElementById("notif-items-list");
  const dotEl = document.getElementById("notif-badge-dot");
  if (!listEl) return;

  const notifs = getAdminNotifications();
  const unreadCount = notifs.filter(n => !n.read).length;

  if (dotEl) {
    dotEl.style.display = unreadCount > 0 ? "block" : "none";
  }

  if (notifs.length === 0) {
    listEl.innerHTML = `<div style="text-align: center; padding: 20px; font-size: 0.82rem; color: #94a3b8;">Không có thông báo mới</div>`;
    return;
  }

  listEl.innerHTML = notifs.map(n => `
    <div class="notif-item">
      <div class="notif-item-icon">
        ${n.type === "booking" ? "🛎️" : n.type === "cleaning" ? "🧹" : "🔧"}
      </div>
      <div class="notif-item-body">
        <div class="notif-item-title">${n.title}</div>
        <div class="notif-item-desc">${n.desc}</div>
        <div class="notif-item-time">${n.time}</div>
      </div>
    </div>
  `).join("");
}

function clearAllNotifications() {
  const notifs = getAdminNotifications().map(n => ({ ...n, read: true }));
  saveAdminNotifications(notifs);
  renderNotificationsList();
  showAdminToast("Đã đánh dấu đọc tất cả thông báo");
}

function initAuthSession() {
  // Lấy thông tin user hiện tại nếu có
  const currentUser = typeof getCurrentUser === "function" ? getCurrentUser() : null;
  const nameEl = document.getElementById("admin-user-name");
  const avatarEl = document.getElementById("admin-user-avatar");

  if (currentUser) {
    if (nameEl) nameEl.textContent = currentUser.fullName;
    if (avatarEl) avatarEl.textContent = currentUser.fullName.charAt(0).toUpperCase();
  }

  const logoutBtn = document.getElementById("btn-admin-logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Bạn có chắc chắn muốn đăng xuất khỏi Cổng Quản Trị?")) {
        if (typeof logoutUser === "function") logoutUser();
        window.location.href = "login.html";
      }
    });
  }
}

// ========================================================
// 5. SECTION 1: DASHBOARD & OVERVIEW LOGIC
// ========================================================

function initDashboardData(isManual = false) {
  const rooms = getAdminRooms();
  const bookings = getAdminBookings();

  // 1. Thống kê số lượng phòng
  const totalRooms = rooms.length;
  const availRooms = rooms.filter(r => r.status === "available").length;
  const occRooms = rooms.filter(r => r.status === "occupied").length;
  const cleanRooms = rooms.filter(r => r.status === "cleaning").length;
  const maintRooms = rooms.filter(r => r.status === "maintenance").length;

  const occupancyRate = totalRooms > 0 ? Math.round((occRooms / totalRooms) * 100) : 0;

  // 2. Thống kê Doanh thu
  // Chỉ tính các đơn Đang lưu trú, Hoàn thành, Đã xác nhận
  const validBookings = bookings.filter(b => b.status !== "Đã hủy");
  const totalRevenue = validBookings.reduce((sum, b) => {
    const amt = b.rawAmount || parseInt((b.totalPrice || "0").replace(/\D/g, "")) || 0;
    return sum + amt;
  }, 0);

  // 3. Cập nhật các thẻ KPI
  const kpiRev = document.getElementById("kpi-revenue");
  if (kpiRev) kpiRev.textContent = formatCurrencyVND(totalRevenue);

  const kpiBookings = document.getElementById("kpi-bookings-count");
  if (kpiBookings) kpiBookings.textContent = bookings.length;

  const kpiConfirmed = document.getElementById("kpi-confirmed-count");
  if (kpiConfirmed) kpiConfirmed.textContent = `${validBookings.length} đơn hợp lệ`;

  const kpiOccupancy = document.getElementById("kpi-occupancy-rate");
  if (kpiOccupancy) kpiOccupancy.textContent = `${occupancyRate}%`;

  const kpiOccupancyDesc = document.getElementById("kpi-occupancy-desc");
  if (kpiOccupancyDesc) kpiOccupancyDesc.textContent = `${occRooms}/${totalRooms} phòng có khách`;

  const kpiAvail = document.getElementById("kpi-available-count");
  if (kpiAvail) kpiAvail.textContent = `${availRooms} Trống`;

  const kpiSummary = document.getElementById("kpi-rooms-summary");
  if (kpiSummary) kpiSummary.textContent = `${occRooms} Đang ở • ${cleanRooms} Cần dọn • ${maintRooms} Bảo trì`;

  // Cập nhật badges sidebar
  const badgeRooms = document.getElementById("badge-total-rooms");
  if (badgeRooms) badgeRooms.textContent = totalRooms;

  const badgeAvail = document.getElementById("badge-avail-rooms");
  if (badgeAvail) badgeAvail.textContent = `${availRooms} Trống`;

  const badgeBookings = document.getElementById("badge-total-bookings");
  if (badgeBookings) badgeBookings.textContent = bookings.length;

  // Donut legend
  const donutTotal = document.getElementById("donut-center-total");
  if (donutTotal) donutTotal.textContent = totalRooms;

  const legAvail = document.getElementById("legend-count-avail");
  if (legAvail) legAvail.textContent = availRooms;
  const legOcc = document.getElementById("legend-count-occ");
  if (legOcc) legOcc.textContent = occRooms;
  const legClean = document.getElementById("legend-count-clean");
  if (legClean) legClean.textContent = cleanRooms;
  const legMaint = document.getElementById("legend-count-maint");
  if (legMaint) legMaint.textContent = maintRooms;

  // Vẽ biểu đồ
  renderRevenueChart("7days");
  renderDonutChart(availRooms, occRooms, cleanRooms, maintRooms);

  // Render bảng 5 đơn mới nhất
  renderRecentBookingsTable(bookings.slice(0, 5));

  // Render phòng cần chú ý
  renderUrgentRooms(rooms);

  if (isManual) {
    showAdminToast("Đã làm mới dữ liệu thành công!");
  }
}

// Vẽ biểu đồ doanh thu bằng Canvas thuần
function renderRevenueChart(period = "7days") {
  const canvas = document.getElementById("overview-revenue-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Đổi trạng thái nút bấm
  const btn7 = document.getElementById("btn-chart-7days");
  const btnMo = document.getElementById("btn-chart-months");
  if (btn7 && btnMo) {
    if (period === "7days") {
      btn7.className = "btn btn-primary";
      btnMo.className = "btn btn-outline";
    } else {
      btn7.className = "btn btn-outline";
      btnMo.className = "btn btn-primary";
    }
  }

  // Set canvas size dynamically
  const container = canvas.parentElement;
  canvas.width = container.clientWidth || 600;
  canvas.height = 270;

  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  let labels = [];
  let values = [];

  if (period === "7days") {
    labels = ["T2 (22/9)", "T3 (23/9)", "T4 (24/9)", "T5 (25/9)", "T6 (26/9)", "T7 (27/9)", "CN (28/9)"];
    values = [12400000, 18900000, 15500000, 24800000, 31200000, 38500000, 29600000];
  } else {
    labels = ["T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];
    values = [85000000, 112000000, 148000000, 195000000, 168000000, 158450000, 142000000, 175000000, 210000000];
  }

  const maxVal = Math.max(...values) * 1.25;
  const paddingLeft = 60;
  const paddingBottom = 40;
  const paddingTop = 25;
  const plotWidth = w - paddingLeft - 20;
  const plotHeight = h - paddingBottom - paddingTop;

  // 1. Vẽ các đường ngang mờ (Grid lines)
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1;
  ctx.fillStyle = "#94a3b8";
  ctx.font = "11px -apple-system, sans-serif";
  ctx.textAlign = "right";

  const gridSteps = 4;
  for (let i = 0; i <= gridSteps; i++) {
    const val = (maxVal / gridSteps) * i;
    const y = paddingTop + plotHeight - (val / maxVal) * plotHeight;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(w - 20, y);
    ctx.stroke();

    const shortText = val >= 1000000 ? (val / 1000000).toFixed(0) + " tr" : "0";
    ctx.fillText(shortText, paddingLeft - 8, y + 4);
  }

  // 2. Vẽ các cột có bo góc & gradient
  const barWidth = Math.min(plotWidth / labels.length * 0.55, 48);
  const stepX = plotWidth / labels.length;

  labels.forEach((label, idx) => {
    const val = values[idx];
    const barHeight = (val / maxVal) * plotHeight;
    const x = paddingLeft + idx * stepX + (stepX - barWidth) / 2;
    const y = paddingTop + plotHeight - barHeight;

    // Gradient cột
    const grad = ctx.createLinearGradient(0, y, 0, paddingTop + plotHeight);
    grad.addColorStop(0, "#0194f3");
    grad.addColorStop(1, "rgba(1, 148, 243, 0.45)");

    ctx.fillStyle = grad;
    // Vẽ bo góc trên của cột
    ctx.beginPath();
    const radius = 6;
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + barWidth - radius, y);
    ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
    ctx.lineTo(x + barWidth, paddingTop + plotHeight);
    ctx.lineTo(x, paddingTop + plotHeight);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();

    // Hiển thị giá trị trên đỉnh cột
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 10px -apple-system, sans-serif";
    ctx.textAlign = "center";
    const textVal = (val / 1000000).toFixed(1) + "M";
    ctx.fillText(textVal, x + barWidth / 2, y - 6);

    // Hiển thị nhãn ngày dưới đáy cột
    ctx.fillStyle = "#64748b";
    ctx.font = "500 11px -apple-system, sans-serif";
    ctx.fillText(label, x + barWidth / 2, h - 14);
  });
}

// Vẽ Donut Chart trạng thái phòng
function renderDonutChart(avail, occ, clean, maint) {
  const canvas = document.getElementById("overview-donut-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const total = avail + occ + clean + maint;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  if (total === 0) return;

  const centerX = w / 2;
  const centerY = h / 2;
  const outerRadius = 75;
  const innerRadius = 50;

  const data = [
    { count: avail, color: "#10b981" },
    { count: occ, color: "#3b82f6" },
    { count: clean, color: "#f59e0b" },
    { count: maint, color: "#64748b" }
  ];

  let currentAngle = -0.5 * Math.PI;

  data.forEach(slice => {
    if (slice.count <= 0) return;
    const sliceAngle = (slice.count / total) * 2 * Math.PI;

    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
    ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
    ctx.closePath();

    ctx.fillStyle = slice.color;
    ctx.fill();

    currentAngle += sliceAngle;
  });
}

// Render danh sách 5 đơn đặt phòng gần đây
function renderRecentBookingsTable(bookings) {
  const tbody = document.getElementById("overview-recent-bookings-tbody");
  if (!tbody) return;

  if (bookings.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #94a3b8; padding: 24px;">Chưa có đơn đặt phòng nào</td></tr>`;
    return;
  }

  tbody.innerHTML = bookings.map(b => `
    <tr>
      <td><strong>${b.bookingId}</strong></td>
      <td>
        <div style="font-weight: 700;">${b.customerName}</div>
        <div style="font-size: 0.76rem; color: #64748b;">${b.customerPhone}</div>
      </td>
      <td>
        <div style="font-weight: 600; color: #0070ba;">${b.hotelName}</div>
        <div style="font-size: 0.78rem; color: #64748b;">${b.roomType} ${b.roomNumber ? `(${b.roomNumber})` : ""}</div>
      </td>
      <td>
        <div style="font-size: 0.8rem;">${formatDateDisplay(b.checkin)} &rarr; ${formatDateDisplay(b.checkout)}</div>
        <div style="font-size: 0.74rem; color: #64748b;">${b.nights} đêm &bull; ${b.guests}</div>
      </td>
      <td><strong style="color: var(--admin-primary);">${b.totalPrice}</strong></td>
      <td>${renderStatusBadge(b.status)}</td>
      <td>
        <div class="table-actions">
          <button type="button" class="btn-table-action" title="Xem hóa đơn & In" onclick="openInvoiceModal('${b.bookingId}')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

// Render danh sách phòng cần xử lý ngay
function renderUrgentRooms(rooms) {
  const container = document.getElementById("overview-urgent-rooms-list");
  if (!container) return;

  const urgentRooms = rooms.filter(r => r.status === "cleaning" || r.status === "maintenance").slice(0, 4);

  if (urgentRooms.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px; color: #10b981; font-size: 0.84rem; font-weight: 700;">
        ✅ Tuyệt vời! Tất cả các phòng đều sạch sẽ và sẵn sàng đón khách.
      </div>
    `;
    return;
  }

  container.innerHTML = urgentRooms.map(r => `
    <div style="background: #f8fafc; border: 1px solid var(--admin-border); border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-weight: 800; font-size: 0.9rem;">${r.roomNumber} - ${r.roomType}</div>
        <div style="font-size: 0.76rem; color: #64748b;">${r.hotelName} &bull; Tầng ${r.floor}</div>
      </div>
      <div>
        ${r.status === "cleaning" ? `
          <button type="button" class="btn btn-success" style="padding: 4px 10px; font-size: 0.74rem;" onclick="quickUpdateRoomStatus('${r.id}', 'available')">
            Dọn xong
          </button>
        ` : `
          <button type="button" class="btn btn-outline" style="padding: 4px 10px; font-size: 0.74rem;" onclick="quickUpdateRoomStatus('${r.id}', 'available')">
            Hoàn tất bảo trì
          </button>
        `}
      </div>
    </div>
  `).join("");
}

// ========================================================
// 6. SECTION 2: QUẢN LÝ PHÒNG (ROOM INVENTORY)
// ========================================================

function filterRooms() {
  const rooms = getAdminRooms();
  const search = (document.getElementById("filter-room-search")?.value || "").trim().toLowerCase();
  const hotel = document.getElementById("filter-room-hotel")?.value || "all";
  const status = document.getElementById("filter-room-status")?.value || "all";
  const sort = document.getElementById("filter-room-sort")?.value || "number-asc";

  let filtered = rooms.filter(r => {
    const matchSearch = !search || 
      r.roomNumber.toLowerCase().includes(search) || 
      r.roomType.toLowerCase().includes(search) ||
      (r.guestName && r.guestName.toLowerCase().includes(search));
    const matchHotel = hotel === "all" || r.hotelId === hotel;
    const matchStatus = status === "all" || r.status === status;
    return matchSearch && matchHotel && matchStatus;
  });

  // Sort
  filtered.sort((a, b) => {
    if (sort === "number-asc") return a.roomNumber.localeCompare(b.roomNumber);
    if (sort === "number-desc") return b.roomNumber.localeCompare(a.roomNumber);
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "floor-asc") return a.floor - b.floor;
    if (sort === "floor-desc") return b.floor - a.floor;
    return 0;
  });

  if (currentRoomViewMode === "grid") {
    renderRoomsGrid(filtered);
  } else {
    renderRoomsTable(filtered);
  }
}

function setRoomViewMode(mode) {
  currentRoomViewMode = mode;
  const btnGrid = document.getElementById("btn-view-grid");
  const btnTable = document.getElementById("btn-view-table");
  const gridContainer = document.getElementById("rooms-grid-container");
  const tableContainer = document.getElementById("rooms-table-container");

  if (mode === "grid") {
    btnGrid?.classList.add("active");
    btnTable?.classList.remove("active");
    gridContainer.style.display = "grid";
    tableContainer.style.display = "none";
  } else {
    btnGrid?.classList.remove("active");
    btnTable?.classList.add("active");
    gridContainer.style.display = "none";
    tableContainer.style.display = "block";
  }
  filterRooms();
}

function renderRoomsGrid(rooms) {
  const container = document.getElementById("rooms-grid-container");
  if (!container) return;

  if (rooms.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #94a3b8;">Không tìm thấy phòng phù hợp với bộ lọc</div>`;
    return;
  }

  container.innerHTML = rooms.map(r => `
    <div class="room-card">
      <div class="room-card-img-wrap">
        <img class="room-card-img" src="${r.image}" alt="${r.roomNumber}" onerror="this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=650&q=80'">
        <div class="room-card-number-badge">${r.roomNumber}</div>
        <div class="room-card-status-badge">
          ${renderRoomStatusBadge(r.status)}
        </div>
      </div>
      <div class="room-card-body">
        <div class="room-card-hotel">${r.hotelName} &bull; Tầng ${r.floor}</div>
        <h4 class="room-card-title">${r.roomType}</h4>
        
        <div class="room-card-specs">
          <div class="room-card-spec-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"></path></svg>
            <span>${r.bed}</span>
          </div>
          <div class="room-card-spec-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>${r.capacity} khách</span>
          </div>
        </div>

        ${r.status === "occupied" ? `
          <div class="room-card-guest-info">
            <div>Khách: <strong>${r.guestName}</strong> (${r.guestPhone})</div>
            <div style="color: #64748b; font-size: 0.72rem; margin-top: 2px;">Lưu trú: ${formatDateDisplay(r.checkin)} &rarr; ${formatDateDisplay(r.checkout)}</div>
          </div>
        ` : `
          <div class="room-card-guest-info" style="color: #94a3b8; font-style: italic;">
            Phòng sẵn sàng tiếp nhận lượt khách mới
          </div>
        `}

        <div class="room-card-footer">
          <div class="room-card-price">
            ${formatCurrencyVND(r.price)} <span>/ đêm</span>
          </div>
          <div class="table-actions">
            <button type="button" class="btn-table-action" title="Chi tiết & Trạng thái" onclick="openRoomDetailModal('${r.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
            </button>
            <button type="button" class="btn-table-action" title="Sửa thông tin" onclick="openEditRoomModal('${r.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
            <button type="button" class="btn-table-action delete" title="Xóa phòng" onclick="deleteRoom('${r.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

function renderRoomsTable(rooms) {
  const tbody = document.getElementById("rooms-table-tbody");
  if (!tbody) return;

  if (rooms.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 24px; color: #94a3b8;">Không tìm thấy phòng phù hợp</td></tr>`;
    return;
  }

  tbody.innerHTML = rooms.map(r => `
    <tr>
      <td><strong>${r.roomNumber}</strong></td>
      <td>${r.hotelName}</td>
      <td><strong>${r.roomType}</strong></td>
      <td>Tầng ${r.floor}</td>
      <td>${r.bed} (${r.capacity} khách)</td>
      <td><strong style="color: var(--admin-primary);">${formatCurrencyVND(r.price)}</strong></td>
      <td>${renderRoomStatusBadge(r.status)}</td>
      <td>${r.guestName ? `${r.guestName} (${r.guestPhone})` : '<span style="color:#94a3b8;">Trống</span>'}</td>
      <td>
        <div class="table-actions">
          <button type="button" class="btn-table-action" title="Chi tiết & Thao tác" onclick="openRoomDetailModal('${r.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
          </button>
          <button type="button" class="btn-table-action" title="Sửa" onclick="openEditRoomModal('${r.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </button>
          <button type="button" class="btn-table-action delete" title="Xóa" onclick="deleteRoom('${r.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join("");
}

// Modal Thêm / Sửa Phòng
function openAddRoomModal() {
  document.getElementById("room-modal-title").innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
    Thêm Phòng Khách Sạn Mới
  `;
  document.getElementById("room-form-id").value = "";
  document.getElementById("form-room").reset();
  document.getElementById("room-price").value = 2750000;
  document.getElementById("room-floor").value = 38;
  document.getElementById("room-image").value = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=650&q=80";
  
  openAdminModal("modal-room-form");
}

function openEditRoomModal(roomId) {
  const rooms = getAdminRooms();
  const room = rooms.find(r => r.id === roomId);
  if (!room) return;

  document.getElementById("room-modal-title").innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
    Chỉnh Sửa Phòng: ${room.roomNumber}
  `;
  document.getElementById("room-form-id").value = room.id;
  document.getElementById("room-number").value = room.roomNumber;
  document.getElementById("room-hotel").value = room.hotelId;
  document.getElementById("room-type").value = room.roomType;
  document.getElementById("room-floor").value = room.floor;
  document.getElementById("room-price").value = room.price;
  document.getElementById("room-status-select").value = room.status;
  document.getElementById("room-capacity").value = room.capacity || 2;
  document.getElementById("room-bed").value = room.bed || "1 Giường King";
  document.getElementById("room-image").value = room.image || "";
  document.getElementById("room-amenities").value = Array.isArray(room.amenities) ? room.amenities.join(", ") : "";

  openAdminModal("modal-room-form");
}

function handleSaveRoomSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("room-form-id").value;
  const roomNumber = document.getElementById("room-number").value.trim();
  const hotelId = document.getElementById("room-hotel").value;
  const hotelSelect = document.getElementById("room-hotel");
  const hotelName = hotelSelect.options[hotelSelect.selectedIndex].text.split("(")[0].trim();
  const roomType = document.getElementById("room-type").value.trim();
  const floor = parseInt(document.getElementById("room-floor").value) || 1;
  const price = parseInt(document.getElementById("room-price").value) || 2000000;
  const status = document.getElementById("room-status-select").value;
  const capacity = parseInt(document.getElementById("room-capacity").value) || 2;
  const bed = document.getElementById("room-bed").value.trim();
  const image = document.getElementById("room-image").value.trim();
  const amenitiesStr = document.getElementById("room-amenities").value.trim();
  const amenities = amenitiesStr ? amenitiesStr.split(",").map(a => a.trim()).filter(Boolean) : [];

  let rooms = getAdminRooms();

  if (id) {
    // Cập nhật
    const idx = rooms.findIndex(r => r.id === id);
    if (idx !== -1) {
      rooms[idx] = {
        ...rooms[idx],
        roomNumber,
        hotelId,
        hotelName,
        roomType,
        floor,
        price,
        status,
        capacity,
        bed,
        image,
        amenities
      };
      showAdminToast(`Đã cập nhật thành công phòng ${roomNumber}`);
    }
  } else {
    // Thêm mới
    const newRoom = {
      id: "rm-" + Date.now(),
      roomNumber,
      hotelId,
      hotelName,
      roomType,
      floor,
      price,
      status,
      capacity,
      bed,
      guestName: "",
      guestPhone: "",
      bookingId: "",
      checkin: "",
      checkout: "",
      image: image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=650&q=80",
      amenities: amenities.length ? amenities : ["Phòng 5 sao đẳng cấp", "View toàn cảnh"]
    };
    rooms.unshift(newRoom);
    showAdminToast(`Đã thêm phòng ${roomNumber} vào hệ thống`);
  }

  saveAdminRooms(rooms);
  closeAdminModal("modal-room-form");
  filterRooms();
  initDashboardData();
}

function deleteRoom(roomId) {
  let rooms = getAdminRooms();
  const room = rooms.find(r => r.id === roomId);
  if (!room) return;

  if (room.status === "occupied") {
    alert(`Không thể xóa phòng ${room.roomNumber} vì đang có khách lưu trú! Vui lòng trả phòng trước.`);
    return;
  }

  if (confirm(`Bạn có chắc chắn muốn xóa phòng ${room.roomNumber} (${room.roomType}) khỏi hệ thống?`)) {
    rooms = rooms.filter(r => r.id !== roomId);
    saveAdminRooms(rooms);
    showAdminToast(`Đã xóa phòng ${room.roomNumber}`);
    filterRooms();
    initDashboardData();
  }
}

function quickUpdateRoomStatus(roomId, newStatus) {
  let rooms = getAdminRooms();
  const idx = rooms.findIndex(r => r.id === roomId);
  if (idx === -1) return;

  rooms[idx].status = newStatus;
  if (newStatus === "available" || newStatus === "cleaning" || newStatus === "maintenance") {
    rooms[idx].guestName = "";
    rooms[idx].guestPhone = "";
    rooms[idx].bookingId = "";
  }

  saveAdminRooms(rooms);
  showAdminToast(`Phòng ${rooms[idx].roomNumber} đã chuyển sang trạng thái "${getStatusText(newStatus)}"`);
  filterRooms();
  renderFloorMap();
  initDashboardData();
}

// ========================================================
// 7. SECTION 3: SƠ ĐỒ PHÒNG THỜI GIAN THỰC (FLOOR MAP)
// ========================================================

function renderFloorMap() {
  const container = document.getElementById("floor-map-container");
  if (!container) return;

  const selectedHotel = document.getElementById("select-floor-hotel")?.value || "lotte-hotel-hanoi";
  const allRooms = getAdminRooms();
  const hotelRooms = allRooms.filter(r => r.hotelId === selectedHotel);

  // Thống kê số lượng cho legend
  const countAll = hotelRooms.length;
  const countAvail = hotelRooms.filter(r => r.status === "available").length;
  const countOcc = hotelRooms.filter(r => r.status === "occupied").length;
  const countClean = hotelRooms.filter(r => r.status === "cleaning").length;
  const countMaint = hotelRooms.filter(r => r.status === "maintenance").length;

  document.getElementById("fl-count-all").textContent = countAll;
  document.getElementById("fl-count-available").textContent = countAvail;
  document.getElementById("fl-count-occupied").textContent = countOcc;
  document.getElementById("fl-count-cleaning").textContent = countClean;
  document.getElementById("fl-count-maintenance").textContent = countMaint;

  // Lọc theo status filter
  let displayRooms = hotelRooms;
  if (currentFloorFilterStatus !== "all") {
    displayRooms = hotelRooms.filter(r => r.status === currentFloorFilterStatus);
  }

  if (displayRooms.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 40px; color: #94a3b8; background: #fff; border-radius: 12px;">Không có phòng nào phù hợp với bộ lọc trong khách sạn này.</div>`;
    return;
  }

  // Nhóm các phòng theo từng tầng (Floor)
  const floorMap = {};
  displayRooms.forEach(room => {
    const f = room.floor || 1;
    if (!floorMap[f]) floorMap[f] = [];
    floorMap[f].push(room);
  });

  // Sắp xếp tầng từ cao xuống thấp
  const sortedFloors = Object.keys(floorMap).sort((a, b) => b - a);

  container.innerHTML = sortedFloors.map(floor => `
    <div class="floor-group">
      <div class="floor-header">
        <div class="floor-title">
          <span>🏢</span> Tầng ${floor} 
          <span style="font-size: 0.75rem;">${floorMap[floor].length} phòng</span>
        </div>
        <div style="font-size: 0.78rem; color: #64748b;">
          ${floorMap[floor].filter(r => r.status === "available").length} Trống &bull; 
          ${floorMap[floor].filter(r => r.status === "occupied").length} Đang ở
        </div>
      </div>
      <div class="floor-rooms-row">
        ${floorMap[floor].map(r => `
          <div class="floor-room-box ${r.status}" onclick="openRoomDetailModal('${r.id}')" title="Bấm để xem chi tiết & điều phối">
            <div class="fr-header">
              <span class="fr-number">${r.roomNumber}</span>
              <span style="font-size: 1rem;">
                ${r.status === 'available' ? '🟢' : r.status === 'occupied' ? '🔵' : r.status === 'cleaning' ? '🟡' : '⚪'}
              </span>
            </div>
            <div class="fr-type">${r.roomType}</div>
            <div style="font-size: 0.75rem; color: var(--admin-primary); font-weight: 700;">
              ${formatCurrencyVND(r.price)}/đêm
            </div>
            ${r.status === 'occupied' ? `
              <div class="fr-guest-tag">
                👤 ${r.guestName}
              </div>
            ` : `
              <div style="font-size: 0.72rem; color: #64748b; margin-top: auto;">
                ${getStatusText(r.status)}
              </div>
            `}
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function filterFloorMapStatus(status, el) {
  currentFloorFilterStatus = status;
  document.querySelectorAll(".floor-legend-pill").forEach(p => p.classList.remove("active"));
  if (el) el.classList.add("active");
  renderFloorMap();
}

// Modal Chi Tiết & Điều Phối Phòng
function openRoomDetailModal(roomId) {
  const rooms = getAdminRooms();
  const room = rooms.find(r => r.id === roomId);
  if (!room) return;

  document.getElementById("rd-modal-title").textContent = `Phòng ${room.roomNumber} - ${room.hotelName}`;

  const contentEl = document.getElementById("rd-modal-content");
  contentEl.innerHTML = `
    <div style="display: flex; gap: 16px; margin-bottom: 20px;">
      <img src="${room.image}" alt="${room.roomNumber}" style="width: 140px; height: 100px; object-fit: cover; border-radius: 8px;" onerror="this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=650&q=80'">
      <div>
        <div style="font-size: 1.15rem; font-weight: 800; color: #0f172a;">${room.roomType}</div>
        <div style="font-size: 0.82rem; color: #64748b; margin-top: 2px;">Tầng ${room.floor} &bull; ${room.bed} &bull; Sức chứa ${room.capacity} khách</div>
        <div style="font-size: 1.1rem; font-weight: 800; color: var(--admin-primary); margin-top: 6px;">
          ${formatCurrencyVND(room.price)} <span style="font-size: 0.75rem; color: #64748b; font-weight: 500;">/ đêm</span>
        </div>
      </div>
    </div>

    <div style="background: #f8fafc; border: 1px solid var(--admin-border); border-radius: 8px; padding: 14px; margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-size: 0.82rem; font-weight: 700; color: #475569;">Trạng thái hiện tại:</span>
        ${renderRoomStatusBadge(room.status)}
      </div>

      ${room.status === "occupied" ? `
        <div style="border-top: 1px dashed #cbd5e1; padding-top: 10px; margin-top: 8px;">
          <div style="font-size: 0.84rem;">Khách lưu trú: <strong>${room.guestName}</strong></div>
          <div style="font-size: 0.82rem; color: #64748b;">Số điện thoại: <strong>${room.guestPhone}</strong></div>
          <div style="font-size: 0.82rem; color: #64748b;">Mã đặt phòng: <strong>${room.bookingId || "N/A"}</strong></div>
          <div style="font-size: 0.82rem; color: #0284c7; margin-top: 4px; font-weight: 600;">
            Ngày nhận: ${formatDateDisplay(room.checkin)} &rarr; Trả: ${formatDateDisplay(room.checkout)}
          </div>
        </div>
      ` : `
        <div style="font-size: 0.82rem; color: #64748b;">
          Phòng hiện không có khách lưu trú. Có thể nhận khách ngay tại quầy hoặc chỉ định cho đơn đặt mới.
        </div>
      `}
    </div>

    <div>
      <div style="font-size: 0.8rem; font-weight: 700; color: #475569; margin-bottom: 6px;">Tiện nghi nổi bật:</div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
        ${(room.amenities || []).map(a => `<span style="background: #f1f5f9; padding: 3px 8px; border-radius: 4px; font-size: 0.75rem; color: #334155;">${a}</span>`).join("")}
      </div>
    </div>
  `;

  // Các nút hành động
  const actionsEl = document.getElementById("rd-modal-actions");
  actionsEl.innerHTML = `
    <button type="button" class="btn btn-outline" onclick="closeAdminModal('modal-room-detail')">Đóng</button>
    ${room.status === "occupied" ? `
      <button type="button" class="btn btn-primary" onclick="handleCheckoutRoom('${room.id}')">
        Trả Phòng (Check-out) & Chuyển Dọn Dẹp
      </button>
    ` : room.status === "cleaning" ? `
      <button type="button" class="btn btn-success" onclick="quickUpdateRoomStatus('${room.id}', 'available'); closeAdminModal('modal-room-detail');">
        Đã Dọn Xong &rarr; Sẵn Sàng Đón Khách
      </button>
    ` : room.status === "maintenance" ? `
      <button type="button" class="btn btn-success" onclick="quickUpdateRoomStatus('${room.id}', 'available'); closeAdminModal('modal-room-detail');">
        Hoàn Tất Bảo Trì &rarr; Sẵn Sàng
      </button>
    ` : `
      <button type="button" class="btn btn-primary" onclick="closeAdminModal('modal-room-detail'); openWalkinModal('${room.id}');">
        + Nhận Khách Đặt Phòng Nhanh
      </button>
      <button type="button" class="btn btn-outline" style="color: #d97706;" onclick="quickUpdateRoomStatus('${room.id}', 'cleaning'); closeAdminModal('modal-room-detail');">
        Chuyển Dọn Dẹp
      </button>
      <button type="button" class="btn btn-outline" style="color: #64748b;" onclick="quickUpdateRoomStatus('${room.id}', 'maintenance'); closeAdminModal('modal-room-detail');">
        Chuyển Bảo Trì
      </button>
    `}
  `;

  openAdminModal("modal-room-detail");
}

function handleCheckoutRoom(roomId) {
  let rooms = getAdminRooms();
  const room = rooms.find(r => r.id === roomId);
  if (!room) return;

  if (confirm(`Xác nhận trả phòng cho khách ${room.guestName} tại phòng ${room.roomNumber}? Phòng sẽ tự động chuyển sang trạng thái "Đang dọn dẹp".`)) {
    // 1. Cập nhật booking status sang "Hoàn thành"
    if (room.bookingId) {
      let bookings = getAdminBookings();
      const bIdx = bookings.findIndex(b => b.bookingId === room.bookingId);
      if (bIdx !== -1) {
        bookings[bIdx].status = "Hoàn thành";
        saveAdminBookings(bookings);
      }
    }

    // 2. Chuyển phòng sang cleaning
    quickUpdateRoomStatus(roomId, "cleaning");
    closeAdminModal("modal-room-detail");
    showAdminToast(`Phòng ${room.roomNumber} đã check-out và chuyển sang dọn dẹp!`);
  }
}

// ========================================================
// 8. SECTION 4: QUẢN LÝ ĐẶT PHÒNG (BOOKINGS MANAGEMENT)
// ========================================================

function filterBookings() {
  const bookings = getAdminBookings();
  const search = (document.getElementById("filter-booking-search")?.value || "").trim().toLowerCase();
  const hotel = document.getElementById("filter-booking-hotel")?.value || "all";
  const status = document.getElementById("filter-booking-status")?.value || "all";

  const filtered = bookings.filter(b => {
    const matchSearch = !search ||
      b.bookingId.toLowerCase().includes(search) ||
      b.customerName.toLowerCase().includes(search) ||
      (b.customerPhone && b.customerPhone.includes(search));
    const matchHotel = hotel === "all" || b.hotelId === hotel;
    const matchStatus = status === "all" || b.status === status;
    return matchSearch && matchHotel && matchStatus;
  });

  const countDisplay = document.getElementById("booking-count-display");
  if (countDisplay) countDisplay.textContent = filtered.length;

  renderBookingsTable(filtered);
}

function renderBookingsTable(bookings) {
  const tbody = document.getElementById("bookings-table-tbody");
  if (!tbody) return;

  if (bookings.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; padding: 30px; color: #94a3b8;">Không tìm thấy đơn đặt phòng nào</td></tr>`;
    return;
  }

  tbody.innerHTML = bookings.map(b => `
    <tr>
      <td>
        <strong style="color: #0b1329;">${b.bookingId}</strong>
        <div style="font-size: 0.72rem; color: #64748b;">${formatDateDisplay(b.bookedAt || b.checkin)}</div>
      </td>
      <td>
        <div style="font-weight: 700; color: #0f172a;">${b.customerName}</div>
        <div style="font-size: 0.76rem; color: #0284c7;">${b.customerPhone}</div>
        ${b.customerEmail ? `<div style="font-size: 0.72rem; color: #64748b;">${b.customerEmail}</div>` : ""}
      </td>
      <td>
        <div style="font-weight: 700; color: #0070ba;">${b.hotelName}</div>
        <div style="font-size: 0.78rem; color: #475569;">${b.roomType}</div>
      </td>
      <td>
        ${b.roomNumber ? `<span style="background: #e0f2fe; color: #0369a1; padding: 2px 7px; border-radius: 4px; font-weight: 800; font-size: 0.8rem;">${b.roomNumber}</span>` : '<span style="color:#94a3b8; font-size: 0.76rem;">Chưa gán</span>'}
      </td>
      <td>
        <div style="font-size: 0.82rem; font-weight: 600;">${formatDateDisplay(b.checkin)} &rarr; ${formatDateDisplay(b.checkout)}</div>
      </td>
      <td>
        <div style="font-size: 0.8rem;">${b.nights} đêm</div>
        <div style="font-size: 0.74rem; color: #64748b;">${b.guests}</div>
      </td>
      <td><strong style="color: var(--admin-primary); font-size: 0.95rem;">${b.totalPrice}</strong></td>
      <td>
        <span style="font-size: 0.76rem; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #334155;">
          ${b.paymentMethod || "Tiền mặt"}
        </span>
      </td>
      <td>${renderStatusBadge(b.status)}</td>
      <td>
        <div class="table-actions">
          <button type="button" class="btn-table-action" title="Xem hóa đơn & In" onclick="openInvoiceModal('${b.bookingId}')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
          </button>
          ${b.status === "Đã xác nhận" ? `
            <button type="button" class="btn-table-action" title="Nhận phòng (Check-in)" style="color: #059669;" onclick="changeBookingStatus('${b.bookingId}', 'Đang lưu trú')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
            </button>
          ` : b.status === "Đang lưu trú" ? `
            <button type="button" class="btn-table-action" title="Trả phòng (Check-out)" style="color: #d97706;" onclick="changeBookingStatus('${b.bookingId}', 'Hoàn thành')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </button>
          ` : ""}
          ${b.status !== "Đã hủy" && b.status !== "Hoàn thành" ? `
            <button type="button" class="btn-table-action delete" title="Hủy đơn đặt phòng" onclick="changeBookingStatus('${b.bookingId}', 'Đã hủy')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            </button>
          ` : ""}
        </div>
      </td>
    </tr>
  `).join("");
}

function changeBookingStatus(bookingId, newStatus) {
  let bookings = getAdminBookings();
  const idx = bookings.findIndex(b => b.bookingId === bookingId);
  if (idx === -1) return;

  const oldStatus = bookings[idx].status;
  if (!confirm(`Bạn có chắc muốn chuyển trạng thái đơn ${bookingId} từ "${oldStatus}" sang "${newStatus}"?`)) {
    return;
  }

  bookings[idx].status = newStatus;
  saveAdminBookings(bookings);

  // Nếu chuyển sang Hoàn thành hoặc Đã hủy, giải phóng phòng tương ứng
  if (newStatus === "Hoàn thành" || newStatus === "Đã hủy") {
    let rooms = getAdminRooms();
    const room = rooms.find(r => r.bookingId === bookingId);
    if (room) {
      room.status = newStatus === "Hoàn thành" ? "cleaning" : "available";
      room.guestName = "";
      room.guestPhone = "";
      room.bookingId = "";
      saveAdminRooms(rooms);
    }
  }

  // Nếu chuyển sang Đang lưu trú, gán phòng nếu chưa có
  if (newStatus === "Đang lưu trú") {
    let rooms = getAdminRooms();
    let room = rooms.find(r => r.bookingId === bookingId);
    if (!room) {
      room = rooms.find(r => r.hotelId === bookings[idx].hotelId && r.status === "available");
      if (room) {
        room.status = "occupied";
        room.guestName = bookings[idx].customerName;
        room.guestPhone = bookings[idx].customerPhone;
        room.bookingId = bookingId;
        room.checkin = bookings[idx].checkin;
        room.checkout = bookings[idx].checkout;
        bookings[idx].roomNumber = room.roomNumber;
        saveAdminRooms(rooms);
        saveAdminBookings(bookings);
      }
    }
  }

  showAdminToast(`Đơn ${bookingId} đã cập nhật trạng thái: "${newStatus}"`);
  filterBookings();
  initDashboardData();
}

// Modal Walk-in (Đặt phòng tại quầy)
function openWalkinModal(preselectedRoomId = null) {
  const form = document.getElementById("form-walkin");
  if (form) form.reset();

  // Đặt ngày mặc định hôm nay & ngày mai
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const checkinStr = today.toISOString().split("T")[0];
  const checkoutStr = tomorrow.toISOString().split("T")[0];

  const inEl = document.getElementById("wi-checkin");
  const outEl = document.getElementById("wi-checkout");
  if (inEl) inEl.value = checkinStr;
  if (outEl) outEl.value = checkoutStr;

  updateWalkinRoomOptions(preselectedRoomId);
  openAdminModal("modal-walkin");
}

function updateWalkinRoomOptions(preselectedRoomId = null) {
  const hotelSelect = document.getElementById("wi-hotel-select");
  const roomSelect = document.getElementById("wi-room-select");
  if (!hotelSelect || !roomSelect) return;

  const hotelId = hotelSelect.value;
  const rooms = getAdminRooms();

  // Tìm các phòng trống của khách sạn này
  let availRooms = rooms.filter(r => r.hotelId === hotelId && r.status === "available");
  
  if (availRooms.length === 0) {
    roomSelect.innerHTML = `<option value="">-- Hết phòng trống cho khách sạn này --</option>`;
    calculateWalkinTotal();
    return;
  }

  roomSelect.innerHTML = availRooms.map(r => `
    <option value="${r.id}" data-price="${r.price}" data-room-type="${r.roomType}" data-room-num="${r.roomNumber}" ${r.id === preselectedRoomId ? 'selected' : ''}>
      ${r.roomNumber} - ${r.roomType} (${formatCurrencyVND(r.price)}/đêm)
    </option>
  `).join("");

  calculateWalkinTotal();
}

function calculateWalkinTotal() {
  const roomSelect = document.getElementById("wi-room-select");
  const inEl = document.getElementById("wi-checkin");
  const outEl = document.getElementById("wi-checkout");
  const descEl = document.getElementById("wi-calc-desc");
  const totalEl = document.getElementById("wi-calc-total");

  if (!roomSelect || !inEl || !outEl || !descEl || !totalEl) return;

  const selectedOpt = roomSelect.options[roomSelect.selectedIndex];
  if (!selectedOpt || !selectedOpt.value) {
    descEl.textContent = "0 đêm";
    totalEl.textContent = "0 ₫";
    return;
  }

  const price = parseInt(selectedOpt.getAttribute("data-price") || 0);
  const inDate = new Date(inEl.value);
  const outDate = new Date(outEl.value);

  let nights = Math.round((outDate - inDate) / (1000 * 60 * 60 * 24));
  if (isNaN(nights) || nights <= 0) nights = 1;

  const total = price * nights;
  descEl.textContent = `${nights} đêm &times; ${formatCurrencyVND(price)}`;
  totalEl.textContent = formatCurrencyVND(total);
}

function handleWalkinSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("wi-customer-name").value.trim();
  const phone = document.getElementById("wi-customer-phone").value.trim();
  const email = document.getElementById("wi-customer-email").value.trim();
  const hotelSelect = document.getElementById("wi-hotel-select");
  const hotelId = hotelSelect.value;
  const hotelName = hotelSelect.options[hotelSelect.selectedIndex].text;
  const roomSelect = document.getElementById("wi-room-select");
  const selectedOpt = roomSelect.options[roomSelect.selectedIndex];

  if (!selectedOpt || !selectedOpt.value) {
    alert("Vui lòng chọn một phòng trống khả dụng!");
    return;
  }

  const roomId = selectedOpt.value;
  const roomType = selectedOpt.getAttribute("data-room-type");
  const roomNumber = selectedOpt.getAttribute("data-room-num");
  const price = parseInt(selectedOpt.getAttribute("data-price") || 0);
  const guests = document.getElementById("wi-guests-count").value.trim() || "2 người lớn";
  const checkin = document.getElementById("wi-checkin").value;
  const checkout = document.getElementById("wi-checkout").value;
  const paymentMethod = document.getElementById("wi-payment-method").value;
  const status = document.getElementById("wi-booking-status").value;
  const note = document.getElementById("wi-note").value.trim();

  const inDate = new Date(checkin);
  const outDate = new Date(checkout);
  let nights = Math.round((outDate - inDate) / (1000 * 60 * 60 * 24));
  if (nights <= 0) nights = 1;

  const rawAmount = price * nights;
  const bookingId = "LT-HN-" + Math.floor(10000 + Math.random() * 90000);

  const newBooking = {
    bookingId,
    customerName: name,
    customerPhone: phone,
    customerEmail: email || "khach.vanglai@lottehotel.vn",
    hotelId,
    hotelName,
    roomNumber,
    roomType,
    checkin,
    checkout,
    nights,
    guests,
    rooms: 1,
    totalPrice: formatCurrencyVND(rawAmount),
    rawAmount,
    status,
    paymentMethod,
    bookedAt: new Date().toISOString(),
    note
  };

  // 1. Thêm vào all bookings
  let bookings = getAdminBookings();
  bookings.unshift(newBooking);
  saveAdminBookings(bookings);

  // 2. Cập nhật trạng thái phòng sang occupied nếu nhận phòng ngay
  let rooms = getAdminRooms();
  const rIdx = rooms.findIndex(r => r.id === roomId);
  if (rIdx !== -1) {
    if (status === "Đang lưu trú") {
      rooms[rIdx].status = "occupied";
      rooms[rIdx].guestName = name;
      rooms[rIdx].guestPhone = phone;
      rooms[rIdx].bookingId = bookingId;
      rooms[rIdx].checkin = checkin;
      rooms[rIdx].checkout = checkout;
    }
    saveAdminRooms(rooms);
  }

  // 3. Thêm thông báo
  const notifs = getAdminNotifications();
  notifs.unshift({
    id: "notif_" + Date.now(),
    title: "Đặt phòng tại quầy thành công",
    desc: `${name} nhận phòng ${roomNumber} (${formatCurrencyVND(rawAmount)})`,
    time: "Vừa xong",
    type: "booking",
    read: false
  });
  saveAdminNotifications(notifs);

  closeAdminModal("modal-walkin");
  showAdminToast(`Tạo đơn ${bookingId} thành công cho khách ${name}!`);
  filterBookings();
  initDashboardData();
}

function exportBookingsToCSV() {
  const bookings = getAdminBookings();
  if (bookings.length === 0) {
    alert("Không có dữ liệu để xuất file!");
    return;
  }

  let csv = "Mã Đặt Phòng,Khách Hàng,Số Điện Thoại,Email,Khách Sạn,Hạng Phòng,Số Phòng,Ngày Nhận,Ngày Trả,Số Đêm,Tổng Tiền,Thanh Toán,Trạng Thái,Ghi Chú\n";
  bookings.forEach(b => {
    const row = [
      `"${b.bookingId}"`,
      `"${b.customerName}"`,
      `"${b.customerPhone || ''}"`,
      `"${b.customerEmail || ''}"`,
      `"${b.hotelName}"`,
      `"${b.roomType}"`,
      `"${b.roomNumber || ''}"`,
      `"${b.checkin}"`,
      `"${b.checkout}"`,
      b.nights,
      `"${b.totalPrice}"`,
      `"${b.paymentMethod || ''}"`,
      `"${b.status}"`,
      `"${(b.note || '').replace(/"/g, '""')}"`
    ];
    csv += row.join(",") + "\n";
  });

  downloadCSV(csv, `Danh_Sach_Dat_Phong_${new Date().toISOString().slice(0, 10)}.csv`);
  showAdminToast("Đã tải xuống file CSV danh sách đặt phòng!");
}

// ========================================================
// 9. SECTION 5: BÁO CÁO DOANH THU & TÀI CHÍNH (REVENUE)
// ========================================================

function renderRevenueSection() {
  const bookings = getAdminBookings();
  const rooms = getAdminRooms();

  // 1. Phân loại doanh thu
  const collectedBookings = bookings.filter(b => b.status === "Đang lưu trú" || b.status === "Hoàn thành");
  const pendingBookings = bookings.filter(b => b.status === "Đã xác nhận");

  const totalCollected = collectedBookings.reduce((sum, b) => sum + (b.rawAmount || parseInt((b.totalPrice || "0").replace(/\D/g, "")) || 0), 0);
  const totalPending = pendingBookings.reduce((sum, b) => sum + (b.rawAmount || parseInt((b.totalPrice || "0").replace(/\D/g, "")) || 0), 0);

  // ADR: Average Daily Rate = Doanh thu / Tổng số đêm bán được
  const totalNightsSold = collectedBookings.reduce((sum, b) => sum + (b.nights || 1), 0);
  const adr = totalNightsSold > 0 ? Math.round(totalCollected / totalNightsSold) : 2750000;

  // RevPAR: Doanh thu / Tổng số phòng khả dụng
  const revpar = rooms.length > 0 ? Math.round(totalCollected / rooms.length) : 0;

  document.getElementById("rev-total-collected").textContent = formatCurrencyVND(totalCollected);
  document.getElementById("rev-total-pending").textContent = formatCurrencyVND(totalPending);
  document.getElementById("rev-adr").textContent = formatCurrencyVND(adr);
  document.getElementById("rev-revpar").textContent = formatCurrencyVND(revpar);

  // 2. Cơ cấu theo phương thức thanh toán
  const paymentMap = {};
  collectedBookings.forEach(b => {
    const method = b.paymentMethod || "Tiền mặt tại quầy";
    paymentMap[method] = (paymentMap[method] || 0) + (b.rawAmount || parseInt((b.totalPrice || "0").replace(/\D/g, "")) || 0);
  });

  const payListEl = document.getElementById("rev-payment-breakdown-list");
  if (payListEl) {
    payListEl.innerHTML = Object.keys(paymentMap).map(method => {
      const amt = paymentMap[method];
      const pct = totalCollected > 0 ? Math.round((amt / totalCollected) * 100) : 0;
      return `
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; margin-bottom: 4px;">
            <span>💳 ${method}</span>
            <span style="color: var(--admin-primary);">${formatCurrencyVND(amt)} (${pct}%)</span>
          </div>
          <div style="width: 100%; height: 8px; background: #f1f5f9; border-radius: 99px; overflow: hidden;">
            <div style="width: ${pct}%; height: 100%; background: var(--admin-primary); border-radius: 99px;"></div>
          </div>
        </div>
      `;
    }).join("");
  }

  // 3. Cơ cấu theo khách sạn
  const hotelMap = {};
  collectedBookings.forEach(b => {
    const h = b.hotelName || "Khác";
    hotelMap[h] = (hotelMap[h] || 0) + (b.rawAmount || parseInt((b.totalPrice || "0").replace(/\D/g, "")) || 0);
  });

  const hotelListEl = document.getElementById("rev-hotel-breakdown-list");
  if (hotelListEl) {
    hotelListEl.innerHTML = Object.keys(hotelMap).map(hName => {
      const amt = hotelMap[hName];
      const pct = totalCollected > 0 ? Math.round((amt / totalCollected) * 100) : 0;
      return `
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; margin-bottom: 4px;">
            <span>🏨 ${hName}</span>
            <span style="color: var(--admin-gold-dark);">${formatCurrencyVND(amt)} (${pct}%)</span>
          </div>
          <div style="width: 100%; height: 8px; background: #f1f5f9; border-radius: 99px; overflow: hidden;">
            <div style="width: ${pct}%; height: 100%; background: var(--admin-gold); border-radius: 99px;"></div>
          </div>
        </div>
      `;
    }).join("");
  }

  // 4. Bảng kê chi tiết giao dịch
  const transTbody = document.getElementById("revenue-transactions-tbody");
  if (transTbody) {
    transTbody.innerHTML = bookings.map(b => `
      <tr>
        <td><strong>${b.bookingId}</strong></td>
        <td>${formatDateDisplay(b.bookedAt || b.checkin)}</td>
        <td><strong>${b.customerName}</strong></td>
        <td>${b.hotelName} - ${b.roomType}</td>
        <td>${b.nights} đêm</td>
        <td><span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 0.76rem;">${b.paymentMethod || "Tiền mặt"}</span></td>
        <td><strong style="color: var(--admin-primary);">${b.totalPrice}</strong></td>
        <td>
          ${b.status === 'Đã hủy' ? '<span class="status-badge cancelled">Không thu (Đã hủy)</span>' : b.status === 'Đã xác nhận' ? '<span class="status-badge confirmed">Chờ thu (Khi nhận phòng)</span>' : '<span class="status-badge completed">Đã thu tiền</span>'}
        </td>
      </tr>
    `).join("");
  }
}

function exportRevenueReportCSV() {
  const bookings = getAdminBookings();
  let csv = "Mã Giao Dịch,Ngày Đặt,Khách Hàng,Khách Sạn,Hạng Phòng,Số Đêm,Phương Thức Thanh Toán,Số Tiền,Trạng Thái Thu\n";
  bookings.forEach(b => {
    csv += `"${b.bookingId}","${b.bookedAt || b.checkin}","${b.customerName}","${b.hotelName}","${b.roomType}",${b.nights},"${b.paymentMethod || ''}","${b.totalPrice}","${b.status}"\n`;
  });
  downloadCSV(csv, `Bao_Cao_Doanh_Thu_${new Date().toISOString().slice(0, 10)}.csv`);
  showAdminToast("Đã xuất báo cáo doanh thu CSV thành công!");
}

// ========================================================
// 10. SECTION 6: QUẢN LÝ KHÁCH HÀNG (CUSTOMERS)
// ========================================================

function renderCustomersTable() {
  const tbody = document.getElementById("customers-table-tbody");
  if (!tbody) return;

  const users = typeof getHotelUsersArray === "function" ? getHotelUsersArray() : [];
  const bookings = getAdminBookings();

  if (users.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 24px; color: #94a3b8;">Chưa có tài khoản khách hàng nào</td></tr>`;
    return;
  }

  tbody.innerHTML = users.map(u => {
    // Tính tổng số lượt đặt và tổng chi tiêu của user này
    const userBookings = bookings.filter(b => b.customerPhone === u.phone || b.customerEmail === u.email);
    const totalSpent = userBookings.reduce((sum, b) => sum + (b.rawAmount || parseInt((b.totalPrice || "0").replace(/\D/g, "")) || 0), 0);

    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem;">
              ${(u.fullName || "K").charAt(0).toUpperCase()}
            </div>
            <strong>${u.fullName}</strong>
          </div>
        </td>
        <td>${u.email}</td>
        <td><strong>${u.phone}</strong></td>
        <td>
          <span style="background: #fef3c7; color: #92400e; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 0.78rem;">
            ${u.role || "Khách hàng Mới"}
          </span>
        </td>
        <td><strong style="color: var(--admin-primary);">${userBookings.length} lượt</strong></td>
        <td><strong style="color: #059669;">${formatCurrencyVND(totalSpent)}</strong></td>
        <td>${formatDateDisplay(u.createdAt || "2026-09-01")}</td>
        <td>
          <button type="button" class="btn btn-outline" style="font-size: 0.74rem; padding: 3px 8px;" onclick="viewCustomerBookings('${u.phone}')">
            Xem lịch sử đặt
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function viewCustomerBookings(phone) {
  switchSection("section-bookings");
  const searchInput = document.getElementById("filter-booking-search");
  if (searchInput) {
    searchInput.value = phone;
    filterBookings();
  }
}

function openAddCustomerModal() {
  document.getElementById("form-customer").reset();
  openAdminModal("modal-customer");
}

function handleSaveCustomerSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("cust-name").value.trim();
  const email = document.getElementById("cust-email").value.trim();
  const phone = document.getElementById("cust-phone").value.trim();
  const tier = document.getElementById("cust-tier").value;

  const users = typeof getHotelUsersArray === "function" ? getHotelUsersArray() : [];
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    alert("Email này đã tồn tại trong hệ thống!");
    return;
  }

  const newUser = {
    id: "usr_" + Date.now(),
    fullName: name,
    email,
    phone,
    password: "123",
    role: tier,
    createdAt: new Date().toISOString(),
    bookings: [],
    wishlist: []
  };

  users.push(newUser);
  if (typeof saveHotelUsersArray === "function") saveHotelUsersArray(users);

  closeAdminModal("modal-customer");
  showAdminToast(`Đã thêm khách hàng ${name}`);
  renderCustomersTable();
}

// ========================================================
// 11. SECTION 7: VOUCHER & KHUYẾN MÃI (PROMOS)
// ========================================================

function renderPromosTable() {
  const tbody = document.getElementById("promos-table-tbody");
  if (!tbody) return;

  const promos = getAdminPromos();
  if (promos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 24px; color: #94a3b8;">Chưa có mã giảm giá nào</td></tr>`;
    return;
  }

  tbody.innerHTML = promos.map(p => `
    <tr>
      <td>
        <strong style="color: var(--admin-primary); background: #e0f2fe; padding: 4px 8px; border-radius: 4px; letter-spacing: 0.5px;">
          ${p.code}
        </strong>
      </td>
      <td>${p.discountType === 'percent' ? 'Phần trăm (%)' : 'Cố định (VNĐ)'}</td>
      <td><strong>${p.discountType === 'percent' ? p.discountValue + '%' : formatCurrencyVND(p.discountValue)}</strong></td>
      <td>${formatCurrencyVND(p.minSpend)}</td>
      <td>${formatCurrencyVND(p.maxDiscount)}</td>
      <td>${formatDateDisplay(p.expiryDate)}</td>
      <td><strong>${p.usageCount || 0} lần</strong></td>
      <td>
        ${p.isActive ? '<span class="status-badge available">Đang hoạt động</span>' : '<span class="status-badge maintenance">Tạm tắt</span>'}
      </td>
      <td style="white-space: nowrap;">
        <button type="button" class="btn" style="font-size: 0.74rem; padding: 4px 8px; background: #e0f2fe; color: #0284c7; border: 1px solid #bae6fd; border-radius: 4px;" onclick="openEditPromoModal('${p.id}')" title="Chỉnh sửa thông tin voucher">
          Sửa
        </button>
        <button type="button" class="btn btn-outline" style="font-size: 0.74rem; padding: 4px 8px; margin-left: 4px;" onclick="togglePromoStatus('${p.id}')" title="${p.isActive ? 'Tạm tắt mã này' : 'Kích hoạt lại mã'}">
          ${p.isActive ? 'Tắt' : 'Bật'}
        </button>
        <button type="button" class="btn" style="font-size: 0.74rem; padding: 4px 8px; margin-left: 4px; background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; border-radius: 4px;" onclick="deletePromo('${p.id}')" title="Xóa vĩnh viễn voucher">
          Xóa
        </button>
      </td>
    </tr>
  `).join("");
}

function openAddPromoModal() {
  document.getElementById("form-promo").reset();
  const idInput = document.getElementById("promo-id");
  if (idInput) idInput.value = "";
  const modalTitle = document.getElementById("promo-modal-title");
  if (modalTitle) modalTitle.textContent = "Tạo Mã Giảm Giá Mới";
  const submitBtn = document.getElementById("btn-promo-submit");
  if (submitBtn) submitBtn.textContent = "Tạo Mã Giảm Giá";
  openAdminModal("modal-promo");
}

function openEditPromoModal(promoId) {
  const promos = getAdminPromos();
  const p = promos.find(item => item.id === promoId);
  if (!p) return;

  const idInput = document.getElementById("promo-id");
  const codeInput = document.getElementById("promo-code");
  const typeSelect = document.getElementById("promo-type");
  const valueInput = document.getElementById("promo-value");
  const minInput = document.getElementById("promo-min");
  const maxInput = document.getElementById("promo-max");
  const expiryInput = document.getElementById("promo-expiry");
  const modalTitle = document.getElementById("promo-modal-title");
  const submitBtn = document.getElementById("btn-promo-submit");

  if (idInput) idInput.value = p.id;
  if (codeInput) codeInput.value = p.code;
  if (typeSelect) typeSelect.value = p.discountType || "percent";
  if (valueInput) valueInput.value = p.discountValue || 10;
  if (minInput) minInput.value = p.minSpend || 0;
  if (maxInput) maxInput.value = p.maxDiscount || 0;
  if (expiryInput) expiryInput.value = p.expiryDate || "2026-12-31";

  if (modalTitle) modalTitle.textContent = `Chỉnh Sửa Voucher: ${p.code}`;
  if (submitBtn) submitBtn.textContent = "Lưu Thay Đổi";

  openAdminModal("modal-promo");
}

function handleSavePromoSubmit(e) {
  e.preventDefault();
  const promoId = document.getElementById("promo-id") ? document.getElementById("promo-id").value.trim() : "";
  const code = document.getElementById("promo-code").value.trim().toUpperCase();
  const type = document.getElementById("promo-type").value;
  const val = parseInt(document.getElementById("promo-value").value) || 10;
  const minSpend = parseInt(document.getElementById("promo-min").value) || 0;
  const maxDiscount = parseInt(document.getElementById("promo-max").value) || 0;
  const expiryDate = document.getElementById("promo-expiry").value;

  let promos = getAdminPromos();

  if (promoId) {
    // Chế độ CHỈNH SỬA (EDIT)
    const idx = promos.findIndex(p => p.id === promoId);
    if (idx === -1) return;

    // Kiểm tra xem có trùng mã với voucher khác không
    if (promos.some(p => p.code === code && p.id !== promoId)) {
      alert(`Mã giảm giá "${code}" đã tồn tại cho một voucher khác! Vui lòng chọn mã khác.`);
      return;
    }

    promos[idx].code = code;
    promos[idx].discountType = type;
    promos[idx].discountValue = val;
    promos[idx].minSpend = minSpend;
    promos[idx].maxDiscount = maxDiscount;
    promos[idx].expiryDate = expiryDate;

    saveAdminPromos(promos);
    closeAdminModal("modal-promo");
    showAdminToast(`Đã cập nhật thành công voucher ${code}`);
    renderPromosTable();
  } else {
    // Chế độ TẠO MỚI (CREATE)
    if (promos.some(p => p.code === code)) {
      alert("Mã này đã tồn tại! Vui lòng chọn mã khác.");
      return;
    }

    promos.unshift({
      id: "prm_" + Date.now(),
      code,
      discountType: type,
      discountValue: val,
      minSpend,
      maxDiscount,
      expiryDate,
      usageCount: 0,
      isActive: true
    });

    saveAdminPromos(promos);
    closeAdminModal("modal-promo");
    showAdminToast(`Đã tạo thành công mã giảm giá ${code}`);
    renderPromosTable();
  }
}

function togglePromoStatus(promoId) {
  let promos = getAdminPromos();
  const idx = promos.findIndex(p => p.id === promoId);
  if (idx === -1) return;

  promos[idx].isActive = !promos[idx].isActive;
  saveAdminPromos(promos);
  renderPromosTable();
  showAdminToast(`Đã cập nhật mã ${promos[idx].code}: ${promos[idx].isActive ? 'Kích hoạt' : 'Tạm tắt'}`);
}

function deletePromo(promoId) {
  let promos = getAdminPromos();
  const p = promos.find(item => item.id === promoId);
  if (!p) return;
  if (!confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn mã khuyến mãi "${p.code}" không?`)) return;

  promos = promos.filter(item => item.id !== promoId);
  saveAdminPromos(promos);
  renderPromosTable();
  showAdminToast(`Đã xóa vĩnh viễn voucher ${p.code}`);
}

// ========================================================
// 12. SECTION 9: PHẢN HỒI & LIÊN HỆ CỦA KHÁCH HÀNG (CONTACTS)
// ========================================================

function renderContactsTable(customList = null) {
  const tbody = document.getElementById("contacts-table-tbody");
  if (!tbody) return;

  const contacts = customList !== null ? customList : getAdminContacts();

  // Cập nhật thống kê
  const allContacts = getAdminContacts();
  const totalEl = document.getElementById("stat-total-contacts");
  const pendingEl = document.getElementById("stat-pending-contacts");
  const resolvedEl = document.getElementById("stat-resolved-contacts");

  const pendingCount = allContacts.filter(c => c.status === "Chờ xử lý").length;
  const resolvedCount = allContacts.filter(c => c.status === "Đã xử lý").length;

  if (totalEl) totalEl.textContent = allContacts.length;
  if (pendingEl) pendingEl.textContent = pendingCount;
  if (resolvedEl) resolvedEl.textContent = resolvedCount;

  updateContactsBadge();

  if (contacts.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 28px; color: #94a3b8;">Không có tin nhắn phản hồi nào phù hợp</td></tr>`;
    return;
  }

  tbody.innerHTML = contacts.map(c => {
    const isPending = c.status === "Chờ xử lý";
    const statusBadge = isPending
      ? `<span class="status-badge cleaning" style="cursor: pointer;" onclick="toggleContactStatus('${c.id}')" title="Bấm để chuyển sang Đã xử lý">⏳ Chờ xử lý</span>`
      : `<span class="status-badge completed" style="cursor: pointer;" onclick="toggleContactStatus('${c.id}')" title="Bấm để chuyển sang Chờ xử lý">✓ Đã xử lý</span>`;

    const shortMsg = c.message && c.message.length > 55 ? c.message.substring(0, 55) + "..." : (c.message || "");

    return `
      <tr>
        <td>
          <strong style="color: var(--admin-primary); font-size: 0.82rem;">${c.id}</strong>
        </td>
        <td>
          <div style="font-weight: 600; color: #1e293b;">${c.name || 'Khách vãng lai'}</div>
        </td>
        <td>
          <a href="tel:${c.phone}" style="color: var(--admin-primary); font-weight: 500;">${c.phone || 'Chưa cung cấp'}</a>
        </td>
        <td>
          <a href="mailto:${c.email}" style="color: #64748b; font-size: 0.82rem;">${c.email || 'Chưa cung cấp'}</a>
        </td>
        <td style="max-width: 240px; font-size: 0.84rem; color: #334155; line-height: 1.4;">
          ${shortMsg}
        </td>
        <td style="font-size: 0.78rem; color: #64748b; white-space: nowrap;">
          ${c.sentAt || 'Vừa xong'}
        </td>
        <td>
          ${statusBadge}
        </td>
        <td style="text-align: center; white-space: nowrap;">
          <button type="button" class="btn btn-outline" style="font-size: 0.74rem; padding: 4px 8px;" onclick="openContactDetailModal('${c.id}')" title="Xem chi tiết nội dung">
            Chi tiết
          </button>
          <button type="button" class="btn" style="font-size: 0.74rem; padding: 4px 8px; margin-left: 4px; background: ${isPending ? '#e0f2fe; color: #0369a1;' : '#f1f5f9; color: #64748b;'} border: 1px solid #cbd5e1; border-radius: 4px;" onclick="toggleContactStatus('${c.id}')" title="${isPending ? 'Đánh dấu đã xử lý' : 'Đánh dấu chờ xử lý'}">
            ${isPending ? 'Xong' : 'Chờ'}
          </button>
          <button type="button" class="btn" style="font-size: 0.74rem; padding: 4px 8px; margin-left: 4px; background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; border-radius: 4px;" onclick="deleteContact('${c.id}')" title="Xóa tin nhắn này">
            Xóa
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function handleContactSearch() {
  const searchInput = document.getElementById("contact-search-input");
  const filterSelect = document.getElementById("contact-filter-status");
  const q = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const statusFilter = filterSelect ? filterSelect.value : "all";

  let contacts = getAdminContacts();

  if (statusFilter === "pending") {
    contacts = contacts.filter(c => c.status === "Chờ xử lý");
  } else if (statusFilter === "resolved") {
    contacts = contacts.filter(c => c.status === "Đã xử lý");
  }

  if (q) {
    contacts = contacts.filter(c => 
      (c.id && c.id.toLowerCase().includes(q)) ||
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.phone && c.phone.toLowerCase().includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.message && c.message.toLowerCase().includes(q))
    );
  }

  renderContactsTable(contacts);
}

function toggleContactStatus(id) {
  let contacts = getAdminContacts();
  const idx = contacts.findIndex(c => c.id === id);
  if (idx === -1) return;

  const current = contacts[idx].status;
  contacts[idx].status = current === "Chờ xử lý" ? "Đã xử lý" : "Chờ xử lý";
  saveAdminContacts(contacts);
  handleContactSearch();
  showAdminToast(`Đã đổi trạng thái tin "${id}" sang: ${contacts[idx].status}`);
}

function deleteContact(id) {
  let contacts = getAdminContacts();
  const c = contacts.find(item => item.id === id);
  if (!c) return;
  if (!confirm(`Bạn có chắc chắn muốn xóa phản hồi của khách hàng "${c.name || id}"?`)) return;

  contacts = contacts.filter(item => item.id !== id);
  saveAdminContacts(contacts);
  handleContactSearch();
  showAdminToast(`Đã xóa phản hồi ${id}`);
}

function openContactDetailModal(id) {
  const contacts = getAdminContacts();
  const c = contacts.find(item => item.id === id);
  if (!c) return;

  const bodyEl = document.getElementById("contact-modal-body");
  const footerEl = document.getElementById("contact-modal-footer");
  if (!bodyEl) return;

  const isPending = c.status === "Chờ xử lý";

  bodyEl.innerHTML = `
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
        <span style="font-size: 0.85rem; color: #64748b;">Mã yêu cầu: <strong style="color: var(--admin-primary);">${c.id}</strong></span>
        <span class="status-badge ${isPending ? 'cleaning' : 'completed'}">${c.status}</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.88rem; margin-bottom: 12px;">
        <div><strong>Khách hàng:</strong> ${c.name || 'Không rõ'}</div>
        <div><strong>Thời gian:</strong> ${c.sentAt || 'N/A'}</div>
        <div><strong>Số điện thoại:</strong> <a href="tel:${c.phone}">${c.phone || 'Chưa cung cấp'}</a></div>
        <div><strong>Email:</strong> <a href="mailto:${c.email}">${c.email || 'Chưa cung cấp'}</a></div>
      </div>
      <div style="margin-top: 10px;">
        <div style="font-weight: 600; font-size: 0.88rem; margin-bottom: 6px; color: #1e293b;">Nội dung phản hồi / Yêu cầu:</div>
        <div style="background: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; font-size: 0.9rem; line-height: 1.6; color: #334155; white-space: pre-wrap;">${c.message || 'Không có nội dung'}</div>
      </div>
    </div>
    
    <div class="form-group" style="margin-bottom: 0;">
      <label class="form-label" for="contact-reply-note">Ghi chú xử lý / Nội dung phản hồi của ban quản lý:</label>
      <textarea id="contact-reply-note" class="form-control" rows="3" placeholder="Nhập ghi chú hỗ trợ khách hàng hoặc nội dung đã phản hồi qua điện thoại / email...">${c.replyNote || ''}</textarea>
    </div>
  `;

  if (footerEl) {
    footerEl.innerHTML = `
      <button type="button" class="btn btn-outline" onclick="closeAdminModal('modal-contact-detail')">Đóng</button>
      <button type="button" class="btn" style="background: ${isPending ? '#10b981; color: white;' : '#f59e0b; color: white;'}" onclick="saveContactReply('${c.id}', true)">
        ${isPending ? '✓ Đánh Dấu Đã Xử Lý & Lưu' : '↩ Chuyển Về Chờ Xử Lý & Lưu'}
      </button>
      <button type="button" class="btn btn-primary" onclick="saveContactReply('${c.id}', false)">
        Lưu Ghi Chú
      </button>
    `;
  }

  openAdminModal("modal-contact-detail");
}

function saveContactReply(id, toggleStatus = false) {
  let contacts = getAdminContacts();
  const idx = contacts.findIndex(c => c.id === id);
  if (idx === -1) return;

  const noteInput = document.getElementById("contact-reply-note");
  if (noteInput) {
    contacts[idx].replyNote = noteInput.value.trim();
  }

  if (toggleStatus) {
    contacts[idx].status = contacts[idx].status === "Chờ xử lý" ? "Đã xử lý" : "Chờ xử lý";
  }

  saveAdminContacts(contacts);
  closeAdminModal("modal-contact-detail");
  handleContactSearch();
  showAdminToast(`Đã cập nhật phản hồi "${id}"`);
}

// ========================================================
// 13. SECTION 8: CẤU HÌNH & SAO LƯU DỮ LIỆU (SETTINGS)
// ========================================================

function confirmResetDemoData() {
  if (confirm("CẢNH BÁO: Thao tác này sẽ khôi phục lại toàn bộ dữ liệu mẫu ban đầu (Phòng, Đặt phòng, Doanh thu, Khách hàng, Phản hồi). Bạn có chắc muốn thực hiện?")) {
    localStorage.removeItem("traveloka_hotel_rooms");
    localStorage.removeItem("traveloka_all_bookings");
    localStorage.removeItem("traveloka_hotel_promos");
    localStorage.removeItem("traveloka_admin_notifications");
    localStorage.removeItem("LOTTE_CONTACT_MESSAGES");

    saveAdminRooms(DEFAULT_HOTEL_ROOMS);
    saveAdminBookings(DEFAULT_ALL_BOOKINGS);
    saveAdminPromos(DEFAULT_PROMOS);
    saveAdminNotifications(DEFAULT_NOTIFICATIONS);
    saveAdminContacts(DEFAULT_CONTACT_MESSAGES);

    alert("Đã khôi phục toàn bộ dữ liệu mẫu chuẩn 5 sao ban đầu thành công!");
    window.location.reload();
  }
}

function exportFullSystemJSON() {
  const exportData = {
    exportedAt: new Date().toISOString(),
    hotel: "Lotte Hotel Hanoi",
    rooms: getAdminRooms(),
    bookings: getAdminBookings(),
    promos: getAdminPromos(),
    contacts: getAdminContacts(),
    users: typeof getHotelUsersArray === "function" ? getHotelUsersArray() : []
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `Lotte_Hotel_Backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();

  showAdminToast("Đã tải xuống file sao lưu hệ thống JSON!");
}

function importFullSystemJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.rooms && Array.isArray(data.rooms)) {
        saveAdminRooms(data.rooms);
      }
      if (data.bookings && Array.isArray(data.bookings)) {
        saveAdminBookings(data.bookings);
      }
      if (data.promos && Array.isArray(data.promos)) {
        saveAdminPromos(data.promos);
      }
      if (data.users && Array.isArray(data.users) && typeof saveHotelUsersArray === "function") {
        saveHotelUsersArray(data.users);
      }

      alert("Nhập dữ liệu thành công! Trang sẽ được làm mới ngay bây giờ.");
      window.location.reload();
    } catch (err) {
      alert("Tệp JSON không hợp lệ hoặc bị lỗi cấu trúc!");
    }
  };
  reader.readAsText(file);
}

// ========================================================
// 13. MODAL HÓA ĐƠN & PHIẾU ĐẶT PHÒNG (INVOICE)
// ========================================================

function openInvoiceModal(bookingId) {
  const bookings = getAdminBookings();
  const b = bookings.find(item => item.bookingId === bookingId);
  if (!b) return;

  const contentEl = document.getElementById("invoice-printable-content");
  if (!contentEl) return;

  const raw = b.rawAmount || parseInt((b.totalPrice || "0").replace(/\D/g, "")) || 0;
  const netAmount = Math.round(raw / 1.08);
  const vatAmount = raw - netAmount;

  contentEl.innerHTML = `
    <div class="invoice-card">
      <div class="invoice-header">
        <div class="invoice-brand">
          <h2>LOTTE HOTEL <span>HANOI</span></h2>
          <p>54 Liễu Giai, Phường Cống Vị, Quận Ba Đình, Hà Nội</p>
          <p>Hotline: 1900 6006 | Email: reservation@lottehotel.vn</p>
        </div>
        <div class="invoice-meta">
          <div class="invoice-meta-code">MÃ ĐƠN: ${b.bookingId}</div>
          <div class="invoice-meta-date">Ngày lập: ${formatDateDisplay(b.bookedAt || new Date().toISOString())}</div>
          <div style="margin-top: 6px;">${renderStatusBadge(b.status)}</div>
        </div>
      </div>

      <div class="invoice-info-grid">
        <div class="invoice-info-block">
          <h4>Thông Tin Khách Hàng</h4>
          <p><strong>${b.customerName}</strong></p>
          <p>Điện thoại: ${b.customerPhone}</p>
          <p>Email: ${b.customerEmail || 'N/A'}</p>
        </div>

        <div class="invoice-info-block">
          <h4>Chi Tiết Lưu Trú</h4>
          <p>Khách sạn: <strong>${b.hotelName}</strong></p>
          <p>Hạng phòng: <strong>${b.roomType} ${b.roomNumber ? `(Số phòng: ${b.roomNumber})` : ''}</strong></p>
          <p>Nhận phòng: ${formatDateDisplay(b.checkin)} (Từ 14:00)</p>
          <p>Trả phòng: ${formatDateDisplay(b.checkout)} (Trước 12:00)</p>
          <p>Thời lượng: ${b.nights} đêm &bull; Số khách: ${b.guests}</p>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <table class="admin-table" style="border: 1px solid var(--admin-border); border-radius: 8px;">
          <thead>
            <tr>
              <th>Khoản Mục Dịch Vụ</th>
              <th>Đơn Giá / Đêm</th>
              <th>Số Đêm</th>
              <th style="text-align: right;">Thành Tiền (Trước thuế)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Dịch vụ lưu trú phòng ${b.roomType}</strong>
                <div style="font-size: 0.75rem; color: #64748b;">Đã bao gồm buffet sáng 5 sao, hồ bơi bốn mùa và wifi tốc độ cao</div>
              </td>
              <td>${formatCurrencyVND(Math.round(netAmount / (b.nights || 1)))}</td>
              <td>${b.nights} đêm</td>
              <td style="text-align: right; font-weight: 700;">${formatCurrencyVND(netAmount)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-size: 0.8rem; color: #64748b;">Hình thức thanh toán: <strong>${b.paymentMethod || "Tiền mặt tại quầy"}</strong></div>
          <div style="font-size: 0.78rem; color: #64748b; margin-top: 4px;">Ghi chú: ${b.note || "Không có yêu cầu đặc biệt"}</div>
        </div>

        <div style="min-width: 260px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
            <span>Tiền phòng:</span>
            <span>${formatCurrencyVND(netAmount)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 8px; color: #64748b;">
            <span>Thuế GTGT & Phí dịch vụ (8%):</span>
            <span>${formatCurrencyVND(vatAmount)}</span>
          </div>
          <div class="invoice-summary-box">
            <div class="invoice-total-row" style="width: 100%;">
              <span>TỔNG CỘNG:</span>
              <span>${b.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 30px; text-align: center; border-top: 1px dashed var(--admin-border); padding-top: 18px; font-size: 0.78rem; color: #94a3b8;">
        Cảm ơn Quý khách đã lựa chọn dịch vụ của Hệ Thống Khách Sạn Lotte Hotel Hanoi & Đối Tác Traveloka!
      </div>
    </div>
  `;

  openAdminModal("modal-invoice");
}

// ========================================================
// 14. HELPER UTILS & TOAST
// ========================================================

function openAdminModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("active");
}

function closeAdminModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
}

function renderStatusBadge(status) {
  if (status === "Đang lưu trú") {
    return `<span class="status-badge occupied">🔵 Đang lưu trú</span>`;
  } else if (status === "Đã xác nhận") {
    return `<span class="status-badge confirmed">🟢 Đã xác nhận</span>`;
  } else if (status === "Hoàn thành") {
    return `<span class="status-badge completed">✅ Hoàn thành</span>`;
  } else if (status === "Đã hủy") {
    return `<span class="status-badge cancelled">❌ Đã hủy</span>`;
  }
  return `<span class="status-badge confirmed">${status}</span>`;
}

function renderRoomStatusBadge(status) {
  if (status === "available") {
    return `<span class="status-badge available">🟢 Trống</span>`;
  } else if (status === "occupied") {
    return `<span class="status-badge occupied">🔵 Đang có khách</span>`;
  } else if (status === "cleaning") {
    return `<span class="status-badge cleaning">🟡 Đang dọn dẹp</span>`;
  } else if (status === "maintenance") {
    return `<span class="status-badge maintenance">⚪ Đang bảo trì</span>`;
  }
  return `<span class="status-badge available">${status}</span>`;
}

function getStatusText(status) {
  const map = {
    available: "Trống (Sẵn sàng)",
    occupied: "Đang có khách",
    cleaning: "Đang dọn dẹp",
    maintenance: "Đang bảo trì"
  };
  return map[status] || status;
}

function formatCurrencyVND(num) {
  if (isNaN(num)) return "0 ₫";
  return new Intl.NumberFormat("vi-VN").format(num) + " ₫";
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (e) {
    return dateStr;
  }
}

function downloadCSV(csvContent, fileName) {
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function showAdminToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `admin-toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : '⚠️'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(40px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
