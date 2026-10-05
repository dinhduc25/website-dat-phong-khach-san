# BÁO CÁO PHÂN CHIA FILE & MÃ NGUỒN THEO 4 THÀNH VIÊN
## DỰ ÁN: HỆ THỐNG ĐẶT PHÒNG KHÁCH SẠN LOTTE HOTEL HANOI & TRAVELOKA PORTAL

---

### TỔNG QUAN CẤU TRÚC PHÂN TÁCH FILE
Toàn bộ mã nguồn đã được tách bạch thành các file CSS và JavaScript độc lập cho từng thành viên, giúp dễ dàng nhận diện đóng góp của mỗi người khi báo cáo đồ án, đồng thời đảm bảo mã nguồn liên kết chặt chẽ và hoạt động 100%:

```
traveloka-hotel/
│
├── index.html                           # Trang chủ tích hợp 4 thành viên (có chú thích STT rõ ràng)
├── rooms.html                           # Trang chuyên mục Danh sách phòng & Khách sạn (Thành viên 2)
├── contact.html                         # Trang chuyên mục Liên hệ & Hỗ trợ (Thành viên 4)
├── admin.html                           # Cổng quản trị hệ thống khách sạn
├── login.html & register.html           # Trang xác thực độc lập
│
├── css/
│   ├── part1-home.css                   # [THÀNH VIÊN 1] CSS Trang chủ & Giao diện chung (STT 1-10)
│   ├── part2-rooms.css                  # [THÀNH VIÊN 2] CSS Phòng & Thông tin khách sạn (STT 11-20)
│   ├── part3-booking.css                # [THÀNH VIÊN 3] CSS Tìm kiếm & Đặt phòng (STT 21-30)
│   ├── part4-contact.css                # [THÀNH VIÊN 4] CSS Liên hệ, Kiểm thử & Tích hợp (STT 31-40)
│   ├── style.css                        # Master Stylesheet nạp 4 file CSS
│   ├── admin.css & auth.css             # CSS phụ trợ cho Admin & Auth
│
└── js/
    ├── part1-home.js                    # [THÀNH VIÊN 1] Script Trang chủ & Giao diện chung (STT 1-10)
    ├── part2-rooms.js                   # [THÀNH VIÊN 2] Script Phòng & Thông tin khách sạn (STT 11-20)
    ├── part3-booking.js                 # [THÀNH VIÊN 3] Script Tìm kiếm & Đặt phòng (STT 21-30)
    ├── part4-contact.js                 # [THÀNH VIÊN 4] Script Liên hệ & Test Suite 40 tiêu chí (STT 31-40)
    ├── main.js                          # Master Script điều phối & kết nối cả 4 module
    ├── auth.js                          # Mảng tài khoản người dùng & LocalStorage dùng chung
    └── admin.js                         # Nghiệp vụ quản trị hệ thống
```

---

### PHÂN CÔNG CHI TIẾT 40 ĐẦU VIỆC CHO 4 THÀNH VIÊN

#### 👤 THÀNH VIÊN 1: TRANG CHỦ & GIAO DIỆN CHUNG (STT 1 - 10)
* **File phụ trách chính:**
  - `css/part1-home.css`
  - `js/part1-home.js`
  - Khu vực Header, Subnav, Hero Banner, Promos, Footer trên `index.html`
* **Nội dung công việc chi tiết:**
  - **STT 1: Phân tích bố cục tổng thể website:** Xây dựng hệ thống biến `:root` (Design Tokens: màu sắc Traveloka Blue `#0194f3`, Coral Promo `#ff5e1f`, Lotte Gold `#c5a059`), Reset CSS và cấu trúc Container 1220px. Các hàm định dạng tiền tệ `formatVND()` và ngày tháng `formatDateDisplay()`.
  - **STT 2: Thiết kế Header:** Xây dựng logo thương hiệu Lotte Hotel Hanoi với huy hiệu biểu tượng, menu đa ngữ/tiền tệ và hiệu ứng thanh cuộn dính `initHeaderScrollEffect()`.
  - **STT 3: Thiết kế Menu điều hướng:** Thanh điều hướng chính (Khuyến mãi, Phòng nghỉ, Liên hệ, Đã lưu, Đặt chỗ) và thanh Subnav Bar phân loại phòng có trạng thái kích hoạt (Active tab).
  - **STT 4: Thiết kế Footer:** Bố cục 4 cột chân trang giới thiệu Lotte Hotel, hotline 1900 6868, liên kết chính sách và hệ thống chứng nhận thanh toán (VietQR, Visa, MoMo, Napas).
  - **STT 5: Xây dựng giao diện Trang chủ:** Cấu trúc các khối section với tiêu đề chuẩn `.section-tag`, `.section-title`, `.section-desc`.
  - **STT 6: Thiết kế Banner/Slider trang chủ:** Khu vực Hero Wrapper với hình nền hoa văn pattern chấm tròn, chip cam kết giá tốt và thông điệp chào mừng.
  - **STT 7: Thiết kế khu vực giới thiệu nổi bật:** Lưới 3 vé Voucher ưu đãi độc quyền (sao chép mã nhanh), lưới 6 quận huyện/khu vực thịnh hành tại Hà Nội, lưới 4 loại hình lưu trú và lưới 4 cam kết chất lượng dịch vụ.
  - **STT 8: Thiết kế khu vực phòng nổi bật:** Khung bao bọc và tiêu đề khu vực phòng nghỉ trên trang chủ.
  - **STT 9: Thiết kế giao diện Responsive:** Tối ưu hiển thị cho Header, Subnav, Banner và Footer trên Tablet (1024px) và Mobile (768px/480px).
  - **STT 10: Kiểm tra và thống nhất giao diện chung:** Hệ thống thông báo nổi Toast Notification `showToast()`, giao diện Modal đăng nhập/đăng ký `openAuthModal()`, thanh hiển thị trạng thái hồ sơ người dùng `initAuthUI()`.

---

#### 👤 THÀNH VIÊN 2: PHÒNG & THÔNG TIN KHÁCH SẠN (STT 11 - 20)
* **File phụ trách chính:**
  - `css/part2-rooms.css`
  - `js/part2-rooms.js`
  - `rooms.html` (Trang chuyên mục Phòng nghỉ)
  - Khu vực lưới khách sạn và Modal Chi tiết phòng trên `index.html`
* **Nội dung công việc chi tiết:**
  - **STT 11: Xây dựng trang Giới thiệu khách sạn:** Cung cấp thông tin lịch sử, tiêu chuẩn 5 sao và định vị cao cấp của Lotte Hotel Hanoi.
  - **STT 12: Xây dựng cơ sở dữ liệu khách sạn:** Mảng đối tượng `HANOI_HOTELS_DATA` gồm 9 khách sạn danh tiếng (Lotte Hotel Hanoi, Pan Pacific, InterContinental Westlake, Apricot, La Siesta, The Chi, Novotel Suites, Melia, Amour Resort Ba Vì) với đầy đủ địa chỉ, số sao, điểm đánh giá.
  - **STT 13: Xây dựng khu vực hình ảnh khách sạn:** Ảnh đại diện thumbnail chất lượng cao có hiệu ứng phóng to (hover zoom) và thẻ trạng thái độc quyền (`lotte-tag`).
  - **STT 14: Xây dựng khu vực tiện ích khách sạn:** Trưng bày các tiện nghi đẳng cấp (Buffet sáng 5 sao, hồ bơi bốn mùa, bar tầng thượng, xe đưa đón).
  - **STT 15: Xây dựng trang & Lưới danh sách phòng:** Hàm `renderHotelsGrid(hotels)` dựng giao diện lưới 3 cột hiển thị các khách sạn và phòng tương ứng.
  - **STT 16: Thiết kế Card phòng phong cách Traveloka:** Thẻ `.hotel-item-card` tích hợp nút tim yêu thích, số sao SVG, tên khách sạn, địa chỉ, huy hiệu điểm đánh giá.
  - **STT 17: Hiển thị thông tin cơ bản của từng phòng:** Hiển thị giá gốc gạch ngang, giá khuyến mãi hiện tại, ghi chú bao gồm thuế/phí và nút "Chi tiết" / "Đặt Ngay".
  - **STT 18: Xây dựng Modal / Trang Chi tiết phòng:** Hàm `openHotelDetailModal(hotelId)` hiển thị cửa sổ chi tiết với ảnh lớn, mô tả đầy đủ và bảng danh sách các hạng phòng (Deluxe, Premier, Suite).
  - **STT 19: Thiết kế khu vực hình ảnh và tiện nghi phòng:** Bố cục tiện nghi chi tiết từng hạng phòng, diện tích m² và mức phụ thu tương ứng.
  - **STT 20: Responsive và Quản lý phòng yêu thích (Wishlist):** Hàm `handleWishlistClick()` và `openWishlistModal()` cho phép người dùng lưu lại các phòng yêu thích; giao diện co giãn 2 cột trên iPad và 1 cột trên điện thoại.

---

#### 👤 THÀNH VIÊN 3: TÌM KIẾM & ĐẶT PHÒNG (STT 21 - 30)
* **File phụ trách chính:**
  - `css/part3-booking.css`
  - `js/part3-booking.js`
  - Search Widget, Modal Đặt phòng, Modal Đặt thành công, Modal Đặt chỗ của tôi trên `index.html`
* **Nội dung công việc chi tiết:**
  - **STT 21: Phân tích quy trình tìm kiếm phòng:** Quản lý đối tượng trạng thái `currentSearchState` lưu trữ điểm đến, thời gian, số lượng khách và số phòng.
  - **STT 22: Xây dựng Form tìm kiếm phòng:** Ô nhập điểm đến kèm popup gợi ý nhanh 5 khu vực trọng điểm Hà Nội (Ba Đình, Hoàn Kiếm, Tây Hồ, Cầu Giấy, Ba Vì - Sóc Sơn) `initDestinationSelector()`.
  - **STT 23: Xử lý ngày nhận phòng:** Trường chọn ngày native với điều kiện chặn chọn ngày trong quá khứ (`min = today`).
  - **STT 24: Xử lý ngày trả phòng & Tính số đêm:** Hàm `calculateNights()` tự động tính toán khoảng cách giữa ngày nhận và trả phòng, cập nhật huy hiệu số đêm và đảm bảo ngày trả phòng luôn sau ngày nhận phòng.
  - **STT 25: Xử lý số lượng khách:** Bộ đếm tăng/giảm số lượng Người lớn (1-10 người) và Trẻ em (0-6 trẻ) kèm ràng buộc không giảm quá mức cho phép `initGuestCounter()`.
  - **STT 26: Xử lý số lượng phòng:** Bộ đếm số lượng phòng đặt đồng bộ với thông tin hiển thị tóm tắt.
  - **STT 27: Xây dựng logic lọc & sắp xếp phòng:** Hàm `applyFiltersAndSort()` lọc đa điều kiện: theo tab phân loại (5 sao, Phố Cổ, Căn hộ, Resort, Dưới 1.5 triệu), theo từ khóa quận huyện, theo số khách và sắp xếp giá tăng/giảm hoặc điểm đánh giá.
  - **STT 28: Xây dựng giao diện lựa chọn phòng:** Banner thông báo kết quả tìm thấy bao nhiêu khách sạn kèm nút "Bỏ lọc & Đặt lại" `resetHotelFilters()`.
  - **STT 29: Xây dựng Form thông tin khách hàng đặt phòng:** Modal `#booking-modal` tự động điền họ tên, email, số điện thoại của người dùng đăng nhập; cho phép chọn hạng phòng và phương thức thanh toán (Pay at hotel, VietQR, Thẻ quốc tế).
  - **STT 30: Xây dựng quy trình xác nhận đặt phòng:**
    - Tính toán chi phí tự động: Giá phòng × Số đêm × Số lượng phòng - Giảm giá (`updateBookingCalculation()`).
    - Xử lý mã giảm giá Voucher (`LOTTE500`, `HANOI30`, `WEEKEND15`, `TECHCOM10`).
    - Lưu đơn đặt phòng vào mảng người dùng trong LocalStorage (`submitBookingForm()`).
    - Mở modal biên nhận đặt phòng thành công mã `LT-HN-xxxxx` (`showBookingSuccessModal()`).
    - Xem và quản lý danh sách phòng đã đặt tại Modal "Đặt chỗ của tôi" kèm chức năng hủy phòng (`openMyBookingsModal()`, `handleCancelBooking()`).

---

#### 👤 THÀNH VIÊN 4: LIÊN HỆ, KIỂM THỬ & TÍCH HỢP (STT 31 - 40)
* **File phụ trách chính:**
  - `css/part4-contact.css`
  - `js/part4-contact.js`
  - `contact.html` (Trang chuyên mục Liên hệ & Hỗ trợ)
  - Khu vực Liên hệ, Nút kiểm thử tự động Test Suite trên `index.html`
* **Nội dung công việc chi tiết:**
  - **STT 31: Xây dựng trang / Khu vực Liên hệ:** Thiết lập section `#contact-section` trên trang chủ và trang độc lập `contact.html`.
  - **STT 32: Thiết kế Form liên hệ:** Form tiếp nhận ý kiến gồm: Họ tên, Email, Số điện thoại và Nội dung tin nhắn góp ý/hỗ trợ.
  - **STT 33: Xử lý kiểm tra dữ liệu Form liên hệ (Validation):**
    - Kiểm tra trường bắt buộc không được để trống.
    - Kiểm tra định dạng Email hợp lệ bằng biểu thức chính quy (Regex).
    - Kiểm tra Số điện thoại Việt Nam chuẩn (10 chữ số, đầu số hợp lệ 03, 05, 07, 08, 09).
    - Hiển thị phản hồi viền đỏ + thông báo lỗi khi nhập sai, viền xanh khi nhập đúng.
    - Lưu trữ phản hồi khách hàng vào LocalStorage `LOTTE_CONTACT_MESSAGES`.
  - **STT 34: Xây dựng khu vực thông tin hỗ trợ:** Thẻ tổng đài hotline 1900 6868, email chăm sóc khách hàng và thời gian trực tuyến 24/7.
  - **STT 35: Xây dựng khu vực địa chỉ & Bản đồ vị trí:** Thông tin Lotte Center Hà Nội và nhúng bản đồ trực quan Google Maps.
  - **STT 36: Kiểm tra Responsive toàn website:** Kiểm thử và tinh chỉnh layout trên mọi độ phân giải (Desktop, Laptop, Tablet, Mobile) bảo đảm không bị vỡ giao diện.
  - **STT 37: Kiểm thử các chức năng JavaScript tự động:** Xây dựng công cụ kiểm thử tự động `runSystemTestSuite()` kiểm tra logic các hàm JavaScript, mảng dữ liệu và tính hợp lệ.
  - **STT 38: Kiểm thử quy trình tìm kiếm và đặt phòng:** Kiểm tra toàn bộ chu trình từ tìm kiếm -> lọc phòng -> chọn hạng phòng -> áp mã giảm giá -> lưu mảng đặt phòng -> hủy phòng.
  - **STT 39: Tích hợp các phần của 4 thành viên:** Hàm điều phối `initApplicationIntegration()` khởi động và kết nối nhịp nhàng Part 1, Part 2, Part 3, Part 4.
  - **STT 40: Kiểm tra lỗi và hoàn thiện phiên bản cuối:** Thiết kế nút nổi và Modal giao diện trực quan `showTestReportModal()` báo cáo kết quả kiểm thử **40/40 tiêu chí ĐẠT CHUẨN (PASS 100%)** phục vụ trình chiếu và chấm điểm đồ án.

---

### HƯỚNG DẪN KIỂM TRA & DEMO TRƯỚC GIẢNG VIÊN

1. **Khởi chạy website:**
   - Mở trình duyệt truy cập đường dẫn local: `http://localhost/traveloka-hotel-fixed/traveloka-hotel/index.html` (hoặc mở trực tiếp file `index.html`).
2. **Kiểm tra phân chia file:**
   - Bấm `F12` -> Tab **Sources** (hoặc **Network**): sẽ thấy rõ ràng 4 file CSS (`part1-home.css`, `part2-rooms.css`, `part3-booking.css`, `part4-contact.css`) và 4 file JS (`part1-home.js`, `part2-rooms.js`, `part3-booking.js`, `part4-contact.js`).
3. **Kiểm tra báo cáo kiểm thử 40 tiêu chí của Thành viên 4:**
   - Bấm nút **"🧪 Kiểm Thử Hệ Thống (40 STT)"** ở góc dưới cùng bên trái màn hình.
   - Một modal báo cáo sẽ mở ra liệt kê đầy đủ 40 đầu việc đều đạt trạng thái **✓ PASS**.
   - Bấm `F12` -> Tab **Console** cũng sẽ thấy nhật ký kiểm thử chuyên nghiệp được in ra.
4. **Kiểm tra tính năng Quản lý Phản Hồi & Liên Hệ khách hàng (Admin <-> Client):**
   - Khách hàng gửi liên hệ ở trang client (`index.html` hoặc `contact.html`).
   - Vào trang quản trị `admin.html` -> Mục **Phản Hồi & Liên Hệ**: Thấy số lượng tin nhắn mới, bảng dữ liệu, nút xem chi tiết, đổi trạng thái (Chờ xử lý / Đã xử lý), ghi chú phản hồi và xóa.
5. **Kiểm tra tính năng Quản lý Voucher 2 chiều (Admin <-> Client):**
   - Vào `admin.html` -> **Voucher & Khuyến Mãi**: Tạo mã mới, **Sửa thông tin voucher (Mã, Mức giảm, Đơn tối thiểu, Hạn dùng)**, Bật/Tắt kích hoạt, hoặc Xóa vĩnh viễn voucher.
   - Về trang client `index.html`: Khối khuyến mãi hiển thị động ngay các voucher đang hoạt động (`renderClientPromotions()`).
   - Khách sao chép mã hoặc nhập mã vào form đặt phòng -> Bấm "Áp Dụng", hệ thống tính giảm giá tự động và cập nhật giá thanh toán. Khi đặt phòng xong, số lượt sử dụng voucher tăng lên tương ứng.
