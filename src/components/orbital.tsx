export function Orbital({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`orbital ${small ? "orbital-small" : ""}`}
      aria-hidden="true"
    >
      <div className="orbital-grid" />
      <div className="orbit-system">
        <div className="orbit orbit-a" />
        <div className="orbit orbit-b" />
        <div className="orbit orbit-c" />
        <div className="orbit orbit-d" />
        <div className="orbit-core">
          <span>
            F<span>↗</span>
          </span>
        </div>
      </div>
      <div className="orbital-label label-a">
        <span>01 — ESTRATÉGIA</span>
        <i />
      </div>
      <div className="orbital-label label-b">
        <i />
        <span>02 — DESIGN</span>
      </div>
      <div className="orbital-label label-c">
        <span>03 — ENGENHARIA</span>
        <i />
      </div>
      <div className="orbital-coordinates">
        23°11′ S &nbsp; 46°53′ W<br />
        DIGITAL ENGINEERING STUDIO
      </div>
      <span className="orbital-cross cross-a">+</span>
      <span className="orbital-cross cross-b">+</span>
    </div>
  );
}
