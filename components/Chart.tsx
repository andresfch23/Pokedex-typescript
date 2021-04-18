import React from 'react';
import PropTypes from 'prop-types';
import {
    Radar,
    RadarChart,
    PolarGrid,
    ResponsiveContainer,
    PolarAngleAxis,
    PolarRadiusAxis
} from 'recharts';
import { StatsPokemon } from '../interfaces';

type Props = {
    className: string,
    name: string,
    data: Array<StatsPokemon>
}

const Chart = ({ data, className, name = '' }: Props) => (
    <div className="pokemon__chart">
        <h2 className="pokemon__chart-title">Stats</h2>
        <ResponsiveContainer  height={300}>
            <RadarChart data={data} className={className} >
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar name={name} dataKey="base_stat" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    </div>
);

export default Chart;

Chart.propTypes = {
    data: PropTypes.array,
    className: PropTypes.string,
    name: PropTypes.string
}