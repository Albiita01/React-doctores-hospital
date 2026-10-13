import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios';

export default class DetallesComponent extends Component {

    url = Global.urlApiDoctores;

    state = {
        doctor: null
    }

    cargarDoctor = () => {
        let idDoctor = this.props.idDoctor;
        let request = "api/Doctores/" + idDoctor;

        axios.get(this.url + request).then((response) => {
            this.setState({
                doctor: response.data
            })
        })
        console.log("ID: " + this.props.idDoctor)
    }

    componentDidMount = () => {
        this.cargarDoctor();
    }

    // Para que si se hace click en otro doctor, se actualicen los detalles a los del nuevo doctor
    componentDidUpdate = (oldProps) => {
        if (oldProps.iddoctor !== this.props.idDoctor) {
            this.cargarDoctor();
        }
    }

    render() {
        return (
            <div>
                <h1>Doctor {this.props.idDoctor}</h1>
                <div className="card-body">
                    {
                        this.state.doctor ? (
                            <div>
                                <p><strong>Apellido:</strong> {this.state.doctor.apellido}</p>
                                <p><strong>Especialidad:</strong> {this.state.doctor.especialidad}</p>
                                <p><strong>Salario:</strong> {this.state.doctor.salario} €</p>
                                <p><strong>Hospital ID:</strong> {this.state.doctor.idHospital}</p>
                            </div>
                        ) : (
                            <p>Cargando detalles...</p>
                        )
                    }
                </div>
            </div>
        )
    }
}
