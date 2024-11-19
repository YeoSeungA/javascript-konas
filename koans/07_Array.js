describe('Array에 대해서 학습합니다.', function () {
  it('Array의 기본을 확인합니다.', function () {
    const emptyArr = [];
    expect(typeof emptyArr === 'array').to.equal(false);  // typeof는 array 구분이 안되기 때문에 object가 나옴.
    expect(emptyArr.length).to.equal(0);

    const multiTypeArr = [
      0,
      1,
      'two',
      function () {
        return 3;
      },
      { value1: 4, value2: 5 },
      [6, 7],
    ];
    expect(multiTypeArr.length).to.equal(6);
    expect(multiTypeArr[0]).to.equal(0);
    expect(multiTypeArr[2]).to.equal('two');
    expect(multiTypeArr[3]()).to.equal(3);
    expect(multiTypeArr[4].value1).to.equal(4);
    //expect(multiTypeArr[4]['value2']).to.equal(5); // 문자열로 작성해야함.
    expect(multiTypeArr[4].value2).to.equal(5);
    expect(multiTypeArr[5][1]).to.equal(7);
  });

  it('Array의 요소(element)를 다루는 방법을 확인합니다.', function () {
    const arr = [];
    expect(arr).to.deep.equal([]);

    arr[0] = 1;  // [1]
    expect(arr).to.deep.equal([1]);

    arr[1] = 2;  //[1, 2]
    expect(arr).to.deep.equal([1, 2]);
 
    arr.push(3);  // [1, 2, 3]
    expect(arr).to.deep.equal([1, 2, 3]);
    // 마지막 요소를 제거함. 함수임.
    const poppedValue = arr.pop(); // pop 은 우리가 지운요소를 반환함. 빈배열에 pop 할 시 undefined.
    expect(poppedValue).to.equal(3);
    expect(arr).to.deep.equal([1, 2]);
  });

  it('Array 메소드 slice를 확인합니다.', function () {  //깊은복사
    const arr = ['peanut', 'butter', 'and', 'jelly'];

    expect(arr.slice(1)).to.deep.equal(['butter', 'and', 'jelly']);
    expect(arr.slice(0, 1)).to.deep.equal(['peanut']);
    expect(arr.slice(0, 2)).to.deep.equal(['peanut', 'butter']);
    expect(arr.slice(2, 2)).to.deep.equal([]);
    expect(arr.slice(2, 20)).to.deep.equal(['and', 'jelly']);
    expect(arr.slice(3, 0)).to.deep.equal([]);
    expect(arr.slice(3, 100)).to.deep.equal(['jelly']);
    expect(arr.slice(5, 1)).to.deep.equal([]);

    // arr.slice는 arr의 값을 복사하여 새로운 배열을 리턴합니다.
    // 아래의 코드는 arr 전체를 복사합니다. 자주 사용되니 기억하시기 바랍니다.
    expect(arr.slice(0)).to.deep.equal(['peanut', 'butter', 'and', 'jelly']); //깊은복사. 1차원 배열일 때만.
  });

  it('Array를 함수의 전달인자로 전달할 경우, reference가 전달됩니다.', function () {
    // call(pass) by value와 call(pass) by reference의 차이에 대해서 학습합니다.
    const arr = ['zero', 'one', 'two', 'three', 'four', 'five'];

    function passedByReference(refArr) {
      refArr[1] = 'changed in function';
    }
    passedByReference(arr);
    // 아래는 깊은 복사 코드입니다. 2라인. 원본이 안변함.
    //passedByReference(arr.slice(0));
    // passedByReference([...arr])
    expect(arr[1]).to.equal('changed in function');   // 바뀜 arr 주소값을 전달. 같이 바뀜.

    const assignedArr = arr; //공유 o 얕은복사.
    assignedArr[5] = 'changed in assignedArr';
    expect(arr[5]).to.equal('changed in assignedArr');

    const copiedArr = arr.slice(); // 0 안넣어도 전체 복사. 깊은 복사( spread syntex [...arr] 사용)
    copiedArr[3] = 'changed in copiedArr';
    expect(arr[3]).to.equal('three');
  });

  it('Array 메소드 shift와 unshift를 확인합니다.', function () {
    const arr = [1, 2];

    arr.unshift(3);
    expect(arr).to.deep.equal([3, 1, 2]);

    const shiftedValue = arr.shift();
    expect(shiftedValue).to.deep.equal(3); // shift() 도 반환함.
    expect(arr).to.deep.equal([1, 2]);   // 원본이 바뀜.
  });
})
