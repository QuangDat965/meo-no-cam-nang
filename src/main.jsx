import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Cat, ChevronLeft, ChevronRight, ChevronDown, Heart, Lightbulb, Search, Shield, Sparkles } from 'lucide-react';
import './style.css';
import CardReference from './CardReference';
import { lessons, tips } from './content';
import { entries } from './cards';

function RelatedCards({ ids, onOpen }) {
 return <div className="related-cards">{ids.map(id=>entries.find(item=>item.id===id)).filter(Boolean).map(item=><button key={item.id} onClick={()=>onOpen(item.id)}>{item.nameVi} ({item.nameEn}) <ChevronRight size={15}/></button>)}</div>;
}

function App() {
 const [step,setStep]=useState(0);
 const [tab,setTab]=useState('learn');
 const [scrollTarget,setScrollTarget]=useState(null);
 const [openTip,setOpenTip]=useState(null);
 const lesson=lessons[step];
 useEffect(()=>{
  if(!scrollTarget)return;
  document.getElementById(scrollTarget)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  setScrollTarget(null);
 },[tab,scrollTarget]);
 function jump(next,id){setTab(next);setScrollTarget(id);}
 function openCard(id){
  history.pushState({cardOrigin:tab,cardPanelDepth:1},'',`#card=${id}`);
  window.dispatchEvent(new Event('hashchange'));
 }
 return <>
  <header><a className="brand" href="#top" aria-label="Mèo Nổ, về đầu trang"><span className="brand-icon"><Cat size={20}/></span><span>MÈO NỔ<small>CẨM NANG GIỮ MẠNG</small></span></a><div className="header-right"><span className="edition">BẢN GỐC · CHO NGƯỜI MỚI</span><span className="header-cat" aria-hidden="true">😼</span></div></header>
  <main id="top">
   <section className="hero"><div className="hero-copy"><div className="eyebrow"><Sparkles size={15}/> HỌC NHANH, NỔ ÍT</div><h1>Mèo thì cute.<br/><span>Tình bạn thì hên xui.</span></h1><p>Rút bài, né bom, tiện tay báo đứa bên cạnh. Ai sống cuối cùng thì được gáy. Luật học ở đây, nghiệp tạo tại bàn.</p><div className="hero-actions"><button className="cta" onClick={()=>jump('learn','guide')}>Học chơi ngay <ChevronRight size={18}/></button><button className="secondary-cta" onClick={()=>jump('cards','reference')}>Tra lá đang cầm <Search size={16}/></button></div><div className="trust"><span className="avatar-stack" aria-hidden="true"><i>😺</i><i>🙀</i><i>😹</i></span><small>Học luật trước. Gáy sau.</small></div></div><div className="hero-art" aria-label="Minh họa hai lá bài Mèo Nổ"><div className="burst">MEOW!<br/>💥</div><div className="playing-card card-back"><span>?</span><small>KHÔNG NHÌN<br/>MÈO ĐANG NHÌN BẠN</small></div><div className="playing-card card-front"><span>💣</span><b>MÈO NỔ</b></div><div className="scribble">tâm lý ổn định<br/>là tùy chọn</div></div></section>
   <nav className="tabs" aria-label="Nội dung cẩm nang">{[['learn','Hướng dẫn',Sparkles],['cards','Tra bài',Search],['tips','Mẹo chơi',Lightbulb]].map(([id,label,Icon])=><button key={id} className={tab===id?'active':''} aria-current={tab===id?'page':undefined} onClick={()=>setTab(id)}><Icon size={16}/>{label}</button>)}</nav>
   {tab==='learn'&&<section id="guide" className="guide-section"><div className="section-intro"><div className="eyebrow">NHẬP HỘI TỪ ĐÂY</div><h2>Vào bàn đi. Chưa biết thì đọc.</h2><p>Năm bước để biết mình đang làm gì. Còn có sống được không thì bộ bài quyết định.</p></div><div className="lesson-layout"><aside className="lesson-index"><div className="eyebrow">LỘ TRÌNH SỐNG SÓT</div>{lessons.map((item,i)=><button key={item.title} className={step===i?'selected':''} aria-current={step===i?'step':undefined} onClick={()=>setStep(i)}><span>{String(i+1).padStart(2,'0')}</span>{item.title}</button>)}<div className="side-note"><Shield size={18}/> Biết luật để ra tay tự tin. Còn tự tin quá thì đọc lại.</div></aside><article className="lesson" aria-live="polite"><div className="lesson-top"><span>Bước {step+1}/5</span><span>Luật gọn, nhớ lâu</span></div><div className="progress" role="progressbar" aria-label="Tiến độ học" aria-valuemin={0} aria-valuemax={5} aria-valuenow={step+1}><i style={{width:`${(step+1)/5*100}%`}}/></div><div className="lesson-content"><div className="lesson-emoji" aria-hidden="true">{lesson.icon}</div><h2>{lesson.title}</h2><p>{lesson.text}</p><div className="lesson-example"><h3>Ra bàn thì thế này</h3><p>{lesson.example}</p></div><div className="tip"><span aria-hidden="true">💡</span><p>{lesson.tip}</p></div></div><div className="lesson-related">Tra nhanh cho chắc tay<RelatedCards ids={lesson.relatedIds} onOpen={openCard}/></div>{step===lessons.length-1&&<p className="guide-outro">Biết luật rồi. Giờ học cách bớt làm mồi.</p>}<div className="lesson-actions"><button className="back" disabled={!step} onClick={()=>setStep(step-1)}><ChevronLeft size={18}/>Trước</button><button className="cta" onClick={()=>step<lessons.length-1?setStep(step+1):jump('tips','tips')}>{step<lessons.length-1?'Tiếp tục':'Xem mẹo chơi'}<ChevronRight size={18}/></button></div></article></div></section>}
   <CardReference active={tab==='cards'} onActivate={()=>setTab('cards')}/>
   <section id="tips" className="tips-section" hidden={tab!=='tips'}><div className="section-intro"><div className="eyebrow">CÓ MẸO, BỚT LÀM MỒI</div><h2>Bớt hên xui. Thêm tí thủ đoạn.</h2><p>Không bảo hành thắng. Nhưng ít nhất bạn sẽ không nổ vì gáy quá sớm.</p></div><div className="tips-list">{tips.map((item,index)=><article className={`strategy-tip ${openTip===item.id?'expanded':''}`} key={item.id}><h3><button id={`tip-trigger-${item.id}`} aria-expanded={openTip===item.id} aria-controls={`tip-panel-${item.id}`} onClick={()=>setOpenTip(openTip===item.id?null:item.id)}><span className="tip-number" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><span className="tip-headline">{item.title}<span className="tip-summary">{item.summary}</span></span><ChevronDown size={19} aria-hidden="true"/></button></h3><div id={`tip-panel-${item.id}`} className="strategy-detail" hidden={openTip!==item.id} role="region" aria-labelledby={`tip-trigger-${item.id}`}><h4>Ra bàn thì thế này</h4><p>{item.example}</p><div className="strategy-caution"><strong>Đừng để cả bàn bắt lỗi</strong><p>{item.caution}</p></div><RelatedCards ids={item.relatedIds} onOpen={openCard}/></div></article>)}</div><p className="tips-footnote">Mẹo là gợi ý chiến thuật, không phải luật bắt buộc. Đọc tình huống, đọc lá bài — đừng chỉ đọc biểu cảm đứa ngồi cạnh.</p></section>
   <footer><div className="footer-cat" aria-hidden="true">😼</div><span>Mèo không có lỗi. Đứa đặt bom lên đầu chồng bài thì có.</span><span className="footer-mark"><Heart size={14} fill="currentColor"/> làm để sống sót</span></footer>
  </main>
 </>;
}
createRoot(document.getElementById('root')).render(<App/>);
