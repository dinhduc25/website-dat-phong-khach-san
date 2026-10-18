# Hướng dẫn chạy và kiểm thử quy trình đặt phòng mới

## Quy trình đặt phòng và thu tiền
1. Khách hàng đăng nhập, chọn hạng phòng, ngày nhận/trả và phương thức thanh toán; gửi yêu cầu. Đơn ở trạng thái **Chờ admin xác nhận** và chưa tự chiếm phòng.
2. Admin vào `admin.html` → **Quản lý đặt phòng** → **Xác nhận còn phòng**. Nếu còn phòng, đơn chuyển thành **Chờ thanh toán**, lưu hạn 24 giờ và thông báo cho khách. Bước này không xác nhận đã thu tiền, không gán phòng.
3. Nếu khách chọn **Thanh toán 100% online bằng QR**, khách chuyển khoản toàn bộ tiền phòng qua QR. Nếu khách chọn **Cọc 30% online, trả 70% tại khách sạn**, sau khi admin xác nhận còn phòng, khách cần chuyển khoản **cọc 30%** qua QR trong 24 giờ; **70% còn lại** thanh toán bằng tiền mặt tại quầy khách sạn khi nhận phòng.
4. Khách gửi yêu cầu xác nhận thanh toán/cọc. Đơn vẫn ở trạng thái **Chờ thanh toán** cho đến khi admin kiểm tra giao dịch thực tế. Chỉ khi admin bấm **Xác nhận thanh toán / xếp phòng** hoặc **Xác nhận cọc 30% / xếp phòng** thì hệ thống mới gán phòng và số tầng.
5. Với phương án cọc 30%, sau khi admin xác nhận cọc, đơn có trạng thái **Đã cọc 30% - chờ nhận phòng**. Tại quầy, admin bấm **Thu tiền mặt còn lại** chỉ sau khi đã nhận đủ 70%; đơn chuyển thành **Đã thanh toán - chờ nhận phòng** và có thể check-in.
6. Nếu quá 24 giờ mà khách chưa gửi yêu cầu thanh toán, khi admin mở/lọc danh sách đặt phòng, đơn được chuyển sang **Đã hủy**. Nếu khách đã gửi yêu cầu trước hạn, đơn được giữ lại để admin đối chiếu giao dịch.
7. Khách hàng và admin dùng `chat.html` để nhắn tin hai chiều. Tin nhắn lưu trong LocalStorage và cập nhật giữa các tab của cùng trình duyệt.

## Chạy thử
- Giải nén thư mục dự án.
- Mở thư mục bằng VS Code.
- Dùng tiện ích **Live Server** và chạy `index.html` tại `http://127.0.0.1:5500/...` (không nên mở trực tiếp bằng `file://`).
- Đăng nhập bằng tài khoản khách hàng, gửi yêu cầu đặt phòng; sau đó đăng nhập bằng tài khoản admin ở tab khác cùng địa chỉ localhost và xác nhận đơn.
- Để chat hoạt động hai phía, mở `chat.html` ở tab khách hàng và tab admin trong cùng trình duyệt; đăng nhập từng vai trò tương ứng.

## Lưu ý quan trọng về email và thanh toán
Đây là dự án HTML/CSS/JavaScript dùng LocalStorage, chưa có backend. Trình duyệt không thể tự gửi email thật an toàn hoặc xác minh thanh toán ngân hàng. Bản cập nhật tạo nội dung email và mở ứng dụng email qua `mailto:` để admin bấm gửi; lịch sử thư nháp được lưu trong `LOTTE_EMAIL_OUTBOX`. Để gửi email tự động, xác minh thanh toán thật, chia sẻ chat giữa các thiết bị/người dùng khác nhau và bảo vệ dữ liệu khi triển khai, cần thêm backend/API, cơ sở dữ liệu và cấu hình SMTP hoặc dịch vụ email.


## Luồng thanh toán sau khi admin xác nhận còn phòng

- **QR Pay:** khách gửi yêu cầu thanh toán toàn bộ → admin kiểm tra giao dịch thật → admin xác nhận và xếp phòng.
- **Cọc 30% online:** khách cọc 30% qua QR → admin xác minh khoản cọc → admin xếp phòng → khách trả 70% còn lại bằng tiền mặt tại quầy → admin xác nhận đã thu đủ → cho phép check-in.
- Trạng thái chỉ thể hiện đã thu đủ sau khi admin xác nhận khoản tiền tương ứng. Nút “Xác nhận còn phòng” không xác nhận thanh toán.

Lưu ý: QR hiện phục vụ demo giao diện. Website tĩnh chưa tự động xác minh giao dịch ngân hàng; admin cần đối chiếu giao dịch thực tế trước khi xác nhận đã nhận cọc hoặc tiền thanh toán. Email được tạo qua `mailto:`; LocalStorage chỉ đồng bộ giữa các tab cùng trình duyệt, chưa thay thế backend/cơ sở dữ liệu cho nhiều thiết bị.
