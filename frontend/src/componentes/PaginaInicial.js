import React from "react";
import "./PaginaInicial.css";

class PaginaInicial extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className="fundo" style={{backgroundImage: "url(background.jpg)"}}>
                <div>
                    <button className="botaoIniciar">Iniciar Jogo</button>
                    <p className="no-aguardo">No aguardo do segundo jogador...</p>
                </div>
            </div>
        )
    }
}

export default PaginaInicial;