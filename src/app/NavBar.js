'use client'  //added this line because useEffect was not working

import {Flex, Text} from '@radix-ui/themes';
import { SelectComponent } from './Select';
import { useEffect } from 'react';

export const NavBar = ({
        city,
        setCity,
        dataset,
        datasetOptions,
        setDataset
    }) =>{

        useEffect(() => {
            setDataset(datasetOptions[0])
        }, [city])
    
    return (
        <Flex direction="row" align="center" justify="between" width={'100%'} style ={{height: 70}}>
            <Text color="bronze" size="7" mb="2"><strong>WebGL Visualisation App</strong></Text>
            <Flex direction="row" gap="4">
            <Text size="5" mb="2">Select Your Dataset</Text>
            <SelectComponent
                options={['LA', 'NYC']}
                title="City" 
                value={city}
                onChange={setCity}
             />
            <SelectComponent 
                options={datasetOptions} 
                title="Dataset" 
                value={dataset}
                onChange={setDataset}
            />
            </Flex>
        </Flex>
    )
    
}
