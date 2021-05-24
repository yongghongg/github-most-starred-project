import { Box, Button, Flex, Heading, Image, Link, Stack, Text } from '@chakra-ui/react';
import { GoIssueOpened, GoRepoForked, GoStar } from "react-icons/go";
import moment from "moment";
import React from 'react'

export default function Repo(props) {
    const { isListView = false, repo } = props;
    console.log(repo);
    return (
        <Flex borderWidth={1} bg='white' p='15px' borderRadius="5px" alignItems="flex-start">
            <Flex flex={1} flexDir="column">
            {!isListView && (
                <Flex mb="15px" as="a" href={repo.owner.html_url} target="_blank">
                    <Image src={repo.owner.avatar_url} w="35px" h="35px" rounded="5px" />
                    <Box ml="10px">
                        <Heading fontSize="15px">{repo.owner.login}</Heading>
                        <Text fontSize="12px">View profile</Text>
                    </Box>
                </Flex>
            )}
                <Box mb="15px" flex={1}>
                    <Box mb="10px">
                        <Heading fontSize="20px" as="a" href={repo.html_url} target="_blank" color="purple.700">{repo.name}</Heading>
                        <Text fontSize="15px" color="gray.600">Built by &middot; <Link href={repo.owner.html_url} fontWeight={600} target="_blank">{repo.owner.login}</Link>&middot; {moment(repo.created_at).format("MMMM D")} </Text>
                    </Box>
                    <Text fontSize="15px" color="gray.900">{repo.description}</Text>
                </Box>
                <Stack isInline spacing="10px">
                    <Button as="a" cursor="pointer" leftIcon={<GoStar />} variant="link" fontSize="14px" iconSpacing="4px" _hover={{textDecor: 'none'}}>{repo.stargazers_count}</Button>
                    <Button as="a" cursor="pointer" leftIcon={<GoRepoForked />} variant="link" fontSize="14px" iconSpacing="4px" _hover={{textDecor: 'none'}}>{repo.forks_count}</Button>
                    <Button as="a" cursor="pointer" leftIcon={<GoIssueOpened />} variant="link" fontSize="14px" iconSpacing="4px" _hover={{textDecor: 'none'}}>{repo.open_issues_count}</Button>
                </Stack>
            </Flex>
            {isListView && (
                <Image src={repo.owner.avatar_url} w="105px" h="105px" rounded="100%" />
            )}
        </Flex>
    )
}
