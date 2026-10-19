/**
 * ========================================================
 * LOTTE HOTEL HANOI - ROOM FLOOR PICKER ADDON
 * Đồng bộ dữ liệu phòng thực tế giữa Client và Admin
 * Nguồn dữ liệu duy nhất: traveloka_hotel_rooms
 * ========================================================
 */
(function() {
  const HOLD_KEY = 'lotte_room_holds_v1';

  // Dữ liệu 13 phòng chuẩn của Lotte Hotel Hanoi
  const FALLBACK_ROOMS = [
    { id: "rm-lotte-3801", roomNumber: "P.3801", category: "deluxe", floor: 38, roomType: "Deluxe King City View", status: "available", price: 3800000 },
    { id: "rm-lotte-3802", roomNumber: "P.3802", category: "deluxe", floor: 38, roomType: "Deluxe King City View", status: "occupied", price: 3800000 },
    { id: "rm-lotte-3803", roomNumber: "P.3803", category: "deluxe", floor: 38, roomType: "Deluxe Twin City View", status: "cleaning", price: 3800000 },
    { id: "rm-lotte-3804", roomNumber: "P.3804", category: "deluxe", floor: 38, roomType: "Deluxe King City View", status: "available", price: 3800000 },
    { id: "rm-lotte-4501", roomNumber: "P.4501", category: "premier", floor: 45, roomType: "Premier Lake View", status: "available", price: 4900000 },
    { id: "rm-lotte-4502", roomNumber: "P.4502", category: "premier", floor: 45, roomType: "Premier Lake View", status: "occupied", price: 4900000 },
    { id: "rm-lotte-4503", roomNumber: "P.4503", category: "premier", floor: 45, roomType: "Premier Lake View", status: "cleaning", price: 4900000 },
    { id: "rm-lotte-5101", roomNumber: "P.5101", category: "junior-suite", floor: 51, roomType: "Club Junior Suite", status: "available", price: 6800000 },
    { id: "rm-lotte-5102", roomNumber: "P.5102", category: "junior-suite", floor: 51, roomType: "Club Junior Suite", status: "occupied", price: 6800000 },
    { id: "rm-lotte-5103", roomNumber: "P.5103", category: "junior-suite", floor: 51, roomType: "Club Junior Suite", status: "maintenance", price: 6800000 },
    { id: "rm-lotte-6001", roomNumber: "P.6001", category: "presidential-suite", floor: 60, roomType: "Executive Grand Suite", status: "available", price: 16000000 },
    { id: "rm-lotte-6002", roomNumber: "P.6002", category: "presidential-suite", floor: 60, roomType: "Executive Grand Suite", status: "occupied", price: 16000000 },
    { id: "rm-lotte-6501", roomNumber: "P.6501", category: "presidential-suite", floor: 65, roomType: "Presidential Luxury Suite", status: "cleaning", price: 28000000 }
  ];

  function getLiveRooms() {
    try {
      const raw = localStorage.getItem("traveloka_hotel_rooms");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Bổ sung category & tự động nâng cấp giá nếu còn dùng giá cũ
          return parsed.map(r => {
            const f = Number(r.floor);
            if (!r.category) {
              if (f === 38) r.category = "deluxe";
              else if (f === 45) r.category = "premier";
              else if (f === 51) r.category = "junior-suite";
              else if (f === 60 || f === 65) r.category = "presidential-suite";
            }
            if (r.price === 2750000) r.price = 3800000;
            else if (r.price === 3200000) r.price = 4900000;
            else if (r.price === 3850000) r.price = 6800000;
            else if (r.price === 4950000) r.price = 16000000;
            else if (r.price === 8900000) r.price = 28000000;
            return r;
          });
        }
      }
    } catch (e) {}
    try {
      localStorage.setItem("traveloka_hotel_rooms", JSON.stringify(FALLBACK_ROOMS));
    } catch (e) {}
    return FALLBACK_ROOMS;
  }

  function getHolds() {
    try {
      return JSON.parse(localStorage.getItem(HOLD_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveHolds(holds) {
    try {
      localStorage.setItem(HOLD_KEY, JSON.stringify(holds));
    } catch (e) {}
  }

  function expireHolds() {
    const holds = getHolds();
    let changed = false;
    const now = Date.now();
    Object.keys(holds).forEach(k => {
      if (holds[k].until < now) {
        delete holds[k];
        changed = true;
      }
    });
    if (changed) saveHolds(holds);
  }

  // Xác định hạng phòng hiện tại của modal đặt phòng
  function getCurrentModalCategory(modal) {
    const hotelId = modal.getAttribute("data-hotel-id") || "";
    if (hotelId.includes("deluxe")) return "deluxe";
    if (hotelId.includes("premier")) return "premier";
    if (hotelId.includes("junior")) return "junior-suite";
    if (hotelId.includes("presidential")) return "presidential-suite";

    const titleEl = document.getElementById("bm-hotel-name");
    const titleText = (titleEl ? titleEl.textContent : "").toLowerCase();
    if (titleText.includes("deluxe")) return "deluxe";
    if (titleText.includes("premier")) return "premier";
    if (titleText.includes("junior")) return "junior-suite";
    if (titleText.includes("presidential")) return "presidential-suite";

    const roomName = (modal.getAttribute("data-room-name") || "").toLowerCase();
    if (roomName.includes("deluxe")) return "deluxe";
    if (roomName.includes("premier")) return "premier";
    if (roomName.includes("junior")) return "junior-suite";
    if (roomName.includes("presidential")) return "presidential-suite";

    return "deluxe";
  }

  function getCategoryTitle(cat) {
    switch (cat) {
      case "deluxe": return "Deluxe • Tầng 38";
      case "premier": return "Premier • Tầng 45";
      case "junior-suite": return "Junior Suite • Tầng 51";
      case "presidential-suite": return "Presidential Suite • Tầng 60 & 65";
      default: return "5 Sao";
    }
  }

  function renderRoomPicker() {
    expireHolds();
    const modal = document.getElementById("booking-modal");
    if (!modal || !modal.classList.contains("active")) return;

    const typesEl = document.getElementById("bm-room-types");
    if (!typesEl) return;

    let panel = document.getElementById("room-seat-picker");
    if (!panel) {
      panel = document.createElement("section");
      panel.id = "room-seat-picker";
      panel.className = "room-picker-panel";
      typesEl.parentElement.insertAdjacentElement("afterend", panel);
    }

    const currentCat = getCurrentModalCategory(modal);
    const allRooms = getLiveRooms();
    const holds = getHolds();

    // Lọc các phòng khớp đúng hạng phòng này
    const categoryRooms = allRooms.filter(r => {
      const cat = r.category || (r.roomType || "").toLowerCase();
      if (currentCat === "deluxe") return cat.includes("deluxe") || Number(r.floor) === 38;
      if (currentCat === "premier") return cat.includes("premier") || Number(r.floor) === 45;
      if (currentCat === "junior-suite") return cat.includes("junior") || Number(r.floor) === 51;
      if (currentCat === "presidential-suite") return cat.includes("president") || cat.includes("grand") || Number(r.floor) === 60 || Number(r.floor) === 65;
      return false;
    });

    // Nhóm theo tầng
    const floorMap = {};
    categoryRooms.forEach(room => {
      const f = room.floor || 38;
      if (!floorMap[f]) floorMap[f] = [];
      floorMap[f].push(room);
    });

    const sortedFloors = Object.keys(floorMap).sort((a, b) => Number(b) - Number(a));
    const selectedRoomNumber = modal.getAttribute("data-selected-room-number") || "";

    let html = `
      <div class="rp-header">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <h4 style="margin:0; font-size:0.98rem; font-weight:800; color:#0f172a;">
            🗺️ Chọn vị trí phòng cụ thể · Hạng ${getCategoryTitle(currentCat)}
          </h4>
          <span style="font-size:0.75rem; background:#eff6ff; color:#0284c7; padding:2px 8px; border-radius:12px; font-weight:700;">
            Lotte Hotel Hanoi (65 tầng)
          </span>
        </div>
        <p class="rp-help" style="margin:6px 0 10px; font-size:0.8rem; color:#64748b;">
          Dữ liệu thời gian thực đồng bộ với quản trị. Bạn có thể chọn phòng trống màu xanh lá hoặc để hệ thống tự động sắp xếp.
        </p>
      </div>

      <div class="rp-legend">
        <span><i class="rp-dot vacant"></i> Trống (Có thể chọn)</span>
        <span><i class="rp-dot occupied"></i> Đang có khách</span>
        <span><i class="rp-dot cleaning"></i> Đang dọn dẹp</span>
        <span><i class="rp-dot maintenance"></i> Bảo trì</span>
        <span><i class="rp-dot held"></i> Tạm giữ</span>
        <span><i class="rp-dot selected"></i> Đang chọn</span>
      </div>
    `;

    sortedFloors.forEach(floor => {
      const rooms = floorMap[floor];
      html += `
        <div class="rp-floor">
          <div class="rp-floor-title">
            <b>Tầng ${floor}</b>
            <span style="font-size:0.72rem; color:#64748b;">(${rooms.length} phòng)</span>
          </div>
          <div class="rp-grid">
      `;

      rooms.forEach(room => {
        const isHeld = holds[room.roomNumber] && holds[room.roomNumber].until > Date.now();
        let displayStatus = isHeld ? 'held' : room.status;
        const isSelected = selectedRoomNumber === room.roomNumber;
        const canPick = displayStatus === 'available' || isSelected;

        let statusText = 'Phòng trống';
        if (displayStatus === 'occupied') statusText = 'Đang có khách ở';
        else if (displayStatus === 'cleaning') statusText = 'Đang dọn dẹp vệ sinh';
        else if (displayStatus === 'maintenance') statusText = 'Đang bảo trì kỹ thuật';
        else if (displayStatus === 'held') statusText = 'Đang tạm giữ 5 phút';

        html += `
          <button type="button" 
            class="rp-room ${displayStatus} ${isSelected ? 'selected' : ''}" 
            data-room-number="${room.roomNumber}" 
            data-room-id="${room.id}"
            data-floor="${room.floor}"
            data-type="${room.roomType}"
            data-status="${displayStatus}"
            ${!canPick ? 'disabled' : ''} 
            title="${room.roomNumber} (${room.roomType}) - ${statusText}">
            <span class="rp-r-num">${room.roomNumber}</span>
            <span class="rp-r-desc">${displayStatus === 'available' ? 'Trống' : displayStatus === 'occupied' ? 'Đã đặt' : displayStatus === 'cleaning' ? 'Dọn' : displayStatus === 'maintenance' ? 'Bảo trì' : 'Giữ'}</span>
          </button>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    const selectedInfoText = selectedRoomNumber
      ? `✓ Đã chọn: Phòng <strong>${selectedRoomNumber}</strong> (Tầng ${modal.getAttribute("data-selected-room-floor") || ""})`
      : `Chưa chọn phòng cụ thể (Hệ thống sẽ tự động gán phòng trống khi hoàn tất đặt)`;

    html += `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-top:12px; padding-top:10px; border-top:1px dashed #cbd5e1;">
        <div class="rp-selected" id="rp-selected" style="font-size:0.84rem; color:${selectedRoomNumber ? '#059669' : '#64748b'}; font-weight:700;">
          ${selectedInfoText}
        </div>
        <button type="button" class="btn btn-outline" id="rp-hold-btn" style="font-size:0.78rem; padding:5px 12px; border-radius:6px;">
          ⏱️ Tạm giữ phòng 5 phút
        </button>
      </div>
    `;

    panel.innerHTML = html;

    // Gắn sự kiện click chọn phòng
    panel.querySelectorAll('.rp-room.available').forEach(btn => {
      btn.addEventListener('click', () => {
        panel.querySelectorAll('.rp-room').forEach(x => x.classList.remove('selected'));
        btn.classList.add('selected');

        const roomNum = btn.dataset.roomNumber;
        const roomId = btn.dataset.roomId;
        const floor = btn.dataset.floor;
        const type = btn.dataset.type;

        modal.setAttribute("data-selected-room-number", roomNum);
        modal.setAttribute("data-selected-room-id", roomId);
        modal.setAttribute("data-selected-room-floor", floor);

        const selDisplay = document.getElementById('rp-selected');
        if (selDisplay) {
          selDisplay.innerHTML = `✓ Đã chọn: Phòng <strong>${roomNum}</strong> (Tầng ${floor} - ${type})`;
          selDisplay.style.color = '#059669';
        }
      });
    });

    // Gắn sự kiện nút tạm giữ
    const holdBtn = document.getElementById('rp-hold-btn');
    if (holdBtn) {
      holdBtn.onclick = () => {
        const selNum = modal.getAttribute("data-selected-room-number");
        if (!selNum) {
          alert('Vui lòng bấm chọn một phòng trống (màu xanh lá) trước khi tạm giữ.');
          return;
        }
        const currentHolds = getHolds();
        currentHolds[selNum] = {
          until: Date.now() + 300000,
          savedAt: new Date().toISOString()
        };
        saveHolds(currentHolds);
        alert(`Đã tạm giữ phòng ${selNum} trong 5 phút. Phòng sẽ được giữ chỗ riêng cho bạn trong thời gian này.`);
        renderRoomPicker();
      };
    }
  }

  // Tự động lắng nghe thay đổi
  document.addEventListener('change', e => {
    if (e.target && e.target.name === 'selectedRoomType') {
      setTimeout(renderRoomPicker, 40);
    }
  });

  // Hook vào hàm mở modal đặt phòng
  const originalOpenBooking = window.openBookingModal;
  if (typeof originalOpenBooking === 'function') {
    window.openBookingModal = function(...args) {
      const modal = document.getElementById("booking-modal");
      if (modal) {
        modal.removeAttribute("data-selected-room-number");
        modal.removeAttribute("data-selected-room-id");
        modal.removeAttribute("data-selected-room-floor");
      }
      originalOpenBooking.apply(this, args);
      setTimeout(renderRoomPicker, 60);
    };
  }

  window.renderRoomPickerAddon = renderRoomPicker;

  // Thêm styles CSS cho room-picker
  const css = `
    .room-picker-panel {
      border: 1.5px solid #dbeafe;
      border-radius: 12px;
      padding: 14px 16px;
      margin: 14px 0;
      background: #f8fafc;
    }
    .rp-legend {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 12px;
      font-size: 0.74rem;
      color: #475569;
    }
    .rp-legend span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .rp-dot {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 2px;
    }
    .rp-dot.vacant { background: #10b981; }
    .rp-dot.occupied { background: #3b82f6; }
    .rp-dot.cleaning { background: #f59e0b; }
    .rp-dot.maintenance { background: #64748b; }
    .rp-dot.held { background: #8b5cf6; }
    .rp-dot.selected { background: #047857; outline: 2px solid #065f46; }
    .rp-floor {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 10px 0;
      border-top: 1px dashed #e2e8f0;
    }
    .rp-floor-title {
      width: 90px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
    }
    .rp-floor-title b {
      color: #0f172a;
      font-size: 0.86rem;
    }
    .rp-grid {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      flex: 1;
    }
    .rp-room {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 68px;
      height: 44px;
      border-radius: 8px;
      border: 1.5px solid #cbd5e1;
      background: #fff;
      cursor: pointer;
      padding: 2px 6px;
      transition: all 0.15s ease-in-out;
    }
    .rp-room:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.08);
      border-color: #059669;
    }
    .rp-r-num {
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.5px;
    }
    .rp-r-desc {
      font-size: 0.65rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    .rp-room.available {
      background: #ecfdf5;
      border-color: #10b981;
      color: #065f46;
    }
    .rp-room.occupied {
      background: #eff6ff;
      border-color: #93c5fd;
      color: #1e40af;
      cursor: not-allowed;
      opacity: 0.85;
    }
    .rp-room.cleaning {
      background: #fffbeb;
      border-color: #fcd34d;
      color: #92400e;
      cursor: not-allowed;
      opacity: 0.85;
    }
    .rp-room.maintenance {
      background: #f1f5f9;
      border-color: #cbd5e1;
      color: #475569;
      cursor: not-allowed;
      opacity: 0.85;
    }
    .rp-room.held {
      background: #f5f3ff;
      border-color: #c4b5fd;
      color: #5b21b6;
      cursor: not-allowed;
      opacity: 0.85;
    }
    .rp-room.selected {
      background: #059669 !important;
      border-color: #047857 !important;
      color: #ffffff !important;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.35);
      transform: scale(1.04);
    }
    .rp-room.selected .rp-r-desc {
      color: #d1fae5;
    }
    @media(max-width: 600px) {
      .rp-floor {
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
      }
      .rp-floor-title {
        width: 100%;
        flex-direction: row;
        gap: 6px;
      }
      .rp-room {
        min-width: 58px;
        height: 40px;
      }
    }
  `;
  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  setInterval(expireHolds, 15000);
})();
