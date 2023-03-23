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

const CourseList = (props) => {
  const { courses } = props;

  return (
    <>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  );
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

export default CourseList