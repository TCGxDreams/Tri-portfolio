import FrameImage from './FrameImage';

const PROJECTS = [
  {
    id: 1,
    title: '"Thước Phim Tuổi Học Trò"',
    badge: '★ 1st place',
    role: 'project manager · lead editor',
    image: 'images/film.webp',
    caption: 'the film',
    annotation: '1st place!',
    annotationColor: 'green',
    href: 'https://youtu.be/3KpxeV_SI2w',
    cta: '▶ Watch on YouTube',
    frameClass: 'blue r2',
    fpClass: 'fp3',
    prose: (
      <>
        <p>For Vietnamese Teachers' Day I led our class's tribute film against entries from <b>30+ classes</b>. The smart move wasn't doing everything myself - it was casting my classmates by their strengths and assigning edits to match, while I held the spine: structure, colour grade, sound sync and pacing.</p>
        <p>Everyone contributed, yet the final cut looked like one hand made it. We took <b>First Place (Giải Nhất)</b> school-wide.</p>
      </>
    ),
    tags: [
      <span key="t1"><b>1st</b> of 30+ classes</span>,
      <span key="t2">PM <b>+ lead editor</b></span>,
      <span key="t3">tight <b>deadline</b></span>
    ],
    lesson: 'great media is delegation held together by one clear vision.'
  },
  {
    id: 2,
    title: 'Reviving a club\'s whole presence',
    badge: '↑ 300%',
    role: 'head of media · PTNK Badminton Club',
    image: 'images/badminton.webp',
    caption: 'club media',
    annotation: '+300% growth →',
    annotationColor: 'blue',
    href: 'https://www.facebook.com/ptnkbadmintonclub',
    cta: 'View on Facebook ↗',
    frameClass: 'yellow r-4',
    fpClass: 'fp4',
    prose: (
      <>
        <p>I inherited a club whose posts were getting <b>under 20 views</b>. I rebuilt its visual identity, switched to a two-way communication model and a fixed content calendar tied to training and member spotlights - driving a <b>300% follower jump</b> and a record recruitment season.</p>
        <p>Then I ran the full media pipeline for "Thundera", a regional tournament with <b>200+ participants</b> co-hosted with Bùi Thị Xuân and Nguyễn Thị Minh Khai - teasers, live coverage, sponsor cross-promo - closing the term at 20,000+ reach.</p>
      </>
    ),
    tags: [
      <span key="t1">rebrand</span>,
      <span key="t2">content <b>calendar</b></span>,
      <span key="t3">"Thundera" <b>200+ participants</b></span>
    ],
    lesson: 'a dead channel is an audience problem, not a posting problem.'
  },
  {
    id: 3,
    title: 'GSALCTLN Charity Concert',
    badge: '♥ charity',
    role: 'head of organizing committee',
    image: 'images/gsalctln.webp',
    caption: 'the concert',
    annotation: '7M VND raised',
    annotationColor: 'purple',
    href: 'https://www.facebook.com/share/p/17Ytg231gt/',
    cta: 'View on Facebook ↗',
    frameClass: 'pink r2',
    fpClass: 'fp1',
    prose: (
      <>
        <p>I conceived and directed a student-led Christmas charity concert end-to-end. Before the show I drove marketing and a week-long "lucky ticket" fundraiser, securing <b>5M VND</b> in sponsorship. On the night I coordinated stage, audio-visual and lighting, and structured cross-club food-stall partnerships with 100% of profits going to the cause.</p>
        <p>We raised <b>7M VND total</b> - audited and donated in full to Mái Ấm Thiên Thần (District 9).</p>
      </>
    ),
    tags: [
      <span key="t1"><b>7M VND</b> raised &amp; donated</span>,
      <span key="t2"><b>head</b> organiser</span>,
      <span key="t3">cross-club <b>collabs</b></span>
    ],
    lesson: 'real impact needs structured, entrepreneurial leadership - not just good intentions.'
  },
  {
    id: 4,
    title: 'Building a curriculum from scratch',
    badge: 'free classes',
    role: 'head of advanced math · The LAB',
    image: 'images/lab.webp',
    caption: 'masterclass',
    href: 'https://www.facebook.com/profile.php?id=61567065251602',
    cta: 'View on Facebook ↗',
    frameClass: 'green r-2',
    fpClass: 'fp2',
    prose: (
      <>
        <p>I was invited to design the advanced-math track for The LAB, an org prepping middle-schoolers for specialised-school entrance exams. I built the modules, mock papers and a progress-tracking system from zero, then ran free online masterclasses that pulled <b>hundreds of registrations</b> - plus a weekly "Math Hack of the Week" to keep curiosity high.</p>
      </>
    ),
    tags: [
      <span key="t1">curriculum from scratch</span>,
      <span key="t2">hundreds enrolled</span>,
      <span key="t3">free masterclasses</span>
    ],
    lesson: 'teaching well is product design with a human at the centre.'
  },
  {
    id: 5,
    title: 'Champion of the school league',
    badge: '🏆 champion',
    role: 'main striker · PTNK Football (Toán-LN team)',
    image: 'images/football.webp',
    caption: 'school champions',
    annotation: 'school champions →',
    annotationColor: 'green',
    href: 'https://drive.google.com/drive/folders/1KJL920AnXWk4jdHJig54x533dOMeNyf_',
    cta: 'View the album ↗',
    frameClass: 'blue r-2',
    fpClass: 'fp3',
    prose: (
      <>
        <p>The PTNK Sports League is the school's biggest annual competition, and squad selection is on merit, not signup - I was picked as the <b>main striker</b> for the Maths-Interdisciplinary (TLN) team on the strength of my training and tactical reliability.</p>
        <p>Across three years we grew up together: an inexperienced roster took a surprise <b>3rd</b> in the Thủ Đức bracket in Grade 10; we reached the <b>quarterfinals</b> in Grade 11; and in Grade 12, at full maturity, we won the <b>School Championship</b> with a decisive final over 11 Toán-LN1.</p>
      </>
    ),
    tags: [
      <span key="t1">main striker</span>,
      <span key="t2">3 years, 3 levels up</span>,
      <span key="t3">school champions</span>
    ],
    lesson: 'real teams are built on discipline and communication - not talent alone.'
  },
  {
    id: 6,
    title: 'Producing music for a band',
    badge: '🎵 producer',
    role: 'producer · band "Ngắt"',
    image: 'images/ngat.webp',
    caption: 'we make songs',
    annotation: 'we make songs →',
    annotationColor: 'purple',
    href: 'https://www.facebook.com/profile.php?id=61560084032822',
    cta: 'View on Facebook ↗',
    frameClass: 'pink r2',
    fpClass: 'fp1',
    prose: (
      <>
        <p>I produce music for the band <b>Ngắt</b> - shaping arrangement, sound and pacing. A lot of my instinct for rhythm and timing as a video editor was trained right here.</p>
      </>
    ),
    tags: [
      <span key="t1">arrangement</span>,
      <span key="t2">sound</span>,
      <span key="t3">pacing</span>
    ],
    lesson: "timing is timing - whether it's a bar of music or a cut in an edit."
  },
  {
    id: 7,
    title: 'Running comms for an education org',
    badge: '📣 comms',
    role: 'deputy head of communications · Ocean Education & Training',
    image: 'images/ocean.webp',
    caption: 'comms',
    href: 'https://www.facebook.com/TTOceanEducation',
    cta: 'View on Facebook ↗',
    frameClass: 'green r-2',
    fpClass: 'fp2',
    prose: (
      <>
        <p>As deputy head of communications at <b>Ocean Education & Training</b>, I helped run the organisation's content and outreach.</p>
      </>
    ),
    tags: [
      <span key="t1">content</span>,
      <span key="t2">outreach</span>,
      <span key="t3">brand</span>
    ],
    lesson: 'clear communication is what turns a service into a community.'
  },
  {
    id: 8,
    title: 'Repping the school on TikTok',
    badge: '▶ top contributor',
    role: 'top contributor · PTNK TikTok Team',
    image: 'images/tiktokteam.webp',
    caption: 'tiktok team',
    frameClass: 'blue r2',
    fpClass: 'fp3',
    prose: (
      <>
        <p>I'm a top contributor on <b>PTNK's official TikTok team</b>, helping make content that represents the school to a wider audience.</p>
      </>
    ),
    tags: [
      <span key="t1">school content</span>,
      <span key="t2">short-form</span>,
      <span key="t3">audience growth</span>
    ],
    lesson: 'the same instinct that grew my own channel works for a brand, too.'
  }
];

export default function Projects({ onImageClick }) {
  return (
    <section className="band" id="projects">
      <div className="wrap">
        <p className="kicker reveal"><span className="idx">03</span>my projects</p>
        <h2 className="title reveal">Stuff I put<span className="sub">on screen</span></h2>
        <p className="lead reveal">
          The work where I actually learned how to reach people - each one through something that went wrong first.
        </p>

        <div style={{ marginTop: 'clamp(2rem, 5vw, 3rem)' }} className="reveal-stagger reveal">
          {PROJECTS.map((proj) => {
            const hasLink = !!proj.href;
            return (
              <article className="proj reveal" key={proj.id}>
                <div className="proj__media">
                  {hasLink ? (
                    <div
                      className={`frame ${proj.frameClass}`}
                      onClick={() => window.open(proj.href, '_blank', 'noopener noreferrer')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className={`ph ${proj.fpClass}`}>
                        <FrameImage src={proj.image} caption={proj.caption} />
                        <div className="ext-badge" aria-hidden="true">↗</div>
                      </div>
                    </div>
                  ) : (
                    <div className={`frame ${proj.frameClass}`}>
                      <FrameImage
                        src={proj.image}
                        caption={proj.caption}
                        onImageClick={onImageClick}
                      />
                    </div>
                  )}
                  {proj.cta && (
                    <div
                      className="proj-cta"
                      onClick={hasLink ? () => window.open(proj.href, '_blank', 'noopener noreferrer') : undefined}
                      style={hasLink ? { cursor: 'pointer' } : {}}
                    >
                      {proj.cta}
                    </div>
                  )}
                  {proj.annotation && (
                    <span className={`anno ${proj.annotationColor}`}>
                      {proj.annotation}
                    </span>
                  )}
                </div>

                <div>
                  <div className="proj__role">{proj.role}</div>
                  <h3>
                    {proj.title} <span className="v">{proj.badge}</span>
                  </h3>
                  <div className="prose">{proj.prose}</div>
                  <ul className="tags">
                    {proj.tags.map((tag, idx) => (
                      <li key={idx}>{tag}</li>
                    ))}
                  </ul>
                  <p style={{ fontFamily: 'var(--mark)', color: 'var(--violet)', fontSize: '1.15rem', margin: '.9rem 0 0' }}>
                    lesson: {proj.lesson}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
