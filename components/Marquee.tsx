const items = [
  "Data Science",
  "Machine Learning",
  "Web Development",
  "Python",
  "Java",
  "Neural Networks",
  "SLIIT",
  "Sri Lanka",
];

export default function Marquee() {
  const loop = [...items, ...items];

  return (
    <div className="marquee-band" aria-label="Portfolio focus areas">
      <div className="marquee-inner">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  );
}
