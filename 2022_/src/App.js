import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Article(props){
  return(
  <article><h2>{props.title}</h2>
  {props.body}</article>
  )
}

function Header(props){
  return <header>
  <h1><a href="/" onClick={(event)=>{
    event.preventDefault();
    props.onChangeMode();
  }}>{props.title}</a></h1>
</header>
}

function Nav(props){
  const lis = []
  for(let i =0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id = {t.id} href ={'/read/'+t.id} onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      //  console.log(event.target);
      }}>{t.title}</a></li>)
  }
  return <nav>
  <ol>
    {lis}
  </ol>
</nav>
}

function App() {
  // const _mode = useState('WELCOME'); // _mode변수에 초기값 넣어주기
  // const mode = _mode[0]; _mode는 사실 배열이다. 첫번째 인덱스에는 State의 값이 들어있고
  // const setMode = _mode[1]; 두번째 인덱스에는 State의 값을 변경해주는 함수가 들어있다.
  const [mode, setMode] = useState('WELCOME'); // 이 세줄을 간단하게 축약한 소스
  const [id, setId] = useState(null);
  const topics = [
  {id:1, title:'html', body: 'html is ...'},
  {id:2, title:'css', body: 'css is...'},
  {id:3, title: 'javascript',body: 'javascript is...'}
  ]
  let content = null;
  if(mode ==='WELCOME'){
    content = <Article title = "Welcome" body = "Hello Web"></Article>
  }else if(mode === 'READ'){
    let title, body = null;
    for(let i =0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title = {title} body = {body}></Article>
  }
  return (
    <div>
      <Header title ="REACT" onChangeMode={()=>{
        setMode('WELCOME');//setMode를 호출하면 App컴포넌트가 다시 실행되면서 값을 다시 세팅함
    }}></Header>
      <Nav topics = {topics} onChangeMode ={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
    </div>
  );
}
// ddd
export default App;
