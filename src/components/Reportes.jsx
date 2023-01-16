import React, { useState } from 'react';
import { Chart } from 'primereact/chart';
import { useEffect } from 'react';
import { AgenteService } from '../services/AgenteService';

const Reportes = () => {

    const svcAgente = new AgenteService()

    const [dataAgentes, setdataAgentes] = useState({})
    const [dataDelitos, setdataDelitos] = useState({})
    const [basicData] = useState({
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [
            {
                label: 'My First dataset',
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    });
    useEffect(()=>{
        svcAgente.countDelegaciones().then(resp => {
            console.log("🚀 ~ file: Reportes.jsx:37 ~ svcAgente.countDelegaciones ~ resp", resp)
            const labels = resp.map(a => {
                return a.nombre
            })
            const datos = resp.map(a => {
                return a._count.delegaciones
            })
            console.log("🚀 ~ file: Reportes.jsx:30 ~ datos ~ datos", datos)
            setdataAgentes({
                labels,
                datasets: [
                    {
                        label: 'Delegaciones',
                        data: datos
                    }
                ]
            })
        })
        
        svcAgente.countDelitos().then(resp => {
            console.log("🚀 ~ file: Reportes.jsx:43 ~ svcAgente.countDelegaciones ~ resp", resp)
            const labels = resp.map(a => {
                return a.delito
            })
            const datos = resp.map(a => {
                return a._count.delegaciones
            })
            console.log("🚀 ~ file: Reportes.jsx:30 ~ datos ~ datos", datos)
            setdataDelitos({
                labels,
                datasets: [
                    {
                        label: 'Delegaciones',
                        data: datos
                    }
                ]
            })
        })
    }, [])

    const [multiAxisData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: [
                '#EC407A',
                '#AB47BC',
                '#42A5F5',
                '#7E57C2',
                '#66BB6A',
                '#FFCA28',
                '#26A69A'
            ],
            yAxisID: 'y',
            data: [65, 59, 80, 81, 56, 55, 10]
        }, {
            label: 'Dataset 2',
            backgroundColor: '#78909C',
            yAxisID: 'y1',
            data: [28, 48, 40, 19, 86, 27, 90]
        }]
    });

    const [stackedData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            type: 'bar',
            label: 'Dataset 1',
            backgroundColor: '#42A5F5',
            data: [
                50,
                25,
                12,
                48,
                90,
                76,
                42
            ]
        }, {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: '#66BB6A',
            data: [
                21,
                84,
                24,
                75,
                37,
                65,
                34
            ]
        }, {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: '#FFA726',
            data: [
                41,
                52,
                24,
                74,
                23,
                21,
                32
            ]
        }]
    });

    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        let horizontalOptions = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        let stackedOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        let multiAxisOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                        color: '#ebedef'
                    },
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057'
                    }
                }
            }
        };

        return {
            basicOptions,
            horizontalOptions,
            stackedOptions,
            multiAxisOptions
        }
    }

    const { basicOptions, horizontalOptions, multiAxisOptions, stackedOptions } = getLightTheme();

    return (
        <div>
            <div className="card">
                <h5>Delgaciones por Agente</h5>
                <Chart type="bar" data={dataAgentes} options={horizontalOptions}/>
            </div>

            <div className="card">
                <h5>Delegaciones por Delito</h5>
                <Chart type="bar" data={dataDelitos} options={horizontalOptions} />
            </div>

            {/* <div className="card">
                <h5>Multi Axis</h5>
                <Chart type="bar" data={multiAxisData} options={multiAxisOptions} />
            </div>

            <div className="card">
                <h5>Stacked</h5>
                <Chart type="bar" data={stackedData} options={stackedOptions} />
            </div> */}
        </div>
    )
}

export default Reportes