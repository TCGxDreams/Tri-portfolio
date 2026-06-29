import CountUp from './CountUp';

export default function ImpactBand() {
  return (
    <section className="band impact">
      <div className="wrap">
        <p className="kicker reveal">the receipts</p>
        <h2 className="title reveal">Impact, in numbers.</h2>
        <div className="impact-grid reveal-stagger reveal" data-countgroup="true">
          <div className="fig reveal">
            <CountUp target={13.4} suffix="M+" />
            <span className="lbl">video views earned</span>
          </div>
          <div className="fig reveal">
            <CountUp target={800} suffix="K+" />
            <span className="lbl">likes across my content</span>
          </div>
          <div className="fig reveal">
            <CountUp target={7} suffix="M+" />
            <span className="lbl">VND raised for charity</span>
          </div>
          <div className="fig reveal">
            <CountUp target={300} suffix="%+" />
            <span className="lbl">club follower growth</span>
          </div>
          <div className="fig reveal">
            <CountUp target={200} suffix="+" />
            <span className="lbl">participants at one event</span>
          </div>
          <div className="fig reveal">
            <CountUp target={100} suffix="s+" />
            <span className="lbl">students taught for free</span>
          </div>
        </div>
      </div>
    </section>
  );
}
