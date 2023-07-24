const Title = ({name}) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const CourseName = ({name}) => {
    return (  
      <p>{name.name} {name.exercises}</p>
    )
  
  }
  
  const Total = ({sum}) => {
    return (
      <p><strong>Total of {sum.reduce((acc, cur) => acc + cur.exercises, 0)} exercises</strong></p>
    )
  }
  
  const Content = ({info}) => {
    return (
      <div>
          {info.map(names => <CourseName key={names.id} name={names}/>)}
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
      <h1>Web development curriculum</h1>
        {course.map(course => 
          <>
          <Title name={course.name}/>
          <Content info={course.parts}/>
          <Total sum={course.parts}/>
          </>
        )}
      </>
    )
  }

export default Course