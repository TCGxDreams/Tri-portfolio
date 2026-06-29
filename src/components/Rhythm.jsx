import Soundboard from './Soundboard';

const FACTS = [
  { emo: '⚽', title: 'Football', text: 'Main striker for the TLN team - three seasons from a shock 3rd place to winning the school championship in grade 12.' },
  { emo: '🎸', title: 'Music', text: 'Producer for the band "Ngắt". Sound is half of any video, and most of my pacing instinct comes from here.' },
  { emo: '➗', title: 'Maths', text: 'Where it all started. I still love a problem that takes days - then I figure out how to make it make sense to someone else.' },
  { emo: '✂️', title: 'Editing', text: 'Hours on one cut, one sound cue, one caption rhythm. It\'s the difference between amateur and "wait, who made this?".' },
  { emo: '🧑‍🏫', title: 'Mentoring', text: '15K+ young followers turned my comments into office hours. Helping a kid finally "get it" beats any view count.' },
  { emo: '🎨', title: 'Design', text: 'Self-taught in Canva & Procreate - thumbnails, posters, brand identities for the clubs and events I run.' },
  { emo: '🎤', title: 'Public speaking', text: 'Second Prize in a book-presentation contest as a 6th-grader against 9th-graders. The stage stopped scaring me early.' },
  { emo: '📷', title: 'Filmmaking', text: 'A camera is my favourite excuse to slow down and frame a moment before it\'s gone - then cut it into a story.' }
];

export default function Rhythm() {
  return (
    <section className="band alt" id="rhythm">
      <div className="wrap">
        <p className="kicker reveal"><span className="idx">04</span>my rhythm</p>
        <h2 className="title reveal">When the<span class="sub">camera's off</span></h2>
        <p className="lead reveal">The work runs on everything else I'm into.</p>

        <div className="facts reveal-stagger reveal">
          {FACTS.map((f, idx) => (
            <div className="fact reveal" key={idx}>
              <div className="emo">{f.emo}</div>
              <div>
                <h4>{f.title}</h4>
                <p>{f.text}</p>
              </div>
            </div>
          ))}
        </div>

        <Soundboard />
      </div>
    </section>
  );
}
