import React from "react";
import $ from "jquery";
import { Redirect } from 'react-router-dom';

import Turn from "../components/Turn";

class Epaper extends React.Component {
    constructor(props){
        super(props);
        this.fecha = new Date();
        this.state = {
            options: {},
            pages: [],
            change: false
        };
    }

    componentDidMount(){
        console.log("Esta es la propiedad " + this.props.match.params.version);
        var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        //var dia = this.fecha.getDate();
        var dia = 18;
        var mes = this.fecha.getMonth();
        var anio = this.fecha.getFullYear();
        //var mesCorrecto = months[mes];
        var mesCorrecto = "05";

        var arrayPaginas = [];

        var ruta = "https://cdn-test.elsalvador.com/epaper/"+this.props.match.params.version+"/"+anio+"/"+mesCorrecto+"/"+dia+"/";
        fetch(ruta+this.props.match.params.version+".json", { mode: 'cors'})
            .then(res => res.json())
            .then((result) => {
                result.forEach(function(page){
                    arrayPaginas.push(page.url_img_full);
                })

                this.setState({
                    options: {
                        width: 900,
                        height: 600,
                        autoCenter: true,
                        display: "double",
                        acceleration: true,
                        elevation: 50,
                        gradients: !$.isTouch,
                        when: {
                            turned: function(e, page) {
                                let view = $(this).turn("view").join(" - ");
                                if ($(this).turn('page') == $(this).turn('pages')){
                                    view = $(this).turn('pages');
                                }else if($(this).turn('page') == 1){
                                    view = 1;
                                }
                                $("#pageNums").html(view + " / " + $(this).turn('pages'));
                            }
                        }
                    },
                    pages: arrayPaginas,
                    change: true
                });
                this.forceUpdate();
            },
            (error) => {
                this.setState({
                isLoaded: true,
                error
            });
        });
    }

    render() {
        if (this.props.match.params.version == "") {
            return <Redirect to='/' />
        }
        let componente = "";
        if (this.state.change) {
            componente = 
            <Turn options={this.state.options} className="magazine">{this.state.pages.map((page, index) => (<div key={index} className="page"><img src={page} alt="" /></div>))}</Turn>
        }

        return (
            <div>
                 {componente}
            </div> 
        );
    }
}

export default Epaper;