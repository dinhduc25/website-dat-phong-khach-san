(() => {
  if (document.getElementById('lotte-chat-launcher')) return;
  const launcher = document.createElement('button');
  launcher.type = 'button'; launcher.id = 'lotte-chat-launcher'; launcher.className = 'lotte-chat-launcher';
  launcher.setAttribute('aria-expanded','false'); launcher.setAttribute('aria-controls','lotte-chat-popover');
  launcher.innerHTML = '<span class="chat-launcher-icon" aria-hidden="true">✉</span><span>Tin nhắn</span>';
  const pop = document.createElement('section'); pop.id='lotte-chat-popover'; pop.className='lotte-chat-popover'; pop.setAttribute('aria-label','Hỗ trợ tin nhắn');
  pop.innerHTML = '<button type="button" class="lotte-chat-popover-close" aria-label="Đóng">×</button><div class="lotte-chat-popover-head"><div class="lotte-chat-popover-avatar">✦</div><div><h3>Lotte Hotel Hanoi</h3><span class="lotte-chat-online">● Hỗ trợ khách hàng</span></div></div><p>Xin chào! Bạn cần tư vấn về phòng, đặt phòng hoặc thanh toán? Hãy nhắn tin với đội ngũ hỗ trợ của chúng tôi.</p><a class="lotte-chat-open-link" href="chat.html">Mở cuộc trò chuyện&nbsp; →</a>';
  document.body.append(launcher,pop);
  const toggle = () => { const open=pop.classList.toggle('open'); launcher.setAttribute('aria-expanded',String(open)); };
  launcher.addEventListener('click',toggle); pop.querySelector('.lotte-chat-popover-close').addEventListener('click',toggle);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&pop.classList.contains('open'))toggle();});
})();
