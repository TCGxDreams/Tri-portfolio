export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav__in">
        <a href="#about" className="nav__logo">Minh Tri<span className="s">.</span></a>
        <div className="nav__links">
          <a href="#about">About me</a>
          <a href="#tiktok">TikTok</a>
          <a href="#resume">My resume</a>
          <a href="#projects">My projects</a>
          <a href="#rhythm">My rhythm</a>
          <a href="#why">Why RMIT</a>
        </div>
      </div>
    </nav>
  );
}
