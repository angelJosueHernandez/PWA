import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import './wiki.css'

const theme = {
    background: '#f5f8fb',
    headerBgColor: '#eb3449',
    headerFontColor: '#fff',
    headerFontSize: '20px',
    botBubbleColor: '#eb3449',
    botFontColor: '#fff',
    userBubbleColor: '#0cb3c9',
    userFontColor: '#fff',
}
class WikipediaSearch extends React.Component {
 
    constructor(props) {
        super(props);
        const { steps } = this.props;
        const { seleccion, seleccionFront, seleccionBack } = steps;
        this.state = {
            seleccion,
            seleccionFront,
            seleccionBack,
            busqueda: "",
            nombreCurado: ""
        }
    }

    componentDidMount () {
        if (this.state.seleccion.value === "f") {
            this.setState({
                busqueda: this.state.seleccionFront.value,
            });
            if (this.state.seleccionFront.value.includes("_")) {
                var texto = this.state.seleccionFront.value;
                texto = texto.substring(0, texto.indexOf("_"));
                this.setState({
                    nombreCurado: texto,
                });
            } else {
                this.setState({
                    nombreCurado: this.state.seleccionFront.value,
                });
            }
        } else if (this.state.seleccion.value === "b") {
            this.setState({
                busqueda: this.state.seleccionBack.value,
            });
            if (this.state.seleccionBack.value.includes("_")) {
                var texto = this.state.seleccionBack.value;
                texto = texto.substring(0, texto.indexOf("_"));
                this.setState({
                    nombreCurado: texto,
                });
            } else {
                this.setState({
                    nombreCurado: this.state.seleccionBack.value,
                });
            }
        }
    }

    render() {
        return (
            <div>
                <p className='wiki'>Esto es lo que encontre en Wikipedia: </p>
                <a href={"https://es.wikipedia.org/wiki/" + this.state.busqueda} target="_blank">{this.state.nombreCurado}</a>
            </div>
        )
    }

    

}
export default WikipediaSearch;