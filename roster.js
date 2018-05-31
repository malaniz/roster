/*
Grade School

Given students' names along with the grade that they are in, create a roster for the school.

In the end, you should be able to:

Add a student's name to the roster for a grade
"Add Jim to grade 2."
"OK."
Get a list of all students enrolled in a grade
"Which students are in grade 2?"
"We've only got Jim just now."
Get a sorted list of all students in all grades. Grades should sort as 1, 2, 3, etc., and students within a grade should be sorted alphabetically by name.
"Who all is enrolled in school right now?"
"Grade 1: Anna, Barb, and Charlie. Grade 2: Alex, Peter, and Zoe. Grade 3…"
Note that all our students only have one name. (It's a small town, what do you want?)
*/

const data = [{
  student: { name: "Jim" },
  grade: 2
}, {
  student: { name: "Anna" },
  grade: 1
}, {
  student: { name: "Barb" },
  grade: 1
}, {
  student: { name: "Charlie" },
  grade: 1
}, {
  student: { name: "Alex" },
  grade: 2
}, {
  student: { name: "Peter" },
  grade: 2
}, {
  student: { name: "Zoe" },
  grade: 2
}, {
  student: { name: "Marce" },
  grade: 3
}]

function add(name, grade) {
  const result = data.find(x => x.student.name === name)
  if (result) {
    return false;
  }
  data.push({student: {name}, grade})
  return true;
}

function getGrade(grade) {
  return data.filter(x => x.grade === parseInt(grade))
}

function enrolled() {
  return data
}

function mymatch(input, re) {
  try {
    const res = re.exec(input)
    return (res !== null)? res.slice(1): false
  } catch (e) {
    return false
  }
}

function say(input) {
  const regexs = [
    { re: /^Add ([A-Za-z]+) to grade (\d)$/u, f: add },
    { re: /^Which students are in grade (\d)\?$/u, f: getGrade },
    { re: /^Who are enrolled in school right now\?$/u, f: enrolled }
  ]
  const token = regexs.map(({re, f}) => ({
    params: mymatch(input, re), f
  })).find(x => x.params !== false)
  if (!token) {
    console.log('I can not undestand what are you trying to say.')
    return;
  }
  token.result = token.f.apply(this, token.params)

  let message = ""
  switch(token.f.name) {
    case 'add':
      message = token.result? 'Ok.': `${token.params[0]} seems to be in grade ${token.params[1]}.`
      break
    case 'getGrade':
      const n = token.result
      message = (n.length > 1)?
        `${n.map(({ student: {name}}) => name).join(', ')} are in grade ${n[0].grade}.`:
        (n.length === 1)?
          `${n[0].student.name} is the only one in grade ${n[0].grade}.`:
          'There is no one in this grade'
      break
    case 'enrolled':
      const groupBy = (xs, key) => xs.reduce((rv, x) => {
          (rv[x[key]] = rv[x[key]] || []).push(x)
          return rv
        }, {})
      const grouped = groupBy(token.result, 'grade')
      message = Object.keys(grouped).map(grade => (
        `Grade ${grade}: ${grouped[grade].map(({student: { name }}) => name).join(', ')}`
      )).join('. ') + '.'
      break
  }
  console.log(message)
}

module.exports = { say }
