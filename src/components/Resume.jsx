import FrameImage from './FrameImage';

export default function Resume({ onImageClick }) {
  return (
    <section className="band alt" id="resume">
      {/* Decorative star doodle */}
      <svg className="doodle" data-parallax="0.14" style={{ left: '6%', top: '14%', width: 'clamp(34px,5vw,56px)' }} viewBox="0 0 100 100"
        aria-hidden="true">
        <path fill="var(--pink)" d="M50 4l11 30 32 1-25 20 9 31-27-19-27 19 9-31-25-20 32-1z" />
      </svg>

      <div className="wrap">
        <p className="kicker reveal"><span className="idx">02</span>my resume</p>
        <h2 className="title reveal">Education<span className="sub">&amp; achievements</span></h2>
        <p className="lead reveal">Mostly a math kid who kept saying yes to things outside the syllabus.</p>

        {/* proudest callout */}
        <div className="board callout reveal">
          <div className="board__hd">the one I'm proudest of ✦</div>
          <p>
            <b>IELTS 8.0 - achieved after a continuous two-week lock-in.</b> I treated the exam like a systems problem,
            not a vocab grind: hunting my own margin errors, dissecting synonym traps, and sharpening spontaneous thinking
            under time pressure until the score followed. That loop: analyse the gap, fix it fast - is how I approach everything.
          </p>
        </div>

        {/* achievement bullets */}
        <ul className="bullets reveal">
          <li><b>PTNK - VNU-HCM High School for the Gifted</b>, Maths-Interdisciplinary track <span className="yr">2023–26</span></li>
          <li><b>Valedictorian</b> - PTNK entrance exam, top score among 100 candidates from Bình Thọ Secondary <span className="yr">2022</span></li>
          <li><b>IELTS 8.0</b> - achieved after a continuous 2-week lock-in <span className="yr">2026</span></li>
          <li><b>Bronze Medal, English</b> - Olympic 30/4 regional contest <span className="yr">2021</span></li>
          <li><b>Outstanding Student in Mathematics</b> - Thủ Đức City level <span className="yr">2022–23</span></li>
          <li><b>Third Prize</b> - Thủ Đức City Math Competition <span className="yr">2022</span></li>
          <li><b>Second Prize</b> - school Book Presentation, as a 6th-grader in the 9th-grade division <span className="yr">2020</span></li>
        </ul>

        {/* academic certificates */}
        <div className="certs">
          <div className="frame green r-2">
            <FrameImage src="images/cert-math.webp" caption="3rd Prize · Math (Gr.8)" onImageClick={onImageClick} />
          </div>
          <div className="frame pink r2">
            <FrameImage src="images/cert-ielts.webp" caption="IELTS 8.0" onImageClick={onImageClick} />
          </div>
          <div className="frame blue r-4">
            <FrameImage src="images/cert-olympic.webp" caption="Olympic 30/4" onImageClick={onImageClick} />
          </div>
          <div style={{ alignSelf: 'center' }}>
            <span className="anno green">
              <svg className="arrow flip" viewBox="0 0 40 40" aria-hidden="true">
                <path d="M34 8 C 22 8, 10 16, 12 32 M12 32 L 6 24 M12 32 L 20 28" />
              </svg>{' '}
              proof of the grind
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
