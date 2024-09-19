import { Box, Button, FormControl, FormLabel, Input, Stack, Text, Textarea } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { SuccessAlert } from "../util/Helper"

export const CreatePost = () => {
    const router = useRouter()
    const { control, handleSubmit } = useForm({
        content: "",
        desc: "",
        title: ""
    })
    const onSubmit = async (data) => {
        const { title, description, content, image } = data || {}
        const newPost = { id: Date.now(), title, description, content, image, createdAt: new Date().toISOString() };

        // Send the new post to the API
        await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        });
        // Save to localStorage
        let posts = JSON.parse(localStorage.getItem('posts') || '[]');
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        SuccessAlert("Post Created Successfully")
        router.push("/")
    }
    return (
        <Box minH="100vh" bg="white" display="flex" flexDir="row" justifyContent="center">
            <Box w="70%" border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
                <Text textAlign="center" fontWeight="bold" fontSize={20}>Create Blog Post</Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack my={3} gap={3}>
                        <FormControl>
                            <FormLabel>Image</FormLabel>
                            <Input type="file" {...field} />
                        </FormControl>
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
                        <FormControl isRequired>
                            <FormLabel>Content</FormLabel>
                            <Controller
                                control={control}
                                name="content"
                                render={({ field }) =>
                                    <Textarea placeholder="Enter content" maxLength={200} {...field} />
                                }
                            />
                        </FormControl>
                        <Button w="full" colorScheme="blue" type="submit">Submit</Button>
                    </Stack>
                </form>
            </Box>

        </Box>
    )
}