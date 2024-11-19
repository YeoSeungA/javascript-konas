describe('구조 분해 할당(Destructuring Assignment)에 관해서', () => {
  it('배열을 분해합니다', () => {
    const array = ['java', 'spring', 'im', 'course']

    const [first, second] = array
    expect(first).to.eql('java')
    expect(second).to.eql('spring')

    const result = []
    function foo([first, second]) {
      result.push(second)
      result.push(first)
    }

    foo(array)
    expect(result).to.eql(['spring', 'java'])
  })

  it('rest/spread 문법을 배열 분해에 적용할 수 있습니다', () => {
    const array = ['java', 'spring', 'im', 'course']
    const [start, ...rest] = array 
    expect(start).to.eql('java')
    expect(rest).to.eql(['spring', 'im', 'course'])

    // 다음과 같은 문법은 사용할 수 없습니다. 할당하기 전 왼쪽에는, rest 문법 이후에 쉼표가 올 수 없습니다
    // const [first, ...middle, last] = array
  })

  it('객체의 단축(shorthand) 문법을 익힙니다', () => {
    const name = '김코딩'
    const age = 28

    const person = {
      name, // '김코딩'
      age, // 28
      level: 'Junior',
    }
    expect(person).to.eql({
      name: '김코딩', 
      age: 28, 
      level: 'Junior'})
  })

  it('객체를 분해합니다', () => {
    const student = { name: '박해커', major: '물리학과' }

    const { name } = student
    expect(name).to.eql('박해커');
  })

  it('rest/spread 문법을 객체 분해에 적용할 수 있습니다 #1', () => {
    const student = { name: '최초보', major: '물리학과' }
    const { name, ...args } = student // 객체로 묶임.

    expect(name).to.eql('최초보')
    expect(args).to.eql({major: '물리학과'})
  })

  it('rest/spread 문법을 객체 분해에 적용할 수 있습니다 #2', () => {
    const student = { name: '최초보', major: '물리학과', lesson: '양자역학', grade: 'B+' }

    function getSummary({ name, lesson: course, grade }) {
      return `${name}님은 ${grade}의 성적으로 ${course}을 수강했습니다`
    }

    expect(getSummary(student)).to.eql('최초보님은 B+의 성적으로 양자역학을 수강했습니다')  
  })

  it('rest/spread 문법을 객체 분해에 적용할 수 있습니다 #3', () => {
    const user = {
      name: '김코딩',
      company: {
        name: 'Javascript',
        department: 'Development',
        role: {
          name: 'Software Engineer'
        }
      },
      age: 35
    }

    const changedUser = {
      ...user,
      name: '박해커',
      age: 20
    }
        /*
    {
      name: '박해커',
      company: {
        name: 'Javascript',
        department: 'Development',
        role: {
          name: 'Software Engineer'
        }
      },
      age: 20
    }
    */

    const overwriteChanges = {
      name: '박해커',
      age: 20,
      ...user
    }
    /*
    {
      name: '김코딩',
      company: {
        name: 'Javascript',
        department: 'Development',
        role: {
          name: 'Software Engineer'
        }
      },
      age: 35
    }
    */
    const changedDepartment = {
      ...user,
      company: {
        ...user.company,
        department: 'Marketing'
      }
    }
      /*
    {
      name: '김코딩',
      company: {
        name: 'Javascript',
        department: ''Marketing'',
        role: {
          name: 'Software Engineer'
        }
      },
      age: 35
    }
    */
    

    expect(changedUser).to.eql({
      name: '박해커',
      company: {
        name: 'Javascript',
        department: 'Development',
        role: {
          name: 'Software Engineer'
        }
      },
      age: 20
    });

    expect(overwriteChanges).to.eql( {
      name: '김코딩',
      company: {
        name: 'Javascript',
        department: 'Development',
        role: {
          name: 'Software Engineer'
        }
      },
      age: 35
    });

    expect(changedDepartment).to.eql(    {
      name: '김코딩',
      company: {
        name: 'Javascript',
        department: 'Marketing',
        role: {
          name: 'Software Engineer'
        }
      },
      age: 35
    });
  })
})
