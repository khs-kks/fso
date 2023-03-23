const Header = (props) => {
  return <h1> {props.name} </h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  const { parts } = props;

  return parts.map((part) => (
    <Part key={part.id} part={part.name} exercises={part.exercises} />
  ));
};

const Total = (props) => {
  const { parts } = props;

  const totalExercises = parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);

  return <p>Total of {totalExercises} exercises</p>;
};

const Course = (props) => {
  const { course } = props;

  return (
    <>
      <Header name={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Become a pro",
        exercises: 10000,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
