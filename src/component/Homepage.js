import { Box, Button, Center, Flex, Grid, Heading, HStack } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { PostCard } from "./PostCard"
import { useEffect, useState } from "react"
import { Pagination } from "./Pagination"

export const Homepage = () => {
    const router = useRouter()
    const handleToRedirect = () => {
        router.push("/create-post")
    }

    const [currentData, setCurrentData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
            setCurrentData(JSON.parse(storedPosts));
        }
    }, []);

    return (
        <Box minH="100vh" bg="white" p={8}>
            <Heading mb={4}>Blog Posts</Heading>
            <Flex justify="end">
                <Button mt={4} colorScheme="blue" size="sm" onClick={handleToRedirect}>
                    Create New Post
                </Button>
            </Flex>
            {currentData?.length ?
                <Box w="100%">
                    <Grid gridTemplateColumns={{ xl: "repeat(4,1fr)", lg: "repeat(4,1fr)", md: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }} gap={4} w="100%" align="start">
                        {currentData.map(d =>
                            <PostCard detail={d} key={d.id} setCurrentData={setCurrentData} />
                        )}
                    </Grid>
                    <Center my={4}>
                        <Pagination
                            currentPage={currentPage}
                            setCurrentData={setCurrentData}
                            setCurrentPage={setCurrentPage}
                        />
                    </Center>
                </Box>
                :
                <Center fontWeight="bold" fontSize={18}>No blog post found!</Center>
            }
        </Box>
    )
}