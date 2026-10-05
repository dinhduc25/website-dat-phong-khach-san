/**
 * ========================================================
 * LOTTE HOTEL HANOI & TRAVELOKA - AUTHENTICATION & USER LOGIC
 * Quản lý & Lưu trữ danh sách tài khoản bằng MẢNG (Array)
 * Quản lý lịch sử đặt phòng (bookings) và danh sách đã lưu (wishlist)
 * ========================================================
 */

// 1. MẢNG TÀI KHOẢN MẪU BAN ĐẦU
const DEFAULT_HOTEL_USERS = [
  {
    id: "usr_admin_01",
    fullName: "Quản Trị Viên Lotte (General Manager)",
    email: "admin@lottehotel.vn",
    phone: "0999888999",
    password: "admin",
    role: "Tổng Quản Lý Hệ Thống (General Manager)",
    isAdmin: true,
    createdAt: "2026-01-01T00:00:00Z",
    bookings: [],
    wishlist: []
  },
  {
    id: "usr_lotte_01",
    fullName: "Nguyễn Hoàng Lotte",
    email: "demo@lottehotel.vn",
    phone: "0901234567",
    password: "123456",
    role: "Khách hàng Thân thiết (Lotte Club Gold)",
    createdAt: "2026-09-01T08:00:00Z",
    bookings: [
      {
        bookingId: "LT-HN-89234",
        customerName: "Nguyễn Hoàng Lotte",
        customerPhone: "0901234567",
        customerEmail: "demo@lottehotel.vn",
        hotelId: "lotte-hotel-hanoi",
        hotelName: "Lotte Hotel Hanoi (5 Sao Đẳng Cấp)",
        hotelImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        roomNumber: "P.5102",
        roomType: "Premier Lake View ngắm Hồ Tây (Tầng 51-60)",
        checkin: "2026-09-28",
        checkout: "2026-09-30",
        nights: 2,
        guests: "2 người lớn",
        rooms: 1,
        totalPrice: "6.400.000₫",
        status: "Đang lưu trú",
        paymentMethod: "Chuyển khoản QR",
        bookedAt: "2026-09-24T10:00:00Z"
      }
    ],
    wishlist: ["lotte-hotel-hanoi", "intercon-westlake"]
  },
  {
    id: "usr_lotte_02",
    fullName: "Trần Thị Bích",
    email: "khachhang@gmail.com",
    phone: "0987654321",
    password: "123456",
    role: "Khách hàng Mới",
    createdAt: "2026-09-15T10:30:00Z",
    bookings: [],
    wishlist: ["apricot-hotel-hanoi"]
  }
];

// Lấy mảng người dùng từ LocalStorage (nếu chưa có thì nạp mảng mặc định)
function getHotelUsersArray() {
  const stored = localStorage.getItem("traveloka_hotel_users");
  if (!stored) {
    saveHotelUsersArray(DEFAULT_HOTEL_USERS);
    return [...DEFAULT_HOTEL_USERS];
  }
  try {
    const parsed = JSON.parse(stored);
    let users = Array.isArray(parsed) && parsed.length > 0 ? parsed : [...DEFAULT_HOTEL_USERS];
    // Đảm bảo luôn có tài khoản Admin và có cờ isAdmin
    const adminIdx = users.findIndex(u => u.email === "admin@lottehotel.vn");
    if (adminIdx === -1) {
      users.unshift(DEFAULT_HOTEL_USERS[0]);
      saveHotelUsersArray(users);
    } else if (!users[adminIdx].isAdmin) {
      users[adminIdx].isAdmin = true;
      saveHotelUsersArray(users);
    }
    return users;
  } catch (e) {
    return [...DEFAULT_HOTEL_USERS];
  }
}

// Kiểm tra quyền Quản trị viên (Admin)
function isAdminUser(user) {
  if (!user || typeof user !== "object") return false;

  // CHỈ tài khoản được cấp cờ isAdmin=true mới có quyền quản trị.
  // Không dùng email làm điều kiện quyền để tránh khách hàng bị cấp quyền nhầm.
  return user.isAdmin === true;
}

// Kiểm tra quyền Admin của phiên đăng nhập hiện tại
function checkCurrentAdminAuth() {
  const user = getCurrentUser();
  return isAdminUser(user);
}

// Lưu mảng người dùng vào LocalStorage
function saveHotelUsersArray(usersArray) {
  localStorage.setItem("traveloka_hotel_users", JSON.stringify(usersArray));
}

// Lấy thông tin người dùng đang đăng nhập
function getCurrentUser() {
  const stored = localStorage.getItem("traveloka_current_user") || sessionStorage.getItem("traveloka_current_user");
  if (!stored) return null;
  try {
    const user = JSON.parse(stored);
    // Đồng bộ lại dữ liệu mới nhất từ mảng người dùng chính
    const users = getHotelUsersArray();
    const freshUser = users.find(u => u.id === user.id || u.email === user.email);
    if (freshUser) {
      return freshUser;
    }

    // Session cũ/không hợp lệ -> xóa để không sử dụng dữ liệu giả mạo.
    localStorage.removeItem("traveloka_current_user");
    sessionStorage.removeItem("traveloka_current_user");
    return null;
  } catch (e) {
    return null;
  }
}

// Cập nhật phiên đăng nhập của người dùng hiện tại
function setCurrentUser(user, remember = true) {
  const data = JSON.stringify(user);
  if (remember) {
    localStorage.setItem("traveloka_current_user", data);
  } else {
    sessionStorage.setItem("traveloka_current_user", data);
  }
}

// Đăng xuất
function logoutUser() {
  localStorage.removeItem("traveloka_current_user");
  sessionStorage.removeItem("traveloka_current_user");
}

// Thêm người dùng mới vào mảng
function registerUserToArray(newUser) {
  const users = getHotelUsersArray();
  // Khởi tạo thuộc tính bookings và wishlist nếu chưa có
  newUser.bookings = newUser.bookings || [];
  newUser.wishlist = newUser.wishlist || [];
  newUser.id = "usr_" + Date.now();
  newUser.createdAt = new Date().toISOString();
  
  users.push(newUser); // Thao tác mảng: push phần tử mới
  saveHotelUsersArray(users);
  
  // Tự động đăng nhập
  setCurrentUser(newUser, true);
  return newUser;
}

// Tìm kiếm người dùng trong mảng theo email hoặc SĐT
function authenticateUser(identifier, password) {
  const users = getHotelUsersArray();
  const search = identifier.trim().toLowerCase();
  
  return users.find(u => 
    (u.email.toLowerCase() === search || u.phone === search) && 
    u.password === password
  );
}

// Kiểm tra trùng lặp email hoặc SĐT trong mảng
function checkUserConflictInArray(email, phone) {
  const users = getHotelUsersArray();
  const emailLower = email.trim().toLowerCase();
  const phoneVal = phone.trim();
  
  const emailExisted = users.some(u => u.email.toLowerCase() === emailLower);
  const phoneExisted = users.some(u => u.phone === phoneVal);
  
  return { emailExisted, phoneExisted };
}

// Thêm phòng đã đặt vào tài khoản người dùng trong mảng
function addBookingToCurrentUser(bookingData) {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;
  
  const users = getHotelUsersArray();
  const userIndex = users.findIndex(u => u.id === currentUser.id || u.email === currentUser.email);
  
  if (userIndex === -1) return false;
  
  if (!Array.isArray(users[userIndex].bookings)) {
    users[userIndex].bookings = [];
  }
  
  // Bổ sung thông tin khách hàng nếu chưa có
  bookingData.customerName = bookingData.customerName || currentUser.fullName;
  bookingData.customerPhone = bookingData.customerPhone || currentUser.phone;
  bookingData.customerEmail = bookingData.customerEmail || currentUser.email;
  bookingData.userId = currentUser.id;

  // Thêm đặt phòng mới vào đầu mảng bookings của user
  users[userIndex].bookings.unshift(bookingData);
  
  // Lưu lại mảng users
  saveHotelUsersArray(users);
  setCurrentUser(users[userIndex]);

  // ĐỒNG BỘ VÀO HỆ THỐNG QUẢN TRỊ ADMIN (traveloka_all_bookings)
  try {
    const allBookingsStr = localStorage.getItem("traveloka_all_bookings");
    let allBookings = allBookingsStr ? JSON.parse(allBookingsStr) : [];
    if (!Array.isArray(allBookings)) allBookings = [];
    allBookings.unshift(bookingData);
    localStorage.setItem("traveloka_all_bookings", JSON.stringify(allBookings));

    // Cập nhật trạng thái phòng thực tế sang "occupied" (Đang có khách) nếu có trong danh sách phòng
    const roomsStr = localStorage.getItem("traveloka_hotel_rooms");
    if (roomsStr) {
      let rooms = JSON.parse(roomsStr);
      if (Array.isArray(rooms)) {
        // Tìm phòng trống phù hợp với khách sạn
        let targetRoom = rooms.find(r => r.hotelId === bookingData.hotelId && r.status === "available");
        if (!targetRoom) {
          targetRoom = rooms.find(r => r.hotelId === bookingData.hotelId);
        }
        if (targetRoom) {
          targetRoom.status = "occupied";
          targetRoom.guestName = bookingData.customerName;
          targetRoom.guestPhone = bookingData.customerPhone;
          targetRoom.bookingId = bookingData.bookingId;
          targetRoom.checkin = bookingData.checkin;
          targetRoom.checkout = bookingData.checkout;
          bookingData.roomNumber = targetRoom.roomNumber;
          localStorage.setItem("traveloka_hotel_rooms", JSON.stringify(rooms));
        }
      }
    }

    // Thêm thông báo thời gian thực cho Quản Trị Viên (Admin)
    const notifsStr = localStorage.getItem("traveloka_admin_notifications");
    let notifs = notifsStr ? JSON.parse(notifsStr) : [];
    if (!Array.isArray(notifs)) notifs = [];
    notifs.unshift({
      id: "notif_" + Date.now(),
      title: "Đơn đặt phòng mới vừa tạo",
      desc: `${bookingData.customerName} vừa đặt ${bookingData.roomType} tại ${bookingData.hotelName} (${bookingData.totalPrice})`,
      time: "Vừa xong",
      timestamp: new Date().toISOString(),
      type: "booking",
      read: false
    });
    localStorage.setItem("traveloka_admin_notifications", JSON.stringify(notifs.slice(0, 30)));
  } catch (err) {
    console.error("Lỗi đồng bộ dữ liệu đặt phòng lên hệ thống Admin:", err);
  }

  return true;
}

// Hủy đặt phòng khỏi mảng và đồng bộ hệ thống Admin
function cancelUserBooking(bookingId) {
  const currentUser = getCurrentUser();
  if (!currentUser) return false;
  
  const users = getHotelUsersArray();
  const userIndex = users.findIndex(u => u.id === currentUser.id || u.email === currentUser.email);
  if (userIndex === -1) return false;
  
  const bIndex = users[userIndex].bookings.findIndex(b => b.bookingId === bookingId);
  if (bIndex !== -1) {
    users[userIndex].bookings[bIndex].status = "Đã hủy";
    saveHotelUsersArray(users);
    setCurrentUser(users[userIndex]);

    // Đồng bộ sang traveloka_all_bookings
    try {
      const allBookingsStr = localStorage.getItem("traveloka_all_bookings");
      if (allBookingsStr) {
        let allBookings = JSON.parse(allBookingsStr);
        if (Array.isArray(allBookings)) {
          const gbIndex = allBookings.findIndex(b => b.bookingId === bookingId);
          if (gbIndex !== -1) {
            allBookings[gbIndex].status = "Đã hủy";
            localStorage.setItem("traveloka_all_bookings", JSON.stringify(allBookings));
          }
        }
      }

      // Giải phóng phòng về "cleaning" (cần dọn dẹp) hoặc "available"
      const roomsStr = localStorage.getItem("traveloka_hotel_rooms");
      if (roomsStr) {
        let rooms = JSON.parse(roomsStr);
        if (Array.isArray(rooms)) {
          const room = rooms.find(r => r.bookingId === bookingId);
          if (room) {
            room.status = "cleaning";
            room.guestName = "";
            room.guestPhone = "";
            room.bookingId = "";
            localStorage.setItem("traveloka_hotel_rooms", JSON.stringify(rooms));
          }
        }
      }
    } catch (err) {
      console.error("Lỗi đồng bộ hủy phòng lên hệ thống Admin:", err);
    }

    return true;
  }
  return false;
}

// Lưu / Bỏ lưu khách sạn yêu thích (Wishlist)
function toggleUserWishlist(hotelId) {
  const currentUser = getCurrentUser();
  let wishlist = [];
  
  if (currentUser) {
    const users = getHotelUsersArray();
    const userIndex = users.findIndex(u => u.id === currentUser.id || u.email === currentUser.email);
    if (userIndex !== -1) {
      users[userIndex].wishlist = users[userIndex].wishlist || [];
      const idx = users[userIndex].wishlist.indexOf(hotelId);
      if (idx !== -1) {
        users[userIndex].wishlist.splice(idx, 1);
      } else {
        users[userIndex].wishlist.push(hotelId);
      }
      saveHotelUsersArray(users);
      setCurrentUser(users[userIndex]);
      wishlist = users[userIndex].wishlist;
    }
  } else {
    // Khách vãng lai lưu tạm vào localStorage
    let guestWishlist = JSON.parse(localStorage.getItem("guest_hotel_wishlist") || "[]");
    const idx = guestWishlist.indexOf(hotelId);
    if (idx !== -1) {
      guestWishlist.splice(idx, 1);
    } else {
      guestWishlist.push(hotelId);
    }
    localStorage.setItem("guest_hotel_wishlist", JSON.stringify(guestWishlist));
    wishlist = guestWishlist;
  }
  return wishlist;
}

function getUserWishlist() {
  const currentUser = getCurrentUser();
  if (currentUser && Array.isArray(currentUser.wishlist)) {
    return currentUser.wishlist;
  }
  return JSON.parse(localStorage.getItem("guest_hotel_wishlist") || "[]");
}
