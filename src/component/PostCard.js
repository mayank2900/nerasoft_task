import { Box, Button, Card, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import { BsThreeDotsVertical } from "react-icons/bs"
import { ConfirmAlert } from "@/common/ConfirmAlert"
import { useState } from "react"

export const PostCard = ({ detail, key, setCurrentData }) => {
    const { title, description, image, content, createdAt } = detail || {}
    const router = useRouter()
    const [showDeleteAlert, setShowDeleteAlert] = useState()

    const handleToRedirect = (id) => {
        router.push(`/post-detail?id=${id}`)
    }
    const handleEdit = (id) => {
        router.push(`/create-post?id=${id}`)
    }

    const toggleDeleteAlert = (id = null) => {
        setShowDeleteAlert(id)
    }

    const handleDeleteBlog = () => {
        const previousData = JSON.parse(localStorage.getItem('posts'))
        const filterData = previousData.filter(detail => detail.id !== showDeleteAlert)
        localStorage.setItem('posts', JSON.stringify(filterData));
        setCurrentData(filterData)
        setShowDeleteAlert(null)
    }

    return (
        <Card key={key} w="100%" m={2}>
            <Image alt="blog" src={image} w="100%" objectFit="cover" />
            <Box p={4}>
                <Flex align="start" justify="space-between">
                    <Text fontWeight="bold" fontSize={18}>{title}</Text>
                    <Menu>
                        <MenuButton as={Button}>
                            <BsThreeDotsVertical />
                        </MenuButton>
                        <MenuList>
                            <MenuItem color="blue.500" onClick={() => handleEdit(detail.id)}>Edit</MenuItem>
                            <MenuItem color="red.500" onClick={() => toggleDeleteAlert(detail.id)}>Delete</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
                <Text fontSize={14} color="gray.500">{dayjs(createdAt).format("DD MMM YYYY hh:mma")}</Text>
                <Text fontSize={16} color="gray.600" noOfLines={3} mt={2}>{description}</Text>
                <Text mt={1} noOfLines={3}>{content}</Text>
                <Flex justify="end" my={2}>
                    <Button variant="outline" size="sm" onClick={() => handleToRedirect(detail?.id)} colorScheme="blue">Read more</Button></Flex>
            </Box>
            {showDeleteAlert && (
                <ConfirmAlert
                    isOpen={true}
                    onClose={() => toggleDeleteAlert(null)}
                    message="Are you sure want to delete this blog?"
                    heading="delete blog"
                    onConfirm={handleDeleteBlog}
                />
            )}
        </Card>
    )
}