import React, { useEffect, useRef } from 'react';
import { useTypedSelector } from '../redux/store';
import { Map } from 'mapbox-gl';
import { cloneDeep } from 'lodash';
import { deployRegions, deployMapPointItem } from '../utils/mapbox';

const MapComponent = (): JSX.Element => {
  const mapContainer = useRef(null);
  const map = useRef<Map>(null);
  const { regions, tokenBalance } = useTypedSelector((state) => state.app);
  useEffect(() => {
    console.log({ regions, tokenBalance });
    if (
      map.current ||
      mapContainer.current === null ||
      regions.length === 0 ||
      tokenBalance.length === 0
    )
      return; // initialize map only once

    // @ts-ignore
    map.current = new Map({
      container: mapContainer.current,
      style: 'mapbox://styles/nezz0746/ckzwgr6mv00a614jyekvpxdhj',
      accessToken:
        'pk.eyJ1IjoibmV6ejA3NDYiLCJhIjoiY2s4cTR5aWk2MDA2ZzNsbXNjb3ljMWR5MCJ9.YuFsP-EjV1ZWy4KbWXNCvw',
      center: [3, 50.5],
      zoom: 7,
    });

    /**
     * Deploy My NFTs
     */
    map.current.on('load', () => {
      if (map.current) {
        /**
         * Deploy regions
         */
        deployRegions(map?.current, regions);

        const clonedTokenBalance = cloneDeep(tokenBalance);

        /**
         * Deploy all zikies
         */
        clonedTokenBalance.forEach(({ data }) => {
          // @ts-ignore
          map.current.loadImage(data.image, (err, image: any) => {
            if (err) throw err;
            deployMapPointItem({
              map: map.current,
              image,
              point: data.geo_feature,
            });
          });
        });
      }
    });
  }, [regions, tokenBalance]);

  return <div ref={mapContainer} className="map-container" />;
};

export default MapComponent;
