import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Search, X, ExternalLink } from 'lucide-react';
import { cards, categories, entries, searchEntries, sourceUrl } from './cards';

const fromHash = () => entries.find(item => location.hash === `#card=${item.id}`) ?? null;
export default function CardReference({ active, onActivate }) {
 const [query,setQuery]=useState('');
 const [category,setCategory]=useState('all');
 const [selected,setSelected]=useState(fromHash);
 const dialog=useRef(null), returnFocus=useRef(null), pendingClose=useRef(false), activate=useRef(onActivate);
 activate.current=onActivate;
 const filtered=searchEntries(query,category);
 useEffect(()=>{
  let firstSync=true;
  const sync=()=>{
   let item=fromHash();
   if(pendingClose.current){pendingClose.current=false;history.replaceState(null,'',location.pathname+location.search);item=null;}
   setSelected(item);
   if((item&&(firstSync||!history.state?.cardOrigin))||(!item&&location.hash.startsWith('#card='))) activate.current();
   firstSync=false;
   if(!item&&location.hash.startsWith('#card=')) history.replaceState(null,'',location.pathname+location.search);
  };
  window.addEventListener('hashchange',sync); window.addEventListener('popstate',sync); sync();
  return()=>{window.removeEventListener('hashchange',sync);window.removeEventListener('popstate',sync);};
 },[]);
 const isOpen=Boolean(selected);
 useEffect(()=>{
  const element=dialog.current;
  if(isOpen){
   returnFocus.current=document.activeElement;
   element.showModal();
   const overflow=document.body.style.overflow;
   document.body.style.overflow='hidden';
   return()=>{element.close();document.body.style.overflow=overflow;(returnFocus.current?.isConnected?returnFocus.current:document.querySelector('.tabs [aria-current="page"]'))?.focus({preventScroll:true});};
  }
 },[isOpen]);
 function open(item){
  const cardPanelDepth=(history.state?.cardPanelDepth??0)+1;
  history.pushState({...history.state,cardPanelDepth},'',`#card=${item.id}`);
  setSelected(item);
 }
 function trapFocus(event){
  if(event.key!=='Tab') return;
  const elements=[...dialog.current.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),[tabindex="0"]')];
  const first=elements[0],last=elements.at(-1);
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
 }
 function close(){
  if(history.state?.cardPanelDepth){pendingClose.current=true;history.go(-history.state.cardPanelDepth);}
  else {history.replaceState(null,'',location.pathname+location.search);setSelected(null);}
 }
 useEffect(()=>{
  if(selected) dialog.current?.querySelector('.detail-scroll')?.scrollTo(0,0);
 },[selected?.id]);
 return <><section id="reference" className="reference" hidden={!active} aria-label="Tra cứu lá bài">
  <div className="reference-heading"><div><div className="eyebrow">BỘ GỐC · ORIGINAL EDITION</div><h2>Cầm lá gì mà tự tin thế?</h2><p className="deck-total"><strong>{cards.reduce((sum,item)=>sum+item.count,0)} lá trong hộp</strong><span>13 loại bài</span></p></div></div>
  <p className="reference-intro">Gõ tên Việt, tên Anh hoặc tác dụng. Tra xong hãy ra tay, đừng để cả bàn phát hiện bạn đang hoang mang.</p>
  <div className="lookup-tools"><label className="searchbox"><Search size={20}/><span className="sr-only">Tìm tên Việt, tên Anh hoặc tác dụng</span><input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Tên Việt, tên Anh hoặc tác dụng…"/>{query&&<button className="clear-search" onClick={()=>setQuery('')} aria-label="Xóa tìm kiếm"><X size={18}/></button>}</label><div className="filter-chips" aria-label="Lọc theo nhóm">{categories.map(([id,label])=><button key={id} aria-pressed={id===category} className={category===id?'chosen':''} onClick={()=>setCategory(id)}>{label}</button>)}</div></div>
  <div className="lookup-count" role="status">{filtered.length} {category==='combos'?'hướng dẫn combo':'mục tra cứu'}{category==='all'&&!query.trim()?' · 13 loại bài + 2 hướng dẫn combo':''}</div>
  <div className="card-grid">{filtered.map(item=><button type="button" className="ref-card lookup-card" key={item.id} onClick={()=>open(item)}><span className={`card-art art-${item.category}`} aria-hidden="true">{item.icon}</span><div><div className="card-meta">{categories.find(([id])=>id===item.category)?.[1]}<span>{item.count===null?'Hướng dẫn':`${item.count} lá trong bộ`}</span></div><h3>{item.nameVi} <span>({item.nameEn})</span></h3><p>{item.summary}</p></div><ChevronRight size={18} aria-hidden="true"/></button>)}</div>
  {!filtered.length&&<div className="empty-state"><span aria-hidden="true">🕵️</span><h3>Chưa thấy đồng phạm này.</h3><p>Thử tên khác hoặc bỏ bộ lọc nhé. Có thể bạn đang cầm bài của bộ mở rộng, cũng có thể đứa bên cạnh vừa bịa luật.</p><div className="empty-actions">{query&&<button onClick={()=>setQuery('')}>Xóa tìm kiếm</button>}{category!=='all'&&<button onClick={()=>setCategory('all')}>Bỏ bộ lọc</button>}</div></div>}
  <p className="fineprint">Tên Việt dùng để hướng dẫn, có thể khác cách dịch trên hộp. Một loại có nhiều lá giống nhau. Combo là cách ghép bài, không phải lá bí mật thứ 57. <a href={sourceUrl} target="_blank" rel="noreferrer">Luật chính thức</a>.</p>
 </section>
  <dialog ref={dialog} onKeyDown={trapFocus} className="card-dialog" aria-labelledby="card-detail-title" onCancel={event=>{event.preventDefault();close();}} onClick={event=>{if(event.target===dialog.current)close();}}>
   {selected&&<><div className="detail-toolbar"><span>{selected.count===null?'Hướng dẫn combo':`${selected.count} lá trong bộ gốc`}</span><button autoFocus onClick={close} aria-label="Đóng chi tiết"><X/></button></div><div className="detail-scroll"><div className={`detail-art art-${selected.category}`} aria-hidden="true">{selected.icon}</div><h2 id="card-detail-title">{selected.nameVi} <span>({selected.nameEn})</span></h2><p className="detail-summary">{selected.summary}</p><section><h3>Dùng khi nào?</h3><p>{selected.timing}</p></section><section><h3>Cách xử lý</h3><ol>{selected.instructions.map(line=><li key={line}>{line}</li>)}</ol></section><section className="draw-rule"><h3>Có phải rút bài không?</h3><p>{selected.draw}</p></section><section><h3>Ra bàn thì thế này</h3><p>{selected.example}</p></section><section><h3>Đừng để cả bàn bắt lỗi</h3><ul>{selected.pitfalls.map(line=><li key={line}>{line}</li>)}</ul></section><section><h3>Xem cùng cho chắc</h3><div className="related-cards">{selected.relatedIds.map(id=>entries.find(item=>item.id===id)).filter(Boolean).map(item=><button key={item.id} onClick={()=>open(item)}>{item.nameVi} ({item.nameEn}) <ChevronRight size={15}/></button>)}</div></section><a className="detail-source" href={selected.sourceUrl} target="_blank" rel="noreferrer">Đối chiếu luật Original Edition <ExternalLink size={14}/></a></div></>}
  </dialog>
 </>;
}
