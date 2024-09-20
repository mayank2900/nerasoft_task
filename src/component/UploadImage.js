import { Box, Button, Center, HStack, Image, Input } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useRef } from "react"
import { MdOutlineClose } from "react-icons/md"

export const UploadImage = ({ getImageURl, defaultValue }) => {
    const ref = useRef(null)
    const [previewImage, setPreviewImage] = useState()

    const handleFile = (e) => {
        const files = e.target.files
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result;
                setPreviewImage(base64data);
            };
            reader.readAsDataURL(file);
        }
    }
    useEffect(() => {
        if (defaultValue) {
            setPreviewImage(defaultValue)
        }
    }, [defaultValue])

    useEffect(() => {
        getImageURl(previewImage)
    }, [getImageURl, previewImage])

    const handleOpenFile = () => {
        ref.current.click()
    }

    const handleRemoveImage = () => {
        setPreviewImage(null)
    }

    return (
        <Box>
            <HStack spacing={4} align="center">
                <Box onClick={handleOpenFile}>
                    <Button colorScheme="blue" size="sm">{`${previewImage ? "Replace" : "Upload"} Image`}</Button>
                    <Box display="none" ><Input ref={ref} type="file" accept="image/*" onChange={handleFile} /></Box>
                </Box>
                {previewImage ?
                    <Box pos="relative">
                        <Center pos="absolute" w={5} color="red" onClick={handleRemoveImage} bg="gray.200" cursor="pointer" h={5} boxShadow="md" right={0} top={-2} borderRadius={100}>
                            <MdOutlineClose fontSize={20} />
                        </Center>
                        <a href={previewImage} target="_blank"><Image w={14} h={12} src="/assets/image.png" alt="image" /></a>
                    </Box>
                    :
                    null
                }
            </HStack>
        </Box>
    )
}