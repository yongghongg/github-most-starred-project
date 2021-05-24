import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

export default function PageLoader() {
    return (
        <Flex 
            position="fixed"
            alignItems="center"
            justifyContent="center"
            top={0}
            bottom={0}
            left={0}
            right={0}
            bg="white"
            zIndex={999}
        >
            <Spinner thickness="5px" color="gray.400"/>
        </Flex>
    )
}
