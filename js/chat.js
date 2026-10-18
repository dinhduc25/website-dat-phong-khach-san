(() => {
  const KEY = "LOTTE_SUPPORT_CHAT_MESSAGES";
  const current = typeof getCurrentUser === "function" ? getCurrentUser() : null;
  const admin = !!(current && (current.isAdmin || (typeof isAdminUser === "function" && isAdminUser(current))));
  const messagesEl = document.getElementById("chat-messages");
  const listEl = document.getElementById("conversation-list");
  const titleEl = document.getElementById("active-chat-title");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const panel = document.getElementById("conversation-panel");
  let activeId = "";
  let activeName = "";

  if (!current) {
    document.getElementById("chat-status").textContent = "Bạn cần đăng nhập để trò chuyện. Hãy đăng nhập ở trang chủ rồi quay lại đây.";
    input.disabled = true;
    document.getElementById("chat-send").disabled = true;
    return;
  }
  if (admin) {
    document.getElementById("admin-return").style.display = "inline";
    document.getElementById("conversation-title").textContent = "Khách hàng cần tư vấn";
    activeId = "";
  } else {
    activeId = String(current.id || current.email);
    activeName = current.fullName || current.name || current.email;
    panel.style.display = "none";
    document.querySelector(".chat-layout").style.gridTemplateColumns = "minmax(0,1fr)";
    titleEl.textContent = "Tư vấn với Lotte Hotel Hanoi";
  }

  function readMessages() {
    try { const v = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(v) ? v : []; }
    catch (_) { return []; }
  }
  function writeMessages(messages) { localStorage.setItem(KEY, JSON.stringify(messages)); }
  function conversationId(msg) { return String(msg.userId || msg.userEmail || msg.conversationId || "guest"); }
  function renderList() {
    if (!admin) return;
    const msgs = readMessages();
    const map = new Map();
    msgs.forEach(m => {
      const id = conversationId(m);
      if (!map.has(id)) map.set(id, {id, name:m.userName || m.userEmail || "Khách hàng", last:m.text || "", time:m.createdAt || ""});
    });
    const conversations = [...map.values()].sort((a,b) => b.time.localeCompare(a.time));
    if (!conversations.length) {
      listEl.innerHTML = '<div class="empty-state">Chưa có tin nhắn từ khách hàng.</div>';
      return;
    }
    listEl.innerHTML = conversations.map(c => `<button class="conversation ${c.id===activeId?'active':''}" data-id="${escapeHtml(c.id)}" data-name="${escapeHtml(c.name)}"><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.last.slice(0,70))}</small></button>`).join("");
    listEl.querySelectorAll(".conversation").forEach(btn => btn.addEventListener("click", () => {
      activeId = btn.dataset.id; activeName = btn.dataset.name;
      titleEl.textContent = "Tư vấn với " + activeName;
      renderList(); renderMessages();
    }));
    if (!activeId && conversations.length) {
      activeId = conversations[0].id; activeName = conversations[0].name;
      titleEl.textContent = "Tư vấn với " + activeName;
      renderList();
    }
  }
  function renderMessages() {
    const msgs = readMessages().filter(m => conversationId(m) === activeId);
    if (!msgs.length) {
      messagesEl.innerHTML = '<div class="empty-state">Chưa có tin nhắn. Hãy bắt đầu cuộc trò chuyện.</div>';
      return;
    }
    messagesEl.innerHTML = msgs.map(m => {
      const mine = admin ? m.senderRole === "admin" : m.senderRole === "client";
      const when = m.createdAt ? new Date(m.createdAt).toLocaleString("vi-VN") : "";
      return `<div class="chat-bubble ${mine?'mine':'theirs'}">${escapeHtml(m.text).replace(/\n/g,"<br>")}<time>${escapeHtml(m.senderName || "")} · ${escapeHtml(when)}</time></div>`;
    }).join("");
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  function escapeHtml(s) {
    return String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }
  form.addEventListener("submit", e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || (admin && !activeId)) {
      if (admin && !activeId) alert("Hãy chọn cuộc trò chuyện của khách hàng trước.");
      return;
    }
    const msgs = readMessages();
    msgs.push({
      id:"MSG-"+Date.now()+"-"+Math.random().toString(16).slice(2,7),
      conversationId:activeId,
      userId:admin ? activeId : String(current.id || current.email),
      userEmail:admin ? "" : current.email,
      userName:admin ? activeName : (current.fullName || current.name || current.email),
      senderRole:admin ? "admin" : "client",
      senderName:admin ? "Tư vấn viên Lotte" : (current.fullName || current.name || "Khách hàng"),
      text, createdAt:new Date().toISOString()
    });
    writeMessages(msgs);
    input.value = "";
    renderList(); renderMessages();
  });
  window.addEventListener("storage", e => {
    if (e.key === KEY) { renderList(); renderMessages(); }
  });
  renderList();
  if (!admin) renderMessages();
  setInterval(() => { renderList(); renderMessages(); }, 2500);
})();