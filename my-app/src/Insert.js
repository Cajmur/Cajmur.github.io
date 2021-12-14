import * as React from 'react' 

class Insert extends React.Component{ 
  constructor(){ 
    super() 
    this.state={ 
      zdjecie: ""  
    } 
    this.onsubmit=this.onsubmit.bind(this) 
    this.onchange=this.onchange.bind(this) 
  } 
  onchange(event){ 
    this.setState({ 
      zdjecie: event.target.files[0] 
    })
  }
  onsubmit(event){ 
        event.preventDefault() 
        const formData=new FormData() 
        formData.append("zdjecie", this.state.zdjecie) 
        fetch('http://localhost:5000/wstawianie', { 
          method: 'POST', 
          mode: 'cors', 
          body: formData   
    }).then(console.log("O co chodzi?!")).catch(err=>{console.log(err)})  
  } 
  render(){ 
  return( 
    <div> 
      Pierwsza strona 
      <form onSubmit={this.onsubmit}> 
        <label>Wybierz zdjecie, ktorym chcesz sie podzielic: </label> 
        <input type="file" name="zdjecie" onChange={this.onchange} /> 
        <button>Przeslij</button> 
      </form> 
    </div>
  ) 
  } 
}

export default Insert 
