import { useState } from "react";

const Button = (props) => {
  const text = props.text;
  const handleClick = props.handleClick;

  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = (props) => {
  // const { good, neutral, bad } = props;
  const { text, total } = props;

  if (text === "positive") {
    return (
      <div>
        {" "}
        {text} {total} {"%"}
      </div>
    );
  }
  return (
    <div>
      {" "}
      {text} {total}{" "}
    </div>
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

  const avgScore = () => {
    return (good - bad) / (good + neutral + bad);
  };

  const prcPositiveFeedback = () => {
    return (good / (good + neutral + bad)) * 100;
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood} text="good"></Button>
      <Button handleClick={incrementNeutral} text="neutral"></Button>
      <Button handleClick={incrementBad} text="bad"></Button>
      <h1>statistics</h1>
      <Statistics text="good" total={good}></Statistics>
      <Statistics text="neutral" total={neutral}></Statistics>
      <Statistics text="bad" total={bad}></Statistics>
      <Statistics text="all" total={good + neutral + bad}></Statistics>
      <Statistics text="average" total={avgScore()}></Statistics>
      <Statistics text="positive" total={prcPositiveFeedback()}></Statistics>
    </div>
  );
};

export default App;
