const fs = require('fs');
let content = fs.readFileSync('screensaver.html', 'utf8');
let lines = content.split('\n');

// Replace lines 52-103 (1-indexed) = indices 51-102
const newCSS = `/* ── S1: HERO — dot-grid + concentric rings ── */
#s1{background:var(--black);place-items:center;text-align:center;overflow:hidden}
#s1::before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(168,85,247,.1) 1px,transparent 1px);background-size:32px 32px;pointer-events:none;opacity:.5}
#s1::after{content:'';position:absolute;width:50vw;height:50vw;border-radius:50%;border:1px solid rgba(168,85,247,.07);top:50%;left:50%;transform:translate(-50%,-50%);animation:breathe 6s ease-in-out infinite;pointer-events:none}
#s1 .orb-bl{position:absolute;width:65vw;height:65vw;border-radius:50%;border:1px solid rgba(168,85,247,.04);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
#s1 .top-line{position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--accent),var(--accent2),transparent);animation:accentPulse 3s ease-in-out infinite;transform-origin:center}
@keyframes accentPulse{0%,100%{opacity:.4;transform:scaleX(.5)}50%{opacity:1;transform:scaleX(1)}}
#s1 .main{display:flex;flex-direction:column;align-items:center;gap:24px;position:relative;z-index:2}
#s1 h1{font-family:'Bebas Neue',sans-serif;font-size:clamp(70px,16vw,260px);white-space:nowrap;color:var(--white);line-height:.85;letter-spacing:.06em;filter:drop-shadow(0 0 80px rgba(168,85,247,.5))}
#s1 .accent-rule{width:clamp(50px,6vw,100px);height:2px;background:var(--accent);border-radius:2px;animation:breathe 2s ease-in-out infinite}
#s1 .sub{font-size:clamp(11px,1.1vw,15px);letter-spacing:.5em;color:rgba(245,245,243,.35);text-transform:uppercase;font-weight:300}
#s1 .pill{display:inline-flex;align-items:center;gap:14px;border:1px solid rgba(168,85,247,.18);padding:10px 28px;border-radius:100px;margin-top:8px;background:rgba(168,85,247,.04);backdrop-filter:blur(10px)}
#s1 .dot-live{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:breathe 1.5s infinite;box-shadow:0 0 12px var(--accent)}
#s1 .pill span{font-family:'IBM Plex Mono',monospace;font-size:clamp(9px,.8vw,12px);letter-spacing:.18em;color:rgba(245,245,243,.45)}

/* ── S2: QUOTE — editorial left-bar ── */
#s2{background:#07051a;place-items:center;overflow:hidden}
#s2::before{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(to bottom,transparent 20%,var(--accent) 50%,transparent 80%)}
#s2::after{content:'';position:absolute;width:50vw;height:50vw;border-radius:50%;background:radial-gradient(circle,rgba(168,85,247,.08),transparent 70%);top:60%;right:-15%;pointer-events:none}
#s2 .wrap{max-width:70vw;margin-left:8vw;display:flex;flex-direction:column;gap:40px;position:relative;z-index:2}
#s2 .qs{font-family:'DM Serif Display',serif;font-size:clamp(30px,5vw,80px);color:var(--white);line-height:1.1;font-style:italic;position:relative}
#s2 .qs::before{content:'\\201C';position:absolute;top:-.5em;left:-.12em;font-size:4em;color:var(--accent);opacity:.15;font-style:normal;line-height:1}
#s2 .attr{font-family:'IBM Plex Mono',monospace;font-size:clamp(11px,1vw,15px);letter-spacing:.2em;color:rgba(245,245,243,.3);text-transform:uppercase;padding-left:24px;border-left:2px solid var(--dim)}

/* ── S3: STATS — 4-column showcase ── */
#s3{background:var(--black);grid-template-rows:auto 1fr;padding:8vh 6vw;overflow:hidden}
#s3::before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(168,85,247,.06) 1px,transparent 1px);background-size:24px 24px;pointer-events:none;opacity:.4}
#s3 .header{grid-column:1/-1;padding-bottom:3vh;border-bottom:1px solid var(--dim);position:relative;z-index:2}
#s3 .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;align-self:center;position:relative;z-index:2}
#s3 .cell{padding:5vh 3vw;display:flex;flex-direction:column;align-items:center;gap:16px;position:relative;overflow:hidden;text-align:center;border-right:1px solid var(--dim)}
#s3 .cell:last-child{border-right:none}
#s3 .cell::after{content:'';position:absolute;bottom:0;left:20%;right:20%;height:1px;background:linear-gradient(90deg,transparent,var(--accent),transparent)}
#s3 .cell-num{font-family:'Bebas Neue',sans-serif;font-size:clamp(55px,10vw,170px);color:var(--white);line-height:1}
#s3 .cell-lbl{font-family:'IBM Plex Mono',monospace;font-size:clamp(10px,.9vw,13px);letter-spacing:.3em;color:rgba(245,245,243,.3);text-transform:uppercase}
#s3 .cell-accent .cell-num{color:var(--accent);filter:drop-shadow(0 0 30px rgba(168,85,247,.4))}

/* ── S4: DEV WISDOM — ghosted watermark ── */
#s4{background:#0a071a;color:var(--white);place-items:center;overflow:hidden}
#s4::before{content:'WORKS';position:absolute;font-family:'Bebas Neue',sans-serif;font-size:clamp(120px,35vw,600px);color:rgba(168,85,247,.025);line-height:1;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;white-space:nowrap;user-select:none}
#s4 .wrap{width:75vw;display:flex;flex-direction:column;gap:3vh;align-items:flex-start;position:relative;z-index:2}
#s4 h2{font-family:'Bebas Neue',sans-serif;font-size:clamp(60px,13vw,230px);line-height:.82;letter-spacing:-.01em;color:var(--white)}
#s4 .accent-line{width:60px;height:4px;background:var(--accent);border-radius:2px}
#s4 p{font-family:'DM Serif Display',serif;font-style:italic;font-size:clamp(18px,2.2vw,36px);color:rgba(245,245,243,.55);max-width:50vw;line-height:1.45}
#s4 .mono{font-family:'IBM Plex Mono',monospace;font-size:clamp(11px,1vw,15px);color:rgba(168,85,247,.4);letter-spacing:.15em;margin-top:2vh}

/* ── S5: TERMINAL — frosted card ── */
#s5{background:#030212;padding:8vh 8vw;overflow:hidden;display:flex;align-items:center;justify-content:center}
#s5::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(168,85,247,.012) 0px,rgba(168,85,247,.012) 1px,transparent 1px,transparent 24px);pointer-events:none}
#s5::after{content:'';position:absolute;width:70vw;height:70vw;border-radius:50%;background:radial-gradient(circle,rgba(168,85,247,.06),transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
#s5 pre{font-family:'IBM Plex Mono',monospace;font-size:clamp(12px,1.3vw,19px);line-height:2;color:rgba(245,245,243,.75);white-space:pre;position:relative;z-index:2;background:rgba(6,4,15,.7);border:1px solid rgba(168,85,247,.15);border-radius:12px;padding:40px 48px;backdrop-filter:blur(20px);box-shadow:0 0 80px rgba(168,85,247,.08),inset 0 0 60px rgba(0,0,0,.3)}
#s5 .ok{color:#4ade80}
#s5 .err{color:var(--red)}
#s5 .dim{color:rgba(245,245,243,.22)}
#s5 .cur{display:inline-block;width:.55em;height:1.2em;background:var(--accent);vertical-align:text-bottom;animation:breathe .9s steps(2) infinite}
#s5 .prompt-line{color:var(--accent);font-weight:700;text-shadow:0 0 16px rgba(168,85,247,.7)}`;

const before = lines.slice(0, 51); // lines 1-51
const after = lines.slice(103);     // lines 104+
const result = [...before, ...newCSS.split('\\n'), ...after].join('\\n');
fs.writeFileSync('screensaver.html', result);
console.log('S1-S5 CSS redesigned. Lines: ' + result.split('\\n').length);
`;

fs.writeFileSync('_fix.cjs', script);
