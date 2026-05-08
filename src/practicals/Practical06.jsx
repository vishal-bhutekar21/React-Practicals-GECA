import React from 'react';

function Subject({ name, score }) {
  const grade = score >= 90 ? 'A++' : score >= 80 ? 'A' : score >= 70 ? 'B' : 'C';
  const gradeClass = grade === 'A++' ? 'grade-a-plus' : grade === 'A' ? 'grade-a' : grade === 'B' ? 'grade-b' : 'grade-c';
  return (
    <div className="subject-row">
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700 }}>{name}</div>
        <div style={{ fontSize: 13, color: '#475569' }}>Score: {score}</div>
      </div>
      <div style={{ width: 220, textAlign: 'right' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 120 }}>
            <div className="progress"><i style={{ width: `${score}%` }} /></div>
          </div>
          <div className={`grade-badge ${gradeClass}`}>{grade}</div>
        </div>
      </div>
    </div>
  );
}

export default function Practical06() {
  const subjects = [
    { name: 'Mathematics', score: 95 },
    { name: 'Physics', score: 88 },
    { name: 'Chemistry', score: 78 },
    { name: 'Computer Science', score: 92 },
  ];

  const avg = (subjects.reduce((s, x) => s + x.score, 0) / subjects.length).toFixed(2);

  return (
    <div>
      <h2>Practical 06 — Parent / Child Components (Scorecard)</h2>

      <div className="scorecard">
        {subjects.map((sub) => (
          <Subject key={sub.name} name={sub.name} score={sub.score} />
        ))}
      </div>

      <p><strong>Average:</strong> {avg}</p>

      <hr />
      <p>Name : Vishal Rajesh Bhutekar</p>
      <p>Roll no: BT24S05F002</p>
    </div>
  );
}
