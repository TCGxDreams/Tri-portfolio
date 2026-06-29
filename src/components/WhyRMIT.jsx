export default function WhyRMIT() {
  return (
    <section className="band why" id="why">
      {/* Blue star doodle with parallax */}
      <svg className="doodle" data-parallax="0.18" style={{ right: '7%', top: '18%', width: 'clamp(34px,5vw,56px)' }} viewBox="0 0 100 100"
        aria-hidden="true">
        <path fill="var(--blue)" d="M50 4l11 30 32 1-25 20 9 31-27-19-27 19 9-31-25-20 32-1z" />
      </svg>

      <div className="wrap">
        <p className="kicker reveal"><span className="idx">05</span>why rmit</p>
        <h2 className="title reveal">What I'll bring<span className="sub">to RMIT.</span></h2>
        <div className="prose reveal">
          <p>
            Every project I've run points the same way: I want to do this for real. The <b>Bachelor of Professional Communication</b> at RMIT - through the <b>Vice-Chancellor's Scholarship</b> - is where I can turn instinct into craft: understand the <i>why</i> behind what makes a message land and stay, and build campaigns that actually mean something for my community and for RMIT.
          </p>
        </div>
        <ul className="bullets reveal" style={{ marginTop: '1.6rem' }}>
          <li>
            <b>A real audience, ready to mobilise.</b> I've spent two years making Vietnamese viewers care through a screen - I'd love to put that to work globalising RMIT's brand and showing the world its student life.
          </li>
          <li>
            <b>Learning agility.</b> 7.5 → 8.0 in two weeks; zero → a 13.4M-view channel. I close gaps fast, which is exactly what a fast-paced media community needs from day one.
          </li>
          <li>
            <b>Leadership that ships.</b> From a 7M-VND charity concert to a 300% club turnaround, I don't just plan - I deliver, on deadline, with a team behind me.
          </li>
        </ul>
        <div style={{ marginTop: '1.6rem' }}>
          <span className="anno pink">let's build something →</span>
        </div>
      </div>
    </section>
  );
}
