import React, { useState } from 'react';

const PlotPointsForm = ({ onAddPlotPoint }) => {
    const [plotPoint, setPlotPoint] = useState('');

    const handleInputChange = (event) => {
        setPlotPoint(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (plotPoint.trim()) {
            onAddPlotPoint(plotPoint);
            setPlotPoint('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Plot Point:
                <input
                    type="text"
                    value={plotPoint}
                    onChange={handleInputChange}
                />
            </label>
            <button type="submit">Add Plot Point</button>
        </form>
    );
};

export default PlotPointsForm;