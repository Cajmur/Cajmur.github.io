import * as React from 'react' 
import Insert from './Insert' 
import Login from './Login' 
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom' 

class App extends React.Component{ 
  constructor(){ 
    super() 
    this.state={ 
      images: []  
    } 
  } 
  componentDidMount(){ 
    fetch('http://localhost:5000/wyszukaj/', {mode: 'cors'}) 
    .then(res=>res.json())  
    .then(res=>{ 
      const array=Object.values(res) 
      console.log(array) 
      this.setState({images: array}) 
      console.log(this.state.images) 
    }) 
    .catch(err=>{console.log(err)})  
  } 
  render(){ 
    const array2=this.state.images.map((item, index)=>{ 
      return(
        <div style={{textAlign: 'center'}}> 
          <img key={index} src={'http://localhost:5000/Images?images='+item} alt='' width='50%'/> 
          <div style={{opacity: 0.5}}>{item}</div> 
          <br /> 
        </div> 
      ) 
    }) 
  return( 
    <Router> 
      <Switch> 
        <Route exact path='/'> 
        <h1>Hello There!</h1> 
        <Link to='/wstawianie'>Upload an image</Link> 
        {array2} 
        </Route> 
        <Route exact path='/logowanie'> 
        <Login /> 
        </Route> 
        <Route exact path='/rejestracja'> 

        </Route> 
        <Route exact path='/wstawianie'> 
          <Link to='/'>Back to the future</Link> 
          <Insert /> 
        </Route> 
      </Switch>
    </Router>
  ) 
} 
} 

export default App 
