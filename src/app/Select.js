'use client'
import {Select} from '@radix-ui/themes'

export const SelectComponent = ({options, title, value, onChange}) =>{

    return (
    <Select.Root value={value} onValueChange={onChange} size="3">
        <Select.Trigger variant="classic"/>
        <Select.Content>
            <Select.Group>
                <Select.Label>{title}</Select.Label>
                {options.map((option) =>{
                    return(
                        <Select.Item value={option}>{option}</Select.Item>
                    )
                })}
             </Select.Group> 
        </Select.Content>
    </Select.Root>
    )
}