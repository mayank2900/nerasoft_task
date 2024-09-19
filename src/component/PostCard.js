import { Box, Button, Card, Flex, Image, Text } from "@chakra-ui/react"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"

export const PostCard = ({ detail, key }) => {
    const { title, description, image, content, createdAt } = detail || {}
    const router = useRouter()
    const handleToRedirect = (id) => {
        router.push(`/post-detail?=id${id}`)
    }
    return (
        <Card key={key} w="33%" m={2}>
            <Image alt="blog" src={image} w="100%" />
            <Text fontSize={14} color="gray.500">{dayjs(createdAt).format("DD MMM YYYY hh:mma")}</Text>
            <Box>
                <Text fontWeight="bold" fontSize={18}>{title}</Text>
                <Text fontSize={16} color="gray.600" noOfLines={3} mt={2}>{description}</Text>
                <Text mt={1} noOfLines={3}>{content}</Text>
                <Flex onClick={() => handleToRedirect(detail?.id)} justify="end" my={2}>
                    <Button variant="outline" size="sm" colorScheme="blue">Read more</Button></Flex>
            </Box>
        </Card>
    )
}