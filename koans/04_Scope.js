describe('scope 대해서 학습합니다.', function () {
  //  scope는 변수의 값(변수에 담긴 값)을 찾을 때 확인하는 곳을 말합니다. 반드시 기억하시기 바랍니다.
  it('함수 선언식(declaration)과 함수 표현식(expression)의 차이를 확인합니다.', function () {
    let funcExpressed = 'to be a function';
    // 함수는 선언돼면 그냥 위로 올라옴. (일종의 호이스팅)
    expect(typeof funcDeclared).to.equal('function');
    expect(typeof funcExpressed).to.equal('string');

    function funcDeclared() {
      return 'this is a function declaration';
    }
    // 함수 재할당. 함수 표현식으로 표현돼면 안 끌어올려짐. 
    funcExpressed = function () {
      return 'this is a function expression';
    };

    // 자바스크립트 함수 호이스팅(hoisting)에 대해서 검색해 봅니다.

    const funcContainer = { func: funcExpressed };
    // 함수 실행을 하려면 () 가 있어야 함.
    expect(funcContainer.func()).to.equal('this is a function expression');

    funcContainer.func = funcDeclared;
    expect(funcContainer.func()).to.equal('this is a function declaration');
  });

  it('lexical scope에 대해서 확인합니다.', function () {
    let message = 'Outer';

    function getMessage() {
      //  이 때 message는 'Outer'
      return message;
    }

    function shadowGlobal() {
      let message = 'Inner';
      return message;  // 'Inner'
    }

    function shadowGlobal2(message) {
      return message;  // 바로 위의 message
    }

    function shadowParameter(message) {
      message = 'Do not use parameters like this!';
      return message; // 어떤 데이터가 들어와도 재할당 함. 'Do not use parameters like this!' 만 출력됨.
    }

    expect(getMessage()).to.equal('Outer');
    expect(shadowGlobal()).to.equal('Inner');
    expect(shadowGlobal2('Parameter')).to.equal('Parameter');
    expect(shadowParameter('Parameter')).to.equal('Do not use parameters like this!');
    expect(message).to.equal('Outer');
    // shadowParameter();
    // 함수를 실행해야 밑의 코드가 올바름.
    // expect(message).to.equal('Do not use parameters like this!');
  });

  it('default parameter에 대해 확인합니다.', function () {
    function defaultParameter(num = 5) {
      return num;
    }

    expect(defaultParameter()).to.equal(5);
     // 함수는 매개변수 num을 갖음. 초기값(아무것도 안 넣었을 때 대응하기 위한)이 5이다. 
     //  10이 들어오면 우선순위가 더 높음.
    expect(defaultParameter(10)).to.equal(10); 

    function pushNum(num, arr = []) {
      arr.push(num);
      return arr;
    }
    // num에 변수 들어감.
    expect(pushNum(10)).to.deep.equal([10]);
    expect(pushNum(20)).to.deep.equal([20]);
    expect(pushNum(4, [1, 2, 3])).to.deep.equal([1, 2, 3, 4]);
  });

  it('클로저(closure)에 대해 확인합니다.', function () {
    function increaseBy(increaseByAmount) {
      //  밑 함수는 이름이 없음( 익명함수.) 따로 호출 X. 위 함수를 불러야 실행 가능해짐.
      return function (numberToIncrease) {
        return numberToIncrease + increaseByAmount;
      };
    }
    // function (numberToIncrease) {return numberToIncrease + 3};
    const increaseBy3 = increaseBy(3);
    // function (numberToIncrease) {return numberToIncrease + 5};
    const increaseBy5 = increaseBy(5);

    expect(increaseBy3(10)).to.equal(13);
    expect(increaseBy5(10)).to.equal(15);
    expect(increaseBy(8)(6) + increaseBy(5)(9)).to.equal(28);

    /*
    mdn에 따르면 클로저의 정의는 다음과 같습니다. 반드시 기억하시기 바랍니다.
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

      A closure is the combination of a function and the lexical environment within which that function was declared. This environment consists of any local variables that were in-scope at the time the closure was created.

      클로저는 함수와 함수가 선언된 어휘적 환경의 조합을 말한다.
      이 환경은 클로저가 생성된 시점의 유효 범위 내에 있는 모든 지역 변수로 구성된다.

    여기서의 키워드는 "함수가 선언"된 "어휘적(lexical) 환경"입니다. 
    특이하게도 자바스크립트는 함수가 호출되는 환경와 별개로, 기존에 선언되어 있던 환경 - 어휘적 환경 - 을 기준으로 변수를 조회하려고 합니다.
    유어클레스 영상에서 언급되는 "외부함수의 변수에 접근할 수 있는 내부함수"를 클로져 함수로 부르는 이유도 그렇습니다.

    클로저는 내부(inner) 함수가 외부(outer) 함수의 지역 변수에 접근할 수 있습니다.
    이를 유념하시고 클로저의 유즈 케이스를 검색해 보시기 바랍니다. 아래 검색 키워드를 활용합니다.
      function factories
      namespacing private variables/functions
    */
  });

  it('lexical scope와 closure에 대해 다시 확인합니다.', function () {
    let age = 27;
    let name = 'jin';
    let height = 179;

    function outerFn() {
      let age = 24;  // 26이 해당됨. 범위 안에 있는게 우선순위가 더 높음. innerFn()이 실행돼서 
      name = 'jimin';
      let height = 178;

      function innerFn() {
        age = 26;
        let name = 'suga'; // innerFn에서만 해당. 아무 영향 X
        return height; // 바로 밖에 있는 178을 반환
      }

      innerFn();

      expect(age).to.equal(26);
      expect(name).to.equal('jimin');
      // 함수 자체를 반환. 실행 X
      return innerFn;
    }
    // 실행돼서 이름이 지민이 됨.
    const innerFn = outerFn();
    
    expect(age).to.equal(27);
    expect(name).to.equal('jimin');
    expect(innerFn()).to.equal(178);
  });
});
