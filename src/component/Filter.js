import { 
    Select,   
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Stack} from '@chakra-ui/react';
import {CalendarIcon} from "@chakra-ui/icons";
import React, { useEffect } from 'react';
import Languages from "../data/Languages";
import { FaList, FaTable } from 'react-icons/fa';


export default function Filter(props) {
    const { viewType, onViewChange, period, onPeriodChange, language, onLanguageChange } = props;
    
    useEffect(() => {
        onViewChange(viewType);
    }, [viewType]);

    return (
        <Stack isInline mt={['15px', '15px', '15px', '0px']} mb='15px'>
            <Select value={language} onChange={(e) => onLanguageChange(e.target.value)}>
                {Languages.map((language) => (
                    <option key={language.value} value={language.value}>{language.label}</option>
                ))}
            </Select>
            <Menu>
                <MenuButton 
                    textAlign="left" 
                    as={Button} 
                    bg="white" 
                    borderWidth={1} 
                    px="30px" 
                    w="250px"
                    fontWeight={400} 
                    leftIcon={<CalendarIcon />}
                    justifyContent="flex-start">
                    {period}
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => onPeriodChange('day')}>Daily</MenuItem>
                    <MenuItem onClick={() => onPeriodChange('week')}>Weekly</MenuItem>
                    <MenuItem onClick={() => onPeriodChange('month')}>Monthly</MenuItem>
                    <MenuItem onClick={() => onPeriodChange('year')}>Yearly</MenuItem>
                </MenuList>
            </Menu>
            <Stack isInline spacing={0} borderWidth={1} bg="white" rounded="5px" alignItems="center" ml="10px">
                    <Button 
                        leftIcon={FaTable} 
                        h="100%" 
                        fontWeight={400} 
                        roundedRight={0} 
                        onClick={() => {onViewChange('grid')}}
                        bg={viewType==='grid' ? 'gray.200' : 'white'}
                        >Grid</Button>
                    <Button 
                        leftIcon={FaList} 
                        h="100%" 
                        fontWeight={400}
                        roundedRight={0} 
                        onClick={() => {onViewChange('list')}}
                        bg={viewType==='list' ? 'gray.200' : 'white'}
                        >List</Button>
            </Stack>
        </Stack>
    )
}
