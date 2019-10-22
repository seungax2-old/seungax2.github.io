import React, { Component, Fragment } from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

/*  -- function 사용
function App() {
  return (
    <div>
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </div>
  );
} 
*/

/*  -- class 사용
class App extends Component{
  render(){
    return(
      <div>
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
      </div>
      )
    }
  }
*/

/*  -- Fragments
 class App extends Component{
   render(){
     return(
      // 최상위 요소는 1개여야만 한다 <div></div> <div></div> 안됨 부모가 한번더 싸야함 만약 감싸기 곤란하다면 <Fragments> 태그 사용
      <Fragment>
        <div>안녕</div>
        <div>반가워</div>
      </Fragment>
    )
  }
}
*/

/* -- 클릭이벤트
class App extends Component{
  clickButton(e){
    alert("click");
  }
  render(){
    const name = "seungax2"
    return(
      <Fragment>
        <h1> Hello {name}!</h1>
        <button onClick = {this.clickButton}>clickButton</button>
      </Fragment>
    )
  }
}  
*/

/* -- { }를 사용하면 자바스크립트 표현식을 사용 할 수 있다. 이 표현식을 가지고 조건부 렌더링 또한 가능
class App extends Component{
  render(){
    let condition =  true;

    return(
      <Fragment>
        {
          //주의해야 할 점은, if문은 사용할 수 없다는 것이다. 위와 같이 삼항 연산식을 사용하거나 즉시실행함수(IIFE)를 사용해야한다.
          condition ? <div>true</div> : <div>false</div>
        }
      </Fragment>
    )
  }
} 
*/

/* 
class App extends Component {
  render(){
    const style = {
      marginTop:10,
      color:'blue'
    }

    return (
      <div style={style}>inline style</div>
    )
  }
} 
*/

export default App;
