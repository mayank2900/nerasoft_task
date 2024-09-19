import { Box, Button, Center, Heading } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { PostCard } from "./PostCard"
import { useState } from "react"

export const Homepage = () => {
    const router = useRouter()
    const handleToRedirect = () => {
        router.push("/create-post")
    }

    const [postData, setPostData] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/posts');
            const data = await res.json();
            setPostData(data);
        };
        fetchPosts();
    }, []);

    console.log("postData", postData)
    return (
        <Box minH="100vh" bg="white" p={5}>
            <Heading mb={4}>Blog Posts</Heading>
            <Button mt={4} colorScheme="blue" size="sm" onClick={handleToRedirect}>
                Create New Post
            </Button>
            {postData?.length ?
                <Box display="flex" flexDir="row">
                    {postData.map(detail, d =>
                        <PostCard detail={d} key={d.id} />
                    )}
                </Box>
                :
                <Center fontWeight="bold" fontSize={18}>No blog post found!</Center>
            }
        </Box>
    )
}