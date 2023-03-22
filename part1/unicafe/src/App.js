import { useState } from "react";

const Button = (props) => {
  const text = props.text;
  const handleClick = props.handleClick;

  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = (props) => {
  const { text, value } = props;

  if (text === "positive") {
    return (
      <div>
        {" "}
        {text} {value} {"%"}
      </div>
    );
  }
  return (
    <div>
      {" "}
      {text} {value}{" "}
    </div>
  );
};

const Statistics = (props) => {
  const { goodValue, neutralValue, badValue, avg, prcPositive } = props.total;

  if (goodValue === 0 && neutralValue === 0 && badValue === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <>
      <StatisticsLine text="good" value={goodValue}></StatisticsLine>
      <StatisticsLine text="neutral" value={neutralValue}></StatisticsLine>
      <StatisticsLine text="bad" value={badValue}></StatisticsLine>
      <StatisticsLine
        text="all"
        value={goodValue + neutralValue + badValue}
      ></StatisticsLine>
      <StatisticsLine text="average" value={avg}></StatisticsLine>
      <StatisticsLine text="positive" value={prcPositive}></StatisticsLine>
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

  const avgScore = () => {
    return (good - bad) / (good + neutral + bad);
  };

  const prcPositiveFeedback = () => {
    return (good / (good + neutral + bad)) * 100;
  };

  const everyStat = {
    goodValue: good,
    neutralValue: neutral,
    badValue: bad,
    avg: avgScore(),
    prcPositive: prcPositiveFeedback(),
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood} text="good"></Button>
      <Button handleClick={incrementNeutral} text="neutral"></Button>
      <Button handleClick={incrementBad} text="bad"></Button>
      <h1>statistics</h1>
      <Statistics total={everyStat}></Statistics>
    </div>
  );
};

export default App;
