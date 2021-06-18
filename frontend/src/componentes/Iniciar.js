import React from "react";


export default class Jogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            pagina: "iniciar"
         }
    }

inicia({onStart}) {
    return <button onClick={onStart}>Iniciar</button>
}
    render() { 
        if (this.state.pagina === "inciar") {
            <Iniciar onStart={() => this.setState({pagina: 'outra'})} />
        } else if ( this.state.pagina === "outra") {
          
        }

    
}

}