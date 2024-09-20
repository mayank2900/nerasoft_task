import { Button, HStack, Text } from "@chakra-ui/react"
import { useEffect, useMemo } from "react";

export const Pagination = ({ setCurrentData, currentPage, setCurrentPage }) => {
    const postsPerPage = 5;

    const totalData = useMemo(() => JSON.parse(localStorage.getItem('posts')), [])

    // Calculate total pages
    const totalPages = useMemo(() => Math.ceil(totalData.length / postsPerPage), [totalData])

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const posts = totalData.slice(indexOfFirstPost, indexOfLastPost);
        setCurrentData(posts)
    }, [currentPage, totalData, setCurrentData])

    return (
        <HStack mt={5} align="center">
            <Button colorScheme="blue" onClick={handlePreviousPage} isDisabled={currentPage === 1}>
                Previous
            </Button>
            <Text>{`${currentPage} out of ${totalPages}`}</Text>
            <Button colorScheme="blue" onClick={handleNextPage} isDisabled={currentPage === totalPages}>
                Next
            </Button>
        </HStack>
    )
}