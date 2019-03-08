import React, { Component } from 'react';
import { geoPath, geoMercator } from 'd3-geo';
import { select } from 'd3-selection';
import geojsonExtent from 'geojson-extent';
import managementAreas from '../../data/osmpManagementAreas.json';

class Map extends Component {
    state = {
        mapData: [],
    }

    componentDidMount() {
        this.setState({
            mapData: managementAreas.features,
        });
    }

    projection() {
        const extent = geojsonExtent(managementAreas);
        const extentFormatted = [[extent[0], extent[1]], [extent[2], extent[3]]]

        return geoMercator()
            .center([-105.6783867,39.1881631])
            .fitExtent(extentFormatted, managementAreas)
          .scale(50000)
          .translate([ 0, 1050 ])
    }

    render() {
        return (
            <svg width={ 1000 } height={ 800 } viewBox="0 0 800 450">
                <g className="features">
                    {
                        this.state.mapData.map((d,i) => {
                            const area = (
                                <path
                                    key={ `path-${ i }` }
                                    d={ geoPath().projection(this.projection())(d) }
                                    className="feature"
                                    fill="none"
                                    stroke="#FFFFFF"
                                    strokeWidth={ 1 }
                                    pointerEvents="all"
                                />
                            );
                            select('.feature').on('mousemove', () => {
                                console.log('mousemove')
                            })
                            return area;
                        })
                    }
                </g>
            </svg>
        );
    }
}

export default Map;
