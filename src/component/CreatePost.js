import { Box, Button, FormControl, FormLabel, Input, Stack, Text, Textarea } from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { SuccessAlert } from "../util/Helper"
import dayjs from "dayjs"
import { useEffect, useMemo, useState } from "react"
import { UploadImage } from "./UploadImage"

export const CreatePost = () => {
    const router = useRouter()
    const { control, handleSubmit, reset } = useForm({
        content: "",
        desc: "",
        title: ""
    })
    const [postDetail, setPostDetail] = useState([])
    const params = useSearchParams()
    const postId = params.get("id")
    const [previewImage, setPreviewImage] = useState()

    const postData = useMemo(() => postDetail?.find(detail => detail.id == postId), [postDetail, postId])
   
    useEffect(() => {
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
            setPostDetail(JSON.parse(storedPosts));
        }
    }, [setPostDetail]);

    const onSubmit = (data) => {
        const { title, description, content } = data || {}
        let newPost = {
            id: Date.now(),
            title,
            description,
            content,
            image: previewImage || null,
            createdAt: dayjs()
        };
        let previousData = [...postDetail];
        if (postId) {
            const updatedPosts = previousData.map(post => post.id == postId ? newPost : post);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
            setPostDetail(updatedPosts)
        } else {
            previousData.push(newPost);
            localStorage.setItem('posts', JSON.stringify(previousData));
            setPostDetail(previousData)
        }
        SuccessAlert(`Post ${postId ? "Updated" : "Created"} Successfully`)
        router.push("/")
        reset()
    }

    useEffect(() => {
        if (postId && postData) {
            const { title, description, content, image } = postData || {}
            reset({ title, description, content })
            setPreviewImage(image)
        }
    }, [postData, reset, postId])

    return (
        <Box bg="white" p={6} display="flex" flexDir="row" justifyContent="center">
            <Box w={{ xl: "40%", lg: "40%", md: "60%", base: "100%" }} border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
                <Text textAlign="center" fontWeight="bold" fontSize={20}>{`${postId ? "Update" : "Create"} Blog Post`}</Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack my={3} gap={3}>
                        <UploadImage getImageURl={(url) => setPreviewImage(url)} defaultValue={previewImage} />
                        <FormControl isRequired>
                            <FormLabel>Title</FormLabel>
                            <Controller
                                control={control}
                                name="title"
                                render={({ field }) =>
                                    <Input maxLength={100} placeholder="Enter title" {...field} />
                                }
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Description</FormLabel>
                            <Controller
                                control={control}
                                name="description"
                                render={({ field }) =>
                                    <Textarea placeholder="Enter description" maxLength={500} {...field} />
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Content</FormLabel>
                            <Controller
                                control={control}
                                name="content"
                                render={({ field }) =>
                                    <Textarea placeholder="Enter content" {...field} />
                                }
                            />
                        </FormControl>
                        <Button w="full" colorScheme="blue" type="submit">{postId ? "Update" : "Submit"}</Button>
                    </Stack>
                </form>
            </Box>

        </Box>
    )
}