# Cập nhật quy trình đặt phòng và trang chi tiết

## Thay đổi
- Form gửi yêu cầu đặt phòng không còn phần chọn vị trí phòng cụ thể.
- Form gửi yêu cầu đặt phòng không còn phần chọn phương thức thanh toán. Khách chọn phương thức trên `payment.html` sau khi admin xác nhận còn phòng.
- Khi gửi yêu cầu, hệ thống lưu trạng thái `Chờ admin xác nhận`, chưa gán số phòng và chưa ghi nhận thanh toán.
- Admin xác nhận còn phòng sẽ tạo thông báo thanh toán trong vòng 24 giờ. Khách có thể chọn thanh toán 100% online bằng QR hoặc cọc 30% online, trả 70% bằng tiền mặt tại quầy.
- Nút **Xem chi tiết đặt phòng** trong mục **Đặt chỗ của tôi** mở trang `booking-detail.html`, có thông tin lưu trú, thông tin khách, tổng chi phí, trạng thái thanh toán và tiến trình xử lý.
- Từ trang chi tiết, nút **Quay lại Đặt chỗ của tôi** đưa khách trở lại đúng mục đặt chỗ.

## Cách chạy thử
1. Giải nén toàn bộ ZIP vào một thư mục mới.
2. Mở thư mục `website-dat-phong-khach-san` bằng VS Code và chạy `index.html` bằng Live Server.
3. Đăng nhập tài khoản khách hàng, gửi một yêu cầu đặt phòng. Form không có mục chọn số phòng cụ thể hoặc phương thức thanh toán.
4. Trong `admin.html`, xác nhận còn phòng.
5. Quay lại `index.html` → **Đặt chỗ của tôi** → **Thanh toán online bằng QR** để chọn thanh toán toàn bộ hoặc cọc 30%.
6. Trong **Đặt chỗ của tôi**, bấm **Xem chi tiết đặt phòng** để mở `booking-detail.html`.

## Lưu ý
Dự án đang dùng LocalStorage để demo, vì vậy các thay đổi đồng bộ giữa các tab của cùng trình duyệt; chưa phải đồng bộ nhiều thiết bị qua máy chủ. Mã QR demo chưa tự xác minh giao dịch ngân hàng thật; admin cần kiểm tra khoản tiền thực nhận trước khi xác nhận.
