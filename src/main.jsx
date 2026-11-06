import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Cat, ChevronLeft, ChevronRight, CircleHelp, Heart, Menu, RotateCcw, Search, Shield, Sparkles, X } from 'lucide-react';
import './style.css';
import CardReference from './CardReference';

const lessons = [
  { title: 'Mục tiêu: đừng nổ', text: 'Mỗi người lần lượt rút bài. Ai rút trúng Mèo Nổ sẽ bị loại nếu không gỡ được. Người sống sót cuối cùng thắng. Rất thân thiện, như tên game.', tip: 'Bản gốc chơi 2–5 người. Thêm bạn bè không làm quả bom bớt thật.', icon: '😼' },
  { title: 'Chuẩn bị bàn chơi', text: 'Tách Mèo Nổ và Defuse ra. Phát mỗi người 1 Defuse, rồi 7 lá úp. Trộn 2 Defuse dư vào chồng bài rút (bàn 5 người thì trộn 1). Cuối cùng thêm số Mèo Nổ bằng số người chơi trừ 1 và xáo bài.', tip: 'Ví dụ 4 người thì dùng 3 Mèo Nổ. Chọn người đi trước, rồi bắt đầu màn nghi ngờ lẫn nhau.', icon: '🃏' },
  { title: 'Đến lượt mình thì sao?', text: 'Chơi hoặc bỏ qua bao nhiêu lá tùy ý. Sau đó rút 1 lá để kết thúc lượt. Thứ tự dễ nhớ: chơi/bỏ qua, rồi rút.', tip: 'Bỏ lượt bình thường vẫn phải rút. Muốn kết thúc mà không rút, dùng lá Bỏ lượt.', icon: '👉' },
  { title: 'Rút trúng Mèo Nổ', text: 'Lật lá lên ngay. Có Defuse thì bỏ Defuse, rồi bí mật đặt Mèo Nổ trở lại vị trí bất kỳ trong chồng bài. Không có Defuse thì bị loại.', tip: 'Đặt lên trên cùng là hợp lệ. Người kế tiếp sẽ cảm nhận được tình bạn.', icon: '💣' },
  { title: 'Lá hành động đổi cục diện', text: 'Bỏ lượt giúp kết thúc lượt không cần rút. Tấn công kết thúc lượt và buộc người kế tiếp đi 2 lượt. Xem trước cho nhìn 3 lá trên cùng; Xáo bài trộn lại chồng bài.', tip: 'Lá Không! chặn hầu hết hành động, trừ Mèo Nổ và Defuse. Có thể chặn cả một lá Không! khác.', icon: '🧯' },
];

function App() {
  const [step, setStep] = useState(0);
  const [tab, setTab] = useState('learn');
  const [quiz, setQuiz] = useState(null);
  const [menu, setMenu] = useState(false);
  const lesson = lessons[step];

  function selectTab(next) { setTab(next); setMenu(false); }

  return <>
    <header>
      <a className="brand" href="#top" aria-label="Mèo Nổ, về đầu trang"><span className="brand-icon"><Cat size={20}/></span><span>MÈO NỔ<small>CẨM NANG GIỮ MẠNG</small></span></a>
      <div className="header-right"><span className="edition">BẢN GỐC · CHO NGƯỜI MỚI</span><button className="icon-button" onClick={() => setMenu(!menu)} aria-label={menu ? 'Đóng điều hướng' : 'Mở điều hướng'}>{menu ? <X/> : <Menu/>}</button></div>
    </header>
    <main id="top">
      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><Sparkles size={15}/> HỌC NHANH, NỔ ÍT</div><h1>Chơi Mèo Nổ.<br/><span>Sống sót nếu có thể.</span></h1><p>Luật chơi gói gọn, ví dụ dễ hiểu. Không cần đọc sách hướng dẫn dài hơn tuổi thọ trung bình của bạn trong ván đầu.</p><button className="cta" onClick={() => { selectTab('learn'); document.querySelector('#guide')?.scrollIntoView({ behavior: 'smooth' }); }}>Dạy tôi chơi <ChevronRight size={18}/></button><div className="trust"><span className="avatar-stack"><i>😺</i><i>🙀</i><i>😹</i></span><small>Cho người mới chưa từng bị nổ</small></div></div>
        <div className="hero-art" aria-label="Minh họa hai lá bài Mèo Nổ"><div className="burst">MEOW!<br/>💥</div><div className="playing-card card-back"><span>?</span><small>KHÔNG NHÌN<br/>MÈO ĐANG NHÌN BẠN</small></div><div className="playing-card card-front"><span>💣</span><b>MÈO NỔ</b></div><div className="scribble">tâm lý ổn định<br/>là tùy chọn</div></div>
      </section>
      <nav className={`tabs ${menu ? 'show' : ''}`} aria-label="Nội dung cẩm nang"><button className={tab === 'learn' ? 'active' : ''} aria-current={tab === 'learn' ? 'page' : undefined} onClick={() => selectTab('learn')}><Sparkles size={16}/> Học chơi</button><button className={tab === 'cards' ? 'active' : ''} aria-current={tab === 'cards' ? 'page' : undefined} onClick={() => selectTab('cards')}><Search size={16}/> Tra lá bài</button><button className={tab === 'quiz' ? 'active' : ''} aria-current={tab === 'quiz' ? 'page' : undefined} onClick={() => selectTab('quiz')}><CircleHelp size={16}/> Thử vận may</button></nav>
      {tab === 'learn' && <section id="guide" className="lesson-layout"><aside className="lesson-index"><div className="eyebrow">LỘ TRÌNH SỐNG SÓT</div>{lessons.map((item, i) => <button key={item.title} className={step === i ? 'selected' : ''} aria-current={step === i ? 'step' : undefined} onClick={() => setStep(i)}><span>{String(i + 1).padStart(2, '0')}</span>{item.title}</button>)}<div className="side-note"><Shield size={18}/> Không cần chiến thuật. Chỉ cần trí nhớ và một chút may mắn.</div></aside><article className="lesson" aria-live="polite"><div className="lesson-top"><span>BÀI {step + 1} / {lessons.length}</span><span>{Math.round((step + 1) / lessons.length * 100)}% sống sót</span></div><div className="progress" role="progressbar" aria-label="Tiến độ học" aria-valuemin="0" aria-valuemax={lessons.length} aria-valuenow={step + 1}><i style={{ width: `${(step + 1) / lessons.length * 100}%` }}/></div><div className="lesson-content"><div className="lesson-emoji" aria-hidden="true">{lesson.icon}</div><h2>{lesson.title}</h2><p>{lesson.text}</p><div className="tip"><span aria-hidden="true">💡</span><p>{lesson.tip}</p></div></div><div className="lesson-related">Tra nhanh: <a href="#card=exploding-kitten">Mèo Nổ (Exploding Kitten)</a> · <a href="#card=defuse">Gỡ bom (Defuse)</a> · <a href="#card=skip">Bỏ lượt (Skip)</a></div><div className="lesson-actions"><button className="back" disabled={!step} onClick={() => setStep(step - 1)}><ChevronLeft size={18}/> Trước</button><button className="cta" onClick={() => step < lessons.length - 1 ? setStep(step + 1) : selectTab('quiz')}>{step < lessons.length - 1 ? 'Tiếp tục' : 'Thử một câu'} <ChevronRight size={18}/></button></div></article></section>}
      <CardReference active={tab === 'cards'} onActivate={() => setTab('cards')}/>
      {tab === 'quiz' && <section className="quiz"><div className="eyebrow">KIỂM TRA PHẢN XẠ (VÀ KIẾN THỨC)</div><h2>Bạn rút trúng Mèo Nổ.<br/>Có Defuse. Làm gì?</h2><p className="quiz-sub">Không trả lời “nhắm mắt giả vờ không thấy”.</p><div className="answers">{['Dùng Defuse, rồi đặt Mèo Nổ lại vào chồng bài','Đưa Mèo Nổ cho người bên cạnh','Bỏ qua vì lá bài trông vô hại'].map((answer, i) => <button key={answer} onClick={() => setQuiz(i)} className={quiz === i ? (i === 0 ? 'right' : 'wrong') : ''} aria-pressed={quiz === i}>{answer}<ChevronRight aria-hidden="true"/></button>)}</div>{quiz !== null && <div className={`result ${quiz === 0 ? 'correct' : 'incorrect'}`} role="status">{quiz === 0 ? 'Chính xác. Bỏ Defuse, bí mật đặt lại Mèo Nổ vào chồng bài. Bạn được sống thêm một lượt — theo nghĩa đen.' : 'Chưa đúng. Dùng Defuse để gỡ Mèo Nổ; nếu không có Defuse thì bạn bị loại.'}</div>}<button className="reset" onClick={() => setQuiz(null)}><RotateCcw size={15}/> Chơi lại</button></section>}
      <footer><div className="footer-cat" aria-hidden="true">😼</div><span>Hướng dẫn thân thiện. Mèo thì không hứa.</span><span className="footer-mark"><Heart size={14} fill="currentColor"/> làm để sống sót</span></footer>
    </main>
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
