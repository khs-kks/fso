import { useState } from "react";

const Button = (props) => {
  const { textContent, handleClick } = props;

  return <button onClick={handleClick}>{textContent}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const nextAnecdote = () => {
    // Generate a random index between 0 and list.length-1

    const randomIndex = Math.floor(Math.random() * anecdotes.length);

    // Use the random index to access a random element from the list

    setSelected(randomIndex);
  };

  const voteForAnecdote = () => {
    const temp = [...votes];
    temp[selected] += 1;
    setVotes(temp);
  };

  const mostVoted = Math.max(...votes);
  const maxVotedIndex = votes.indexOf(mostVoted);
  

  return (
    <>
      <h2>{anecdotes[selected]}</h2>
      <h3>has {votes[selected]} votes</h3>
      <Button textContent="vote" handleClick={voteForAnecdote}></Button>
      <Button textContent="Next anecdote" handleClick={nextAnecdote}></Button>
      <h2>Anecdote with most votes</h2>
      <h3>{anecdotes[maxVotedIndex]}</h3>
      <h3>has {mostVoted} votes</h3>
    </>
  );
};

export default App;
