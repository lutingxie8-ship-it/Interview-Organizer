(() => {
  const isVisible = el => { const r=el.getBoundingClientRect(),s=getComputedStyle(el); return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'; };
  const getContainer = () => {
    const preferred=[...document.querySelectorAll('[role="dialog"],main,[class*="note-detail"],[class*="noteContent"],[class*="detail-content"]')].filter(isVisible);
    return preferred.sort((a,b)=>(/dialog|note|detail|content/i.test(b.className?.toString()||'')?100000:0)+(b.innerText||'').length-(/dialog|note|detail|content/i.test(a.className?.toString()||'')?100000:0)-(a.innerText||'').length)[0]||document.body;
  };
  const parse = raw => { const lines=raw.replace(/\u00a0/g,' ').split(/\n+/).map(x=>x.trim()).filter(Boolean),out=[];let current='';const start=/^(?:第?\s*\d{1,3}\s*[、.)．:]|[一二三四五六七八九十百]+\s*[、.)．:]|Q\s*\d*\s*[:：.)]|问题\s*\d*\s*[:：.)])/i,noise=/^(关注|收藏|分享|评论|点赞|展开|收起|说点什么|登录|打开小红书|举报|更多|共\s*\d+\s*条评论|\d{1,2}[-/]\d{1,2}|[\d\s♥♡★☆·|]+)$/;for(const line of lines){if(noise.test(line)||line.length<4)continue;if(start.test(line)){if(current)out.push(current);current=line}else if(current&&(/[？?：:]$/.test(current)||line.length<90))current+=' '+line;else if(/[？?]$/.test(line))out.push(line)}if(current)out.push(current);return [...new Set(out.map(x=>x.replace(/^[-•]\s*/,'').trim()))].filter(x=>x.length>=5).slice(0,100); };
  const extract=()=>{const root=getContainer();return {title:document.querySelector('meta[property="og:title"]')?.content||document.title,url:location.href,questions:parse(root.innerText||'')};};
  chrome.runtime.onMessage.addListener((m,_,send)=>{if(m.type==='EXTRACT')send(extract());});
  const b=document.createElement('button');b.textContent='☰';b.title='打开面经清单';Object.assign(b.style,{position:'fixed',right:0,top:'48%',zIndex:2147483647,width:'28px',height:'68px',border:0,borderRadius:'14px 0 0 14px',background:'linear-gradient(180deg,#8b5cf6,#3b82f6)',color:'#fff',cursor:'pointer',opacity:.88,boxShadow:'0 8px 24px #4f46e566'});b.onclick=()=>chrome.runtime.sendMessage({type:'OPEN_PANEL'});document.documentElement.appendChild(b);
})();
