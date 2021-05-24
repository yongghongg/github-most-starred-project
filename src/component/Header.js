import React from 'react'
import {FaGithub, FaTwitter} from "react-icons/fa";
import { Box, Button, Stack, Text } from '@chakra-ui/react';

export default function Header() {
    return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt="25px" mb="25px">
        <Box>
            <Box><Text fontSize="2xl">Most Starred GitHub Repo</Text></Box>
        </Box>
        <Stack isInline spacing="20px">
            <Button leftIcon={<FaGithub />} colorScheme="teal" as="a" href="https://github.com/yongghongg/github-most-starred-project" target="_blank" _hover={{bg:"gray.900"}}>View Source</Button>
        </Stack>
    </Box>
    )
}
