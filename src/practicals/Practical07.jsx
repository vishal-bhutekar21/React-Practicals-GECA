import React from 'react';

export default class Practical07 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, logs: ['constructor called'] };
  }

  componentDidMount() {
    this.setState((s) => ({ logs: [...s.logs, 'componentDidMount called'] }));
  }

  render() {
    const { count, logs } = this.state;
    return (
      <div>
        <h2>Practical 07 — State & Lifecycle Demo</h2>
        <p>constructor, render, componentDidMount sequence is demonstrated below.</p>
        <div>
          <button onClick={() => this.setState((s) => ({ count: s.count + 1, logs: [...s.logs, 'render after setState'] }))}>
            Increase
          </button>
          <span style={{ marginLeft: 12 }}>Count: {count}</span>
        </div>
        <div style={{ marginTop: 12 }}>
          <strong>Lifecycle / Render Logs:</strong>
          <ul>
            {logs.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </div>

        <hr />
        <p>Name : Vishal Rajesh Bhutekar</p>
        <p>Roll no: BT24S05F002</p>
      </div>
    );
  }
}
