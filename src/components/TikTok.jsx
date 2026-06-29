import CountUp from './CountUp';

export default function TikTok() {
  const handleLinkClick = (url) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  return (
    <section className="band tiktok-band" id="tiktok">
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <p className="kicker reveal"><span className="idx">01</span>the flagship</p>
        <h2 className="title reveal">Making Math<span className="sub">Go Viral.</span></h2>
        <p className="lead reveal">
          My educational math channel - where I take topics most people scroll past and turn them
          into long-form videos that are genuinely fun to watch. It's the clearest proof of the one thing I'm good at:
          making people care, fast.
        </p>

        {/* stats count-up row */}
        <div className="tiktok-stats reveal-stagger reveal" data-countgroup="true">
          <div className="tstat">
            <CountUp target={13.4} suffix="M+" />
            <span className="lbl">video views</span>
          </div>
          <div className="tstat">
            <CountUp target={15} suffix="K+" />
            <span className="lbl">followers</span>
          </div>
          <div className="tstat">
            <CountUp target={800} suffix="K+" />
            <span className="lbl">likes</span>
          </div>
          <div className="tstat">
            <CountUp target={100} suffix="K+" />
            <span className="lbl">hrs watched</span>
          </div>
        </div>

        {/* vertical phone-mockups */}
        <div className="tiktok-frames reveal-stagger reveal">
          <div
            className="frame pink r-2"
            onClick={() => handleLinkClick('https://vt.tiktok.com/ZSCy1GBDP/')}
            style={{ cursor: 'pointer' }}
          >
            <div className="ph fp1">
              <img
                src="images/tiktok-1.webp"
                alt=""
                loading="lazy"
                onError={(e) => e.target.remove()}
              />
              <span>tiktok</span>
              <div className="ext-badge" aria-hidden="true">↗</div>
            </div>
          </div>

          <div
            className="frame blue r2"
            onClick={() => handleLinkClick('https://vt.tiktok.com/ZSCy1vG4p/')}
            style={{ cursor: 'pointer' }}
          >
            <div className="ph fp3">
              <img
                src="images/tiktok-2.webp"
                alt=""
                loading="lazy"
                onError={(e) => e.target.remove()}
              />
              <span>tiktok</span>
              <div className="ext-badge" aria-hidden="true">↗</div>
            </div>
          </div>

          <div
            className="frame green r-3"
            onClick={() => handleLinkClick('https://vt.tiktok.com/ZSCy14tMN/')}
            style={{ cursor: 'pointer' }}
          >
            <div className="ph fp2">
              <img
                src="images/tiktok-3.webp"
                alt=""
                loading="lazy"
                onError={(e) => e.target.remove()}
              />
              <span>tiktok</span>
              <div className="ext-badge" aria-hidden="true">↗</div>
            </div>
          </div>

          <span className="anno purple tiktok-anno">
            real videos{' '}
            <svg className="arrow" viewBox="0 0 40 40" aria-hidden="true">
              <path d="M6 6 C 20 8, 32 16, 30 32 M30 32 L 36 24 M30 32 L 22 28" />
            </svg>
          </span>
        </div>

        <a
          href="https://www.tiktok.com/@anhlontrivo"
          target="_blank"
          rel="noopener noreferrer"
          className="tiktok-cta reveal"
        >
          watch on TikTok → @anhlontrivo
        </a>
        <p className="tiktok-lesson reveal">"attention is engineered, never lucky - hook, tension, release."</p>
      </div>
    </section>
  );
}
