import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale,
    PointElement,
    LineElement,
    Filler, CategoryScale,
    LinearScale, Title,
} from 'chart.js'
import { Pie, Radar, Line } from 'react-chartjs-2'
import faker from 'faker'
import { useSelector } from 'react-redux'
import { loadToys } from '../store/actions/toy.actions.js'
import { toyService } from '../services/toy.service.js'
import { utilService } from '../services/util.service.js'


ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale,
    PointElement,
    LineElement, CategoryScale,
    LinearScale, Title,
    Filler,)

export function Dashboard() {

    const [highestLabelToysLength, setHighestLabelToysLength] = useState(0)
    const toys = useSelector(storeState => storeState.toyModule.toys)
    useEffect(() => {
        loadToys()
    }, [])

    function getInStockToysByLabelData() {
        const labels = toyService.getLabelsList()
        const inStockByLabels = labels.map(label => {
            const toysWithLabel = toys.filter(toy => toy.labels.includes(label))
            const toysWithLabelInStock = toysWithLabel.filter(toy => toy.inStock === true)
            const percentageByLabelInStock = (toysWithLabelInStock.length / toysWithLabel.length) * 100
            return percentageByLabelInStock
        })
        return inStockByLabels
    }

    function getToyPricesByLabelDatasets() {

        const labels = toyService.getLabelsList()
        const dataset = labels.map(label => {
            const toysWithLabel = toys.filter(toy => toy.labels.includes(label))
            if (toysWithLabel.length > highestLabelToysLength) setHighestLabelToysLength(toysWithLabel.length)

            const toysPrices = toysWithLabel.map(toy => toy.price)
            const randomColor = `${utilService.getRandomIntInclusive(50, 255)},${utilService.getRandomIntInclusive(50, 255)}, ${utilService.getRandomIntInclusive(50, 255)}`
            return {
                label: `${label} Toys Prices`,
                data: toysPrices,
                backgroundColor: `rgba(${randomColor}, 0.2)`,
                borderColor: `rgba(${randomColor}, 1)`,
                borderWidth: 1,
            }
        })
        return dataset
    }

    function getEmptyArrayOfToysLength() {
        let str = ''
        for (let i = 0; i < highestLabelToysLength; i++) {
            str += ' '
        }
        return str
    }

    const pieData = {

        labels: toyService.getLabelsList(),
        datasets: [
            {
                label: `% Toys in Stock`,
                data: getInStockToysByLabelData(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const radarData = {
        labels: [...getEmptyArrayOfToysLength()],
        datasets: getToyPricesByLabelDatasets()
    }

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Random line chart',
            },
        }
    }


    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

    const lineData = {
        labels,
        datasets: [
            {
                label: 'Demand',
                data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Supply',
                data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    }


    return (
        <>
            <h2>Toys Stock Status By Label</h2>
            <Pie data={pieData} />

            <h2>Toys Prices By Label</h2>
            <Radar data={radarData} />

            <h2>Random Data</h2>
            <Line options={lineOptions} data={lineData} />

        </>
    )
}

