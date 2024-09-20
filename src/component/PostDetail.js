import { AspectRatio, Box, Button, Image, Text } from "@chakra-ui/react"
import dayjs from "dayjs"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

export const PostDeatil = () => {
    const params = useSearchParams()
    const postId = params.get("id")
    const router = useRouter()

    const [postDetail, setPostDetail] = useState()

    useEffect(() => {
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
            setPostDetail(JSON.parse(storedPosts));
        }
    }, []);

    const postData = useMemo(() => postDetail?.find(detail => detail.id == postId), [postDetail, postId])

    const handleBack = () => {
        router.push("/")
    }
    const { title, description, content, image, createdAt } = postData || {}

    return (
        <Box minH="100vh" bg="white" p={{xl:8, lg:8, md:6, base:4}}>
            <Text textAlign="center" fontWeight="bold" mb={4} fontSize={20}>Post Detail</Text>
            <Box display={"flex"} flexDir={{xl:"row", lg:"row", md:"row", base:"column"}} align="start">
                <AspectRatio ratio={1} minW={{xl:"300px", lg:"300px", md:"280px", base:"200px"}}>
                    <Image src={image} alt="Blog" objectFit="cover" w="100%" />
                </AspectRatio>
                <Box pb={4} px={{xl:4, lg:4, md:4, base:2}} pt={{base:4}}>
                    <Text fontWeight="bold" fontSize={18}>{title}</Text>
                    <Text fontSize={14} color="gray.500">{dayjs(createdAt).format("DD MMM YYYY hh:mma")}</Text>
                    <Text fontSize={16} color="gray.600" mt={2}>{description}</Text>
                    <Text mt={1}>{content}</Text>
                </Box>
            </Box>
            <Button my={6} size="sm" onClick={handleBack} colorScheme="blue">Back to home</Button>
        </Box>
    )
}