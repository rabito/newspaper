import React from "react";
import { Link } from 'react-router-dom';
import { AdSlot } from 'react-dfp';
import PrismaZoom from 'react-prismazoom'

class Inicio extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            plataformas: [],
            change: false
        };
    }

    componentDidMount(){
        fetch("https://cdn-test.elsalvador.com/epaper/configuracion/plataforma.json", { mode: 'cors'})
        .then(res => res.json())
        .then((result) => {
                this.setState({
                    plataformas: result,
                    change: true
                });
            },
            (error) => {
                console.log("Fail to respond: " + error);
            }
        )
    }

    render() {

        return (
            <React.Fragment>
            <div>
                <PrismaZoom>
                    <div>
                    <p>A text that can be zoomed and dragged</p>
                    </div>
                </PrismaZoom>
                <div>
                    <table>
                        <tbody>
                        <tr>
                        {this.state.plataformas.map((plataforma, i) => {
                            return (
                                <Link key={i} to={{pathname: `/epaper/${plataforma.version}`}}>
                                <th key={i}>
                                    <p key={i}>{plataforma.plataforma}</p>
                                    <img width="250px" height="305px" src={plataforma.ruta_img} alt="Logo" />
                                </th>
                                </Link>
                            );
                        })}
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="banner-300-600">
                    <div className="desktop-ads-2">
                        <AdSlot sizes={[[728, 90]]} adUnit="slv.els_portada" shouldRefresh={() => false} />
                    </div>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default Inicio;

