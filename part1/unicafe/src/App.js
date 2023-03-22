import { useState } from "react";

const Button = (props) => {
  const text = props.text;
  const handleClick = props.handleClick;

  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  return (
    <>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => {
    setGood(good + 1);
  };

  const incrementNeutral = () => {
    setNeutral(neutral + 1);
  };

  const incrementBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood} text="good"></Button>
      <Button handleClick={incrementNeutral} text="neutral"></Button>
      <Button handleClick={incrementBad} text="bad"></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

export default App;
