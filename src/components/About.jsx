import { useState } from 'react';
import FrameImage from './FrameImage';

export default function About({ onImageClick }) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <section className="band hello" id="about">
      {/* Blue decorative blob */}
      <svg className="doodle blob" data-parallax="0.08" style={{ right: '-3vw', top: '4vw', width: 'clamp(90px,16vw,180px)' }}
        viewBox="0 0 200 200" aria-hidden="true">
        <path fill="var(--blue)"
          d="M44-64C56-55 62-39 67-23 72-7 75 9 70 23 64 37 49 48 33 56 16 64-3 68-22 64-41 60-60 47-68 30-77 12-74-11-65-29-56-47-41-60-24-67-7-73 11-73 26-71 40-69 51-64 44-64Z"
          transform="translate(100 100)" />
      </svg>

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <p className="kicker reveal"><span className="idx">00</span>about me</p>
        <div className="hello__row reveal">
          <span className="pill"><span className="live"></span>@anhlontrivo</span>
          <span className="pill">PTNK · Saigon · '08</span>
        </div>
        <h1 className="reveal">
          Hi, I'm <span className="highlight">Minh&nbsp;<span className="hl">Tri</span>
            <svg className="underline-svg" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,8 C30,3 70,2 100,5" />
            </svg>
          </span>
        </h1>
        <p className="hello__tag reveal">
          I am the <span className="highlight">limit breaker
            <svg className="underline-svg" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,8 C30,3 70,2 100,5" />
            </svg>
          </span> of short-form brainrot content - turning dry, complex topics, the kind you'd only expect to see
          in quick TikTok scrolls, into long-form videos that are genuinely enjoyable and entertaining.</p>

        {/* Intro video frame */}
        <div className="video reveal">
          <div className="frame">
            {isPlayingVideo ? (
              <iframe
                src="https://www.youtube.com/embed/3KpxeV_SI2w?autoplay=1"
                title="Intro video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2 }}
              ></iframe>
            ) : (
              <>
                <div className="vph"></div>
                <img
                  src="images/intro-cover.webp"
                  alt=""
                  loading="lazy"
                  onError={(e) => e.target.remove()}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                />
              </>
            )}
          </div>
          {!isPlayingVideo && (
            <button className="play" aria-label="Play intro video" onClick={() => setIsPlayingVideo(true)}></button>
          )}
          <div className="video__note">
            <span className="anno purple">
              my best video!{' '}
              <svg className="arrow flip" viewBox="0 0 40 40" aria-hidden="true">
                <path d="M34 6 C 20 8, 8 16, 10 32 M10 32 L 4 24 M10 32 L 18 28" />
              </svg>
            </span>
          </div>
        </div>

        {/* Scroll explore cue */}
        <div id="scroll-cue" className="reveal">
          <span className="cue-txt">scroll to explore</span>
          <svg className="chevron" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </div>

        {/* About Row */}
        <div className="about">
          {/* Contact Card */}
          <div className="contactcard">
            {/* Green decorative blob */}
            <svg className="doodle blob" data-parallax="0.12" style={{ left: '-2rem', bottom: '-2rem', width: '90px' }}
              viewBox="0 0 200 200" aria-hidden="true">
              <path fill="var(--green)"
                d="M50-66C61-58 64-39 68-22 72-5 78 12 72 26 65 41 47 52 30 59 12 66-7 69-25 63-43 57-61 43-69 25-76 8-72-13-63-30-53-48-38-59-22-66-6-72 13-74 28-72 42-70 50-66 50-66Z"
                transform="translate(100 100)" />
            </svg>
            <h3>Find me at</h3>
            <p className="cline"><small>Full name</small><span>Võ Nguyễn Minh Tri</span></p>
            <p className="cline"><small>TikTok</small><span><a href="https://www.tiktok.com/@anhlontrivo" target="_blank" rel="noopener">@anhlontrivo</a></span></p>
            <p className="cline"><small>Instagram</small><span><a href="https://www.instagram.com/trivo678" target="_blank" rel="noopener">@trivo678</a></span></p>
            <p className="cline"><small>Email</small><span><a href="mailto:trisag678@gmail.com">trisag678@gmail.com</a></span></p>
            <p className="cline"><small>Based in · Born</small><span>Ho Chi Minh City · 2008</span></p>
          </div>

          <div>
            <div className="prose reveal">
              <p>I'm a Maths-Interdisciplinary (Toán Liên Ngành) student at <b>PTNK - VNU-HCM High School for the Gifted</b>, but most of who I am was built <i>outside</i> the syllabus. I've been <b>Head of Media</b> for the Badminton Club, <b>head organiser</b> of a school charity concert, <b>project lead</b> on a first-place short film, and <b>head of advanced math</b> at a tutoring org - I keep saying yes to things that let me build, lead and reach people.</p>
              <p>I also run an educational <b>math TikTok</b> - taking the kind of dry, complex topics you'd never expect to enjoy and turning them into videos people actually want to finish. Somewhere in the comments, I became the math mentor I never had. <i>(The full story and the numbers live in the next section.)</i></p>
              <p>It's all the same skill: making people <b>engage, fast</b>. That's why I'm pursuing the <b>Bachelor of Professional Communication</b> via the <b>Vice-Chancellor's Scholarship at RMIT</b>: I already have the ability to feel what makes a message land <i>and stay</i> - now I want to learn the <i>why</i>, and build it on purpose, for my community and for RMIT.</p>
            </div>

            {/* About 3 Stacked Photos */}
            <div className="about__photos" style={{ marginTop: '1.6rem' }}>
              <div className="frame pink r-2">
                <FrameImage src="images/about-1.webp" caption="candid" onImageClick={onImageClick} />
              </div>
              <div className="frame blue r3 tall">
                <FrameImage src="images/portrait.webp" caption="portrait" onImageClick={onImageClick} />
              </div>
              <div className="frame green r2">
                <FrameImage src="images/about-2.webp" caption="creating" onImageClick={onImageClick} />
              </div>
            </div>
          </div>
        </div>

        {/* Moments Gallery */}
        <div style={{ marginTop: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          <span className="anno blue">
            a few moments{' '}
            <svg className="arrow" viewBox="0 0 40 40" aria-hidden="true">
              <path d="M6 6 C 20 8, 32 16, 30 32 M30 32 L 36 24 M30 32 L 22 28" />
            </svg>
          </span>
          <div className="gallery reveal-stagger reveal">
            <div className="frame yellow r-2">
              <FrameImage src="images/moment-1.webp" caption="on set" onImageClick={onImageClick} />
            </div>
            <div className="frame green r2">
              <FrameImage src="images/moment-2.webp" caption="on stage" onImageClick={onImageClick} />
            </div>
            <div className="frame pink r3">
              <FrameImage src="images/moment-3.webp" caption="the team" onImageClick={onImageClick} />
            </div>
            <div className="frame blue r-4">
              <FrameImage src="images/moment-4.webp" caption="game day" onImageClick={onImageClick} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
