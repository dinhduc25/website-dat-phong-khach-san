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
  // 1. HẠNG DELUXE - TẦNG 38 (4 phòng)
  {
    id: "rm-lotte-3801",
    roomNumber: "P.3801",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    category: "deluxe",
    roomClass: "Deluxe",
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
    category: "deluxe",
    roomClass: "Deluxe",
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
    category: "deluxe",
    roomClass: "Deluxe",
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
    category: "deluxe",
    roomClass: "Deluxe",
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

  // 2. HẠNG PREMIER - TẦNG 45 (3 phòng)
  {
    id: "rm-lotte-4501",
    roomNumber: "P.4501",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    category: "premier",
    roomClass: "Premier",
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
    category: "premier",
    roomClass: "Premier",
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
    category: "premier",
    roomClass: "Premier",
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

  // 3. HẠNG JUNIOR SUITE - TẦNG 51 (3 phòng)
  {
    id: "rm-lotte-5101",
    roomNumber: "P.5101",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    category: "junior-suite",
    roomClass: "Junior Suite",
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
    category: "junior-suite",
    roomClass: "Junior Suite",
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
    category: "junior-suite",
    roomClass: "Junior Suite",
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

  // 4. HẠNG PRESIDENTIAL SUITE - TẦNG 60 & 65 (3 phòng)
  {
    id: "rm-lotte-6001",
    roomNumber: "P.6001",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    category: "presidential-suite",
    roomClass: "Presidential Suite",
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
    category: "presidential-suite",
    roomClass: "Presidential Suite",
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
    category: "presidential-suite",
    roomClass: "Presidential Suite",
    roomType: "Presidential Luxury Suite",
    floor: 65,
    price: 8900000,
    status: "cleaning",
    capacity: 4,
    bed: "2 Giường King Hoàng Gia",
    guestName: "",
    guestPhone: "",
    bookingId: "",
    checkin: "",
    checkout: "",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=650&q=80",
    amenities: ["Tầng cao nhất 65", "Quản gia riêng 24/7", "Phòng ăn 8 người", "Bàn bi-a & Piano"]
  }
];

const DEFAULT_ALL_BOOKINGS = [
  {
    bookingId: "LT-HN-89234",
    customerName: "Nguyễn Hoàng Lotte",
    customerPhone: "0901234567",
    customerEmail: "demo@lottehotel.vn",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
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
    hotelName: "Lotte Hotel Hanoi",
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
    hotelName: "Lotte Hotel Hanoi",
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
    hotelName: "Lotte Hotel Hanoi",
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
    hotelName: "Lotte Hotel Hanoi",
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
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    roomNumber: "P.3803",
    roomType: "Deluxe Twin City View",
    checkin: "2026-09-28",
    checkout: "2026-10-01",
    nights: 3,
    guests: "2 người lớn",
    rooms: 1,
    totalPrice: "8.250.000₫",
    rawAmount: 8250000,
    status: "Hoàn thành",
    paymentMethod: "Thanh toán tại quầy",
    bookedAt: "2026-09-25T18:40:00Z",
    note: ""
  },
  {
    bookingId: "IC-HN-33012",
    customerName: "Đặng Thu Thảo",
    customerPhone: "0944112233",
    customerEmail: "thuthao.dang@vietcombank.vn",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    roomNumber: "P.4503",
    roomType: "Premier Lake View",
    checkin: "2026-09-27",
    checkout: "2026-09-29",
    nights: 2,
    guests: "2 người lớn",
    rooms: 1,
    totalPrice: "6.400.000₫",
    rawAmount: 6400000,
    status: "Hoàn thành",
    paymentMethod: "Chuyển khoản QR",
    bookedAt: "2026-09-23T09:20:00Z",
    note: ""
  },
  {
    bookingId: "AP-HN-88120",
    customerName: "Trần Anh Quân",
    customerPhone: "0918223344",
    customerEmail: "anhquan.tran@gmail.com",
    hotelId: "lotte-hotel-hanoi",
    hotelName: "Lotte Hotel Hanoi",
    roomNumber: "P.6501",
    roomType: "Presidential Luxury Suite",
    checkin: "2026-09-20",
    checkout: "2026-09-23",
    nights: 3,
    guests: "2 người lớn",
    rooms: 1,
    totalPrice: "26.700.000₫",
    rawAmount: 26700000,
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
    hotelName: "Lotte Hotel Hanoi",
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
    hotelName: "Lotte Hotel Hanoi",
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

function getRoomCategory(room) {
  if (!room) return "deluxe";
  if (room.category) return room.category;
  const type = (room.roomType || room.roomClass || "").toLowerCase();
  const num = (room.roomNumber || "").toLowerCase();
  const floor = Number(room.floor);
  if (floor === 38 || type.includes("deluxe") || num.includes("38")) return "deluxe";
  if (floor === 45 || type.includes("premier") || num.includes("45")) return "premier";
  if (floor === 51 || type.includes("junior") || type.includes("club") || num.includes("51")) return "junior-suite";
  if (floor === 60 || floor === 65 || type.includes("presidential") || type.includes("grand") || type.includes("luxury") || num.includes("60") || num.includes("65")) return "presidential-suite";
  return "deluxe";
}

function getAdminRooms() {
  const data = localStorage.getItem("traveloka_hotel_rooms");
  if (!data) {
    saveAdminRooms(DEFAULT_HOTEL_ROOMS);
    return [...DEFAULT_HOTEL_ROOMS];
  }
  try {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Tự động làm sạch dữ liệu cũ nếu phát hiện phòng demo ngoài Lotte hoặc thiếu category
      const hasLegacyRooms = parsed.some(r => r.id && (r.id.startsWith("rm-pan") || r.id.startsWith("rm-inter") || r.id.startsWith("rm-apricot") || r.id.startsWith("rm-melia")));
      const missingCategory = parsed.some(r => !r.category);
      if (hasLegacyRooms || missingCategory || parsed.length !== 13) {
        saveAdminRooms(DEFAULT_HOTEL_ROOMS);
        return [...DEFAULT_HOTEL_ROOMS];
      }
      return parsed;
    }
    return [...DEFAULT_HOTEL_ROOMS];
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
    consultation: "section-consultation",
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

// Biến lưu trữ khoảng thời gian biểu đồ doanh thu đang chọn
let currentRevenuePeriod = "7days";

// Vẽ biểu đồ doanh thu bằng Canvas thuần (hỗ trợ cả Tổng quan và Báo cáo doanh thu)
function renderRevenueChart(period = currentRevenuePeriod) {
  if (period) currentRevenuePeriod = period;
  drawRevenueBarChart("overview-revenue-chart", "btn-chart-7days", "btn-chart-months", currentRevenuePeriod);
  drawRevenueBarChart("revenue-section-chart", "btn-chart-7days-rev", "btn-chart-months-rev", currentRevenuePeriod);
}

function drawRevenueBarChart(canvasId, btn7Id, btnMoId, period) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  // Đổi trạng thái nút bấm nếu có
  const btn7 = document.getElementById(btn7Id);
  const btnMo = document.getElementById(btnMoId);
  if (btn7 && btnMo) {
    if (period === "7days") {
      btn7.className = "btn btn-primary";
      btnMo.className = "btn btn-outline";
    } else {
      btn7.className = "btn btn-outline";
      btnMo.className = "btn btn-primary";
    }
  }

  // Lấy container cha để tính toán kích thước động
  const container = canvas.parentElement;
  if (!container || container.clientWidth === 0) return;

  canvas.width = container.clientWidth || 600;
  canvas.height = 270;

  const ctx = canvas.getContext("2d");
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

window.addEventListener("resize", () => {
  renderRevenueChart(currentRevenuePeriod);
});

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
      <td>
        ${renderStatusBadge(b.status)}
        ${b.status === "Chờ thanh toán" ? `<div style="margin-top:4px;font-size:.72rem;color:${b.paymentSubmittedAt ? '#b45309' : '#64748b'};">${b.paymentSubmittedAt ? 'Khách đã gửi yêu cầu thanh toán — cần admin kiểm tra' : 'Chưa ghi nhận yêu cầu thanh toán'}</div>` : ''}
      </td>
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
    const matchHotel = hotel === "all" || getRoomCategory(r) === hotel;
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
    Thêm Phòng Hạng Phòng Mới
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

  const categorySelect = document.getElementById("select-floor-category") || document.getElementById("select-floor-hotel");
  const selectedCategory = categorySelect ? categorySelect.value : "all";
  const allRooms = getAdminRooms();

  // Lọc theo hạng phòng được chọn
  let categoryRooms = allRooms;
  if (selectedCategory && selectedCategory !== "all" && selectedCategory !== "lotte-hotel-hanoi") {
    categoryRooms = allRooms.filter(r => getRoomCategory(r) === selectedCategory);
  }

  // Thống kê số lượng cho legend của hạng phòng đang xem
  const countAll = categoryRooms.length;
  const countAvail = categoryRooms.filter(r => r.status === "available").length;
  const countOcc = categoryRooms.filter(r => r.status === "occupied").length;
  const countClean = categoryRooms.filter(r => r.status === "cleaning").length;
  const countMaint = categoryRooms.filter(r => r.status === "maintenance").length;

  const elAll = document.getElementById("fl-count-all");
  const elAvail = document.getElementById("fl-count-available");
  const elOcc = document.getElementById("fl-count-occupied");
  const elClean = document.getElementById("fl-count-cleaning");
  const elMaint = document.getElementById("fl-count-maintenance");

  if (elAll) elAll.textContent = countAll;
  if (elAvail) elAvail.textContent = countAvail;
  if (elOcc) elOcc.textContent = countOcc;
  if (elClean) elClean.textContent = countClean;
  if (elMaint) elMaint.textContent = countMaint;

  // Lọc theo status filter
  let displayRooms = categoryRooms;
  if (currentFloorFilterStatus !== "all") {
    displayRooms = categoryRooms.filter(r => r.status === currentFloorFilterStatus);
  }

  if (displayRooms.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px 20px; color: #64748b; background: #fff; border-radius: 12px; border: 1px dashed #cbd5e1; margin-top: 10px;">
        <div style="font-size: 2rem; margin-bottom: 8px;">🔍</div>
        <div style="font-weight: 700; font-size: 1rem; color: #1e293b; margin-bottom: 4px;">Không tìm thấy phòng nào phù hợp</div>
        <div style="font-size: 0.85rem;">Không có phòng nào thuộc trạng thái này trong hạng phòng đã chọn. Vui lòng bấm vào "Tất Cả" ở thanh trạng thái bên trên.</div>
      </div>`;
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

  // Helper để hiển thị tên hạng phòng theo tầng
  const getFloorCategoryLabel = (floor) => {
    const f = Number(floor);
    if (f === 65) return "Hạng Presidential Suite • Penthouse Tầng 65";
    if (f === 60) return "Hạng Presidential Suite • Executive Tầng 60";
    if (f === 51) return "Hạng Junior Suite • Tầng 51";
    if (f === 45) return "Hạng Premier Lake View • Tầng 45";
    if (f === 38) return "Hạng Deluxe City View • Tầng 38";
    return `Tầng ${f}`;
  };

  container.innerHTML = sortedFloors.map(floor => {
    const roomsInFloor = floorMap[floor];
    const floorLabel = getFloorCategoryLabel(floor);
    const availCount = roomsInFloor.filter(r => r.status === "available").length;
    const occCount = roomsInFloor.filter(r => r.status === "occupied").length;
    const cleanCount = roomsInFloor.filter(r => r.status === "cleaning").length;
    const maintCount = roomsInFloor.filter(r => r.status === "maintenance").length;

    return `
      <div class="floor-group">
        <div class="floor-header">
          <div class="floor-title">
            <span style="font-size: 1.15rem;">🏢</span> 
            <strong>Tầng ${floor}</strong> 
            <span class="floor-badge-tag" style="display: inline-block; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; margin-left: 8px;">
              ${floorLabel}
            </span>
            <span style="font-size: 0.78rem; color: #64748b; font-weight: 600; margin-left: 6px;">(${roomsInFloor.length} phòng)</span>
          </div>
          <div style="font-size: 0.8rem; color: #64748b; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <span style="color: #059669; font-weight: 600;">🟢 ${availCount} Trống</span>
            <span style="color: #2563eb; font-weight: 600;">🔵 ${occCount} Đang ở</span>
            ${cleanCount > 0 ? `<span style="color: #d97706; font-weight: 600;">🟡 ${cleanCount} Dọn dẹp</span>` : ""}
            ${maintCount > 0 ? `<span style="color: #475569; font-weight: 600;">⚪ ${maintCount} Bảo trì</span>` : ""}
          </div>
        </div>
        <div class="floor-rooms-row">
          ${roomsInFloor.map(r => `
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
                  👤 ${r.guestName || "Khách lưu trú"}
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
    `;
  }).join("");
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

function expireUnpaidBookings() {
  const bookings = getAdminBookings();
  const now = Date.now();
  let changed = false;
  bookings.forEach(b => {
    if (b.status === "Chờ thanh toán" && !b.paymentSubmittedAt && b.paymentDeadline && now > new Date(b.paymentDeadline).getTime()) {
      b.status = "Đã hủy";
      b.cancelReason = "Quá hạn thanh toán 24 giờ";
      b.cancelledAt = new Date().toISOString();
      syncBookingToCustomerAccount(b);
      changed = true;
      queueCustomerEmail(b, `LOTTE HOTEL HANOI - Yêu cầu ${b.bookingId} đã hết hạn`,
        `Kính gửi ${b.customerName || "Quý khách"},\\n\\nYêu cầu đặt phòng ${b.bookingId} đã hết hạn do chưa ghi nhận thanh toán trong vòng 24 giờ kể từ khi xác nhận còn phòng. Nếu quý khách vẫn có nhu cầu, vui lòng gửi yêu cầu đặt phòng mới.\\n\\nTrân trọng,\\nLotte Hotel Hanoi`);
    }
  });
  if (changed) saveAdminBookings(bookings);
}

function filterBookings() {
  expireUnpaidBookings();
  const bookings = getAdminBookings();
  const search = (document.getElementById("filter-booking-search")?.value || "").trim().toLowerCase();
  const hotel = document.getElementById("filter-booking-hotel")?.value || "all";
  const status = document.getElementById("filter-booking-status")?.value || "all";

  const filtered = bookings.filter(b => {
    const matchSearch = !search ||
      b.bookingId.toLowerCase().includes(search) ||
      b.customerName.toLowerCase().includes(search) ||
      (b.customerPhone && b.customerPhone.includes(search));
    const matchHotel = hotel === "all" || (b.roomType && b.roomType.toLowerCase().replace(/\s+/g, "-").includes(hotel.replace("junior-suite", "junior").replace("presidential-suite", "presidential")));
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
          ${getBookingPaymentMethodLabel(b)}
        </span>
      </td>
      <td>
        ${renderStatusBadge(b.status)}
        ${b.status === "Chờ thanh toán" ? `<div style="margin-top:4px;font-size:.72rem;color:${b.paymentSubmittedAt ? '#b45309' : '#64748b'};">${b.paymentSubmittedAt ? `Khách gửi yêu cầu ${isDepositCashPlan(b) ? 'cọc 30%: ' : 'thanh toán: '}${formatBookingMoney(b.paymentSubmittedAmount || 0)} — cần đối chiếu` : 'Chưa thanh toán'}</div>` : ''}
        ${b.status === "Đã cọc 30% - chờ nhận phòng" ? `<div style="margin-top:4px;font-size:.72rem;color:#0f766e;">Đã cọc ${formatBookingMoney(b.depositAmount || 0)} · còn thu tại quầy ${formatBookingMoney(b.remainingAmount || 0)}</div>` : ''}
      </td>
      <td>
        <div class="table-actions">
          <button type="button" class="btn-table-action" title="Xem hóa đơn & In" onclick="openInvoiceModal('${b.bookingId}')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
          </button>
          ${b.status === "Chờ admin xác nhận" ? `
            <button type="button" class="btn-table-action btn-availability" title="Xác nhận còn phòng và gửi thông báo yêu cầu thanh toán trong 24 giờ" aria-label="Xác nhận còn phòng" onclick="approveBookingAvailability('${b.bookingId}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6"></path></svg>
              <span>Xác nhận</span>
            </button>
          ` : ""}
          ${b.status === "Chờ thanh toán" ? (b.paymentSubmittedAt ? `
            <button type="button" class="btn-booking-action btn-booking-action--confirm" title="Đối chiếu giao dịch đã nhận, xác nhận thanh toán và tự động xếp phòng" onclick="markBookingPaidAndAssignRoom('${b.bookingId}')">${isDepositCashPlan(b) ? '✓ Xác nhận cọc & xếp phòng' : '✓ Xác nhận thanh toán'}</button>
          ` : `<span style="font-size:.75rem;color:#b45309;padding:4px 6px;">Chờ khách ${isDepositCashPlan(b) ? 'cọc 30%' : 'thanh toán'}</span>`) : ""}
          ${b.status === "Đã cọc 30% - chờ nhận phòng" ? `
            <span style="font-size:.72rem;color:#0f766e;padding:3px 4px;">Đã cọc 30%</span>
            ${!b.cashBalancePaidAt ? `<button type="button" class="btn-booking-action btn-booking-action--cash" title="Ghi nhận khoản 70% còn lại sau khi đã nhận tiền mặt tại quầy" onclick="confirmCashBalancePayment('${b.bookingId}')">₫ Thu tiền còn lại</button>` : `<span style="font-size:.72rem;color:#047857;padding:3px 4px;">Đã thu đủ</span>`}
          ` : ""}
          ${b.status === "Đã xác nhận" || b.status === "Đã thanh toán - chờ nhận phòng" ? `
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


// Quy trình xác nhận đặt phòng: chỉ xác nhận nếu còn phòng phù hợp trong khoảng ngày khách chọn.
function bookingDatesOverlap(aStart, aEnd, bStart, bEnd) {
  if (!aStart || !aEnd || !bStart || !bEnd) return false;
  return aStart < bEnd && bStart < aEnd;
}

function syncBookingToCustomerAccount(booking) {
  try {
    const raw = localStorage.getItem("traveloka_hotel_users");
    if (!raw) return;
    const users = JSON.parse(raw);
    if (!Array.isArray(users)) return;
    users.forEach(user => {
      if (!Array.isArray(user.bookings)) return;
      const item = user.bookings.find(b => b.bookingId === booking.bookingId);
      if (item) Object.assign(item, booking);
    });
    localStorage.setItem("traveloka_hotel_users", JSON.stringify(users));
    const current = JSON.parse(localStorage.getItem("traveloka_current_user") || "null");
    if (current && Array.isArray(current.bookings)) {
      const item = current.bookings.find(b => b.bookingId === booking.bookingId);
      if (item) Object.assign(item, booking);
      localStorage.setItem("traveloka_current_user", JSON.stringify(current));
    }
  } catch (e) { console.warn("Không thể đồng bộ trạng thái đặt phòng về tài khoản khách", e); }
}

function queueCustomerEmail(booking, subject, body) {
  const outbox = JSON.parse(localStorage.getItem("LOTTE_EMAIL_OUTBOX") || "[]");
  const message = {
    id: "MAIL-" + Date.now(),
    bookingId: booking.bookingId,
    to: booking.customerEmail || "",
    subject,
    body,
    createdAt: new Date().toISOString(),
    status: "Chưa gửi - cần cấu hình SMTP"
  };
  outbox.unshift(message);
  localStorage.setItem("LOTTE_EMAIL_OUTBOX", JSON.stringify(outbox));
  // Trang web tĩnh không có máy chủ gửi email; mở trình soạn thư nếu khách có email.
  if (message.to) {
    const mailto = "mailto:" + encodeURIComponent(message.to) +
      "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    window.open(mailto, "_blank");
  }
}

function isDepositCashPlan(booking) {
  if (!booking) return false;
  // Sau khi khách gửi yêu cầu thanh toán, kiểu thanh toán đã gửi là thông tin mới nhất.
  // Điều này cũng tự sửa các đơn cũ có paymentPlan và paymentMethod bị lệch nhau.
  if (booking.paymentSubmittedType === "deposit_30_percent") return true;
  if (booking.paymentSubmittedType === "full_payment") return false;
  if (booking.paymentPlan === "deposit_30_cash_at_hotel") return true;
  if (booking.paymentPlan === "full_online_qr") return false;
  const method = String(booking.paymentMethod || "").toLowerCase();
  return method.includes("cọc 30% online") || method.includes("thanh toán tại khách sạn") || method.includes("tiền mặt tại khách sạn");
}

function getBookingPaymentMethodLabel(booking) {
  if (booking && booking.paymentSubmittedType === "deposit_30_percent") return "Cọc 30% online · 70% tiền mặt tại khách sạn";
  if (booking && booking.paymentSubmittedType === "full_payment") return "Thanh toán 100% online bằng QR";
  if (booking && booking.paymentPlan === "deposit_30_cash_at_hotel") return "Cọc 30% online · 70% tiền mặt tại khách sạn";
  if (booking && booking.paymentPlan === "full_online_qr") return "Thanh toán 100% online bằng QR";
  return (booking && booking.paymentMethod) || "Chưa chọn";
}

function getBookingTotalAmount(booking) {
  if (!booking) return 0;
  const raw = Number(booking.rawAmount);
  if (Number.isFinite(raw) && raw > 0) return raw;
  const text = String(booking.totalPrice || "");
  const parsed = Number(text.replace(/[^\d]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatBookingMoney(amount) {
  const value = Math.max(0, Number(amount) || 0);
  return value.toLocaleString("vi-VN") + "₫";
}

/** Hộp xác nhận đồng bộ phong cách LOTTE, thay confirm() mặc định của trình duyệt. */
function showLotteConfirm({ title = "Xác nhận thao tác", message = "Bạn có chắc muốn tiếp tục?", detail = "", confirmText = "Xác nhận", cancelText = "Quay lại", variant = "primary" } = {}) {
  return new Promise(resolve => {
    const existing = document.querySelector(".lotte-confirm-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.className = "lotte-confirm-overlay";
    overlay.innerHTML = `
      <section class="lotte-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="lotte-confirm-title" aria-describedby="lotte-confirm-message">
        <div class="lotte-confirm-topline"></div>
        <div class="lotte-confirm-content">
          <div class="lotte-confirm-symbol ${variant === "danger" ? "is-danger" : variant === "success" ? "is-success" : ""}" aria-hidden="true">
            ${variant === "danger" ? "!" : variant === "success" ? "✓" : "✓"}
          </div>
          <div class="lotte-confirm-brand">LOTTE HOTEL HANOI <span>•</span> XÁC NHẬN</div>
          <h3 id="lotte-confirm-title"></h3>
          <p id="lotte-confirm-message"></p>
          ${detail ? '<div class="lotte-confirm-detail" id="lotte-confirm-detail"></div>' : ''}
        </div>
        <div class="lotte-confirm-footer">
          <button type="button" class="lotte-confirm-btn lotte-confirm-cancel"></button>
          <button type="button" class="lotte-confirm-btn lotte-confirm-accept"></button>
        </div>
      </section>`;

    document.body.appendChild(overlay);
    overlay.querySelector("#lotte-confirm-title").textContent = title;
    overlay.querySelector("#lotte-confirm-message").textContent = message;
    if (detail) overlay.querySelector("#lotte-confirm-detail").textContent = detail;
    const cancelButton = overlay.querySelector(".lotte-confirm-cancel");
    const acceptButton = overlay.querySelector(".lotte-confirm-accept");
    cancelButton.textContent = cancelText;
    acceptButton.textContent = confirmText;
    if (variant === "danger") acceptButton.classList.add("is-danger");
    if (variant === "success") acceptButton.classList.add("is-success");

    let settled = false;
    const finish = value => {
      if (settled) return;
      settled = true;
      document.removeEventListener("keydown", onKeyDown);
      overlay.classList.add("is-closing");
      window.setTimeout(() => overlay.remove(), 140);
      resolve(value);
    };
    const onKeyDown = event => {
      if (event.key === "Escape") finish(false);
      if (event.key === "Enter" && document.activeElement === acceptButton) finish(true);
    };
    cancelButton.addEventListener("click", () => finish(false));
    acceptButton.addEventListener("click", () => finish(true));
    overlay.addEventListener("click", event => { if (event.target === overlay) finish(false); });
    document.addEventListener("keydown", onKeyDown);
    window.requestAnimationFrame(() => {
      overlay.classList.add("is-visible");
      cancelButton.focus({ preventScroll: true });
    });
  });
}

async function approveBookingAvailability(bookingId) {
  const bookings = getAdminBookings();
  const booking = bookings.find(b => b.bookingId === bookingId);
  if (!booking || booking.status !== "Chờ admin xác nhận") return;

  const rooms = getAdminRooms();
  const category = String(booking.roomType || booking.category || "").toLowerCase();
  const matchingRooms = rooms.filter(r => {
    const roomCategory = String(r.category || r.roomType || r.type || "").toLowerCase();
    const categoryMatch = !category ||
      roomCategory.includes(category) || category.includes(roomCategory) ||
      (category.includes("deluxe") && String(r.floor) === "38") ||
      (category.includes("premier") && String(r.floor) === "45") ||
      (category.includes("junior") && String(r.floor) === "51") ||
      (category.includes("presidential") && ["60","65"].includes(String(r.floor)));
    return categoryMatch && (r.status === "available" || r.status === "reserved");
  });

  const overlapping = bookings.filter(b =>
    b.bookingId !== bookingId &&
    !["Đã hủy", "Hoàn thành"].includes(b.status) &&
    b.roomNumber &&
    bookingDatesOverlap(booking.checkin, booking.checkout, b.checkin, b.checkout)
  );
  const busyRoomNumbers = new Set(overlapping.map(b => String(b.roomNumber)));
  const freeRoomCount = matchingRooms.filter(r =>
    !busyRoomNumbers.has(String(r.roomNumber)) &&
    (r.status === "available" || (r.status === "reserved" && r.bookingId === bookingId))
  ).length;

  if (!freeRoomCount) {
    alert("Không còn phòng phù hợp trong khoảng ngày khách yêu cầu. Hãy liên hệ khách để chọn ngày hoặc hạng phòng khác.");
    return;
  }

  const confirmedAvailability = await showLotteConfirm({
    title: "Xác nhận còn phòng",
    message: `Đã tìm thấy ${freeRoomCount} phòng phù hợp với thời gian lưu trú của khách.`,
    detail: "Sau khi xác nhận, khách sẽ nhận thông báo và có 24 giờ để thanh toán hoặc cọc. Bước này chưa xác nhận đã thu tiền và chưa gán số phòng.",
    confirmText: "Xác nhận còn phòng",
    cancelText: "Kiểm tra lại",
    variant: "primary"
  });
  if (!confirmedAvailability) return;

  const now = new Date();
  const deadline = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  // Chỉ xác nhận còn phòng; tuyệt đối không đánh dấu khách đã thanh toán hoặc gán phòng tại bước này.
  booking.status = "Chờ thanh toán";
  booking.availabilityConfirmedAt = now.toISOString();
  booking.paymentDeadline = deadline.toISOString();
  booking.paymentStatus = "Chưa thanh toán";
  booking.paymentSubmittedAt = null;
  booking.paymentConfirmedAt = null;
  booking.paidAt = null;
  booking.roomNumber = "";
  booking.floor = "";
  const hasPaymentChoice = booking.paymentPlan === "full_online_qr" || booking.paymentPlan === "deposit_30_cash_at_hotel" ||
    booking.paymentSubmittedType === "full_payment" || booking.paymentSubmittedType === "deposit_30_percent" ||
    String(booking.paymentMethod || "").toLowerCase().includes("100% online") || String(booking.paymentMethod || "").toLowerCase().includes("cọc 30%");
  const depositPlan = hasPaymentChoice && isDepositCashPlan(booking);
  const totalAmount = getBookingTotalAmount(booking);
  const depositAmount = Math.round(totalAmount * 0.3);
  const remainingAmount = Math.max(0, totalAmount - depositAmount);
  if (hasPaymentChoice) {
    booking.paymentPlan = depositPlan ? "deposit_30_cash_at_hotel" : "full_online_qr";
    booking.paymentMethod = depositPlan ? "Cọc 30% online, còn lại tiền mặt tại khách sạn" : "Thanh toán 100% online bằng QR";
  } else {
    // Khách sẽ lựa chọn phương thức trên trang thanh toán sau khi biết còn phòng.
    booking.paymentPlan = "";
    booking.paymentMethod = "Chọn tại bước thanh toán";
  }
  booking.depositAmount = depositPlan ? depositAmount : 0;
  booking.remainingAmount = depositPlan ? remainingAmount : 0;
  booking.customerNotice = {
    title: "Khách sạn đã xác nhận còn phòng",
    message: !hasPaymentChoice
      ? `Yêu cầu ${booking.bookingId} còn phòng. Vui lòng mở “Đặt chỗ của tôi” → “Thanh toán online bằng QR” trong vòng 24 giờ, trước ${deadline.toLocaleString("vi-VN")}. Tại trang thanh toán, bạn có thể chọn thanh toán 100% online hoặc cọc 30% online và trả 70% bằng tiền mặt tại quầy. Phòng sẽ được gán sau khi admin xác nhận đã nhận khoản thanh toán tương ứng.`
      : (depositPlan
        ? `Yêu cầu ${booking.bookingId} còn phòng. Vui lòng thanh toán cọc 30% (${formatBookingMoney(depositAmount)}) bằng QR trên website trong vòng 24 giờ, trước ${deadline.toLocaleString("vi-VN")}. Sau khi admin xác nhận đã nhận cọc, phòng sẽ được xếp cho quý khách; 70% còn lại (${formatBookingMoney(remainingAmount)}) thanh toán bằng tiền mặt tại quầy khi nhận phòng.`
        : `Yêu cầu ${booking.bookingId} còn phòng. Vui lòng thanh toán toàn bộ bằng QR trên website trong vòng 24 giờ, trước ${deadline.toLocaleString("vi-VN")}. Đơn chỉ được xác nhận thanh toán sau khi admin kiểm tra giao dịch.`),
    createdAt: now.toISOString(),
    type: "payment_required"
  };
  saveAdminBookings(bookings);
  syncBookingToCustomerAccount(booking);

  const subject = `LOTTE HOTEL HANOI - Xác nhận còn phòng ${booking.bookingId}`;
  const paymentInstructions = !hasPaymentChoice
    ? `Quý khách chọn một trong hai phương án tại trang thanh toán: thanh toán 100% online (${formatBookingMoney(totalAmount)}) hoặc cọc 30% online (${formatBookingMoney(depositAmount)}) và thanh toán 70% còn lại bằng tiền mặt tại quầy (${formatBookingMoney(remainingAmount)}).\n`
    : (depositPlan
      ? `Tiền cọc 30% cần chuyển khoản: ${formatBookingMoney(depositAmount)}\nSố tiền còn lại trả tiền mặt tại quầy khi nhận phòng: ${formatBookingMoney(remainingAmount)}\n`
      : `Số tiền cần thanh toán online: ${formatBookingMoney(totalAmount)}\n`);
  const body = `Kính gửi ${booking.customerName || "Quý khách"},\n\nLotte Hotel Hanoi xác nhận hiện còn phòng phù hợp với yêu cầu đặt phòng của quý khách.\nMã đặt phòng: ${booking.bookingId}\nHạng phòng: ${booking.roomType || "Theo yêu cầu"}\nNhận phòng: ${booking.checkin}\nTrả phòng: ${booking.checkout}\nTổng tiền phòng: ${formatBookingMoney(totalAmount)}\n${paymentInstructions}\nVui lòng hoàn tất khoản cần thanh toán trong vòng 24 giờ kể từ thời điểm xác nhận (${deadline.toLocaleString("vi-VN")}). Nếu quá thời hạn, yêu cầu có thể được hủy để giải phóng phòng.\n\nTrân trọng,\nLotte Hotel Hanoi`;
  queueCustomerEmail(booking, subject, body);
  showAdminToast("Đã xác nhận còn phòng; yêu cầu thanh toán 24 giờ đã được tạo.");
  filterBookings();
  initDashboardData();
}

async function markBookingPaidAndAssignRoom(bookingId) {
  const bookings = getAdminBookings();
  const booking = bookings.find(b => b.bookingId === bookingId);
  if (!booking || booking.status !== "Chờ thanh toán") return;
  if (!booking.paymentSubmittedAt) {
    alert("Khách chưa gửi yêu cầu thanh toán. Chỉ xác nhận sau khi khách chuyển khoản và admin đối chiếu giao dịch thực tế.");
    return;
  }
  if (booking.paymentDeadline && Date.now() > new Date(booking.paymentDeadline).getTime()) {
    const continueAfterDeadline = await showLotteConfirm({
      title: "Đã quá hạn thanh toán",
      message: "Đơn đặt phòng đã quá thời hạn thanh toán 24 giờ.",
      detail: "Chỉ tiếp tục nếu bạn đã kiểm tra và thực nhận khoản tiền của khách.",
      confirmText: "Vẫn xác nhận",
      cancelText: "Quay lại",
      variant: "danger"
    });
    if (!continueAfterDeadline) return;
  }

  const depositPlan = isDepositCashPlan(booking);
  const totalAmount = getBookingTotalAmount(booking);
  const expectedDeposit = Math.round(totalAmount * 0.3);
  const submittedAmount = Number(booking.paymentSubmittedAmount || booking.depositAmount || 0);
  if (depositPlan && submittedAmount !== expectedDeposit) {
    alert(`Số tiền cọc trên đơn chưa khớp 30% tổng tiền phòng. Dự kiến cần nhận ${formatBookingMoney(expectedDeposit)}; vui lòng kiểm tra lại đơn thanh toán.`);
    return;
  }
  if (!depositPlan && submittedAmount && submittedAmount !== totalAmount) {
    alert(`Số tiền khách gửi yêu cầu chưa khớp tổng tiền phòng ${formatBookingMoney(totalAmount)}. Vui lòng kiểm tra trước khi xác nhận.`);
    return;
  }

  const rooms = getAdminRooms();
  const category = String(booking.roomType || booking.category || "").toLowerCase();
  const overlapping = bookings.filter(b =>
    b.bookingId !== bookingId &&
    !["Đã hủy", "Hoàn thành"].includes(b.status) &&
    b.roomNumber &&
    bookingDatesOverlap(booking.checkin, booking.checkout, b.checkin, b.checkout)
  );
  const busy = new Set(overlapping.map(b => String(b.roomNumber)));
  let room = rooms.find(r => {
    const rc = String(r.category || r.roomType || r.type || "").toLowerCase();
    const match = !category || rc.includes(category) || category.includes(rc) ||
      (category.includes("deluxe") && String(r.floor) === "38") ||
      (category.includes("premier") && String(r.floor) === "45") ||
      (category.includes("junior") && String(r.floor) === "51") ||
      (category.includes("presidential") && ["60","65"].includes(String(r.floor)));
    return match && r.status === "available" && !busy.has(String(r.roomNumber));
  });
  if (!room) {
    alert("Không tìm thấy phòng trống để xếp cho khách. Vui lòng kiểm tra sơ đồ phòng hoặc điều chỉnh hạng phòng.");
    return;
  }
  const amountToConfirm = depositPlan ? expectedDeposit : totalAmount;
  const confirmedPayment = await showLotteConfirm({
    title: depositPlan ? "Xác nhận cọc 30% và xếp phòng" : "Xác nhận thanh toán và xếp phòng",
    message: depositPlan
      ? `Xác nhận đã nhận cọc ${formatBookingMoney(expectedDeposit)} và xếp phòng ${room.roomNumber}?`
      : `Xác nhận đã nhận đủ ${formatBookingMoney(totalAmount)} và xếp phòng ${room.roomNumber}?`,
    detail: depositPlan
      ? `Số tiền còn lại ${formatBookingMoney(totalAmount - expectedDeposit)} sẽ được thu bằng tiền mặt tại quầy khi khách nhận phòng. Chỉ xác nhận sau khi đã đối chiếu giao dịch.`
      : "Chỉ xác nhận sau khi đã đối chiếu và thực nhận khoản thanh toán của khách.",
    confirmText: depositPlan ? "Đã nhận cọc & xếp phòng" : "Đã nhận tiền & xếp phòng",
    cancelText: "Kiểm tra lại",
    variant: "success"
  });
  if (!confirmedPayment) return;

  const now = new Date().toISOString();
  booking.roomNumber = room.roomNumber;
  booking.floor = room.floor;
  if (depositPlan) {
    booking.status = "Đã cọc 30% - chờ nhận phòng";
    booking.depositAmount = expectedDeposit;
    booking.depositConfirmedAt = now;
    booking.depositPaymentStatus = "Đã xác nhận cọc 30% online";
    booking.remainingAmount = Math.max(0, totalAmount - expectedDeposit);
    booking.paymentStatus = `Đã cọc 30% online (${formatBookingMoney(expectedDeposit)}); còn ${formatBookingMoney(booking.remainingAmount)} trả tiền mặt tại quầy`;
    booking.paymentConfirmedAt = null;
    booking.paidAt = null;
    booking.cashBalancePaidAt = null;
    booking.customerNotice = {
      title: "Đã xác nhận tiền cọc 30% — phòng đã được xếp",
      message: `Khách sạn đã xác nhận nhận cọc ${formatBookingMoney(expectedDeposit)}. Phòng ${room.roomNumber}, tầng ${room.floor || "theo sơ đồ khách sạn"} đã được giữ cho quý khách. Vui lòng thanh toán số tiền còn lại ${formatBookingMoney(booking.remainingAmount)} bằng tiền mặt tại quầy khi nhận phòng.`,
      createdAt: now,
      type: "deposit_confirmed"
    };
  } else {
    booking.status = "Đã thanh toán - chờ nhận phòng";
    booking.paymentStatus = "Đã xác nhận thanh toán toàn bộ";
    booking.paymentConfirmedAt = now;
    booking.paidAt = now;
    booking.customerNotice = {
      title: "Thanh toán đã được admin xác nhận",
      message: `Khách sạn đã xác nhận thanh toán đầy đủ và xếp phòng ${room.roomNumber}, tầng ${room.floor || "theo sơ đồ khách sạn"}. Vui lòng lưu mã đặt phòng để nhận phòng.`,
      createdAt: now,
      type: "payment_confirmed"
    };
  }

  room.status = "reserved";
  room.guestName = booking.customerName;
  room.guestPhone = booking.customerPhone;
  room.bookingId = booking.bookingId;
  room.checkin = booking.checkin;
  room.checkout = booking.checkout;
  saveAdminRooms(rooms);
  saveAdminBookings(bookings);
  syncBookingToCustomerAccount(booking);

  const subject = `LOTTE HOTEL HANOI - Thông tin phòng ${booking.bookingId}`;
  const paymentBody = depositPlan
    ? `Chúng tôi đã xác nhận nhận tiền cọc 30% là ${formatBookingMoney(expectedDeposit)} cho mã đặt phòng ${booking.bookingId}. Phần còn lại ${formatBookingMoney(booking.remainingAmount)} sẽ được thanh toán bằng tiền mặt tại quầy khách sạn khi quý khách đến nhận phòng.`
    : `Chúng tôi đã ghi nhận thanh toán đầy đủ ${formatBookingMoney(totalAmount)} cho mã đặt phòng ${booking.bookingId}.`;
  const body = `Kính gửi ${booking.customerName || "Quý khách"},\n\n${paymentBody}\nThông tin phòng đã xếp:\n- Hạng phòng: ${booking.roomType || ""}\n- Số phòng: ${room.roomNumber}\n- Tầng: ${room.floor || "Theo sơ đồ khách sạn"}\n- Nhận phòng: ${booking.checkin}\n- Trả phòng: ${booking.checkout}\n\nVui lòng xuất trình mã đặt phòng khi đến nhận phòng.\nTrân trọng,\nLotte Hotel Hanoi`;
  queueCustomerEmail(booking, subject, body);
  showAdminToast(depositPlan
    ? `Đã xác nhận cọc 30% và xếp phòng ${room.roomNumber}. Còn lại thu tại quầy.`
    : `Đã ghi nhận thanh toán toàn bộ và xếp phòng ${room.roomNumber}.`);
  filterBookings();
  initDashboardData();
}

async function confirmCashBalancePayment(bookingId) {
  const bookings = getAdminBookings();
  const booking = bookings.find(b => b.bookingId === bookingId);
  if (!booking || booking.status !== "Đã cọc 30% - chờ nhận phòng" || !isDepositCashPlan(booking)) return;
  if (booking.cashBalancePaidAt) {
    alert("Khoản tiền còn lại đã được ghi nhận là đã thu.");
    return;
  }
  const totalAmount = getBookingTotalAmount(booking);
  const depositAmount = Number(booking.depositAmount) || Math.round(totalAmount * 0.3);
  const balance = Math.max(0, totalAmount - depositAmount);
  const cashCollected = await showLotteConfirm({
    title: "Xác nhận thu tiền tại quầy",
    message: `Ghi nhận đã thu ${formatBookingMoney(balance)} tiền mặt cho đơn ${booking.bookingId}?`,
    detail: "Sau khi xác nhận, đơn sẽ được ghi nhận đã thanh toán đủ. Chỉ tiếp tục khi khách đã giao tiền mặt thực tế.",
    confirmText: "Đã thu tiền mặt",
    cancelText: "Quay lại",
    variant: "success"
  });
  if (!cashCollected) return;

  const now = new Date().toISOString();
  booking.cashBalancePaidAt = now;
  booking.cashBalanceAmount = balance;
  booking.cashBalancePaymentMethod = "Tiền mặt tại quầy khách sạn";
  booking.paymentStatus = `Đã cọc online ${formatBookingMoney(depositAmount)} + đã thu tiền mặt ${formatBookingMoney(balance)} tại quầy`;
  booking.status = "Đã thanh toán - chờ nhận phòng";
  booking.paidAt = now;
  booking.paymentConfirmedAt = booking.depositConfirmedAt || now;
  booking.customerNotice = {
    title: "Đã thu đủ tiền phòng",
    message: `Khách sạn đã ghi nhận khoản cọc online ${formatBookingMoney(depositAmount)} và tiền mặt tại quầy ${formatBookingMoney(balance)}. Tổng thanh toán ${formatBookingMoney(totalAmount)} đã hoàn tất. Phòng ${booking.roomNumber || "đã được xếp"} đang chờ quý khách nhận phòng.`,
    createdAt: now,
    type: "payment_confirmed"
  };
  saveAdminBookings(bookings);
  syncBookingToCustomerAccount(booking);
  queueCustomerEmail(booking, `LOTTE HOTEL HANOI - Xác nhận đã thu đủ tiền ${booking.bookingId}`,
    `Kính gửi ${booking.customerName || "Quý khách"},\n\nKhách sạn đã ghi nhận khoản cọc online ${formatBookingMoney(depositAmount)} và đã thu tiền mặt tại quầy ${formatBookingMoney(balance)}. Đơn đặt phòng ${booking.bookingId} đã được thanh toán đủ.\nSố phòng: ${booking.roomNumber || "Đã xếp"}\nTầng: ${booking.floor || "—"}\nNgày nhận phòng: ${booking.checkin}\nNgày trả phòng: ${booking.checkout}\n\nTrân trọng,\nLotte Hotel Hanoi`);
  showAdminToast(`Đã ghi nhận thu tiền mặt ${formatBookingMoney(balance)} tại quầy.`);
  filterBookings();
  initDashboardData();
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
        room.guestName = bookings[idx].customerName;
        room.guestPhone = bookings[idx].customerPhone;
        room.bookingId = bookingId;
        room.checkin = bookings[idx].checkin;
        room.checkout = bookings[idx].checkout;
        bookings[idx].roomNumber = room.roomNumber;
      }
    }
    if (room) {
      room.status = "occupied";
      room.guestName = bookings[idx].customerName;
      room.guestPhone = bookings[idx].customerPhone;
      room.bookingId = bookingId;
      room.checkin = bookings[idx].checkin;
      room.checkout = bookings[idx].checkout;
    }
    saveAdminRooms(rooms);
    saveAdminBookings(bookings);
    syncBookingToCustomerAccount(bookings[idx]);
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

  // Tìm các phòng trống của hạng phòng này
  let availRooms = rooms.filter(r => r.hotelId === hotelId && r.status === "available");
  
  if (availRooms.length === 0) {
    roomSelect.innerHTML = `<option value="">-- Hết phòng trống cho hạng phòng này --</option>`;
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

  let csv = "Mã Đặt Phòng,Khách Hàng,Số Điện Thoại,Email,Hạng Phòng,Hạng Phòng,Số Phòng,Ngày Nhận,Ngày Trả,Số Đêm,Tổng Tiền,Thanh Toán,Trạng Thái,Ghi Chú\n";
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

  // 1. Vẽ biểu đồ xu hướng doanh thu từ Tổng quan vào Báo cáo doanh thu
  renderRevenueChart(currentRevenuePeriod);

  // 2. Bảng kê chi tiết giao dịch đặt phòng
  const transTbody = document.getElementById("revenue-transactions-tbody");
  if (transTbody) {
    if (bookings.length === 0) {
      transTbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 24px; color: #94a3b8;">Chưa có dữ liệu giao dịch đặt phòng nào.</td></tr>`;
      return;
    }

    transTbody.innerHTML = bookings.map(b => `
      <tr>
        <td><strong style="color: #0b1329;">${b.bookingId}</strong></td>
        <td>${formatDateDisplay(b.bookedAt || b.checkin)}</td>
        <td>
          <div style="font-weight: 700; color: #0f172a;">${b.customerName}</div>
          <div style="font-size: 0.76rem; color: #0284c7;">${b.customerPhone}</div>
          <div style="font-size: 0.72rem; color: #64748b;">${b.customerEmail || 'Chưa cung cấp email'}</div>
        </td>
        <td>
          <div style="font-weight: 600; color: #1e293b;">${b.hotelName}</div>
          <div style="font-size: 0.78rem; color: #64748b;">${b.roomType} ${b.roomNumber ? `(${b.roomNumber})` : ''}</div>
        </td>
        <td>${b.nights} đêm</td>
        <td><span style="background: #f1f5f9; padding: 2px 7px; border-radius: 4px; font-size: 0.76rem; font-weight: 500;">${b.paymentMethod || "Tiền mặt"}</span></td>
        <td><strong style="color: var(--admin-primary); font-size: 0.95rem;">${b.totalPrice}</strong></td>
        <td>
          <span class="status-badge ${b.status === 'Đã hủy' ? 'cancelled' : (b.status === 'Đã thanh toán - chờ nhận phòng' || b.paymentStatus === 'Đã xác nhận thanh toán' ? 'completed' : 'confirmed')}">${getPaymentStatusText(b)}</span>
          ${b.eInvoiceExported ? `<div style="margin-top: 4px;"><span style="background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; border-radius: 4px; padding: 1px 6px; font-size: 0.7rem; font-weight: 600; display: inline-flex; align-items: center; gap: 3px;" title="Mã HĐĐT: ${b.eInvoiceCode || ''}"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>Đã xuất HĐĐT</span></div>` : ''}
        </td>
        <td>
          <div style="display: flex; gap: 6px; align-items: center; justify-content: center; flex-wrap: wrap;">
            <button type="button" class="btn btn-outline" style="padding: 4px 8px; font-size: 0.76rem; display: inline-flex; align-items: center; gap: 4px;" onclick="openTransactionDetailModal('${b.bookingId}')" title="Hiển thị thông tin khách hàng kèm hóa đơn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              Chi tiết
            </button>
            <button type="button" class="btn btn-primary" style="padding: 4px 8px; font-size: 0.76rem; display: inline-flex; align-items: center; gap: 4px; background: #059669; border-color: #059669;" onclick="exportElectronicInvoice('${b.bookingId}')" title="Xuất hóa đơn điện tử vào email khách hàng">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Xuất HĐĐT
            </button>
          </div>
        </td>
      </tr>
    `).join("");
  }
}

function exportRevenueReportCSV() {
  const bookings = getAdminBookings();
  let csv = "Mã Giao Dịch,Ngày Đặt,Khách Hàng,Email,Số Điện Thoại,Hạng Phòng,Số Đêm,Phương Thức Thanh Toán,Số Tiền,Trạng Thái Thu,Hóa Đơn Điện Tử\n";
  bookings.forEach(b => {
    const einvoiceInfo = b.eInvoiceExported ? `Đã xuất (${b.eInvoiceCode || ''})` : 'Chưa xuất';
    csv += `"${b.bookingId}","${b.bookedAt || b.checkin}","${b.customerName}","${b.customerEmail || ''}","${b.customerPhone || ''}","${b.hotelName} - ${b.roomType}",${b.nights},"${b.paymentMethod || ''}","${b.totalPrice}","${b.status}","${einvoiceInfo}"\n`;
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

let currentInvoiceBookingId = null;

function openTransactionDetailModal(bookingId) {
  openInvoiceModal(bookingId);
}

function openInvoiceModal(bookingId) {
  const bookings = getAdminBookings();
  const b = bookings.find(item => item.bookingId === bookingId);
  if (!b) return;

  currentInvoiceBookingId = bookingId;

  const contentEl = document.getElementById("invoice-printable-content");
  if (!contentEl) return;

  const raw = b.rawAmount || parseInt((b.totalPrice || "0").replace(/\D/g, "")) || 0;
  const netAmount = Math.round(raw / 1.08);
  const vatAmount = raw - netAmount;

  // Cập nhật tiêu đề modal
  const modalTitle = document.getElementById("invoice-modal-title");
  if (modalTitle) {
    modalTitle.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      Thông Tin Khách Hàng Kèm Hóa Đơn Chi Tiết - ${b.bookingId}
    `;
  }

  // Cập nhật trạng thái nút xuất HĐĐT ở footer
  const btnExport = document.getElementById("btn-modal-export-einvoice");
  if (btnExport) {
    btnExport.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
      ${b.eInvoiceExported ? 'Gửi Lại Hóa Đơn Điện Tử' : 'Xuất Hóa Đơn Điện Tử Vào Email'}
    `;
  }

  contentEl.innerHTML = `
    <!-- KHỐI THÔNG TIN KHÁCH HÀNG -->
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px 20px; margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 8px;">
        <div style="font-weight: 800; font-size: 0.95rem; color: #0b1329; display: flex; align-items: center; gap: 8px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--admin-primary)" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          THÔNG TIN KHÁCH HÀNG
        </div>
        <span style="background: #e0f2fe; color: #0369a1; padding: 2px 10px; border-radius: 99px; font-size: 0.76rem; font-weight: 700;">
          Hội viên Lotte Club
        </span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; font-size: 0.88rem;">
        <div>
          <div style="font-size: 0.74rem; color: #64748b; text-transform: uppercase; font-weight: 600;">Họ và tên khách:</div>
          <div style="font-weight: 800; color: #0f172a; font-size: 1.05rem; margin-top: 2px;">${b.customerName}</div>
        </div>
        <div>
          <div style="font-size: 0.74rem; color: #64748b; text-transform: uppercase; font-weight: 600;">Số điện thoại:</div>
          <div style="font-weight: 700; color: #0284c7; margin-top: 2px;">📞 ${b.customerPhone}</div>
        </div>
        <div>
          <div style="font-size: 0.74rem; color: #64748b; text-transform: uppercase; font-weight: 600;">Email nhận hóa đơn điện tử:</div>
          <div style="font-weight: 700; color: #059669; margin-top: 2px; word-break: break-all;">✉️ ${b.customerEmail || 'Chưa cung cấp email'}</div>
        </div>
        <div>
          <div style="font-size: 0.74rem; color: #64748b; text-transform: uppercase; font-weight: 600;">Ghi chú lưu trú:</div>
          <div style="color: #475569; font-style: italic; margin-top: 2px;">${b.note || 'Không có yêu cầu đặc biệt'}</div>
        </div>
      </div>
    </div>

    <!-- KHỐI HÓA ĐƠN CHI TIẾT -->
    <div class="invoice-card">
      <div class="invoice-header">
        <div class="invoice-brand">
          <h2>LOTTE HOTEL <span>HANOI</span></h2>
          <p><strong>CÔNG TY TNHH LOTTE HOTEL HANOI</strong></p>
          <p>Mã số thuế: <strong>0106678899</strong> - Chi cục Thuế Ba Đình</p>
          <p>54 Liễu Giai, Phường Cống Vị, Quận Ba Đình, Hà Nội</p>
          <p>Hotline: 1900 6006 | Email: reservation@lottehotel.vn</p>
        </div>
        <div class="invoice-meta">
          <div class="invoice-meta-code">HÓA ĐƠN: HD-${b.bookingId}</div>
          <div style="font-size: 0.78rem; color: #64748b; margin-top: 2px;">Mẫu số: <strong>1C26TLL</strong> &bull; Ký hiệu: <strong>C26MAA</strong></div>
          <div class="invoice-meta-date">Ngày lập: ${formatDateDisplay(b.bookedAt || new Date().toISOString())}</div>
          <div style="margin-top: 6px;">${renderStatusBadge(b.status)}</div>
        </div>
      </div>

      <div class="invoice-info-grid">
        <div class="invoice-info-block">
          <h4>Khách Hàng Thanh Toán</h4>
          <p><strong>${b.customerName}</strong></p>
          <p>Điện thoại: ${b.customerPhone}</p>
          <p>Email: ${b.customerEmail || 'N/A'}</p>
        </div>

        <div class="invoice-info-block">
          <h4>Chi Tiết Phòng & Lưu Trú</h4>
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
                <div style="font-size: 0.75rem; color: #64748b;">Đã bao gồm buffet sáng 5 sao, hồ bơi bốn mùa, phòng Gym và wifi tốc độ cao</div>
              </td>
              <td>${formatCurrencyVND(Math.round(netAmount / (b.nights || 1)))}</td>
              <td>${b.nights} đêm</td>
              <td style="text-align: right; font-weight: 700;">${formatCurrencyVND(netAmount)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px;">
        <div>
          <div style="font-size: 0.82rem; color: #64748b;">Hình thức thanh toán: <strong style="color: #0f172a;">${b.paymentMethod || "Tiền mặt tại quầy"}</strong></div>
          <div style="font-size: 0.78rem; color: #64748b; margin-top: 4px;">Trạng thái thanh toán: <strong>${getPaymentStatusText(b)}</strong></div>
        </div>

        <div style="min-width: 260px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
            <span>Tiền phòng (chưa thuế):</span>
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

      <!-- KHỐI TRẠNG THÁI HÓA ĐƠN ĐIỆN TỬ -->
      <div class="no-print" style="margin-top: 24px; padding: 14px 18px; border-radius: 8px; ${b.eInvoiceExported ? 'background: #ecfdf5; border: 1px solid #10b981;' : 'background: #eff6ff; border: 1px solid #bfdbfe;'}">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; ${b.eInvoiceExported ? 'background: #10b981; color: white;' : 'background: #3b82f6; color: white;'}">
              ${b.eInvoiceExported ? '✓' : '📧'}
            </div>
            <div>
              <div style="font-weight: 800; font-size: 0.92rem; ${b.eInvoiceExported ? 'color: #065f46;' : 'color: #1e40af;'}">
                ${b.eInvoiceExported ? 'HÓA ĐƠN ĐIỆN TỬ ĐÃ ĐƯỢC XUẤT THÀNH CÔNG' : 'HÓA ĐƠN ĐIỆN TỬ CHƯA ĐƯỢC XUẤT'}
              </div>
              <div style="font-size: 0.82rem; margin-top: 2px; ${b.eInvoiceExported ? 'color: #047857;' : 'color: #1d4ed8;'}">
                ${b.eInvoiceExported 
                  ? `Đã ký số và gửi tệp HĐĐT (PDF, XML) tới email: <strong>${b.customerEmail}</strong> | Mã tra cứu: <strong>${b.eInvoiceCode || ('HDDT-' + b.bookingId)}</strong>`
                  : `Email nhận hóa đơn: <strong>${b.customerEmail || 'Chưa thiết lập email'}</strong> (Hệ thống sẽ gửi file PDF hóa đơn kèm chữ ký số điện tử)`
                }
              </div>
              ${b.eInvoiceDate ? `<div style="font-size: 0.74rem; color: #64748b; margin-top: 2px;">Thời gian xuất: ${new Date(b.eInvoiceDate).toLocaleString('vi-VN')}</div>` : ''}
            </div>
          </div>
          <div>
            <button type="button" class="btn btn-sm btn-primary" style="background: #059669; border-color: #059669; font-size: 0.8rem; padding: 6px 14px; display: inline-flex; align-items: center; gap: 6px;" onclick="exportElectronicInvoice('${b.bookingId}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              ${b.eInvoiceExported ? 'Gửi Lại HĐĐT' : 'Xuất HĐĐT Ngay'}
            </button>
          </div>
        </div>
      </div>

      <div style="margin-top: 24px; text-align: center; border-top: 1px dashed var(--admin-border); padding-top: 16px; font-size: 0.78rem; color: #94a3b8;">
        Hóa đơn điện tử khởi tạo theo Nghị định 123/2020/NĐ-CP & Thông tư 78/2021/TT-BTC &bull; CÔNG TY TNHH LOTTE HOTEL HANOI
      </div>
    </div>
  `;

  openAdminModal("modal-invoice");
}

function exportElectronicInvoiceCurrentModal() {
  if (currentInvoiceBookingId) {
    exportElectronicInvoice(currentInvoiceBookingId);
  }
}

function exportElectronicInvoice(bookingId) {
  let bookings = getAdminBookings();
  const idx = bookings.findIndex(item => item.bookingId === bookingId);
  if (idx === -1) {
    showAdminToast("Không tìm thấy đơn đặt phòng!", "error");
    return;
  }

  const b = bookings[idx];
  let targetEmail = (b.customerEmail || "").trim();

  // Kiểm tra email khách hàng, nếu chưa có thì hỏi người dùng nhập
  if (!targetEmail || !targetEmail.includes("@")) {
    const inputEmail = prompt(
      `Khách hàng "${b.customerName}" chưa có địa chỉ email hợp lệ.\nVui lòng nhập email của khách hàng để xuất hóa đơn điện tử:`,
      targetEmail || ""
    );
    if (!inputEmail || !inputEmail.trim()) {
      showAdminToast("Đã hủy xuất hóa đơn điện tử (Chưa có email)!", "error");
      return;
    }
    targetEmail = inputEmail.trim();
    b.customerEmail = targetEmail;
  }

  // Khởi tạo mã hóa đơn điện tử nếu chưa có
  const cleanId = b.bookingId.replace(/[^A-Za-z0-9]/g, "");
  const randNum = Math.floor(1000 + Math.random() * 9000);
  const einvoiceCode = b.eInvoiceCode || `HDDT-${cleanId}-${randNum}`;

  b.eInvoiceExported = true;
  b.eInvoiceDate = new Date().toISOString();
  b.eInvoiceCode = einvoiceCode;

  // Lưu vào LocalStorage
  saveAdminBookings(bookings);

  // Hiển thị thông báo Toast thành công
  showAdminToast(`Đã xuất hóa đơn điện tử (${einvoiceCode}) thành công vào email: ${targetEmail}!`, "success");

  // Nếu đang mở modal thì vẽ lại modal
  const modalEl = document.getElementById("modal-invoice");
  if (modalEl && modalEl.classList.contains("active")) {
    openInvoiceModal(bookingId);
  }

  // Cập nhật lại giao diện Báo cáo doanh thu & Đặt phòng
  renderRevenueSection();
  if (typeof filterBookings === "function") {
    filterBookings();
  }
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

function getPaymentStatusText(booking) {
  if (!booking) return "Chưa xác định";
  if (booking.status === "Đã hủy") return "Không thu tiền (đơn đã hủy)";
  if (booking.status === "Đã cọc 30% - chờ nhận phòng") return `Đã xác nhận cọc 30% (${formatBookingMoney(booking.depositAmount || 0)}); còn thu ${formatBookingMoney(booking.remainingAmount || 0)} tại quầy`;
  if (booking.status === "Đã thanh toán - chờ nhận phòng" || booking.paymentStatus === "Đã xác nhận thanh toán" || booking.paymentStatus === "Đã xác nhận thanh toán toàn bộ" || (booking.paymentConfirmedAt && !isDepositCashPlan(booking)) || booking.cashBalancePaidAt) return "Đã được admin xác nhận thanh toán đủ";
  if (booking.status === "Chờ thanh toán") {
    return booking.paymentSubmittedAt ? "Khách đã gửi yêu cầu thanh toán — chờ admin xác nhận" : "Chưa thanh toán — chờ khách thanh toán";
  }
  if (booking.status === "Chờ admin xác nhận") return "Chưa thanh toán — chờ admin kiểm tra phòng";
  if (booking.status === "Đã xác nhận") return "Chưa ghi nhận thanh toán";
  if (booking.status === "Đang lưu trú" || booking.status === "Hoàn thành") return booking.paymentStatus || "Cần đối chiếu thanh toán";
  return booking.paymentStatus || "Chưa xác nhận thu tiền";
}

function renderStatusBadge(status) {
  if (status === "Chờ admin xác nhận") {
    return `<span class="status-badge" style="background:#fff7ed;color:#c2410c;">🟠 Chờ admin xác nhận</span>`;
  } else if (status === "Chờ thanh toán") {
    return `<span class="status-badge" style="background:#eff6ff;color:#1d4ed8;">⏳ Chờ thanh toán 24 giờ</span>`;
  } else if (status === "Đã cọc 30% - chờ nhận phòng") {
    return `<span class="status-badge" style="background:#ccfbf1;color:#0f766e;">✓ Đã cọc 30% / Đã xếp phòng</span>`;
  } else if (status === "Đã thanh toán - chờ nhận phòng") {
    return `<span class="status-badge" style="background:#ecfdf5;color:#047857;">💳 Đã thanh toán đủ / Đã xếp phòng</span>`;
  } else if (status === "Đang lưu trú") {
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
  } else if (status === "reserved") {
    return `<span class="status-badge confirmed">🟣 Đã xếp phòng</span>`;
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


// Đồng bộ bảng quản lý đặt phòng khi trang thanh toán ở tab khác cập nhật LocalStorage.
window.addEventListener("storage", function (event) {
  if (event.key === "traveloka_all_bookings") {
    if (typeof filterBookings === "function") filterBookings();
    if (typeof initDashboardData === "function") initDashboardData();
  }
});
