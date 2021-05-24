import { Box, Button, Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Header from "./component/Header";
import GroupTitle from "./component/GroupTitle";
import Filter from './component/Filter';
import Repo from './component/Repo';
import moment from 'moment';
import useFetch from 'use-http';
import PageLoader from './component/PageLoader';

function modifyFilters({ startDate, endDate, language }) {
    const languageQuery = language ? `language:${language} ` : "";
    const dateQuery = `created:${startDate}..${endDate}`;
    return {
        q: languageQuery + dateQuery,
        sort: "stars",
        order: "desc"
    }
}

export default function Feed() {

    const { loading, get } = useFetch("https://api.github.com");
    
    const [viewType, setViewType] = useState('grid');
    const [period, setPeriod] = useState('day');
    const [language, setLanguage] = useState();

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState(moment().subtract(1,'day').format());

    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const endDate = moment().subtract(1, 'day').format();
        const startDate = moment(endDate).subtract(1, period).format();
        setEndDate(endDate);
        setStartDate(startDate);
        setRepos([]);
    }, [period, language]);

    useEffect(() => {
        if (!startDate) { return; }
        const filters = modifyFilters({ language, startDate, endDate });
        const filtersQuery = new URLSearchParams(filters).toString();
        
        get(`/search/repositories?${filtersQuery}`).then((res) => {
            setRepos([
                ...repos,
                {
                    startDate,
                    endDate,
                    items: res.items
                }
            ])
        });
    }, [startDate]);

    return (
        <Box maxWidth="1200px" mx="auto">
            <Header />
            {repos.length === 0 && loading && <PageLoader />}
            <Flex alignItems="center" justifyContent="space-between">
            <GroupTitle 
                startDate={repos?.[0]?.startDate}
                endDate={repos?.[0]?.endDate}
            />
            <Filter 
                viewType={viewType}
                onViewChange={setViewType}
                period={period}
                onPeriodChange={setPeriod}
                language={language}
                onLanguageChange={setLanguage}
                />
            </Flex>
            
            {repos.map((repoGroup, counter) => {
                const groupTitle = counter > 0 && (
                    <Flex alignItems="center" justifyContent="center" mt="25px" mb="15px">
                        <GroupTitle 
                            startDate={repoGroup.startDate}
                            endDate={repoGroup.endDate}
                        />
                    </Flex>
                );
                return (
                    <Box>
                        {groupTitle}
                        <SimpleGrid columns={viewType === "list" ? 1 : [1, 1, 2, 3, 3]} spacing="15px">
                            {repoGroup.items.map((repoItems) => (
                                <Repo isListView={viewType==='list'} repo={repoItems} />
                            ))}
                        </SimpleGrid>
                    </Box>
                );
            })}
            
            <Flex alignItems="center" justifyContent="center" my="20px" mb="20px">
                <Button 
                isLoading={loading}
                onClick={() => {
                    setEndDate(startDate);
                    setStartDate(moment(startDate).subtract(1, period).format());
                }} 
                colorScheme="blue">Load Next Group</Button>
            </Flex>
        </Box>
    )
}
