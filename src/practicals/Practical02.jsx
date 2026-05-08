import React, { useState } from 'react';
import { sampleAvatar } from '../assets/images';

export default function Practical02() {
  const [attendance, setAttendance] = useState(92);
  const [present, setPresent] = useState(true);
  const handleContact = () => alert('Contact clicked');
  const handleProjects = () => alert('Projects clicked');

  const markPresent = () => setAttendance((a) => Math.min(100, a + 1));
  const togglePresent = () => {
    setPresent((p) => {
      if (p) {
        // marking absent — reduce attendance slightly for demo
        setAttendance((a) => Math.max(0, a - 1));
      }
      return !p;
    });
  };

  return (
    <div style={{ maxWidth: 760 }}>
      <h2>Practical 02 — Student Profile</h2>

      <div className="profile-boundary">
        <div className="profile-card">
          <img src={sampleAvatar} alt="student" />
          <div className="info">
            <h3 style={{ margin: 0 }}>Vishal Rajesh Bhutekar <span className="badge">BT24S05F002</span></h3>
            <p style={{ marginTop: 8 }}><strong>Professional Specialty:</strong> Frontend / React Developer</p>
            <p><strong>Bio:</strong> Enthusiastic learner of React and web development. Focused on building accessible, maintainable UI with React.</p>
            <div style={{ marginTop: 10 }}>
              <strong>Year:</strong> 2nd Year &nbsp; — &nbsp; <strong>Semester:</strong> 4
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ minWidth: 120 }}>
                  <div><strong>Attendance</strong></div>
                  <div style={{ fontSize: 14 }}>{attendance}% — {present ? 'Present' : 'Absent'}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="progress"><i style={{ width: `${attendance}%` }} /></div>
                </div>
              </div>

              <div style={{ marginTop: 10 }}>
                <button onClick={markPresent} style={{ marginRight: 8 }}>Mark +1</button>
                <button onClick={togglePresent}>{present ? 'Mark Absent' : 'Mark Present'}</button>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <button onClick={handleContact} style={{ marginRight: 8 }}>Contact</button>
              <button onClick={handleProjects}>Projects</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
