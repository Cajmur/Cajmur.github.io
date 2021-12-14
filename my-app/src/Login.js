import * as React from 'react' 

class Login extends React.Component{ 
    constructor(){ 
        super() 
        this.state={ 
            login: '', 
            password: '' 
        } 
    } 
    render(){ 
        return( 
            <div> 
                <form onSubmit={this.onsubm}> 
                    <input type='text' onChange={this.onchang} /> 
                </form>
            </div>
        ) 
    }
}

export default Login 